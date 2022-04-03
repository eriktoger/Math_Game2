// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../mongodb";
import { LoginData } from "./types";

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<LoginData>
) {
  const client = await clientPromise;
  const db = client.db("MathGames");
  const { name, password } = req.body;
  let users = await db.collection("users").findOne({ name, password });
  if (!users) {
    return res
      .status(401)
      .json({ message: "Invalid username or password", loggedIn: false });
  }

  return res.status(200).json({ name: "test", loggedIn: true });
}
