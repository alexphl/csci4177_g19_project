"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useDeferredValue } from "react";
import { useDebounce } from "use-debounce";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import CustomerCard from "./CustomerCard";

import apiURL from "@/APIurl";
const baseURL = apiURL + "/customer/search/";

export default function CustomerSearch() {
  const [searchQuery, setQuery] = useState(null);
  const [debouncedQuery] = useDebounce(searchQuery, 500); // Debounce query with a delay
  const deferredSearchQuery = useDeferredValue(debouncedQuery);

  const customers = useQuery({
    queryKey: [`customerSearch:${deferredSearchQuery}`], // for caching, must be unique
    queryFn: () => fetch(baseURL + deferredSearchQuery.trim()).then((res) => res.json()),
  });

  return (
    <div>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        align="center"
        onSubmit={function (e) {
          e.preventDefault();
        }}
      >
        <TextField
          id="standard-basic"
          variant="outlined"
          margin="normal"
          type="search"
          fullWidth
          onChange={function (e) {
            setQuery(e.target.value);
          }}
        />
        <Grid container spacing={2} align="left">
          {customers.isSuccess &&
            customers.data.map((customer) => (
              <Grid item xs={12} sm={6} key={customer.username}>
                <CustomerCard content={customer} />
              </Grid>
            ))}
          {customers.isLoading && searchQuery && (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: "20vh" }}
            >
              <CircularProgress color="success" />
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
}
