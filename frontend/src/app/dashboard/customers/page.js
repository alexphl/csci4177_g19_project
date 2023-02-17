'use client'

import React, { useState } from "react";

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import Header from '@components/Header'
import Footer from '@components/Footer'
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';

import CustomerTable from '@components/CustomerTable';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from 'theme/theme';

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header title = "StockVision - Customers"/>
        <Navbar open={open} onOpen={setOpen} />
        <Sidebar open={open} onOpen={setOpen}/>
        <Container >
            <CustomerTable />
        </Container>
        <Footer></Footer>
    </ThemeProvider>
  )
}