import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
    // IRV Voting Count
    try {
        return res.status(200).json({message: "Success"});

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}