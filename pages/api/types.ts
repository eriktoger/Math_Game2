import { Settings } from "pages/types";

export type LoginData = {
  name?: string;
  message?: string;
  loggedIn?: boolean;
  settings?: Settings;
  token?: string;
};
