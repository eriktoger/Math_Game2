import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const imageFolder = "images";
const dirname = "./public";

export default async function getPicture(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const dir = path.resolve(dirname, imageFolder);
    const filenames = fs.readdirSync(dir);
    const randomIndex = Math.floor(Math.random() * filenames.length);
    return res.status(200).json({ imageFile: filenames[randomIndex] });
  } catch (error) {
    return res.status(500).json({ message: "Unknown error" });
  }
}
