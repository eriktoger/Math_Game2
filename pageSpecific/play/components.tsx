import { Button, TextContainer } from "@/sharedComponents";
import Link from "next/link";
import Image from "next/image";
import { generateJigsawPieces } from "./helpers";
interface ImageCointainerProps {
  children: JSX.Element | null;
}

export const ImageContainer = ({ children }: ImageCointainerProps) => (
  <div className="relative w-fit h-fit ">
    <div className="absolute grid grid-cols-3 w-full h-full "></div>
    {children}
  </div>
);

interface UserInputProps {
  gameOver: boolean;
  equationAsString: string;
  answer: string;
  onButtonPress: (value: string) => void;
  onNewGame: () => void;
}

const chars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "C", "="];
const NumPad = ({ onClick }: { onClick: (value: string) => void }) => (
  <div className="grid grid-cols-3">
    {chars.map((char) => (
      <Button key={char} onClick={() => onClick(char)}>
        <span className="text-lg px-2">{char}</span>
      </Button>
    ))}
  </div>
);

export const UserInput = ({
  gameOver,
  equationAsString,
  answer,
  onButtonPress,
  onNewGame,
}: UserInputProps) => (
  <>
    {!gameOver && (
      <div className="flex ">
        <div className="flex flex-col justify-center">
          <>
            <TextContainer>
              <span className="w-20">{equationAsString}</span>
            </TextContainer>
            <TextContainer>
              <span className="h-5 w-20">{answer} </span>
            </TextContainer>
          </>
        </div>
        <NumPad onClick={onButtonPress} />
      </div>
    )}
    {gameOver && (
      <div className="flex justify-center">
        <Button onClick={onNewGame}>Play again?</Button>
      </div>
    )}
  </>
);

export const AnswerStats = ({
  correct,
  wrong,
}: {
  correct: number;
  wrong: number;
}) => (
  <TextContainer>
    <div className="flex gap-2">
      <span>Correct answers: {correct}</span>
      <span>Wrong answers: {wrong}</span>
    </div>
  </TextContainer>
);

export const Jigsaw = ({
  imageWidth,
  imageHeight,
  revealOrder,
  correctAnswers,
}: {
  imageWidth: number;
  imageHeight: number;
  revealOrder: number[];
  correctAnswers: number;
}) => {
  const settings = generateJigsawPieces(imageWidth, imageHeight);
  const displayLimit = correctAnswers * 3;

  return (
    <>
      {settings.map(({ alt, style, src, width, height }, i) => {
        const revealStyle =
          revealOrder[i] < displayLimit ? "opacity-0" : "opacity-100";

        return (
          <div
            key={alt}
            className={`absolute z-10 ${revealStyle} transition-opacity duration-1000 ease-in-out`}
            style={{ ...style }}
          >
            <Image src={src} alt={alt} width={width} height={height} />
          </div>
        );
      })}
    </>
  );
};
