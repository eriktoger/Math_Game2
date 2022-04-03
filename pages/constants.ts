import { Operation, User } from "./types";

export const initialOperation = {
  enabled: true,
  firstStart: 1,
  firstEnd: 10,
  secondStart: 1,
  secondEnd: 10,
} as Operation;

export const initialUser = {
  name: "Player",
  loggedIn: false,
} as User;
