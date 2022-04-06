import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSettingsContext } from "../settingsContext";
import { Equation } from "../types";
import { Button, TextContainer } from "@/sharedComponents";
import { useWasm } from "./hooks";
import { getRandomImage } from "./helpers";
import { ImageContainer } from "./components";

const Play: NextPage = () => {
  const { addition, multiplication } = useSettingsContext();
  const [answer, setAnswer] = useState<number | null>(null);
  const [equation, setEquation] = useState<Equation | null>(null);
  const [ImageComponent, setImageComponent] = useState<JSX.Element | null>(
    null
  );
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const { wasmLoaded, generateEquation, revealOrder } = useWasm(
    addition,
    multiplication
  );

  useEffect(() => {
    if (wasmLoaded && !equation) {
      setEquation(generateEquation(addition, multiplication));
      setImageComponent(getRandomImage());
    }
  }, [addition, equation, generateEquation, multiplication, wasmLoaded]);

  if (!wasmLoaded) {
    return <div>Wasm is loading...</div>;
  }

  const gameOver = correctAnswers === 9;
  const equationAsString = `${equation?.first} ${equation?.operator} ${equation?.second} = `;
  return (
    <>
      <TextContainer>
        <h1 className="text-3xl font-bold">Playing</h1>
      </TextContainer>
      {!gameOver && (
        <div className="flex my-2 h-160 gap-2">
          <TextContainer>
            <text>{equationAsString}</text>
          </TextContainer>
          <input
            className="my-2 p-2"
            size={1}
            value={answer ?? ""}
            type="number"
            onChange={(event) =>
              setAnswer(Number(event.target.value.replace(/[^0-9]/g, "")))
            }
          />
          <Button
            onClick={() => {
              if (answer === equation?.answer) {
                setCorrectAnswers((value) => value + 1);
                const newEquation = generateEquation(addition, multiplication);
                setEquation(newEquation);
                setAnswer(null);
              } else {
                setWrongAnswers((value) => value + 1);
              }
            }}
            title="Send"
          />
        </div>
      )}
      {gameOver && (
        <div className="m-2 p-2 h-14">
          <Button
            onClick={() => {
              setCorrectAnswers(0);
              setWrongAnswers(0);
              setEquation(generateEquation(addition, multiplication));
              setImageComponent(getRandomImage());
            }}
          >
            Play again?
          </Button>
        </div>
      )}
      <ImageContainer revealOrder={revealOrder} correctAnswers={correctAnswers}>
        {ImageComponent}
      </ImageContainer>

      <TextContainer>
        <>
          <span>Correct answers: {correctAnswers}</span>
          <span>Wrong answers: {wrongAnswers}</span>
        </>
      </TextContainer>

      <Button>
        <Link href="/home">
          <a>Back Home</a>
        </Link>
      </Button>
    </>
  );
};

export default Play;
