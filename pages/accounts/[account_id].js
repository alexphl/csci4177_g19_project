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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Header from '@components/Header'
import Footer from '@components/Footer'
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';

import apiURL from '../../APIurl';
const accountBaseURL = apiURL + "/account/account_id/";
const tranasctionsBaseURL = apiURL + "/transaction/account_id/";


import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from 'theme/theme';

export default function Home() {
  const router = useRouter()
  const { account_id } = router.query
  
  const [account, getAccount] = React.useState(null);
  const [transactions, getTransactions] = React.useState(null);


  React.useEffect(() => {
    axios.get(accountBaseURL + account_id).then((response) => {
        getAccount(response.data);
    });
  }, [router]);

  React.useEffect(() => {
    axios.get(tranasctionsBaseURL + account_id).then((response) => {
        getTransactions(response.data);
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
          <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
        <div color = "primary">
            {transactions && (
                <div>
                    <TableContainer component={Paper} sx={{fontSize: 4}}>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Symbol</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="right">Date</TableCell>

                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {transactions.transactions.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.symbol}
                                </TableCell>
                                <TableCell align="right">{row.transaction_code}</TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{Number(row.price).toFixed(2)}</TableCell>
                                <TableCell align="right">{Number(row.total).toFixed(2)}</TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
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