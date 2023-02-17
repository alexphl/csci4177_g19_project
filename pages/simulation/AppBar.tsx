import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Router } from 'next/router';

const Navbar = () => {
  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">Group-19 Stock Tracking</Typography>
      <Button href= "../" color="inherit">Home</Button>
      <Button href= "/simulation/stocknews" color="inherit">Stock News</Button>
      <Button href="/simulation/simulation" color="inherit">Stock Simulation</Button>
    </Toolbar>
  </AppBar>
  );
};

export default Navbar;