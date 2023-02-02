import Header from '@components/Header'
import Footer from '@components/Footer'
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';

import React, { useState } from "react";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from 'theme/theme';

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
        <Header title = "StockVision - Home"/>
        <Navbar open={open} onOpen={setOpen} />
        <Sidebar open={open} onOpen={setOpen}/>
        <Footer></Footer>
    </ThemeProvider>
  )
}