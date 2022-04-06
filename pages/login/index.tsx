import { useState } from "react";
import { Button, TextContainer } from "@/sharedComponents";
import { useSettingsContext } from "../settingsContext";
import { Block, ErrorMessage, Input } from "./components";
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
    <div className="flex flex-col gap-5">
      <Block>
        <>
          <TextContainer full>
            <text className="font-bold text-lg w-full text-center">
              Login anonymously
            </text>
          </TextContainer>
          <Button
            onClick={() =>
              setUser((oldUser) => ({
                ...oldUser,
                name: "Anonymous",
                loggedIn: true,
              }))
            }
          >
            <text className="w-fit">Stay Anonymous</text>
          </Button>
        </>
      </Block>
      <Block>
        <>
          <TextContainer full>
            <text className="font-bold text-lg w-full text-center">
              Login with existing user
            </text>
          </TextContainer>
          <div className="mx-2 p-1">
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
          </div>

          {loginMessage && <ErrorMessage message={loginMessage} />}
          <Button
            onClick={() => onLogIn(name, password, onSuccess, onLoginFail)}
          >
            <text>Log in</text>
          </Button>
        </>
      </Block>
      <Block>
        <>
          <TextContainer full>
            <text className="font-bold text-lg w-full text-center">
              Create new user
            </text>
          </TextContainer>
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
