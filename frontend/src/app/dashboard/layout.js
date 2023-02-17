"use client";

import React, { useState } from "react";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Home({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CssBaseline />
      <Header title="StockVision - Home" />
      <Navbar open={open} onOpen={setOpen} />
      <Sidebar open={open} onOpen={setOpen} />
      <Container maxWidth="sm">
        {children}
      </Container>
      <Footer />
    </>
  );
}
