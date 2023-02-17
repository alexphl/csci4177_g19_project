'use client'

import React, { useState } from "react";
import axios from 'axios';

import { useRouter } from 'next/router'

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import Header from '@components/Header'
import Footer from '@components/Footer'
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';

import apiURL from '../../APIurl';
const baseURL = apiURL + "/transaction/account_id/";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from 'theme/theme';

export default function Home() {
  const router = useRouter()
  const { account_id } = router.query
  
  const [transaction, getTransaction] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL + account_id).then((response) => {
      getTransaction(response.data);
    });
  }, [router]);

  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header title = "StockVision - Customers"/>
        <Navbar open={open} onOpen={setOpen} />
        <Sidebar open={open} onOpen={setOpen}/>
        <Container
          style={{ minHeight: '100vh' } }
         >
            <pre>
                {JSON.stringify(transaction, null, 2)}
            </pre>
        </Container>
        <Footer></Footer>
    </ThemeProvider>
  )
}