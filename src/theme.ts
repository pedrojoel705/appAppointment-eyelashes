"use client";

import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

// Configuración de la fuente Roboto desde Google Fonts
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: `"Cascadia","${roboto.style.fontFamily}", "Helvetica", "Arial", sans-serif`,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#e3f2fd",
            color: "#0d47a1",
          }),
        }),
      },
    },
  },
});

export default theme;
