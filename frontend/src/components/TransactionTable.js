import React, { useState, useEffect } from "react";
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import apiURL from '../APIurl';
const baseURL = apiURL + "/transaction/";

export default function TransactionTable() {
  const [transactions, getTransactions] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      getTransactions(response.data);
    });
  }, []);
  
    return (
        <Paper elevation={0} sx={{ p: 2, margin: 2, flexGrow: 1 }}>
            <Grid container spacing={2} >
            {transactions && (
              <pre>
                {JSON.stringify(transactions, null, 2)}
              </pre>
            )
            }
            {!transactions &&(
                <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >
                <CircularProgress color="success" />
            </Grid>
            )}
            </Grid>
        </Paper>
      )
  }
  