import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { VOTE_DEADLINE, VOTE_START } from "./constants";

const prisma = new PrismaClient();

const K3M_CANDIDATES = 3;
const MWAWM_CANDIDATES = 2;
const KOTAK_KOSONG_ID = 0;

const isStressTest =
  process.env.STRESS_TEST === "true" &&
  Boolean(process.env.STRESS_TEST_SECRET);

interface VoteData {
  email: string;
  rankingsK3M?: number[];
  rankingsMWAWM: number[];
}

const isK3MEligibleByEmail = (email: string): boolean => {
  const localPart = email.split("@")[0] ?? "";
  return localPart.startsWith("1");
};

const isAllowedVotingDomain = (email: string): boolean => {
  return email.toLowerCase().endsWith("@mahasiswa.itb.ac.id");
};

const isValidRanking = (rankings: number[], num: number): boolean => {
  // Kotak Kosong: must be the only selection
  if (rankings.includes(KOTAK_KOSONG_ID)) {
    return rankings.length === 1 && rankings[0] === KOTAK_KOSONG_ID;
  }
  // Normal ranking: must have exactly num candidates with no duplicates and valid IDs
  if (rankings.length !== num) return false;
  const seen = new Set<number>();
  for (const r of rankings) {
    if (r < 1 || r > num || seen.has(r)) return false;
    seen.add(r);
  }
  return true;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  if (new Date() < new Date(VOTE_START)) {
    return res.status(403).json({ error: "Voting period has not started yet" });
  }
  if (new Date() > new Date(VOTE_DEADLINE)) {
    return res.status(403).json({ error: "Voting period has ended" });
  }

  if (process.env.NODE_ENV_CUSTOM === "production" && req.headers.origin !== "https://pemirakmitb.com") {
    return res.status(403).end();
  }

  // Stress test mode: bypass auth and hasVoted check
  let sessionEmail: string | null = null;
  if (isStressTest) {
    sessionEmail = req.body.email ?? null;
  } else {
    if (!req.headers["x-csrf-token"]) {
      return res.status(403).json({ error: "Missing CSRF token" });
    }
    const session = await getToken({ req });
    if (!session?.email) {
      return res.status(401).end();
    }
    if (!isAllowedVotingDomain(session.email)) {
      return res.status(403).json({ error: "Unauthorized email domain" });
    }
    if (req.body.email !== session.email) {
      return res.status(403).json({ error: "Email mismatch" });
    }
    sessionEmail = session.email;
  }

  const { rankingsK3M, rankingsMWAWM }: VoteData = req.body;

  // Enforce K3M eligibility server-side
  if (!isStressTest && sessionEmail && rankingsK3M && !isK3MEligibleByEmail(sessionEmail)) {
    return res.status(403).json({ error: "User is not eligible to vote for K3M" });
  }

  if (rankingsK3M && !isValidRanking(rankingsK3M, K3M_CANDIDATES)) {
    return res.status(400).json({ error: "Invalid K3M rankings" });
  }
  if (!isValidRanking(rankingsMWAWM, MWAWM_CANDIDATES)) {
    return res.status(400).json({ error: "Invalid MWAWM rankings" });
  }

  if (!sessionEmail) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { email: sessionEmail },
      });

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }
      if (user.hasVoted) {
        throw new Error("ALREADY_VOTED");
      }

      await tx.user.update({
        where: { email: sessionEmail },
        data: { hasVoted: true },
      });

      // Helper to create vote data - Kotak Kosong (0) means all ranks are 0
      const createK3MVote = (rankings: number[] | undefined) => {
        if (!rankings) return undefined; // User not eligible for K3M
        if (rankings.includes(KOTAK_KOSONG_ID)) {
          // Kotak Kosong - all ranks are 0
          return tx.voteK3M.create({
            data: { rank1: 0, rank2: 0, rank3: 0 },
          });
        }
        return tx.voteK3M.create({
          data: {
            rank1: rankings[0]!,
            rank2: rankings[1]!,
            rank3: rankings[2]!,
          },
        });
      };

      const createMWAWMVote = (rankings: number[]) => {
        if (rankings.includes(KOTAK_KOSONG_ID)) {
          // Kotak Kosong - all ranks are 0
          return tx.voteMWAWM.create({
            data: { rank1: 0, rank2: 0 },
          });
        }
        return tx.voteMWAWM.create({
          data: {
            rank1: rankings[0]!,
            rank2: rankings[1]!,
          },
        });
      };

      const votes = [
        createK3MVote(rankingsK3M),
        createMWAWMVote(rankingsMWAWM),
      ];

      await Promise.all(votes);
    });

    return res.status(200).json({ message: "Vote recorded successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message === "USER_NOT_FOUND") return res.status(404).end();
    if (message === "ALREADY_VOTED") return res.status(400).json({ error: "User has already voted" });
    console.error("Error recording vote:", error);
    return res.status(500).end();
  }
}