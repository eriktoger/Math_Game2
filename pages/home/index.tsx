import Link from "next/link";
import type { NextPage } from "next";
import { useState } from "react";
import { useSettingsContext } from "../settingsContext";
import {
  AdditionInputs,
  MultiplicationInputs,
  OperationButton,
} from "./components";
import { Button, TextContainer } from "@/sharedComponents";

const Home: NextPage = () => {
  const { user, addition, multiplication } = useSettingsContext();
  const [currentOperation, setCurrentOperation] = useState("Addition");
  const operationEnabled = addition.enabled || multiplication.enabled;
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

        {/* eslint-disable-next-line @next/next/link-passhref */}
        <Button>
          <Link href={operationEnabled ? "/play" : ""}>
            <a>
              {operationEnabled
                ? "Play"
                : "Enable an operation to start playing"}
            </a>
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Home;
