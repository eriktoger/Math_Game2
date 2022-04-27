// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "mongoDB";
import { LoginData } from "types";
import jwt from "jsonwebtoken";

export default async function saveSettings(
  req: NextApiRequest,
  res: NextApiResponse<LoginData>
) {
  const client = await clientPromise;
  const db = client.db("MathGames");
  const {
    user: { name, token },
    ...settings
  } = req.body;

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(403).json({ message: "Auth not properly setup" });
  }

  const decoded = jwt.verify(token, jwtSecret);
  if (typeof decoded == "string" || name !== decoded.name) {
    return res.status(401).json({ message: "Access denied" });
  }

  const user = await db.collection("users").findOne({ name });

  if (user) {
    await db.collection("users").updateOne({ name }, { $set: settings });
    return res.status(200).json({ message: "Settings saved" });
  }

  return res.status(404).json({ message: "User not found" });
}
