import { useState } from "react";
import Router from "next/router";
import { Button, TextContainer } from "@/sharedComponents";
import { useSettingsContext } from "../settingsContext";
import { Block, ErrorMessage, Input } from "./components";
import { createUser, onLogIn } from "./helpers";
import { useWindowDimensions } from "sharedHooks";
import { Settings } from "pages/types";

export default function Login() {
  const { setUser, setSettings } = useSettingsContext();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [createUserMessage, setCreateUserMessage] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const onSuccess = (
    name: string,
    loggedIn: boolean,
    token = "",
    settings?: Settings
  ) => {
    if (settings) {
      setSettings(settings);
    }
    setUser((oldUser) => ({
      ...oldUser,
      name,
      loggedIn,
      token,
    }));
    Router.push("/home");
  };
  const onLoginFail = (message: string) => setLoginMessage(message);
  const onCreateUserFail = (message: string) => setCreateUserMessage(message);
  const { isLandscape } = useWindowDimensions();

  return (
    <div className={`grid  ${isLandscape ? "grid-cols-3" : "grid-cols-1"}`}>
      <Block>
        <>
          <TextContainer full>
            <span className="font-bold text-lg w-full text-center">
              Login anonymously
            </span>
          </TextContainer>
          <Button
            onClick={() => {
              setUser((oldUser) => ({
                ...oldUser,
                name: "Anonymous",
                loggedIn: true,
              }));
              Router.push("/home");
            }}
          >
            <span className="w-fit">Stay Anonymous</span>
          </Button>
        </>
      </Block>
      <Block>
        <>
          <TextContainer full>
            <span className="font-bold text-lg w-full text-center">
              Login with existing user
            </span>
          </TextContainer>
          <div className="flex flex-col mx-2 p-1">
            <Input
              title="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              type="password"
              title="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {loginMessage && <ErrorMessage message={loginMessage} />}
          <Button
            onClick={() => onLogIn(name, password, onSuccess, onLoginFail)}
          >
            <span>Log in</span>
          </Button>
        </>
      </Block>
      <Block>
        <>
          <TextContainer full={!isLandscape}>
            <span className="font-bold text-lg w-full text-center">
              Create new user
            </span>
          </TextContainer>
          <Input
            title="Name"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
          <Input
            type="password"
            title="Password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <Input
            type="password"
            title="Password again"
            value={newPassword2}
            onChange={(event) => setNewPassword2(event.target.value)}
          />
          {createUserMessage && <ErrorMessage message={createUserMessage} />}
          <Button
            disabled={newName === "" || newPassword !== newPassword2}
            title="Create User"
            onClick={() =>
              createUser(newName, newPassword, onSuccess, onCreateUserFail)
            }
          />
        </>
      </Block>
    </div>
  );
}
