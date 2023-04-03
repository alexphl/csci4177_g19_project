"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Link from "next/link";

import CustomerCard from "../CustomerCard";

import apiURL from "@/APIurl";
const baseURL = apiURL + "/customer/";

export default function CustomerTable() {
  const { isSuccess, isLoading, data } = useQuery({ queryKey: [baseURL] });
  const [filteredData, setFilteredData] = useState([]);
  const [usernameFilter, setUsernameFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  useEffect(() => {
    if (isSuccess && data) {
      setFilteredData(
        data.filter((customer) => {
          const {
            username = '',
            name = '',
            email = '',
            address = '',
          } = customer;

          return (
            username.toLowerCase().includes(usernameFilter.toLowerCase()) &&
            name.toLowerCase().includes(nameFilter.toLowerCase()) &&
            email.toLowerCase().includes(emailFilter.toLowerCase()) &&
            address.toLowerCase().includes(addressFilter.toLowerCase())
          );
        })

      );
    }
  }, [isSuccess, data, usernameFilter, nameFilter, emailFilter, addressFilter]);
 
  return (
    <Grid container>
      <Grid
        item
        sm={6}
        md={5}
        sx={{
          color: "white",
          p: 4,
          borderRadius: 2,
          mb: 4,
        }}
      >
        <h1 className="text-2xl leading-relaxed text-neutral-400">
          View your
          <br />
          <strong className="text-4xl text-white">CUSTOMERS</strong>
        </h1>

        <h1 className="mt-4 mb-2 text-2xl leading-relaxed text-neutral-400">
          Filter:
        </h1>
        <Grid container sx={{ mb: 4 }}>
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <Grid item>
              <TextField
                fullWidth
                label="Username"
                id="outlined-start-adornment"
                margin="dense"
                value={usernameFilter}
                onChange={(e) => setUsernameFilter(e.target.value)}
              />
            </Grid>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Legal Name"
              id="outlined-start-adornment"
              margin="dense"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={8}>
            <Grid item>
              <TextField
                fullWidth
                label="Email Address"
                id="outlined-start-adornment"
                margin="dense"
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              fullWidth
              label="Street Address"
              id="outlined-start-adornment"
              margin="dense"
              value={addressFilter}
              onChange={(e) => setAddressFilter(e.target.value)}
            />
          </Grid>
        </Grid>

        <Link href="/dashboard/customers/new" passHref>
          <Button size="large">New Customer</Button>
        </Link>
      </Grid>
      

      <Grid item sm={6} md={7}>
        <Box sx={{ height: "100vh" }}>
          <Grid
            container
            direction="row"
            sx={{ maxHeight: "100vh", overflowY: { xs: "show", sm: "scroll" } }}

          // style={{ maxHeight: "100vh", overflowY: "scroll", scrollbar: "none"}}
          >
            {isSuccess &&
              filteredData.map((customer) => (
                <Grid
                  item
                  key={customer}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  style={{ display: "flex" }}
                >
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
        </Box>
      </Grid>
    </Grid>
  );
}
