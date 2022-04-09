import Image from "next/image";

import piece0_0 from "public/pieces/piece0-0.png";
import piece0_1 from "public/pieces/piece0-1.png";
import piece0_2 from "public/pieces/piece0-2.png";
import piece0_3 from "public/pieces/piece0-3.png";
import piece0_4 from "public/pieces/piece0-4.png";
import piece0_5 from "public/pieces/piece0-5.png";

import piece1_0 from "public/pieces/piece1-0.png";
import piece1_1 from "public/pieces/piece1-1.png";
import piece1_2 from "public/pieces//piece1-2.png";
import piece1_3 from "public/pieces/piece1-3.png";
import piece1_4 from "public/pieces/piece1-4.png";
import piece1_5 from "public/pieces/piece1-5.png";

import piece2_0 from "public/pieces/piece2-0.png";
import piece2_1 from "public/pieces/piece2-1.png";
import piece2_2 from "public/pieces/piece2-2.png";
import piece2_3 from "public/pieces/piece2-3.png";
import piece2_4 from "public/pieces/piece2-4.png";
import piece2_5 from "public/pieces/piece2-5.png";

import piece3_0 from "public/pieces/piece3-0.png";
import piece3_1 from "public/pieces/piece3-1.png";
import piece3_2 from "public/pieces/piece3-2.png";
import piece3_3 from "public/pieces/piece3-3.png";
import piece3_4 from "public/pieces/piece3-4.png";
import piece3_5 from "public/pieces/piece3-5.png";

import cat1 from "../../public/images/cat1.jpg";
import cuteFluffyAnimal from "../../public/images/cute-fluffy-animal.jpg";
import panda from "../../public/images/panda.webp";
import penquins from "../../public/images/penquins.webp";

const images = [cat1, cuteFluffyAnimal, panda, penquins];

export const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  const image = images[randomIndex];

  return image;
};

export const generateJigsawPieces = (
  imageWidth: number,
  imageHeight: number
) => {
  const widthPart = Math.ceil(imageWidth / 6);
  const heightPart = Math.ceil(imageHeight / 4);
  const pegOffset = 0.33;

  return [
    {
      src: piece0_0,
      alt: "piece0_0",
      width: widthPart * (1 + pegOffset),
      height: heightPart * (1 + pegOffset),
      style: { left: 0, top: 0 },
    },
    {
      src: piece0_1,
      alt: "piece0_1",
      width: widthPart,
      height: heightPart * (1 + pegOffset),
      style: { left: `${widthPart}px`, top: 0 },
    },
    {
      src: piece0_2,
      alt: "piece0_2",
      width: widthPart * (1 + 2 * pegOffset),
      height: heightPart,
      style: { left: `${widthPart * (1 + 2 * pegOffset)}px`, top: 0 },
    },
    {
      src: piece0_3,
      alt: "piece0_3",
      width: widthPart,
      height: heightPart * (1 + pegOffset),
      style: { left: `${widthPart * 3}px`, top: 0 },
    },
    {
      src: piece0_4,
      alt: "piece0_4",
      width: widthPart * (1 + 2 * pegOffset),
      height: heightPart,
      style: { left: `${widthPart * (3 + 2 * pegOffset) + 1}px`, top: 0 },
    },
    {
      src: piece0_5,
      alt: "piece0_5",
      width: widthPart,
      height: heightPart,
      style: { right: 0, top: 0 },
    },
    {
      src: piece1_0,
      alt: "piece1_0",
      width: widthPart,
      height: heightPart * (1 + pegOffset),
      style: { left: 0, top: `${heightPart}px` },
    },
    {
      src: piece1_1,
      alt: "piece1_1",
      width: widthPart * (1 + 2 * pegOffset),
      height: heightPart,
      style: {
        left: `${widthPart * (1 - pegOffset)}px`,
        top: `${heightPart}px`,
      },
    },
    {
      src: piece1_2,
      alt: "piece1_2",
      width: widthPart,
      height: heightPart * (1 + 2 * pegOffset),
      style: {
        left: `${widthPart * 2}px`,
        top: `${heightPart * 2 * pegOffset}px`,
      },
    },
    {
      src: piece1_3,
      alt: "piece1_3",
      width: widthPart * (1 + 2 * pegOffset),
      height: heightPart * (1 + pegOffset),
      style: {
        left: `${widthPart * (2 + 2 * pegOffset)}px`,
        top: `${heightPart}px`,
      },
    },
    {
      src: piece1_4,
      alt: "piece1_4",
      width: widthPart * (1 + pegOffset),
      height: heightPart * (1 + 2 * pegOffset),
      style: {
        left: `${widthPart * 4}px`,
        top: `${heightPart * (1 - pegOffset)}px`,
      },
    },
    {
      src: piece1_5,
      alt: "piece1_5",
      width: widthPart,
      height: heightPart * (1 + pegOffset),
      style: {
        left: `${widthPart * 5}px`,
        bottom: `${2 * heightPart}px`,
      },
    },
    {
      src: piece2_0,
      alt: "piece2_0",
      width: widthPart * (1 + pegOffset),
      height: heightPart,
      style: { left: `${0}px`, top: `${heightPart * 2}px` },
    },
    {
      src: piece2_1,
      alt: "piece2_1",
      width: widthPart,
      height: heightPart * (1 + 2 * pegOffset),
      style: {
        left: `${widthPart}px`,
        top: `${heightPart * (1 + 2 * pegOffset)}px`,
      },
    },
    {
      src: piece2_2,
      alt: "piece2_2",
      width: widthPart * (1 + pegOffset),
      height: heightPart,
      style: {
        left: `${widthPart * (1 + 2 * pegOffset)}px`,
        top: `${heightPart * 2}px`,
      },
    },
    {
      src: piece2_3,
      alt: "piece2_3",
      width: widthPart * (1 + 2 * pegOffset),
      height: heightPart,
      style: {
        left: `${widthPart * (2 + 2 * pegOffset)}px`,
        top: `${heightPart * 2}px`,
      },
    },
    {
      src: piece2_4,
      alt: "piece2_4",
      width: widthPart,
      height: heightPart * (1 + pegOffset),
      style: { left: `${widthPart * 4}px`, top: `${heightPart * 2}px` },
    },
    {
      src: piece2_5,
      alt: "piece2_5",
      width: widthPart * (1 + pegOffset),
      height: heightPart * (1 + pegOffset),
      style: {
        right: 0,
        bottom: `${heightPart}px`,
      },
    },
    {
      src: piece3_0,
      alt: "piece3_0",
      width: widthPart,
      height: heightPart * (1 + pegOffset),
      style: { left: `${0}px`, bottom: `${0}px` },
    },
    {
      src: piece3_1,
      alt: "piece3_1",
      width: widthPart * (2 - pegOffset),
      height: heightPart,
      style: {
        left: `${widthPart * (1 - pegOffset)}px`,
        bottom: `${0}px`,
      },
    },
    {
      src: piece3_2,
      alt: "piece3_2",
      width: widthPart,
      height: heightPart * (1 + pegOffset),
      style: {
        left: `${widthPart * 2}px`,
        bottom: `${0}px`,
      },
    },
    {
      src: piece3_3,
      alt: "piece3_3",
      width: widthPart * (1 + pegOffset),
      height: heightPart * (1 + pegOffset),
      style: {
        left: `${widthPart * (3 - pegOffset)}px`,
        bottom: `${0}px`,
      },
    },
    {
      src: piece3_4,
      alt: "piece3_4",
      width: widthPart * (1 + 2 * pegOffset),
      height: heightPart,
      style: {
        left: `${widthPart * (4 - pegOffset)}px`,
        bottom: `${0}px`,
      },
    },
    {
      src: piece3_5,
      alt: "piece3_5",
      width: widthPart,
      height: heightPart * (1 + pegOffset),
      style: {
        right: `${0}px`,
        bottom: `${0}px`,
      },
    },
  ];
};
