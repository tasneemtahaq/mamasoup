import { NextApiRequest, NextApiResponse } from "next";

// pages/api/revalidate.ts
interface RevalidateRequest extends NextApiRequest {
    query: {
        secret: string;
    };
}

interface RevalidateResponse {
    revalidated?: boolean;
    message?: string;
    err?: unknown;
}

export default async function handler(req: RevalidateRequest, res: NextApiResponse<RevalidateResponse>) {
    // A secret token to verify that the request is coming from your webhook service
    if (req.query.secret !== process.env.MY_REVALIDATION_SECRET) {
        return res.status(401).json({ message: "Invalid token" });
    }

    try {
        // Revalidate the homepage (or another page)
        await res.revalidate("/");
        return res.json({ revalidated: true });
    } catch (err) {
        return res.status(500).json({ message: "Error revalidating", err });
    }
}
  