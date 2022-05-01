import {
  GameOver,
  GuessDisplay,
  UserInput,
} from "pageSpecific/guess/components";
import {
  GuessProvider,
  useGuessContext,
} from "pageSpecific/guess/guessContext";
import { HomeButton } from "sharedComponents";

const GuessTheQuestion = () => {
  const { wasmLoaded, equation, gameStatus, guess, onButtonPress, onNewGame } =
    useGuessContext();

  if (!wasmLoaded || !equation) {
    return <div>Wasm is loading...</div>;
  }

  const gameIsPlaying = gameStatus === "playing";
  return (
    <div>
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
    </div>
  );
};

function GuessTheQuestionWithProvider() {
  return (
    <GuessProvider>
      <GuessTheQuestion />
    </GuessProvider>
  );
}

export default GuessTheQuestionWithProvider;
