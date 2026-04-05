import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * K3M Seeding Strategy (2 rounds to winner with 3 candidates):
 *
 * Round 1:
 * - C1: 40 votes (40%)
 * - C2: 35 votes (35%)
 * - C3: 25 votes (25%)
 * → C3 eliminated (fewest)
 *
 * Round 2:
 * - C1: 40 + 15 = 55 votes (57.89%) - WINNER
 * - C2: 35 + 10 = 45 votes (42.11%)
 */
const k3mVoteDistribution = [
  // C1 voters (40 votes) - 2nd choice mostly C2
  ...Array(25).fill({ rank1: 1, rank2: 2, rank3: 3 }),
  ...Array(10).fill({ rank1: 1, rank2: 3, rank3: 2 }),
  ...Array(5).fill({ rank1: 1, rank2: 0, rank3: 0 }), // Kotak Kosong

  // C2 voters (35 votes) - 2nd choice mostly C1
  ...Array(22).fill({ rank1: 2, rank2: 1, rank3: 3 }),
  ...Array(8).fill({ rank1: 2, rank2: 3, rank3: 1 }),
  ...Array(5).fill({ rank1: 2, rank2: 0, rank3: 0 }), // Kotak Kosong

  // C3 voters (25 votes) - 15 go to C1, 10 go to C2
  ...Array(15).fill({ rank1: 3, rank2: 1, rank3: 2 }),
  ...Array(10).fill({ rank1: 3, rank2: 2, rank3: 1 }),
];

/**
 * MWAWM Seeding Strategy (immediate winner with 2 candidates):
 *
 * Round 1:
 * - C1: 55 votes (55%)
 * - C2: 45 votes (45%)
 * → C1 WINS with >50%
 */
const mwawmVoteDistribution = [
  // C1 voters (55 votes)
  ...Array(30).fill({ rank1: 1, rank2: 2 }),
  ...Array(15).fill({ rank1: 1, rank2: 0 }), // Kotak Kosong
  ...Array(10).fill({ rank1: 0, rank2: 0 }), // Kotak Kosong

  // C2 voters (45 votes)
  ...Array(25).fill({ rank1: 2, rank2: 1 }),
  ...Array(15).fill({ rank1: 2, rank2: 0 }), // Kotak Kosong
  ...Array(5).fill({ rank1: 0, rank2: 0 }), // Kotak Kosong
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Clear existing votes
    await prisma.voteK3M.deleteMany({});
    await prisma.voteMWAWM.deleteMany({});

    // Seed K3M votes (3 candidates: rank1, rank2, rank3)
    for (const vote of k3mVoteDistribution) {
      await prisma.voteK3M.create({
        data: {
          rank1: vote.rank1,
          rank2: vote.rank2,
          rank3: vote.rank3,
        },
      });
    }

    // Seed MWAWM votes (2 candidates: rank1, rank2)
    for (const vote of mwawmVoteDistribution) {
      await prisma.voteMWAWM.create({
        data: {
          rank1: vote.rank1,
          rank2: vote.rank2,
        },
      });
    }

    const k3mTotal = k3mVoteDistribution.length;
    const mwawmTotal = mwawmVoteDistribution.length;

    return res.status(200).json({
      message: "Database seeded successfully",
      k3m: {
        totalVotes: k3mTotal,
        expectedRounds: 2,
        distribution: {
          round1: { C1: 40, C2: 35, C3: 25 },
          round2: { C1: 55, C2: 45 },
        },
      },
      mwawm: {
        totalVotes: mwawmTotal,
        expectedRounds: 1,
        distribution: {
          round1: { C1: 55, C2: 45 },
        },
      },
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}