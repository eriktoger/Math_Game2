import { Equation, Operation } from "pages/types";
import { useEffect, useState } from "react";
import init, {
  generate_addition,
  generate_multiplication,
  generate_order,
} from "../../wasm/pkg/wasm";

export const useWasm = (addition: Operation, multiplication: Operation) => {
  const [wasmLoaded, setWasmLoaded] = useState(false);
  const [revealOrder, setRevealOrder] = useState<number[]>([]);
  console.log("here");
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
