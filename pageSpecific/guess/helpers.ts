import { Equation } from "types";

export const equationToString = (equation: Equation | null) => {
  if (!equation) return "";
  const { first, second, operator } = equation;
  return `${first}${operator}${second}`;
};

export const operationFound = (guess: string) =>
  guess.includes("+") ||
  guess.includes("-") ||
  guess.includes("*") ||
  guess.includes("/");
