import Link from "next/link";
import type { NextPage } from "next";
import { useState } from "react";
import { useSettingsContext } from "../settingsContext";
import {
  AdditionInputs,
  DivisionInputs,
  MultiplicationInputs,
  OperationButton,
  SubtractionInputs,
} from "./components";
import { Button, TextContainer } from "@/sharedComponents";
import { saveSettings } from "./helpers";

const Home: NextPage = () => {
  const { user, addition, subtraction, multiplication, division } =
    useSettingsContext();
  const defaultOperation = (() => {
    if (subtraction.enabled) {
      return "Subtraction";
    } else if (multiplication.enabled) {
      return "Multiplication";
    } else if (division.enabled) {
      return "Division";
    }
    return "Addition";
  })();
  console.log(defaultOperation);
  const [currentOperation, setCurrentOperation] = useState(defaultOperation);
  const operationEnabled =
    addition.enabled ||
    multiplication.enabled ||
    subtraction.enabled ||
    division.enabled;
  return (
    <>
      <TextContainer>
        <h1 className="text-3xl font-bold mx-2 py-2 w-fit">
          Hello! {user.name}
        </h1>
      </TextContainer>
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
            enabled={subtraction.enabled}
          />
          <OperationButton
            operation="Multiplication"
            onClick={() => setCurrentOperation("Multiplication")}
            enabled={multiplication.enabled}
          />
          <OperationButton
            operation="Division"
            onClick={() => setCurrentOperation("Division")}
            enabled={division.enabled}
          />
        </div>
        {currentOperation === "Addition" && <AdditionInputs />}
        {currentOperation === "Multiplication" && <MultiplicationInputs />}
        {currentOperation === "Subtraction" && <SubtractionInputs />}
        {currentOperation === "Division" && <DivisionInputs />}
        <div className="flex justify-center">
          <Link href={operationEnabled ? "/play" : ""}>
            <a
              onClick={() =>
                saveSettings({
                  user,
                  settings: {
                    addition,
                    subtraction,
                    multiplication,
                    division,
                  },
                })
              }
            >
              <Button disabled={!operationEnabled}>
                {operationEnabled
                  ? "Play"
                  : "Enable an operation to start playing"}
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
