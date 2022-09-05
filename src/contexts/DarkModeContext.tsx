import { createContext, useContext, useState, useMemo, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

ColorModeContext.displayName = "DarkModeContext";

export const useDarkTheme = () => {
  return useContext(ColorModeContext);
};

export const DarkThemeProvider = ({ children }) => {
  const storedColorMode = window.localStorage.getItem("storedColorMode");

  const [mode, setMode] = useState<
    "(prefers-color-scheme: light)" | "(prefers-color-scheme: dark)" | string
  >(storedColorMode ? storedColorMode : "(prefers-color-scheme: dark)");

  const prefersDarkMode = useMediaQuery(mode);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === "(prefers-color-scheme: light)"
            ? "(prefers-color-scheme: dark)"
            : "(prefers-color-scheme: light)"
        );
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  useEffect(() => {
    window.localStorage.setItem("storedColorMode", mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
