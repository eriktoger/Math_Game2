import { initialGuessState, loss, playing, won } from "./constants";

export type GuessState = typeof initialGuessState;
export interface UserInputProps {
  gameOver: boolean;
  input: string;
  onButtonPress: (value: string) => void;
  onNewGame: () => void;
  answer: number;
}

export type GameStatus = typeof playing | typeof won | typeof loss;
