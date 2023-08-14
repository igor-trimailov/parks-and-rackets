import { validateJWT } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const cookieName = process.env.COOKIE_NAME!;
    const user = await validateJWT(req.cookies[cookieName]);

    await db.project.create({
        data: {
            name: req.body.name,
            ownerId: user.id,
        },
    });

    res.json({ data: { message: "success" } });
}
