/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

const UserProvider = ({ children }) => {
  const [userPayLoad, setUserPayload] = useState({});

  return (
    <UserContext.Provider value={userPayLoad}>
      <UserDispatchContext.Provider value={setUserPayload}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};

export { UserContext, UserDispatchContext, UserProvider };
