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
