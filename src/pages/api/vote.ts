import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

const K3M_CANDIDATES = 4;
const MWAWM_CANDIDATES = 3;

interface VoteData {
  email: string;
  rankingsK3M?: number[];
  rankingsMWAWM: number[];
}

const isValidRanking = (rankings: number[], num: number): boolean => {
  if (rankings.length !== num) return false;
  const seen = new Set<number>();
  for (const r of rankings) {
    if (r < 1 || r > num || seen.has(r)) return false;
    seen.add(r);
  }
  return true;
};

const VOTE_DEADLINE = "2027-03-09T23:59:59.999+07:00";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  if (new Date() > new Date(VOTE_DEADLINE)) {
    return res.status(403).json({ error: "Voting period has ended" });
  }

  if (process.env.NODE_ENV_CUSTOM === "production" && req.headers.origin !== "https://pemirakmitb.com") {
    return res.status(403).end();
  }

  if (!req.headers["x-csrf-token"]) {
    return res.status(403).json({ error: "Missing CSRF token" });
  }

  const session = await getToken({ req });
  if (!session?.email) {
    return res.status(401).end();
  }

  const { email, rankingsK3M, rankingsMWAWM }: VoteData = req.body;

  if (email !== session.email) {
    return res.status(403).json({ error: "Email mismatch" });
  }

  if (rankingsK3M && !isValidRanking(rankingsK3M, K3M_CANDIDATES)) {
    return res.status(400).json({ error: "Invalid K3M rankings" });
  }
  if (!isValidRanking(rankingsMWAWM, MWAWM_CANDIDATES)) {
    return res.status(400).json({ error: "Invalid MWAWM rankings" });
  }

  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }
      if (user.hasVoted) {
        throw new Error("ALREADY_VOTED");
      }

      await tx.user.update({
        where: { email },
        data: { hasVoted: true },
      });

      const votes = [
        rankingsK3M && tx.voteK3M.create({
          data: {
            rank1: rankingsK3M[0]!,
            rank2: rankingsK3M[1]!,
            rank3: rankingsK3M[2]!,
            rank4: rankingsK3M[3]!,
          },
        }),
        tx.voteMWAWM.create({
          data: {
            rank1: rankingsMWAWM[0]!,
            rank2: rankingsMWAWM[1]!,
            rank3: rankingsMWAWM[2]!,
          },
        }),
      ].filter(Boolean);

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
