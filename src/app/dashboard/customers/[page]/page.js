"use client";

import { useQuery } from "@tanstack/react-query";

import Link from "next/link";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import apiURL from "@/APIurl";
const baseURL = apiURL + "/customer/username/";
const customerBaseURL = apiURL + "/customer/username/";
const symbolsBaseURL = apiURL + "/customer/username/symbols/";


export default function Customer({ params }) {
  const page = params.page;
  console.log(page);

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
      <h1 className="text-2xl leading-relaxed text-neutral-400">
          Add a new
          <br />
          <strong className="text-4xl text-white">CUSTOMER</strong>
        </h1>
        
        <Grid container sx={{ mb: 4 }}>
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <Grid item>
              <TextField
                fullWidth
                label="Username"
                id="outlined-start-adornment"
                margin="dense"
              />
            </Grid>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Legal Name"
              id="outlined-start-adornment"
              margin="dense"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={8}>
            <Grid item>
              <TextField
                fullWidth
                label="Email Address"
                id="outlined-start-adornment"
                margin="dense"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              fullWidth
              label="Street Address"
              id="outlined-start-adornment"
              margin="dense"
            />
          </Grid>
            <Button size="large">New Customer</Button>
        </Grid>
      </Paper>
    </Container>
  );
}
