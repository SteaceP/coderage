import { createTheme, PaletteMode } from "@mui/material";
import { amber, grey, deepOrange, blueGrey } from "@mui/material/colors";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          // primary: blueGrey,
          // divider: blueGrey[200],
          // text: {
          //   primary: grey[900],
          //   secondary: grey[800],
          // },
        }
      : {
          // palette values for dark mode
          // primary: grey,
          // divider: grey[50],
          // background: {
          //   default: grey[900],
          //   paper: grey[900],
          // },
          // text: {
          //   primary: "#fff",
          //   secondary: grey[500],
          // },
        }),
  },
});
