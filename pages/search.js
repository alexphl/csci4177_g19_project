import React, { useState } from "react";

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';

import Header from '@components/Header'
import Footer from '@components/Footer'
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import Search from '@components/CustomerSearch';


import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from 'theme/theme';

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />

        <Header title = "StockVision - Transactions"/>
        <Navbar open={open} onOpen={setOpen} />
        <Sidebar open={open} onOpen={setOpen}/>
        <Container maxWidth="sm" >
        <Paper elevation={0} sx={{ p: 2, margin: 2, flexGrow: 1 }}>
          <h2 align = "middle">
            Search
          </h2>
          <div align = "middle">
            Search for customers by name, username, email or street address:
          </div>
            <Search />
        </Paper>
        </Container>
        <Footer/>
    </ThemeProvider>
  )
}