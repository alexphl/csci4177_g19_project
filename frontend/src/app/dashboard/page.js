"use client";

import Link from "next/link";

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
import { ChartBarIcon } from "@heroicons/react/20/solid";

const h2Style = "mt-6 text-xl font-bold";
const subheadingStyle = "text-sm font-medium text-neutral-400";

export default function IndexContent() {
  return (
    <div color="primary" className="mb-12">
      <h1 className="pt-12 pb-6 text-2xl leading-relaxed text-neutral-400">
        Welcome to <br/> <strong className="text-white text-4xl">STOCKVISION</strong>
      </h1>

      <h2 className={h2Style}>
        Search
      </h2>
      <div>
        <p className={subheadingStyle}>Search for customers by name, username, email or street address:</p>
        <Search />
        <br />
      </div>

      <h2 className={h2Style}>
        Browse
      </h2>
      <p className={subheadingStyle}>Browse customers, accounts and transactions: </p>

      <Grid container spacing={2} align="center" className="mt-2">
        <Grid item xs={4}>
          <Link href="/stocks/">
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
                  <ChartBarIcon className="h-7 w-5 " />
                  <p sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Stocks
                  </p>
                </CardContent>
              </Card>
            </div>
          </Link>
        </Grid>
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
      <h2 className={h2Style}>
        Explore
      </h2>
      <p className={subheadingStyle}>
        View analytic tools like charts, graphs and maps of StockVision&apos;s users:
      </p>
      <Grid container spacing={2} align="center" className="mt-2">
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
      <h2 className={h2Style}>
        Configure
      </h2>
      <p className={subheadingStyle}>View, edit and manage your profile settings:</p>
      <Grid container spacing={2} align="center" className="mt-2">
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
