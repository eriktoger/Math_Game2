import { Equation } from "types";

export const initialGuessState = {
  wasmLoaded: false,
  equation: null as Equation | null,
  gameStatus: "",
  guess: "",
  guesses: [] as string[],
  equationAsString: "string",
  onButtonPress: (char: string) => {},
  onNewGame: () => {},
};
export const numberOfGuesses = 5 as const;
