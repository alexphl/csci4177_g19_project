import React, { useState } from "react";
import axios from 'axios';

import Link from 'next/link'
import { useRouter } from 'next/router'

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';


import Header from '@components/Header'
import Footer from '@components/Footer'
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';

import apiURL from '../../APIurl';
const baseURL = apiURL + "/transaction/id/";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from 'theme/theme';

export default function Home() {
  const router = useRouter()
  const { id } = router.query
  
  const [transaction, getTransaction] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL + id).then((response) => {
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
        </Container>
        <Footer></Footer>
    </ThemeProvider>
  )
}