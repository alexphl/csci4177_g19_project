"use client";

import Link from "next/link";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import SettingsIcon from "@mui/icons-material/Settings";

import Search from "./CustomerSearch";

export default function IndexContent() {
  return (
    <div color="primary">
      <h1 align="middle" className="py-6 text-2xl font-bold">
        Welcome to STOCKVISION!
      </h1>
      <Divider />
      <h2 align="middle" className="text-lg font-bold">
        Search
      </h2>
      <div align="middle">
        Search for customers by name, username, email or street address:
        <Search />
        <br />
      </div>
      <Divider />
      <h2 align="middle" className="text-lg font-bold">
        Browse
      </h2>
      <p align="middle">Browse customers, accounts and transactions: </p>
      <Grid container spacing={2} align="center">
        <Grid item xs={4}>
          <Link href="/dashboard/customers/">
            <div style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "background.primary",
                  color: "text.primary",
                  borderRadius: 1,
                  p: 3,
                }}
              >
                <CardContent>
                  <PeopleAltIcon />
                  <p sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Customers
                  </p>
                </CardContent>
              </Card>
            </div>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link href="/dashboard/accounts/">
            <div style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "background.primary",
                  color: "text.primary",
                  borderRadius: 1,
                  p: 3,
                }}
              >
                <CardContent>
                  <AccountBalanceWalletIcon />
                  <p sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Accounts
                  </p>
                </CardContent>
              </Card>
            </div>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link href="/dashboard/transactions">
            <div style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "background.primary",
                  color: "text.primary",
                  borderRadius: 1,
                  p: 3,
                }}
              >
                <CardContent>
                  <ReceiptIcon />
                  <p sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Transactions
                  </p>
                </CardContent>
              </Card>
            </div>
          </Link>
        </Grid>
      </Grid>
      <br />
      <Divider />
      <h2 align="middle" className="text-lg font-bold">
        Explore
      </h2>
      <p align="middle">
        View analytic tools like charts, graphs and maps of StockVision's users:
      </p>
      <Grid container spacing={2} align="center">
        <Grid item xs={6}>
          <Link href="/dashboard/analytics/">
            <div style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "background.primary",
                  color: "text.primary",
                  borderRadius: 1,
                  p: 3,
                }}
              >
                <CardContent>
                  <AssessmentIcon />
                  <p sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Analytics
                  </p>
                </CardContent>
              </Card>
            </div>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link href="/dashboard/map/">
            <div style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "background.primary",
                  color: "text.primary",
                  borderRadius: 1,
                  p: 3,
                }}
              >
                <CardContent>
                  <PersonPinCircleIcon />
                  <p sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Map
                  </p>
                </CardContent>
              </Card>
            </div>
          </Link>
        </Grid>
      </Grid>
      <br />
      <Divider />
      <h2 align="middle" className="text-lg font-bold">
        Configure
      </h2>
      <p align="middle">View, edit and manage your profile settings:</p>
      <Grid container spacing={2} align="center">
        <Grid item xs={12}>
          <Link href="/dashboard/settings/">
            <div style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "background.primary",
                  color: "text.primary",
                  borderRadius: 1,
                  p: 3,
                }}
              >
                <CardContent>
                  <SettingsIcon />
                  <p>Settings</p>
                </CardContent>
              </Card>
            </div>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
