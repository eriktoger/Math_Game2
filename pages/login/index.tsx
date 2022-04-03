import { useState } from "react";
import { useSettingsContext } from "../settingsContext";
import { Button, Input } from "./components";
import { onLogIn } from "./helpers";

export default function Login() {
  const { setUser } = useSettingsContext();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const onSuccess = (newName: string, newLoggedIn: boolean) =>
    setUser((oldUser) => ({
      ...oldUser,
      name: newName,
      loggedIn: newLoggedIn,
    }));
  const onFail = (message: string) => setMessage(message);

  return (
    <div className="flex flex-col p-5 items-center">
      <span>Either login and continue anonymously</span>
      <Button
        title="Stay Anonymous"
        onClick={() =>
          setUser((oldUser) => ({
            ...oldUser,
            name: "Anonymous",
            loggedIn: true,
          }))
        }
      />

      <Input
        title="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Input
        title="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {message && <div>{message}</div>}
      <Button
        title="Log in"
        onClick={() => onLogIn(name, password, onSuccess, onFail)}
      />
    </div>
  );
}
