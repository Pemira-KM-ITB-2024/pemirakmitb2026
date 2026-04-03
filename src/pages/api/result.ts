import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Vote {
    rank1: number;
    rank2: number;
    rank3: number;
    rank4?: number;
}

interface IRVResult {
    winner: number | null;
    rounds: {
        round: number;
        counts: Record<number, number>;
        percentages: Record<number, number>;
        eliminated?: number;
    }[];
    peakPercentages: Record<number, number>;
    totalVotes: number;
}

const runIRV = (votes: Vote[], numCandidates: number): IRVResult => {
    const totalVotes = votes.length;
    const rounds: IRVResult["rounds"] = [];

    // Initialize: build vote tracker - each vote's current effective rank
    // voteTracker[i] = the candidate number that vote i currently points to
    const voteTracker: number[] = votes.map(v => v.rank1);

    // Active candidates (not yet eliminated)
    const activeCandidates = new Set(Array.from({ length: numCandidates }, (_, i) => i + 1));

    let round = 1;
    let winner: number | null = null;

    while (activeCandidates.size > 1 && round <= numCandidates) {
        // Count votes for each active candidate
        const counts: Record<number, number> = {};
        const percentages: Record<number, number> = {};
        for (const c of activeCandidates) counts[c] = 0;

        for (const vote of voteTracker) {
            if (activeCandidates.has(vote)) {
                counts[vote] = (counts[vote] ?? 0) + 1;
            }
        }

        // Calculate percentages
        for (const c of activeCandidates) {
            percentages[c] = totalVotes > 0 ? Math.round((counts[c]! / totalVotes) * 10000) / 100 : 0;
        }

        rounds.push({ round, counts, percentages });

        // Check for winner (>50%)
        for (const c of activeCandidates) {
            if (counts[c]! > totalVotes / 2) {
                winner = c;
                break;
            }
        }

        if (winner) break;

        // Find candidate with fewest votes
        let minVotes = Infinity;
        let eliminated = -1;
        for (const c of activeCandidates) {
            if ((counts[c] ?? 0) < minVotes) {
                minVotes = counts[c] ?? 0;
                eliminated = c;
            }
        }

        // Eliminate candidate with fewest votes
        activeCandidates.delete(eliminated);
        const lastRound = rounds[rounds.length - 1];
        if (lastRound) {
            lastRound.eliminated = eliminated;
        }

        // Redistribute votes: find votes pointing to eliminated candidate and move to next rank
        for (let i = 0; i < voteTracker.length; i++) {
            const currentVote = voteTracker[i];
            if (currentVote === eliminated) {
                const vote = votes[i];
                if (vote) {
                    // Find next preference that's still active
                    const ranks: number[] = [];
                    if (vote.rank1) ranks.push(vote.rank1);
                    if (vote.rank2) ranks.push(vote.rank2);
                    if (vote.rank3) ranks.push(vote.rank3);
                    if (vote.rank4) ranks.push(vote.rank4);

                    for (const rank of ranks) {
                        if (activeCandidates.has(rank)) {
                            voteTracker[i] = rank;
                            break;
                        }
                    }
                }
            }
        }
        round++;
    }

    // If no winner after all rounds, winner is the last remaining candidate
    if (!winner && activeCandidates.size === 1) {
        winner = Array.from(activeCandidates)[0] ?? null;
    }

    // Calculate peak percentages for each candidate across all rounds
    const peakPercentages: Record<number, number> = {};
    for (let c = 1; c <= numCandidates; c++) {
        peakPercentages[c] = 0;
    }
    for (const r of rounds) {
        for (const c of Object.keys(r.percentages)) {
            const candidate = parseInt(c);
            const percentage = r.percentages[candidate] ?? 0;
            const currentPeak = peakPercentages[candidate] ?? 0;
            if (percentage > currentPeak) {
                peakPercentages[candidate] = percentage;
            }
        }
    }

    return { winner, rounds, peakPercentages, totalVotes };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        // Get all K3M votes
        const k3mVotes = await prisma.voteK3M.findMany({
            select: {
                rank1: true,
                rank2: true,
                rank3: true,
                rank4: true,
            },
        });

        // Get all MWAWM votes
        const mwawmVotes = await prisma.voteMWAWM.findMany({
            select: {
                rank1: true,
                rank2: true,
                rank3: true,
            },
        });

        // Run IRV for K3M (4 candidates)
        const k3mResult = runIRV(k3mVotes, 4);

        // Run IRV for MWAWM (3 candidates)
        const mwawmResult = runIRV(mwawmVotes, 3);

        return res.status(200).json({
            k3m: k3mResult,
            mwawm: mwawmResult,
        });

    } catch (error) {
        console.error("Error fetching results:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
