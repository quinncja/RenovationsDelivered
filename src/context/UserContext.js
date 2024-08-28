import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState();
  const [appearance, setAppearance] = useState();
  const [label, setLabel] = useState();

  const changeTheme = (state) => {
    const root = document.documentElement;
    const variables = [
      "background",
      "dark",
      "mid",
      "mid-highlight",
      "button-filter",
      "light",
      "border-color",
      "border",
      "less-white",
      "white",
      "fancy-border",
      "shadow",
      "overlay",
      "filter1",
      "filter2",
      "filter3",
      "filter4",
      "filter5",
      "filter6",
    ];

    variables.forEach((varName) => {
      root.style.setProperty(`--${varName}`, `var(--${state}-${varName})`);
    });

    window.dispatchEvent(new CustomEvent("themeChange"));
  };

  useEffect(() => {
    if (appearance) changeTheme(appearance);
  }, [appearance]);

  return (
    <UserContext.Provider
      value={{
        appearance,
        setAppearance,
        colorScheme,
        setColorScheme,
        label,
        setLabel,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
