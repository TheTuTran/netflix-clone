import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/server-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        // checks for user is signed in
        await serverAuth(req, res);

        const moviesCount = await prismadb.movie.count();
        const randomIndex = Math.floor(Math.random() * moviesCount);

        //explicitly states to take a random movie from database and we return it
        const randomMovies = await prismadb.movie.findMany({
            take: 1,
            skip: randomIndex
        });

        return res.status(200).json(randomMovies[0]);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}