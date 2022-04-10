import { Dispatch, SetStateAction } from "react";

export type Operation = {
  enabled: boolean;
  firstStart: number;
  firstEnd: number;
  secondStart: number;
  secondEnd: number;
  usingTables: boolean;
  tables: number[];
};

export type Settings = {
  addition: Operation;
  subtraction: Operation;
  multiplication: Operation;
  division: Operation;
};

export type OperationKeys = keyof Operation;

export type User = {
  name: string;
  loggedIn: boolean;
};

export type SettingsState = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  addition: Operation;
  setAddition: Dispatch<SetStateAction<Operation>>;
  subtraction: Operation;
  setSubtraction: Dispatch<SetStateAction<Operation>>;
  multiplication: Operation;
  setMultiplication: Dispatch<SetStateAction<Operation>>;
  division: Operation;
  setDivision: Dispatch<SetStateAction<Operation>>;
  setSettings: (settings: Settings) => void;
};

export type Equation = {
  first: Number;
  second: Number;
  operator: "+";
  answer: Number;
};
