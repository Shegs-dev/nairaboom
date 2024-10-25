import React, { createContext, useContext, useState } from "react";

const DatePickerContext = createContext();

export const useDatePicker = () => useContext(DatePickerContext);

export const DatePickerProvider = ({ children }) => {
  const [day, setDay] = useState(0);
  const [month_, setMonth_] = useState("01");
  const [onChange, setOnChange] = useState(null);

  return (
    <DatePickerContext.Provider
      value={{ day, month_, setDay, setMonth_, onChange, setOnChange }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};
