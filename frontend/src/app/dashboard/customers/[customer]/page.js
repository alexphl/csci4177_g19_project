"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import apiURL from "../../../../../APIurl";
const baseURL = apiURL + "/customer/username/";

export default function Home({params}) {
  const router = useSearchParams();
  const username = params.customer;
  const page = params.customer;


  const [customer, getCustomer] = useState(null);

  useEffect(() => {
    axios.get(baseURL + username).then((response) => {
      getCustomer(response.data);
    });
  }, [router]);

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
        <div color="primary">
          {customer && (
            <div>
              <Typography color="text.secondary" gutterBottom>
                {customer.username}
              </Typography>
              <Typography variant="h5" component="div">
                {customer.name}
              </Typography>
              <Link href="mailto: {customer.email}">
                <Typography sx={{ mb: 1.5, textDecoration: "underline" }}>
                  {customer.email}
                </Typography>
              </Link>
              <Typography variant="body2">{customer.address}</Typography>
            </div>
          )}
          {!customer && (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress color="success" />
            </Grid>
          )}
        </div>
      </Paper>
      <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
        <Typography variant="h5" component="div">
          Accounts
        </Typography>
        <div color="primary">
          {customer && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              {customer.accounts.map((account) => (
                <Link href={"/dashboard/accounts/" + account} key={account}>
                  <Button variant="outline" color="dark">
                    {account}
                  </Button>
                </Link>
              ))}
            </Stack>
          )}
          {!customer && (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress color="success" />
            </Grid>
          )}
        </div>
      </Paper>
    </Container>
  );
}
