/**Author: Liam Osler */
"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { useState, useDeferredValue, memo } from "react";
import { useDebounce } from "use-debounce";
import { Grid, TextField, CircularProgress } from "@mui/material";

import apiURL from "@/APIurl";
const baseURL = apiURL + "/customer/search/";

// lazy load
const CustomerCard = dynamic(() => import("./CustomerCard"));

function CustomerSearch() {
  const [searchQuery, setQuery] = useState(null);
  const [debouncedQuery] = useDebounce(searchQuery, 500); // Debounce query with a delay
  const deferredSearchQuery = useDeferredValue(debouncedQuery);

  const customers = useQuery({
    queryKey: [deferredSearchQuery && baseURL + deferredSearchQuery.trim()],
  });

  return (
    <div>
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
    </div>
  );
}

export default memo(CustomerSearch);
