'use client'

import { createTheme, ThemeProvider } from "@mui/material/styles";

const themeMUI = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fed7aa" // tailwind's orange-200
    }
  },
  typography: {
    fontFamily: "var(--font-custom)" // see root layout.tsx for definition
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
