import { createContext, useContext, useState, useMemo } from "react";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

import { getDesignTokens } from "assets/theme";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

ColorModeContext.displayName = "DarkModeContext"; // Only give a name for the dev tools, make sure it's in the production build

export const useDarkTheme = () => {
  return useContext(ColorModeContext);
};

export const DarkThemeProvider = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
