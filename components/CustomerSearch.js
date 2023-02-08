import * as React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

import CustomerCard from "./CustomerCard";

const baseURL = "https://faithful-cyan-trunks.cyclic.app/customer/search/";

function query (searchQuery, {customers, setCustomers}) {
  console.log(baseURL + searchQuery );
  return axios.get(baseURL + searchQuery).then((response) => {
    console.log(response.data);
    return response.data;
  });
}


export default function CustomerSearch() {
  const [customers, setCustomers] = React.useState(null);

  const [searchQuery, setQuery] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log(searchQuery, setCustomers);
      if(searchQuery !== ""){
        axios.get(baseURL + searchQuery).then((response) => {
          setCustomers(response.data);
          console.log(response.data);
        });
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);
  
  return (
    <div>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        align = "center"
        
      >
        <TextField 
          id="standard-basic" 
          variant="outlined" 
          margin="normal" 
          fullWidth
          onChange={function(e){
            setQuery(e.target.value)
          }}
        />
        <Grid container spacing={2} align = "left">
        {customers && 
          customers.map((customer) => (
            <Grid item xs={12} sm={6}>
              <CustomerCard content = {customer}/>
            </Grid>
          ))
        }
        </Grid>
      </Box>
    </div>
  );
}