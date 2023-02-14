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
const baseURL = apiURL + "/customer/username/";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from 'theme/theme';

export default function Home() {
  const router = useRouter()
  const { username } = router.query
  
  const [customer, getCustomer] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL + username).then((response) => {
      getCustomer(response.data);
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
        <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
        <div color = "primary">
          {customer && (
            <div>

              <Typography  color="text.secondary" gutterBottom>
                {customer.username}
              </Typography>
              <Typography variant="h5" component="div">
                {customer.name}
              </Typography>
              <Link href = "mailto: {customer.email}">
              <Typography sx={{ mb: 1.5, textDecoration: "underline" }} >
                {customer.email}
              </Typography>
              </Link>
              <Typography variant="body2">
                {customer.address}
              </Typography>
            </div>
            )}
            {
              !customer && (
                <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress color="success" />
              </Grid>
                )
            }
            </div>
          </Paper>
          <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
          <Typography variant="h5" component="div">
            Accounts
          </Typography>
          <div color = "primary">
          {customer && (
              <Stack   direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 2, md: 4 }} >
              {customer.accounts.map((account) => (
                  <Link href = {"/accounts/" + account}>
                    <Button variant="outline" color="dark">
                      {account}
                    </Button>
                  </Link>
                ))}
              </Stack>
            )}
            {
              !customer && (
                <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress color="success" />
              </Grid>
                )
            }
            </div>
          </Paper>
        </Container>
        <Footer></Footer>
    </ThemeProvider>
  )
}