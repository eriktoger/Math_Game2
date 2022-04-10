import { createContext, useContext, useState } from "react";
import { initialUser, initialOperation } from "./constants";
import { Settings, SettingsState, User } from "./types";

const useSettingsState = (): SettingsState => {
  const [user, setUser] = useState<User>(initialUser);
  const [addition, setAddition] = useState(initialOperation);
  const [subtraction, setSubtraction] = useState(initialOperation);
  const [multiplication, setMultiplication] = useState(initialOperation);
  const [division, setDivision] = useState(initialOperation);
  const setSettings = (settings: Settings) => {
    setAddition(settings.addition);
    setSubtraction(settings.subtraction);
    setMultiplication(settings.multiplication);
    setDivision(settings.division);
  };

  return {
    user,
    setUser,
    addition,
    subtraction,
    setSubtraction,
    setAddition,
    multiplication,
    setMultiplication,
    division,
    setDivision,
    setSettings,
  };
};

const initialSettingsState: SettingsState = {
  user: initialUser,
  setUser: () => {},
  addition: initialOperation,
  setAddition: () => {},
  subtraction: initialOperation,
  setSubtraction: () => {},
  multiplication: initialOperation,
  setMultiplication: () => {},
  division: initialOperation,
  setDivision: () => {},
  setSettings: () => {},
};

const SettingsContext = createContext(initialSettingsState);

export const SettingsProvider = ({ children }: { children: JSX.Element }) => (
  <SettingsContext.Provider value={useSettingsState()}>
    {children}
  </SettingsContext.Provider>
);

export const useSettingsContext = () => useContext(SettingsContext);
