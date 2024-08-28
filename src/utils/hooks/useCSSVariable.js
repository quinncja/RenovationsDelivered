import { useState, useEffect } from "react";

export function useCSSVariable(varName) {
  const [value, setValue] = useState(() => {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
  });

  useEffect(() => {
    const handleThemeChange = () => {
      setValue(
        getComputedStyle(document.documentElement)
          .getPropertyValue(varName)
          .trim(),
      );
    };

    window.addEventListener("themeChange", handleThemeChange);

    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
    };
  }, [varName]);

  return value;
}
