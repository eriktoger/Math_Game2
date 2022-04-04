// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../mongodb";
import { LoginData } from "./types";

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse<LoginData>
) {
  const client = await clientPromise;
  const db = client.db("MathGames");
  const { name, password } = req.body;
  const user = await db.collection("users").findOne({ name });

  if (user) {
    return res
      .status(409)
      .json({ message: "Username already exists", loggedIn: false });
  }

  const newUser = await db.collection("users").insertOne({ name, password });
  if (newUser.acknowledged) {
    return res.status(200).json({ name, loggedIn: true });
  }

  return res.status(400).json({ message: "Unknown error", loggedIn: false });
}
