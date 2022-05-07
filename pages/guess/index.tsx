import {
  GuessProvider,
  useGuessContext,
  GameOver,
  GuessDisplay,
  UserInput,
} from "pageSpecific/guess";
import { HomeButton } from "sharedComponents";

const GuessTheQuestion = () => {
  const { wasmLoaded, equation, gameStatus, guess, onButtonPress, onNewGame } =
    useGuessContext();

  if (!wasmLoaded || !equation) {
    return <div>Wasm is loading...</div>;
  }

  const gameIsPlaying = gameStatus === "playing";
  return (
    <>
      {gameIsPlaying && <GuessDisplay />}
      {!gameIsPlaying && <GameOver />}
      <UserInput
        gameOver={!gameIsPlaying}
        input={guess}
        answer={equation.answer}
        onButtonPress={onButtonPress}
        onNewGame={onNewGame}
      />
      <HomeButton />
    </>
  );
};

export default function GuessTheQuestionWithProvider() {
  return (
    <GuessProvider>
      <GuessTheQuestion />
    </GuessProvider>
  );
}
