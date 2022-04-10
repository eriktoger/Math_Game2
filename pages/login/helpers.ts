import { Settings } from "pages/types";
import { LoginData } from "../api/types";

const genericAuthFetch = async (
  onSuccess: (
    newName: string,
    newLoggedIn: boolean,
    token: string,
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
    const { status } = response;
    const data = (await response.json()) as LoginData;
    const { name, loggedIn, settings, token, message } = data;
    if (status === 200 && name && loggedIn && token) {
      onSuccess(name, loggedIn, token, settings);
      return;
    }

    if (message) {
      onFail(message);
    } else {
      onFail("Unknown error");
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
    token: string,
    settings?: Settings
  ) => void,
  onFail: (message: string) => void
) =>
  genericAuthFetch(onSuccess, onFail, "POST", "/api/login", { name, password });

export const createUser = async (
  name: string,
  password: string,
  onSuccess: (newName: string, newLoggedIn: boolean, token: string) => void,
  onFail: (message: string) => void
) =>
  genericAuthFetch(onSuccess, onFail, "POST", "/api/createUser", {
    name,
    password,
  });
