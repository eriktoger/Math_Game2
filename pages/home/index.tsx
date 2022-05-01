import type { NextPage } from "next";
import { useState } from "react";
import { useSettingsContext } from "contexts/settingsContext";
import {
  AdditionInputs,
  DivisionInputs,
  MultiplicationInputs,
  OperationButton,
  PlayButtons,
  SubtractionInputs,
} from "pageSpecific/home/components";
import { TextContainer } from "@/sharedComponents";

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
  const [currentOperation, setCurrentOperation] = useState(defaultOperation);

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
        <PlayButtons />
      </div>
    </>
  );
};

export default Home;
