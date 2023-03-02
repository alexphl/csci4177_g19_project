"use client";

import { useQuery } from "@tanstack/react-query";

import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import apiURL from "@/APIurl";
const baseURL = apiURL + "/transaction/";

export default function TransactionTable() {
  const { isSuccess, isLoading, data } = useQuery({ queryKey: [baseURL] });

  return (
    <div className="container max-w-6xl px-10 my-20">
      <Grid container spacing={2}>
        {isSuccess && <pre>{JSON.stringify(data, null, 2)}</pre>}
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
    </div>
  );
}
