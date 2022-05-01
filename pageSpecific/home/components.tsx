import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useSettingsContext } from "contexts/settingsContext";
import { Operation } from "types";
import { tables } from "./constants";
import Link from "next/link";
import { saveSettings } from "./helpers";
import { Button } from "@/sharedComponents";

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
    type="tel"
    value={value}
    onChange={changeHandler}
    size={1}
  />
);

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
}) => {
  const tablesAllowed = title === "Multiplication" || title === "Division";
  const showTables = tablesAllowed && operation.usingTables;
  return (
    <>
      <div className="mx-2 p-1">
        <input
          type="checkbox"
          id="enableOperation"
          name="enableOperation"
          checked={operation.enabled}
          onChange={() =>
            setOperation((oldOperation) => ({
              ...oldOperation,
              enabled: !oldOperation.enabled,
            }))
          }
        />
        <label htmlFor="enableOperation">Enable {title}</label>
        {tablesAllowed && (
          <>
            <input
              className="ml-2"
              type="checkbox"
              id="enableTables"
              name="enableTables"
              checked={operation.usingTables}
              onChange={() =>
                setOperation((prev) => ({
                  ...prev,
                  usingTables: !prev.usingTables,
                }))
              }
            />
            <label htmlFor="enableTables">Tables</label>
          </>
        )}
      </div>
      {!showTables && (
        <>
          <span className="mx-2 p-1">{exampleText}</span>
          <div className="mx-2 p-1">
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
              changeHandler={generateOperationChangeHandler(
                setOperation,
                "firstEnd"
              )}
            />
          </div>
          <div className="mx-2 p-1">
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
      )}
      {showTables && (
        <div className="grid grid-cols-3 ">
          {tables.map((table) => (
            <div key={table}>
              <input
                className="mx-2"
                type="checkbox"
                id={`table-${table}`}
                name={`table-${table}`}
                checked={operation.tables.includes(table)}
                onChange={() => {
                  let newTables = [...operation.tables];
                  if (newTables.includes(table)) {
                    newTables = newTables.filter((t) => t !== table);
                  } else {
                    newTables.push(table);
                  }
                  setOperation((prev) => ({ ...prev, tables: newTables }));
                }}
              />
              <label htmlFor={`table-${table}`}>{table}</label>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

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

export const SubtractionInputs = () => {
  const { subtraction, setSubtraction } = useSettingsContext();
  return (
    <OperationInputs
      operation={subtraction}
      setOperation={setSubtraction}
      title="Subtraction"
      exampleText="Example: A - B ="
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

export const DivisionInputs = () => {
  const { division, setDivision } = useSettingsContext();
  return (
    <OperationInputs
      operation={division}
      setOperation={setDivision}
      title="Division"
      exampleText="Example: A / B ="
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
  <button onClick={onClick} className="m-2 p-1 border-2 rounded bg-gray-400 ">
    <span className={enabled ? "" : "line-through"}>{operation}</span>
  </button>
);

export const PlayButtons = () => {
  const { user, addition, subtraction, multiplication, division } =
    useSettingsContext();
  const operationEnabled =
    addition.enabled ||
    multiplication.enabled ||
    subtraction.enabled ||
    division.enabled;

  if (!operationEnabled) {
    return (
      <div className="flex justify-center">Enable an operation to play</div>
    );
  }

  return (
    <div className="flex justify-center">
      <Link href={"/play"}>
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
          <Button>Play</Button>
        </a>
      </Link>
      <Link href={"/guess"}>
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
          <Button>Guess the question</Button>
        </a>
      </Link>
    </div>
  );
};
