"use client";

import { useState } from "react";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
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
        <CssBaseline />
        <Navbar open={open} onOpen={setOpen} />
        <Sidebar open={open} onOpen={setOpen} />
        <div className="bg-neutral-900">
          <Container maxWidth="md">{children}</Container>
        </div>
      </ThemeProvider>
    </>
  );
}
