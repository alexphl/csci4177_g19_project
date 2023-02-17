"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

import AccountCard from "./AccountCard";

import apiURL from "../../../../APIurl";
const baseURL = apiURL + "/account/";

export default function CustomerTable() {
  const [accounts, getAccounts] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      getAccounts(response.data);
    });
  }, []);

  return (
    <Paper elevation={0} sx={{ p: 2, margin: 2, flexGrow: 1 }}>
      <Grid container spacing={2}>
        {accounts &&
          accounts.map((account) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <AccountCard content={account} />
            </Grid>
          ))}
        {!accounts && (
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
    </Paper>
  );
}
