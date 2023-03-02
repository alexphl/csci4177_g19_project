"use client";

import { useQuery } from "@tanstack/react-query";

import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import AccountCard from "./AccountCard";

import apiURL from "@/APIurl";
const baseURL = apiURL + "/account/";

export default function CustomerTable() {
  const { isSuccess, isLoading, data } = useQuery({
    queryKey: ["accounts"], // for caching, must be unique
    queryFn: () => fetch(baseURL).then((res) => res.json()),
  });

  return (
    <div className="container max-w-6xl px-10 my-20">
      <Grid container spacing={2}>
        {isSuccess &&
          data.map((account) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={account}>
              <AccountCard content={account} />
            </Grid>
          ))}
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
