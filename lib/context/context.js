/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

export const AppContext = createContext({});

export function StateContexts({ children }) {
  const [monitorIcon, setMonitorIcon] = useState(true);

  return (
    <AppContext.Provider value={[monitorIcon, setMonitorIcon]}>
      {children}
    </AppContext.Provider>
  );
}
