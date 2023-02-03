import React, { useState, useEffect } from "react";
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import CustomerCard from "./CustomerCard";

const baseURL = "http://localhost:3000/customer";

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
            <Grid item xs={6}>
              <CustomerCard content = {customer}/>
            </Grid>
          ))
        }
        </Grid>
      </pre>
      )
  }
  