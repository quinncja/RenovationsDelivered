import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

const SystemMessageContext = createContext();

export const SystemMessageProvider = ({ children, timeout = 2000 }) => {
  const [systemMessage, setSystemMessage] = useState(null);
  const timeoutIdRef = useRef(null);

  const setMessage = (message) => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    setSystemMessage(message);

    timeoutIdRef.current = setTimeout(() => {
      setSystemMessage(null);
      timeoutIdRef.current = null;
    }, timeout);
  };

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return (
    <SystemMessageContext.Provider value={{ systemMessage, setMessage }}>
      {children}
    </SystemMessageContext.Provider>
  );
};

export const useSystemMessage = () => {
  return useContext(SystemMessageContext);
};
