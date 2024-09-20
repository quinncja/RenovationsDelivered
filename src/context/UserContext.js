import React, { createContext, useContext, useState, useEffect } from "react";
import { colorPalettes } from "utils/colors";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState();
  const [appearance, setAppearance] = useState();
  const [label, setLabel] = useState();

  const handleColorScheme = (colorScheme) => {
    changeRoot(colorScheme);
    setColorScheme(colorScheme);
  };

  const changeRoot = (colorScheme) => {
    const root = document.documentElement;
    root.style.setProperty("--primary", colorPalettes[colorScheme][1]);
    const rootColor = hslToHsla(colorPalettes[colorScheme][1], 0.15);
    root.style.setProperty("--activePrimary", rootColor);
  };

  function hslToHsla(hsl, alpha) {
    const hslValues = hsl.match(/\d+/g);
    let hue = hslValues[0];
    let saturation = hslValues[1];
    let lightness = parseInt(hslValues[2]);

    const adjustment = appearance === "light" ? -30 : -15;
    lightness = Math.max(0, Math.min(100, lightness + adjustment));

    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
  }

  const changeTheme = (state) => {
    const root = document.documentElement;
    const variables = [
      "background",
      "dropdown-background",
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
      "grid-color",
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
    if (appearance && colorScheme) {
      changeTheme(appearance);
      changeRoot(colorScheme);
    }

    // eslint-disable-next-line
  }, [appearance, colorScheme]);

  const getColorScheme = () => {
    return colorPalettes[colorScheme];
  };

  return (
    <UserContext.Provider
      value={{
        appearance,
        setAppearance,
        colorScheme,
        getColorScheme,
        setColorScheme,
        handleColorScheme,
        label,
        setLabel,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
