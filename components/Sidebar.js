import Link from 'next/link'

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';


export default function Sidebar({ open, onOpen }) {
  return (
      <Drawer
        anchor='left'
        open={open}
        onClose={() => onOpen(!open)}
      >
      <Box sx={{ width: 250 }}>
      <Divider />
        <nav aria-label="browse">
          <List>
            <ListItem >
              <b>Find</b>
            </ListItem>
            <Link href="/search">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonSearchIcon />
                  </ListItemIcon>
                  <ListItemText primary="Search" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </nav>
        <Divider />
        <nav aria-label="browse">
          <List>
            <ListItem >
              <b>Browse</b>
            </ListItem>
            <Link href="/customers">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Customers" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href = "/accounts">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountBalanceWalletIcon />
                  </ListItemIcon>
                  <ListItemText primary="Accounts" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href = "/transactions">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary="Transactions" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </nav>
        <Divider />
        <nav aria-label="browse">
          <List>
            <ListItem >
              <b>Explore</b>
            </ListItem>
            <Link href = "/analytics">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AssessmentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Analytics" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href = "/map">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonPinCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Map" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </nav>
        <Divider />
        <nav aria-label="browse">
          <List>
            <ListItem >
              <b>Configure</b>
            </ListItem>
            <Link href = "/settings">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href = "/documentation">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary="Documentation" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </nav>
        <Divider />
      </Box>
    </Drawer>
    )
  }
  