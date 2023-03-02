"use client";

import { useQuery } from "@tanstack/react-query";

import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import CustomerCard from "../CustomerCard";

import apiURL from "@/APIurl";
const baseURL = apiURL + "/customer/";

export default function CustomerTable() {
  const { isSuccess, isLoading, data } = useQuery({
    queryKey: ["customers"], // for caching, must be unique
    queryFn: () => fetch(baseURL).then((res) => res.json()),
  });

  return (
      <Grid container >
        <Grid item sm = {5} >

          <h1 className="text-2xl leading-relaxed text-neutral-400">
            View our 
            <br />
            <strong className="text-4xl text-white">
              CUSTOMERS
            </strong>
          </h1>
          
          <h1 className="text-2xl leading-relaxed text-neutral-400 mt-4 mb-2">
            Filter:
          </h1>

          <Grid container sx = {{mb: 4}}>
            <Grid item xs = {12} >
              <Grid item >
              <TextField
                fullWidth
                label="Username"
                id="outlined-start-adornment"
                margin="dense" 
              />
              </Grid>
            </Grid>
            <Grid item xs = {12} sm = {6}>
              <TextField
                fullWidth 
                label="First Name"
                id="outlined-start-adornment"
                margin="dense" 
              />
            </Grid>
            <Grid item xs = {12} sm = {6}>
              <TextField
                fullWidth
                label="Last Name"
                id="outlined-start-adornment"
                margin="dense" 
              />
            </Grid>
            <Grid item xs = {12}>

              <Grid item >
                <TextField
                  
                  label="Email Address"
                  id="outlined-start-adornment"
                  margin="dense" 
                />
              </Grid>
            </Grid>
            <Grid item xs = {12} sm={12} md={12} lg={8} >
              <TextField
                fullWidth
                label="Street Address"
                id="outlined-start-adornment"
                margin="dense" 
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm = {7}>
        <Box sx={{ height: '100vh' }}>
          <Grid container
          direction="row"
          style={{ maxHeight: "100vh", overflowY: "scroll", scrollbar: "none"}}
          >
            {isSuccess &&
              data &&
              data.map((customer) => (
                <Grid item xs={12} sm={12} md={6} lg={4} >
                  <CustomerCard content={customer} />
                </Grid>
                )).sort((a, b) => (a.name > b.name) ? 1 : -1)
              }
            {isLoading && (
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: "100vh" }}
              >
                <CircularProgress color="success" />
              </Grid>
            )}
          </Grid>
          </Box>
        </Grid>
      </Grid>
  );
}
