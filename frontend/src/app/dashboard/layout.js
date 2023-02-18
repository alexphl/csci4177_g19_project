"use client";

import dynamic from "next/dynamic";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const NavDesktop = dynamic(() => import("./NavDesktop"));

const themeMUI = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Home({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {

  return (
    <>
      <ThemeProvider theme={themeMUI}>
        <NavDesktop />
        <div className="text-neutral-100 sm:ml-20">{children}</div>
      </ThemeProvider>
    </>
  );
}
