"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import apiURL from "../../../../APIurl";
const baseURL = apiURL + "/transaction/";

export default function TransactionTable() {
  const [transactions, getTransactions] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      getTransactions(response.data);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      {transactions && <pre>{JSON.stringify(transactions, null, 2)}</pre>}
      {!transactions && (
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
  );
}
