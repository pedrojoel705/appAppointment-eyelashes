import * as React from "react";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import { Box } from "@mui/system";
import { ConditionalFooter } from "@/components/layout/ConditionalFooter";
import { AppContextProvider } from "@/context/AppContextProvider";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <AppContextProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Box sx={{ bgcolor: "#e7dfd8", height: "100%" }}>
                {props.children}
              </Box>
              <ConditionalFooter />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
