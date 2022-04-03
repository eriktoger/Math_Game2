import { LoginData } from "../api/types";

export const onLogIn = async (
  name: string,
  password: string,
  onSuccess: (newName: string, newLoggedIn: boolean) => void,
  onFail: (message: string) => void
) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    });
    const data = (await response.json()) as LoginData;
    const newName = data?.name;
    const newLoggedIn = data?.loggedIn;
    if (newName && newLoggedIn) {
      onSuccess(newName, newLoggedIn);
    } else if (data?.message) {
      onFail(data.message);
    }
  } catch (error) {
    onFail("Unknown error");
  }
};
