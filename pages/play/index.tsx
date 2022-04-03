import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import init, {
  generate_addition,
  generate_multiplication,
  generate_order,
} from "../../wasm/pkg/wasm";
import { useSettingsContext } from "../settingsContext";
import { Equation } from "../types";
import backUpImage from "../../public/cat1.jpg";

const Play: NextPage = () => {
  const { addition, multiplication } = useSettingsContext();
  const [answer, setAnswer] = useState<number | null>(null);
  const [equation, setEquation] = useState<Equation | null>(null);
  const [revealOrder, setRevealOrder] = useState<number[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wasmLoaded, setWasmLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const generateEquation = useCallback((): Equation => {
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
  }, [addition, multiplication]);

  useEffect(
    function initilizeWasm() {
      init().then(() => {
        setWasmLoaded(true);
        const newEquation = generateEquation();
        const order = generate_order();
        setRevealOrder(order);
        setEquation(newEquation);
      });
    },
    [generateEquation]
  );

  if (!wasmLoaded) {
    return <div>Wasm is loading...</div>;
  }

  return (
    <div className="h-screen w-screen">
      <h1 className="text-3xl font-bold underline">Playing</h1>

      <div className="m-2 p-2">
        {`${equation?.first} ${equation?.operator} ${equation?.second} = `}
        <input
          size={5}
          value={answer ?? ""}
          type="number"
          onChange={(event) =>
            setAnswer(Number(event.target.value.replace(/[^0-9]/g, "")))
          }
        />
        <button
          className="m-2"
          onClick={() => {
            if (answer === equation?.answer) {
              setCorrectAnswers((value) => value + 1);
              const newEquation = generateEquation();
              setEquation(newEquation);
              setAnswer(null);
            } else {
            }
          }}
        >
          Send
        </button>
      </div>

      <div className="relative">
        <div className="absolute grid grid-cols-3 w-full h-full">
          {revealOrder.map((value) => {
            if (value < correctAnswers) {
              return <div key={value} />;
            }

            return <div key={value} className="bg-black z-10" />;
          })}
        </div>
        <Image src={backUpImage} alt="Picture" className="absolute" />
      </div>
      <div>
        <Link href="/home">
          <a>Back Home</a>
        </Link>
      </div>
    </div>
  );
};

export default Play;
