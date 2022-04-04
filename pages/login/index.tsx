import { useState } from "react";
import { useSettingsContext } from "../settingsContext";
import { Button, Input } from "./components";
import { createUser, onLogIn } from "./helpers";

export default function Login() {
  const { setUser } = useSettingsContext();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [createUserMessage, setCreateUserMessage] = useState("");

  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const onSuccess = (newName: string, newLoggedIn: boolean) =>
    setUser((oldUser) => ({
      ...oldUser,
      name: newName,
      loggedIn: newLoggedIn,
    }));
  const onLoginFail = (message: string) => setLoginMessage(message);
  const onCreateUserFail = (message: string) => setCreateUserMessage(message);

  return (
    <div className="flex flex-col p-5 items-center ">
      <span className="font-bold text-lg">Login anonymously</span>
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
      <span>Login with existing user</span>
      <Input
        title="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Input
        isPassword
        title="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {loginMessage && <div className="text-red-500">{loginMessage}</div>}
      <Button
        title="Log in"
        onClick={() => onLogIn(name, password, onSuccess, onLoginFail)}
      />
      <span>Create new user</span>
      <Input
        title="Name"
        value={newName}
        onChange={(event) => setNewName(event.target.value)}
      />
      <Input
        isPassword
        title="Password"
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
      />
      <Input
        isPassword
        title="Password again"
        value={newPassword2}
        onChange={(event) => setNewPassword2(event.target.value)}
      />
      {createUserMessage && (
        <div className="text-red-500">{createUserMessage}</div>
      )}
      <Button
        disabled={newName === "" || newPassword !== newPassword2}
        title="Create User"
        onClick={() =>
          createUser(newName, newPassword, onSuccess, onCreateUserFail)
        }
      />
    </div>
  );
}
