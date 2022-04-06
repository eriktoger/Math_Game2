import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSettingsContext } from "../settingsContext";
import { Equation } from "../types";
import { useResizeImage, useWasm } from "./hooks";
import { getRandomImage } from "./helpers";
import {
  AnswerStats,
  HomeButton,
  ImageContainer,
  Title,
  UserInput,
} from "./components";
import { useWindowDimensions } from "sharedHooks";
import { StaticImageData } from "next/image";

const Play: NextPage = () => {
  const [answer, setAnswer] = useState<number | null>(null);
  const [equation, setEquation] = useState<Equation | null>(null);
  const [image, setImage] = useState<StaticImageData | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const { addition, multiplication } = useSettingsContext();
  const { wasmLoaded, generateEquation, revealOrder } = useWasm(
    addition,
    multiplication
  );
  const { isLandscape } = useWindowDimensions();
  const { imageHeight, imageWidth } = useResizeImage(image);

  useEffect(() => {
    if (wasmLoaded && !equation) {
      setEquation(generateEquation(addition, multiplication));
      setImage(getRandomImage());
    }
  }, [addition, equation, generateEquation, multiplication, wasmLoaded]);

  if (!wasmLoaded) {
    return <div>Wasm is loading...</div>;
  }

  const gameOver = correctAnswers === 9;
  const equationAsString = `${equation?.first} ${equation?.operator} ${equation?.second} = `;

  const onAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAnswer(Number(event.target.value.replace(/[^0-9]/g, "")));

  const onAnswerSubmit = () => {
    if (answer === equation?.answer) {
      setCorrectAnswers((value) => value + 1);
      const newEquation = generateEquation(addition, multiplication);
      setEquation(newEquation);
      setAnswer(null);
    } else {
      setWrongAnswers((value) => value + 1);
    }
  };

  const onNewGame = () => {
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setEquation(generateEquation(addition, multiplication));
    setImage(getRandomImage());
  };

  if (isLandscape) {
    return (
      <div className="flex h-screen">
        <div className="flex flex-col justify-center">
          <Title />
          <UserInput
            gameOver={gameOver}
            equationAsString={equationAsString}
            answer={answer}
            onAnswerChange={onAnswerChange}
            onAnswerSubmit={onAnswerSubmit}
            onNewGame={onNewGame}
          />
          <AnswerStats correct={correctAnswers} wrong={wrongAnswers} />
          <HomeButton />
        </div>
        <div className="flex items-center">
          <ImageContainer
            revealOrder={revealOrder}
            correctAnswers={correctAnswers}
          >
            {image && (
              <Image
                src={image}
                alt="image"
                height={imageHeight}
                width={imageWidth}
              />
            )}
          </ImageContainer>
        </div>
      </div>
    );
  }

  return (
    <>
      <Title />
      <UserInput
        gameOver={gameOver}
        equationAsString={equationAsString}
        answer={answer ?? 0}
        onAnswerChange={onAnswerChange}
        onAnswerSubmit={onAnswerSubmit}
        onNewGame={onNewGame}
      />
      <ImageContainer revealOrder={revealOrder} correctAnswers={correctAnswers}>
        {image && (
          <Image
            src={image}
            alt="image"
            height={imageHeight}
            width={imageWidth}
          />
        )}
      </ImageContainer>
      <AnswerStats correct={correctAnswers} wrong={wrongAnswers} />
      <HomeButton />
    </>
  );
};

export default Play;
