import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useSettingsContext } from "../settingsContext";
import { Operation } from "../types";

const generateOperationChangeHandler =
  (setter: Dispatch<SetStateAction<Operation>>, field: keyof Operation) =>
  (event: ChangeEvent<HTMLInputElement>) =>
    setter((oldAddition) => ({
      ...oldAddition,
      [field]: Number(event.target.value.replace(/[^0-9]/g, "")),
    }));

type NumberInputProps = {
  value: number;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};

const NumberInput = ({ value, changeHandler }: NumberInputProps) => (
  <input
    className="mx-2"
    type="number"
    value={value}
    onChange={changeHandler}
    size={5}
  />
);

//make a generall one and craete 4 special ones?
const OperationInputs = ({
  operation,
  setOperation,
  title,
  exampleText,
}: {
  operation: Operation;
  setOperation: Dispatch<SetStateAction<Operation>>;
  title: string;
  exampleText: string;
}) => (
  <>
    <div>
      <input
        type="checkbox"
        id="scales"
        name="scales"
        checked={operation.enabled}
        onChange={() =>
          setOperation((oldOperation) => ({
            ...oldOperation,
            enabled: !oldOperation.enabled,
          }))
        }
      />
      <label htmlFor="scales">Enable {title}</label>
    </div>
    <span>{exampleText}</span>

    <div>
      A) Start:
      <NumberInput
        value={operation.firstStart}
        changeHandler={generateOperationChangeHandler(
          setOperation,
          "firstStart"
        )}
      />
      End:
      <NumberInput
        value={operation.firstEnd}
        changeHandler={generateOperationChangeHandler(setOperation, "firstEnd")}
      />
    </div>
    <div>
      B) Start:
      <NumberInput
        value={operation.secondStart}
        changeHandler={generateOperationChangeHandler(
          setOperation,
          "secondStart"
        )}
      />
      End:
      <NumberInput
        value={operation.secondEnd}
        changeHandler={generateOperationChangeHandler(
          setOperation,
          "secondEnd"
        )}
      />
    </div>
  </>
);

export const AdditionInputs = () => {
  const { addition, setAddition } = useSettingsContext();
  return (
    <OperationInputs
      operation={addition}
      setOperation={setAddition}
      title="Addition"
      exampleText="Example: A + B ="
    />
  );
};

export const MultiplicationInputs = () => {
  const { multiplication, setMultiplication } = useSettingsContext();
  return (
    <OperationInputs
      operation={multiplication}
      setOperation={setMultiplication}
      title="Multiplication"
      exampleText="Example: A * B ="
    />
  );
};

export const OperationButton = ({
  operation,
  onClick,
  enabled,
}: {
  operation: string;
  onClick: () => void;
  enabled: boolean;
}) => (
  <button onClick={onClick} className="p-1 border-2 rounded bg-gray-400 ">
    <span className={enabled ? "" : "line-through"}>{operation}</span>
  </button>
);