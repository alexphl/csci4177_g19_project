import React, { useState, useEffect } from "react";
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import CustomerCard from "./CustomerCard";

const baseURL = "https://faithful-cyan-trunks.cyclic.app/customer";

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
        </Grid>
      </pre>
      )
  }
  