import { TextContainer, Button } from "@/sharedComponents";
import { useGuessContext } from "./guessContext";
import { UserInputProps } from "./types";

const chars = [
  "1",
  "2",
  "3",
  "+",
  "4",
  "5",
  "6",
  "-",
  "7",
  "8",
  "9",
  "*",
  "0",
  "C",
  "=",
  "/",
];
const NumPad = ({ onClick }: { onClick: (value: string) => void }) => (
  <div className="grid grid-cols-4">
    {chars.map((char) => (
      <Button key={char} onClick={() => onClick(char)}>
        <span className="text-lg px-2">{char}</span>
      </Button>
    ))}
  </div>
);

export const UserInput = ({
  gameOver,
  input,
  onButtonPress,
  onNewGame,
  answer,
}: UserInputProps) => (
  <>
    {!gameOver && (
      <div className="flex flex-col ">
        <TextContainer>
          <div className="h-5 w-full text-center ">
            <span>{input} </span> = {answer}
          </div>
        </TextContainer>

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

export const GuessDisplay = () => {
  const { guesses, equationAsString } = useGuessContext();
  return (
    <div>
      {guesses.map((guess, i) => (
        <div key={i} className="m-2 flex flex-row gap-2 justify-center">
          {guess.split("").map((char, i) => {
            let color = "";
            if (equationAsString[i] === char) {
              color = "bg-green-500";
            } else if (equationAsString.includes(char)) {
              color = "bg-yellow-500";
            } else {
              color = "bg-gray-500";
            }

            return (
              <div
                key={i}
                className={`border-4 border-cyan-900 p-2 ${color} 
                      bg-opacity-70 h-10 w-10 flex justify-center items-center`}
              >
                {char}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const GameOver = () => {
  const { gameStatus, equationAsString } = useGuessContext();
  const message = gameStatus === "won" ? "You won!" : "You lost!";

  return (
    <div className="pt-10 flex flex-col justify-center">
      <TextContainer>
        <span>{message}</span>
      </TextContainer>
      <TextContainer>
        <span>Correct answer: {equationAsString}</span>
      </TextContainer>
    </div>
  );
};
