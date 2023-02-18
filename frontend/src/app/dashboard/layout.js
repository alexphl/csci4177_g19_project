"use client";

import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

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
  const [open, setOpen] = useState(false);

  return (
    <>
      <ThemeProvider theme={themeMUI}>
        <Navbar open={open} onOpen={setOpen} />
        <Sidebar open={open} onOpen={setOpen} />
        {children}
      </ThemeProvider>
    </>
  );
}
