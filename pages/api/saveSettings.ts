// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../mongodb";
import { LoginData } from "./types";

export default async function saveSettings(
  req: NextApiRequest,
  res: NextApiResponse<LoginData>
) {
  const client = await clientPromise;
  const db = client.db("MathGames");
  const {
    user: { name },
    ...settings
  } = req.body;

  const user = await db.collection("users").findOne({ name });

  if (user) {
    await db.collection("users").updateOne({ name }, { $set: settings });
    return res.status(200).json({ message: "Settings saved" });
  }

  return res.status(404).json({ message: "User not found" });
}
