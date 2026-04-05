import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { RESULT_DATE } from "./constants";

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
        exhaustedVotes?: number;
    }[];
    peakPercentages: Record<number, number>;
    totalVotes: number;
    kotakKosongVotes: number;
    exhaustedVotes: number;
}

const KOTAK_KOSONG_ID = 0;

const runIRV = (votes: Vote[], numCandidates: number): IRVResult => {
    const totalVotes = votes.length;
    const rounds: IRVResult["rounds"] = [];

    // Count Kotak Kosong votes (rank1 = 0)
    const kotakKosongVotes = votes.filter(v => v.rank1 === KOTAK_KOSONG_ID).length;

    // Initialize: build vote tracker - each vote's current effective rank
    // voteTracker[i] = the candidate number that vote i currently points to
    // For Kotak Kosong votes, tracker will be 0 (exhausted)
    const voteTracker: number[] = votes.map(v => v.rank1 === KOTAK_KOSONG_ID ? KOTAK_KOSONG_ID : v.rank1);

    // Active candidates (not yet eliminated)
    const activeCandidates = new Set(Array.from({ length: numCandidates }, (_, i) => i + 1));

    let round = 1;
    let winner: number | null = null;
    let exhaustedVotes = 0;

    while (activeCandidates.size > 1 && round <= numCandidates) {
        // Count votes for each active candidate
        const counts: Record<number, number> = {};
        const percentages: Record<number, number> = {};
        for (const c of activeCandidates) counts[c] = 0;

        // Count exhausted votes (Kotak Kosong or votes with no remaining preferences)
        let currentExhausted = 0;

        for (const vote of voteTracker) {
            if (vote === KOTAK_KOSONG_ID) {
                currentExhausted++;
            } else if (activeCandidates.has(vote)) {
                counts[vote] = (counts[vote] ?? 0) + 1;
            }
        }

        // Calculate percentages based on active votes (non-exhausted)
        const activeVotes = totalVotes - kotakKosongVotes - exhaustedVotes;
        for (const c of activeCandidates) {
            percentages[c] = activeVotes > 0 ? Math.round((counts[c]! / activeVotes) * 10000) / 100 : 0;
        }

        rounds.push({ round, counts, percentages, exhaustedVotes: currentExhausted });

        // Check for winner (>50% of active votes)
        for (const c of activeCandidates) {
            if (counts[c]! > activeVotes / 2) {
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
                    // Find next preference that's still active (skip Kotak Kosong)
                    const ranks: number[] = [];
                    if (vote.rank1 && vote.rank1 !== KOTAK_KOSONG_ID) ranks.push(vote.rank1);
                    if (vote.rank2 && vote.rank2 !== KOTAK_KOSONG_ID) ranks.push(vote.rank2);
                    if (vote.rank3 && vote.rank3 !== KOTAK_KOSONG_ID) ranks.push(vote.rank3);
                    if (vote.rank4 && vote.rank4 !== KOTAK_KOSONG_ID) ranks.push(vote.rank4);

                    let redistributed = false;
                    for (const rank of ranks) {
                        if (activeCandidates.has(rank)) {
                            voteTracker[i] = rank;
                            redistributed = true;
                            break;
                        }
                    }

                    // If no valid preference found, vote is exhausted
                    if (!redistributed) {
                        voteTracker[i] = KOTAK_KOSONG_ID;
                    }
                }
            }
        }

        // Update exhausted votes count
        exhaustedVotes = voteTracker.filter(v => v === KOTAK_KOSONG_ID).length;
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

    return { winner, rounds, peakPercentages, totalVotes, kotakKosongVotes, exhaustedVotes };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
    if (new Date() < new Date(RESULT_DATE)) {
        return res.status(403).json({ error: "Results not available yet" });
    }
    
    try {
        // Get all K3M votes
        const k3mVotes = await prisma.voteK3M.findMany({
            select: {
                rank1: true,
                rank2: true,
                rank3: true,
            },
        });

        // Get all MWAWM votes
        const mwawmVotes = await prisma.voteMWAWM.findMany({
            select: {
                rank1: true,
                rank2: true,
            },
        });

        // Run IRV for K3M (3 candidates)
        const k3mResult = runIRV(k3mVotes, 3);

        // Run IRV for MWAWM (2 candidates)
        const mwawmResult = runIRV(mwawmVotes, 2);

        return res.status(200).json({
            k3m: k3mResult,
            mwawm: mwawmResult,
        });

    } catch (error) {
        console.error("Error fetching results:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}