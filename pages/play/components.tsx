import { Button, TextContainer } from "@/sharedComponents";
import Link from "next/link";

interface ImageCointainerProps {
  revealOrder: number[];
  correctAnswers: number;
  children: JSX.Element | null;
}

export const ImageContainer = ({
  revealOrder,
  correctAnswers,
  children,
}: ImageCointainerProps) => (
  <div className="relative w-fit h-fit">
    <div className="absolute grid grid-cols-3 w-full h-full">
      {revealOrder.map((value) => {
        const hide = value >= correctAnswers;

        return (
          <div
            key={value}
            className={`bg-black z-10 transition-opacity duration-1000 ease-in-out ${
              hide ? "opacity-100" : "opacity-0"
            }`}
          />
        );
      })}
    </div>
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
            type="number"
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
    <Button>
      <Link href="/home">
        <a>Back Home</a>
      </Link>
    </Button>
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
