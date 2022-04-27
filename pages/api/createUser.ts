// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "mongoDB";
import { LoginData } from "types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await db
    .collection("users")
    .insertOne({ name, password: hashedPassword });
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(403).json({ message: "Auth not properly setup" });
  }

  const token = jwt.sign({ name }, jwtSecret);

  if (newUser.acknowledged) {
    return res.status(200).json({ name, loggedIn: true, token });
  }

  return res.status(400).json({ message: "Unknown error", loggedIn: false });
}
