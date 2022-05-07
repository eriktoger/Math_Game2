import { useSettingsContext } from "contexts";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWasm } from "sharedHooks";
import { Equation } from "types";
import {
  initialGuessState,
  loss,
  numberOfGuesses,
  playing,
  won,
} from "./constants";
import { equationToString, operationFound } from "./helpers";
import { GameStatus, GuessState } from "./types";

const useGuessState = (): GuessState => {
  const [equation, setEquation] = useState<Equation | null>(null);
  const [guess, setGuess] = useState("");
  const [guessCounter, setGuessCounter] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(playing);
  const { wasmLoaded, generateEquation } = useWasm();
  const { addition, multiplication, subtraction, division } =
    useSettingsContext();

  const equationAsString = equationToString(equation);
  const onAnswerSubmit = () => {
    if (guess === equationAsString) {
      setGameStatus(won);
      return;
    } else if (guessCounter === numberOfGuesses - 1) {
      setGameStatus(loss);
      return;
    }

    setGuesses((prev) => {
      const next = [...prev];
      next[guessCounter] = guess;
      return next;
    });

    setGuessCounter((prev) => prev + 1);
    setGuess("");
  };

  const onButtonPress = (value: string) => {
    const hitMaxLength = guess.length === equationAsString.length;

    switch (value) {
      case "=":
        hitMaxLength && onAnswerSubmit();
        break;
      case "C":
        setGuess((prev) => prev.slice(0, -1));
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        if (operationFound(guess) || hitMaxLength) {
          break;
        }
        setGuess((prev) => prev + value);
        break;
      default:
        if (hitMaxLength) {
          break;
        }
        setGuess((prev) => prev + value);
    }
  };

  const onNewGame = useCallback(() => {
    if (wasmLoaded) {
      const newEquation = generateEquation(
        addition,
        multiplication,
        subtraction,
        division
      );
      const size = equationToString(newEquation).length;

      const emptyGuesses = new Array(numberOfGuesses).fill(
        " ".repeat(size)
      ) as string[];
      setGuesses(emptyGuesses);
      setEquation(newEquation);
      setGameStatus(playing);
      setGuess("");
      setGuessCounter(0);
    }
  }, [
    addition,
    division,
    generateEquation,
    multiplication,
    subtraction,
    wasmLoaded,
  ]);

  useEffect(() => {
    onNewGame();
  }, [onNewGame]);

  return {
    wasmLoaded,
    equation,
    gameStatus,
    guess,
    guesses,
    equationAsString,
    onButtonPress,
    onNewGame,
  };
};

const GuessContext = createContext(initialGuessState);

export const GuessProvider = ({ children }: { children: JSX.Element }) => (
  <GuessContext.Provider value={useGuessState()}>
    {children}
  </GuessContext.Provider>
);

export const useGuessContext = () => useContext(GuessContext);
