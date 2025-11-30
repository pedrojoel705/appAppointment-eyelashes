import * as React from "react";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import { Box } from "@mui/system";
import { ConditionalFooter } from "@/components/layout/ConditionalFooter";
import { AppContextProvider } from "@/context/AppContextProvider";
import { SessionProvider } from "@/context/SessionProvider";
import ProfileChecker from "@/components/layout/ProfileChecker";

export const metadata = {
  title: "Tu Aplicación",
  description: "Descripción de tu aplicación",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
      </head>
      <body>
        <SessionProvider>
          <AppContextProvider>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <ProfileChecker>
                  <Box sx={{ bgcolor: "#e7dfd8", height: "100%" }}>
                    {props.children}
                  </Box>
                  <ConditionalFooter />
                </ProfileChecker>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </AppContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
