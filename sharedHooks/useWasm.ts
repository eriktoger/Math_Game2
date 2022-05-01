import init, {
  generate_addition,
  generate_subtraction,
  generate_multiplication,
  generate_division,
  generate_order,
} from "wasm/pkg/wasm";
import { Equation, Operation } from "types";
import { useCallback, useEffect, useState } from "react";

const useWasm = () => {
  const [wasmLoaded, setWasmLoaded] = useState(false);
  const [revealOrder, setRevealOrder] = useState<number[]>([]);
  useEffect(function initilizeWasm() {
    init().then(() => {
      setWasmLoaded(true);
      setRevealOrder(generate_order());
    });
  }, []);

  const generateEquation = useCallback(
    (
      addition: Operation,
      multiplication: Operation,
      subtraction: Operation,
      division: Operation
    ): Equation => {
      if (!wasmLoaded) {
        return {
          first: 1,
          second: 1,
          operator: "+",
          answer: 2,
        };
      }
      let generators = [] as (() => Equation)[];
      if (addition.enabled) {
        generators.push(() => generate_addition(addition));
      }
      if (multiplication.enabled) {
        generators.push(() => generate_multiplication(multiplication));
      }
      if (subtraction.enabled) {
        generators.push(() => generate_subtraction(subtraction));
      }
      if (division.enabled) {
        generators.push(() => generate_division(division));
      }

      const randomIndex = Math.floor(Math.random() * generators.length);

      return generators[randomIndex]();
    },
    [wasmLoaded]
  );

  return { wasmLoaded, generateEquation, revealOrder };
};

export default useWasm;
