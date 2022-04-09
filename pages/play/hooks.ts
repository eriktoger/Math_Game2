import { StaticImageData } from "next/image";
import { Equation, Operation } from "pages/types";
import { useEffect, useRef, useState } from "react";
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
  const debounce = useRef(false);
  const { isLandscape, windowWidth, windowHeight } = useWindowDimensions();
  const imageLoaded = !!imageHeight && !!imageWidth;

  useEffect(() => {
    function handleResize() {
      if (debounce.current && imageLoaded) {
        return;
      }
      const { height, width } = image ?? { height: 0, width: 0 };

      if (!isLandscape) {
        const availableHeight = windowHeight - 350;
        const availableWidth = windowWidth * 0.95;

        const newHeight = availableHeight;
        const newWidth = width * (newHeight / height);
        // witdth fits when height is maximized
        if (newWidth <= availableWidth) {
          setImageHeight(newHeight);
          setImageWidth(newWidth);
        } else {
          const alternativeHeight = availableWidth * (height / width);
          setImageHeight(alternativeHeight);
          setImageWidth(availableWidth);
        }
      } else {
        //If I add images that is not landscape,
        //I need add a condition as in !landscape
        const availableWidth = windowWidth - 250;
        const ratio = availableWidth / width;

        setImageHeight(height * ratio * 0.8);
        setImageWidth(availableWidth * 0.8);
      }
      debounce.current = true;
      setTimeout(() => {
        debounce.current = false;
      }, 100);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [image, imageLoaded, isLandscape, windowHeight, windowWidth]);

  return { imageHeight, imageWidth };
};