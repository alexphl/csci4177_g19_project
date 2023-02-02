import Link from 'next/link';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar({ open, onOpen }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                    onClick={() => onOpen(!open)}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                <MenuIcon
                />
                </IconButton>
                <Link href = "/">
                    <Button color="inherit" sx={{ flexGrow: 1 }}>StockVision</Button>
                </Link>
                <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
      );
  }
  