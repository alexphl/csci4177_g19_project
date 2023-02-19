'use client'

import { createTheme, ThemeProvider } from "@mui/material/styles";

const themeMUI = createTheme({
  palette: {
    mode: "dark",
  },
});

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {

  return (
    <ThemeProvider theme={themeMUI}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeContextProvider;
