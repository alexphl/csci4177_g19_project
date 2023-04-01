/**Author: Liam Osler */
"use client";

import { useQuery } from "@tanstack/react-query";

import Link from "next/link";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
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
  const username = params.customer;

  const customer = useQuery({ queryKey: [customerBaseURL, username] });

  const symbols = useQuery({
    queryKey: [symbolsBaseURL, username],
  });

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
        <div color="primary">
          {customer.isSuccess && (
            <div>
              <Typography color="text.secondary" gutterBottom>
                {customer.data.username}
              </Typography>
              <Typography variant="h5" component="div">
                {customer.data.name}
              </Typography>
              <Link href="mailto: {customer.email}">
                <Typography sx={{ mb: 1.5, textDecoration: "underline" }}>
                  {customer.data.email}
                </Typography>
              </Link>
              <Typography variant="body2">{customer.data.address}</Typography>
            </div>
          )}
          {customer.isLoading && (
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
        <div color="primary">
          {symbols.isSuccess && (
            <div>
              <Typography variant="h5" component="div" sx={{mb: 2 }}>
                Customer Holdings:
              </Typography>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {symbols.data.map((symbol) => (
                <Grid item xs={6} sm={4} md={4} key={symbol}>
                  <Card>
                    <CardContent>
                      <Typography variant="h3">
                        {symbol.toUpperCase()}
                        <br />
                      </Typography>
                    </CardContent>
                    <CardActions>
                    <Link href={"dashboard/stocks/" + symbol} passHref>
                      <Button size="small">View Stock</Button>
                    </Link>
                    </CardActions>
                  </Card>
                </Grid>
                ))}
              </Grid>
            </div>
          )}
          {symbols.isLoading && (
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
          {customer.isSuccess && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              {customer.data.accounts.map((account) => (
                <Link href={"/dashboard/accounts/" + account} key={account}>
                  <Button variant="outline" color="dark">
                    {account}
                  </Button>
                </Link>
              ))}
            </Stack>
          )}
          {customer.isLoading && (
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
