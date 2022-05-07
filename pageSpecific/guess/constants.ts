import { Equation } from "types";
import { GameStatus } from "./types";

export const playing = "playing";
export const won = "won";
export const loss = "loss";

export const chars = [
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

export const initialGuessState = {
  wasmLoaded: false,
  equation: null as Equation | null,
  gameStatus: playing as GameStatus,
  guess: "",
  guesses: [] as string[],
  equationAsString: "string",
  onButtonPress: (char: string) => {},
  onNewGame: () => {},
};
export const numberOfGuesses = 5 as const;
