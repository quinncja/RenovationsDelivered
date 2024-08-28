import React, { createContext, useContext, useState } from "react";

const SystemMessageContext = createContext();

export const SystemMessageProvider = ({ children, timeout = 1500 }) => {
  const [systemMessage, setSystemMessage] = useState(null);

  const setMessage = (message) => {
    setSystemMessage(message);

    setTimeout(() => {
      setSystemMessage(null);
    }, timeout);
  };

  return (
    <SystemMessageContext.Provider value={{ systemMessage, setMessage }}>
      {children}
    </SystemMessageContext.Provider>
  );
};

export const useSystemMessage = () => {
  return useContext(SystemMessageContext);
};
