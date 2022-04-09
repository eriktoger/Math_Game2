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

export const Title = () => (
  <TextContainer>
    <h1 className="text-3xl font-bold">Playing</h1>
  </TextContainer>
);

interface UserInputProps {
  gameOver: boolean;
  equationAsString: string;
  answer: number | null;
  onAnswerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAnswerSubmit: () => void;
  onNewGame: () => void;
}

export const UserInput = ({
  gameOver,
  equationAsString,
  answer,
  onAnswerChange,
  onAnswerSubmit,
  onNewGame,
}: UserInputProps) => (
  <>
    {!gameOver && (
      <div className="flex flex-col my-2 h-160 gap-2">
        <div className="flex justify-center">
          <TextContainer>
            <span>{equationAsString}</span>
          </TextContainer>
          <input
            className="my-2 p-2"
            size={1}
            value={answer ?? ""}
            type="tel"
            onChange={onAnswerChange}
          />
        </div>
        <div className="flex justify-center">
          <Button onClick={onAnswerSubmit} title="Send" />
        </div>
      </div>
    )}
    {gameOver && (
      <div className="flex justify-center">
        <Button onClick={onNewGame}>Play again?</Button>
      </div>
    )}
  </>
);

export const HomeButton = () => (
  <div className="flex justify-center">
    <Link href="/home">
      <a>
        <Button>Back Home</Button>
      </a>
    </Link>
  </div>
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
