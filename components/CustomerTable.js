import React, { useState, useEffect } from "react";
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';

import CustomerCard from "./CustomerCard";

import apiURL from '../APIurl';
const baseURL = apiURL + "/customer/";

export default function CustomerTable() {
  const [customers, getCustomers] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      getCustomers(response.data);
    });
  }, []);
  
    return (

      <pre>
        <Grid container spacing={2} >
        {customers && 
          customers.map((customer) => (
            <Grid item xs={12} sm={6} md={4} lg={3} >
              <CustomerCard content = {customer}/>
            </Grid>
          ))
        }
        {!customers &&(
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
      </pre>
      )
  }
  