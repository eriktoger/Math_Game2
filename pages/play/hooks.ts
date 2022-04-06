import { StaticImageData } from "next/image";
import { Equation, Operation } from "pages/types";
import { useEffect, useState } from "react";
import { useWindowDimensions } from "sharedHooks";
import init, {
  generate_addition,
  generate_multiplication,
  generate_order,
} from "../../wasm/pkg/wasm";

export const useWasm = (addition: Operation, multiplication: Operation) => {
  const [wasmLoaded, setWasmLoaded] = useState(false);
  const [revealOrder, setRevealOrder] = useState<number[]>([]);
  useEffect(function initilizeWasm() {
    init().then(() => {
      setWasmLoaded(true);
      setRevealOrder(generate_order());
    });
  }, []);

  if (!wasmLoaded) {
    return { wasmLoaded, generateEquation: () => {}, revealOrder };
  }

  const generateEquation = (
    addition: Operation,
    multiplication: Operation
  ): Equation => {
    if (addition.enabled && multiplication.enabled) {
      if (Math.random() > 0.5) {
        return generate_addition(addition);
      }
      return generate_multiplication(multiplication);
    }
    if (addition.enabled) {
      return generate_addition(addition);
    }
    if (multiplication.enabled) {
      return generate_multiplication(multiplication);
    }
    throw "No enabled operator!";
  };

  return { wasmLoaded, generateEquation, revealOrder };
};

export const useResizeImage = (image: StaticImageData | null) => {
  const [imageHeight, setImageHeight] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const { isLandscape, windowWidth, windowHeight } = useWindowDimensions();

  useEffect(() => {
    function handleResize() {
      const { height, width } = image ?? { height: 0, width: 0 };

      if (!isLandscape) {
        const ratio = width / height;
        const newHeight = windowHeight - 350;
        setImageHeight(newHeight);
        setImageWidth(newHeight * ratio);
        return;
      }
      if (height < windowHeight) {
        return;
      }
      const ratio = height / width;
      setImageHeight(windowHeight * 0.9);
      setImageWidth(windowWidth * ratio * 0.9);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [image, isLandscape, windowHeight, windowWidth]);

  return { imageHeight, imageWidth };
};
