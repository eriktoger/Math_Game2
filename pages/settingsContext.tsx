import { createContext, useContext, useState } from "react";
import { initialUser, initialAddition } from "./constants";
import { Operation, SettingsState, User } from "./types";

const useSettingsState = (): SettingsState => {
  const [user, setUser] = useState<User>(initialUser);
  const [addition, setAddition] = useState<Operation>(initialAddition);

  return {
    user,
    setUser,
    addition,
    setAddition,
  };
};

const initialSettingsState: SettingsState = {
  user: initialUser,
  setUser: () => {},
  addition: initialAddition,
  setAddition: () => {},
};

const SettingsContext = createContext(initialSettingsState);

export const SettingsProvider = ({ children }: { children: JSX.Element }) => (
  <SettingsContext.Provider value={useSettingsState()}>
    {children}
  </SettingsContext.Provider>
);

export const useSettingsContext = () => useContext(SettingsContext);
