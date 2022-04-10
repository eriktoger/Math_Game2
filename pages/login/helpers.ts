import { Settings } from "pages/types";
import { LoginData } from "../api/types";

export const genericFetch = async (
  onSuccess: (
    newName: string,
    newLoggedIn: boolean,
    settings?: Settings
  ) => void,
  onFail: (message: string) => void,
  method: string,
  url: string,
  body: object
) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = (await response.json()) as LoginData;
    const newName = data?.name;
    const newLoggedIn = data?.loggedIn;
    const settings = data?.settings;
    if (newName && newLoggedIn) {
      onSuccess(newName, newLoggedIn, settings);
    } else if (data?.message) {
      onFail(data.message);
    }
  } catch (error) {
    onFail("Unknown error");
  }
};

export const onLogIn = async (
  name: string,
  password: string,
  onSuccess: (
    newName: string,
    newLoggedIn: boolean,
    settings?: Settings
  ) => void,
  onFail: (message: string) => void
) => genericFetch(onSuccess, onFail, "POST", "/api/login", { name, password });

export const createUser = async (
  name: string,
  password: string,
  onSuccess: (newName: string, newLoggedIn: boolean) => void,
  onFail: (message: string) => void
) =>
  genericFetch(onSuccess, onFail, "POST", "/api/createUser", {
    name,
    password,
  });
