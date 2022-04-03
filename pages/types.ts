import { Dispatch, SetStateAction } from "react";

export type Operation = {
  enabled: boolean;
  firstStart: number;
  firstEnd: number;
  secondStart: number;
  secondEnd: number;
};

export type OperationKeys = keyof Operation;

export type User = {
  name: string;
};

export type SettingsState = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  addition: Operation;
  setAddition: Dispatch<SetStateAction<Operation>>;
  multiplication: Operation;
  setMultiplication: Dispatch<SetStateAction<Operation>>;
};

export type Equation = {
  first: Number;
  second: Number;
  operator: "+";
  answer: Number;
};
