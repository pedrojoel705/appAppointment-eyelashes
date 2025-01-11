"use client";

import { createTheme } from "@mui/material/styles";
import { Inter, Roboto_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

// Configuración del tema con Roboto
const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: `"roboto_mono","inter", "Helvetica", "Arial", sans-serif`, // Incluye Roboto como prioridad
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
