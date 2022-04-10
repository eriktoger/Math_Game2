import { Operation, User } from "./types";

export const initialOperation = {
  enabled: true,
  firstStart: 1,
  firstEnd: 10,
  secondStart: 1,
  secondEnd: 10,
  usingTables: true,
  tables: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
} as Operation;

export const initialUser = {
  name: "Player",
  loggedIn: false,
  token: "",
} as User;
