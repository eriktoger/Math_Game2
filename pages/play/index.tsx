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
  Jigsaw,
  UserInput,
} from "./components";
import { useWindowDimensions } from "sharedHooks";
import { StaticImageData } from "next/image";

const Play: NextPage = () => {
  const [answer, setAnswer] = useState("");
  const [equation, setEquation] = useState<Equation | null>(null);
  const [image, setImage] = useState<StaticImageData | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const { addition, multiplication, subtraction, division } =
    useSettingsContext();
  const { wasmLoaded, generateEquation, revealOrder } = useWasm();
  const { isLandscape } = useWindowDimensions();
  const { imageHeight, imageWidth } = useResizeImage(image);

  useEffect(() => {
    if (wasmLoaded && !equation) {
      setEquation(
        generateEquation(addition, multiplication, subtraction, division)
      );
      setImage(getRandomImage());
    }
  }, [
    addition,
    division,
    equation,
    generateEquation,
    multiplication,
    subtraction,
    wasmLoaded,
  ]);

  if (!wasmLoaded || !imageWidth) {
    return <div>Wasm is loading...</div>;
  }

  const gameOver = correctAnswers === 8;
  const equationAsString = `${equation?.first} ${equation?.operator} ${equation?.second} = `;
  const onAnswerSubmit = () => {
    if (Number(answer) === equation?.answer) {
      setCorrectAnswers((value) => value + 1);
      const newEquation = generateEquation(
        addition,
        multiplication,
        subtraction,
        division
      );
      setEquation(newEquation);
      setAnswer("");
    } else {
      setWrongAnswers((value) => value + 1);
    }
  };

  const onButtonPress = (value: string) => {
    switch (value) {
      case "=":
        onAnswerSubmit();
        break;
      case "C":
        setAnswer((prev) => prev.slice(0, -1));
        break;
      default:
        setAnswer((prev) =>
          (prev + value).slice(
            0,
            (equation?.answer ?? "").toString().length + 1
          )
        );
    }
  };

  const onNewGame = () => {
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setEquation(
      generateEquation(addition, multiplication, subtraction, division)
    );
    setImage(getRandomImage());
  };

  if (isLandscape) {
    return (
      <div className="flex h-screen">
        <div className="flex flex-col justify-center">
          <UserInput
            gameOver={gameOver}
            equationAsString={equationAsString}
            answer={answer}
            onButtonPress={onButtonPress}
            onNewGame={onNewGame}
          />
          <AnswerStats correct={correctAnswers} wrong={wrongAnswers} />
          <HomeButton />
        </div>
        <div className="flex items-center ">
          <ImageContainer>
            <>
              {image && (
                <Image
                  src={image}
                  alt="image"
                  height={imageHeight}
                  width={imageWidth}
                />
              )}
              <Jigsaw
                revealOrder={revealOrder}
                correctAnswers={correctAnswers}
                imageHeight={imageHeight}
                imageWidth={imageWidth}
              />
            </>
          </ImageContainer>
        </div>
      </div>
    );
  }

  return (
    <>
      <UserInput
        gameOver={gameOver}
        equationAsString={equationAsString}
        answer={answer}
        onButtonPress={onButtonPress}
        onNewGame={onNewGame}
      />
      <ImageContainer>
        <>
          {image && (
            <Image
              src={image}
              alt="image"
              height={imageHeight}
              width={imageWidth}
            />
          )}
          <Jigsaw
            revealOrder={revealOrder}
            correctAnswers={correctAnswers}
            imageHeight={imageHeight}
            imageWidth={imageWidth}
          />
        </>
      </ImageContainer>
      <AnswerStats correct={correctAnswers} wrong={wrongAnswers} />
      <HomeButton />
    </>
  );
};

export default Play;
