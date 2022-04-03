import Link from "next/link";
import type { NextPage } from "next";
import { useState } from "react";
import { useSettingsContext } from "../settingsContext";
import {
  AdditionInputs,
  MultiplicationInputs,
  OperationButton,
} from "./components";

const Home: NextPage = () => {
  const { user, addition, multiplication, setUser } = useSettingsContext();
  const [changeName, setChangeName] = useState(false);
  const [currentName, setCurrentName] = useState(user.name);
  const [currentOperation, setCurrentOperation] = useState("Addition");
  const operationEnabled = addition.enabled || multiplication.enabled;
  return (
    <>
      <h1 className="text-3xl font-bold mx-2">Hello: {user.name} </h1>
      <button
        className="mx-2"
        onClick={() => {
          if (changeName) {
            setUser((oldUser) => ({ ...oldUser, name: currentName }));
            setChangeName(false);
          } else {
            setChangeName(true);
          }
        }}
      >
        {changeName ? "Save name: " : "Change name: "}
      </button>

      {changeName && (
        <input
          value={currentName}
          onChange={(event) => {
            event.preventDefault();
            setCurrentName(event.target.value);
          }}
        />
      )}
      <div className="flex flex-col bg-slate-300 m-2 p-2 rounded-md">
        <div className="grid grid-cols-2">
          <OperationButton
            operation="Addition"
            onClick={() => setCurrentOperation("Addition")}
            enabled={addition.enabled}
          />
          <OperationButton
            operation="Subtraction"
            onClick={() => setCurrentOperation("Subtraction")}
            enabled={false}
          />
          <OperationButton
            operation="Multiplication"
            onClick={() => setCurrentOperation("Multiplication")}
            enabled={multiplication.enabled}
          />
          <OperationButton
            operation="Division"
            onClick={() => setCurrentOperation("Division")}
            enabled={false}
          />
        </div>
        {currentOperation === "Addition" && <AdditionInputs />}
        {currentOperation === "Multiplication" && <MultiplicationInputs />}

        <Link href={operationEnabled ? "/play" : ""}>
          <a>
            {operationEnabled ? "Play" : "Enable an operation to start playing"}
          </a>
        </Link>
      </div>
    </>
  );
};

export default Home;
