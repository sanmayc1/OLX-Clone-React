import { useState } from "react";
import { UserContext } from "./context";


export const UserContextProvider = ({ children }) => {
    const [userD, setUserD] = useState("");
  
    return (
      <UserContext.Provider value={{ userD, setUserD }}>
        {children}
      </UserContext.Provider>
    );
  };

