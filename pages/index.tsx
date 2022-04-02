import Link from "next/link";
import type { NextPage } from "next";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useSettingsContext } from "./settingsContext";
import { Operation } from "./types";

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
  <input type="number" value={value} onChange={changeHandler} />
);

const Home: NextPage = () => {
  const { user, addition, setAddition, setUser } = useSettingsContext();

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">Hello: {user.name} </h1>
      <input
        onChange={(event) => {
          event.preventDefault();

          setUser((oldUser) => ({ ...oldUser, name: event.target.value }));
        }}
      />
      <div>
        <input
          type="checkbox"
          id="scales"
          name="scales"
          checked={addition.enabled}
          onChange={() =>
            setAddition((oldAddition) => ({
              ...oldAddition,
              enabled: !oldAddition.enabled,
            }))
          }
        />
        <label htmlFor="scales">Addition</label>
      </div>
      <span>Example: A + B = ?</span>

      <div>
        A: Start:
        <NumberInput
          value={addition.firstStart}
          changeHandler={generateOperationChangeHandler(
            setAddition,
            "firstStart"
          )}
        />
        End:{" "}
        <NumberInput
          value={addition.firstEnd}
          changeHandler={generateOperationChangeHandler(
            setAddition,
            "firstEnd"
          )}
        />
      </div>
      <div>
        B: Start:{" "}
        <NumberInput
          value={addition.secondStart}
          changeHandler={generateOperationChangeHandler(
            setAddition,
            "secondStart"
          )}
        />{" "}
        End:{" "}
        <NumberInput
          value={addition.secondEnd}
          changeHandler={generateOperationChangeHandler(
            setAddition,
            "firstEnd"
          )}
        />
      </div>
      <Link href="/play">
        <a>Play</a>
      </Link>
    </div>
  );
};

export default Home;
