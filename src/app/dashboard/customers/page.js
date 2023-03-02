"use client";

import { useQuery } from "@tanstack/react-query";

import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
      <h1 className="text-2xl leading-relaxed text-neutral-400">
        View our <br />
        <strong className="text-4xl text-white">CUSTOMERS</strong>
      </h1>
      
      <h1 className="text-2xl leading-relaxed text-neutral-400 mt-4 mb-2">
        Filter:
      </h1>

      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

        <div>
          <TextField
            label="By Username"
            id="outlined-start-adornment"
            sx={{ mb: 4, mr: 2}}
          />
          <TextField
            label="By Email Address"
            id="outlined-start-adornment"
            sx={{ mb: 4}}
          />
        </div>

      </Box>
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
