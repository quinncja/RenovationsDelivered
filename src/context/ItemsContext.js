import { createContext, useContext, useState } from "react";

const ItemsContext = createContext();
export const useItems = () => useContext(ItemsContext);

export const ItemsProvider = ({ children }) => {
  const [dataMap, setDataMap] = useState({});

  const updateDataMap = (id, data) => {
    setDataMap((prev) => {
      return {
        ...prev,
        [id]: data,
      };
    });
  };

  const clearDataMap = () => {
    setDataMap({});
  };

  const clearOpenData = () => {
    setDataMap((prev) => {
      return {
        ...prev,
        open: null,
      };
    });
  };

  return (
    <ItemsContext.Provider
      value={{
        dataMap,
        updateDataMap,
        clearDataMap,
        clearOpenData,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
