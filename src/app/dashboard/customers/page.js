"use client";

import { useQuery } from "@tanstack/react-query";

import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import CustomerCard from "../CustomerCard";

import apiURL from "@/APIurl";
const baseURL = apiURL + "/customer/";

export default function CustomerTable() {
  const { isSuccess, isLoading, data } = useQuery({
    queryKey: ["customers"], // for caching, must be unique
    queryFn: () => fetch(baseURL).then((res) => res.json()),
  });

  return (
    <div className="container my-20 max-w-6xl px-10">
      <Grid container spacing={2}>
        {isSuccess &&
          data &&
          data.map((customer) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={customer}>
              <CustomerCard content={customer} />
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
