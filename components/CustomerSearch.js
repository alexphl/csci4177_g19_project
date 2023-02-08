import * as React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

import CustomerCard from "./CustomerCard";


import apiURL from '../APIurl';
const baseURL = apiURL + "/customer/search/";
// const baseURL = "http://localhost:3000/customer/search/";


export default function CustomerSearch() {
  const [customers, setCustomers] = React.useState(null);
  const [searchQuery, setQuery] = useState(null);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
        if (typeof searchQuery === 'string' && searchQuery.trim().length > 0) {
          axios.get(baseURL + searchQuery.trim()).then((response) => {
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
        onSubmit={
          function(e){
            e.preventDefault()
          }
        }
      >
        <TextField 
          id="standard-basic" 
          variant="outlined" 
          margin="normal"
          type="search"
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
        {!customers && searchQuery &&(
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '20vh' }}
            >
            <CircularProgress color="success" />
          </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
}