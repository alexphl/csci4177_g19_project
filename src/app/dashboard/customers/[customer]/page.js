"use client";

import { useQuery } from "@tanstack/react-query";

import Link from "next/link";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import apiURL from "@/APIurl";
const baseURL = apiURL + "/customer/username/";

export default function Customer({ params }) {
  const username = params.customer;

  const { isSuccess, isLoading, data } = useQuery({
    queryKey: [baseURL, username],
  });

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
        <div color="primary">
          {isSuccess && (
            <div>
              <Typography color="text.secondary" gutterBottom>
                {data.username}
              </Typography>
              <Typography variant="h5" component="div">
                {data.name}
              </Typography>
              <Link href="mailto: {customer.email}">
                <Typography sx={{ mb: 1.5, textDecoration: "underline" }}>
                  {data.email}
                </Typography>
              </Link>
              <Typography variant="body2">{data.address}</Typography>
            </div>
          )}
          {isLoading && (
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
      {/* <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
        <Typography variant="h5" component="div">
          Accounts
        </Typography>
        <div color="primary">
          {isSuccess && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              {data.accounts.map((account) => (
                <Link href={"/dashboard/accounts/" + account} key={account}>
                  <Button variant="outline" color="dark">
                    {account}
                  </Button>
                </Link>
              ))}
            </Stack>
          )}
          {isLoading && (
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
      </Paper> */}
    </Container>
  );
}
