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

import Header from '@components/Header'
import Footer from '@components/Footer'
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';

import apiURL from '../../APIurl';
const baseURL = apiURL + "/account/account_id/";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from 'theme/theme';

export default function Home() {
  const router = useRouter()
  const { account_id } = router.query
  
  const [account, getAccount] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL + account_id).then((response) => {
      getAccount(response.data);
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
            {account && (
                <div>
                <Typography variant="h5" component="div">
                    Account Number: {account.account_id}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Limit: ${account.limit}
                </Typography>
                <Typography>
                    Products:
                 </Typography>
                 {account.products.map((product) => (
                    <div>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {product.replace(/([A-Z])/g, ' $1').trim()}
                        </Typography>
                    </div>
                ))}
                </div>
            )
            }
            {!account && (
                <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center">
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