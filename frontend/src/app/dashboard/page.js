'use client'

import Link from 'next/link'

import Divider  from '@mui/material/Divider'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import SettingsIcon from '@mui/icons-material/Settings';

import Search from './CustomerSearch';

export default function IndexContent() {
  return (
    <div color = "primary">
        <h1 align = "middle">Welcome to STOCKVISION!</h1>
        <Divider />
        <h2 align = "middle">Search</h2>
        <div align = "middle">Search for customers by name, username, email or street address:
        <Search />
        <br/>
        </div>
        <Divider />
        <h2 align = "middle">Browse</h2>
        <p align = "middle">Browse customers, accounts and transactions: </p>
        <Grid container spacing={2} align = "center">
            <Grid item xs={4}>
                <Link href = "/customers/" >
                    <div style={{ textDecoration: 'none' }}>
                        <Card sx={{
                                display: 'flex',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'background.primary',
                                color: 'text.primary',
                                borderRadius: 1,
                                p: 3,
                        }}>
                            <CardContent >
                                <PeopleAltIcon />
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Customers
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Link>
            </Grid>
            <Grid item xs={4}>
                <Link href = "/accounts/">
                    <div style={{ textDecoration: 'none' }}>
                    <Card sx={{
                                display: 'flex',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'background.primary',
                                color: 'text.primary',
                                borderRadius: 1,
                                p: 3,
                    }}>
                            <CardContent>
                                <AccountBalanceWalletIcon />
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Accounts
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Link>
            </Grid>
            <Grid item xs={4}>
                <Link href = "/transactions">
                    <div style={{ textDecoration: 'none' }}>
                    <Card sx={{
                                display: 'flex',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'background.primary',
                                color: 'text.primary',
                                borderRadius: 1,
                                p: 3,
                        }}>
                            <CardContent>
                                <ReceiptIcon />
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Transactions
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Link>
            </Grid>
        </Grid>
        <br/>
        <Divider />
        <h2 align = "middle">Explore</h2>
        <p align = "middle">View analytic tools like charts, graphs and maps of StockVision's users:</p>
        <Grid container spacing={2} align = "center">
            <Grid item xs={6}>
                <Link href = "/analytics/">
                    <div style={{ textDecoration: 'none' }}>
                    <Card sx={{
                                display: 'flex',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'background.primary',
                                color: 'text.primary',
                                borderRadius: 1,
                                p: 3,
                        }}>
                            <CardContent>
                                <AssessmentIcon />
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Analytics
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Link>
            </Grid>
            <Grid item xs={6}>
                <Link href = "/map/">
                    <div style={{ textDecoration: 'none' }}>
                    <Card sx={{
                                display: 'flex',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'background.primary',
                                color: 'text.primary',
                                borderRadius: 1,
                                p: 3,
                        }}>
                            <CardContent >
                                <PersonPinCircleIcon />
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Map
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Link>
            </Grid>
        </Grid>
        <br/>
        <Divider />
        <h2 align = "middle">Configure</h2>
        <p align = "middle">View, edit and manage your profile settings:</p>
        <Grid container spacing={2} align = "center">
            <Grid item xs={12}>
                <Link href = "/settings/">
                    <div style={{ textDecoration: 'none' }}>
                    <Card sx={{
                                display: 'flex',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'background.primary',
                                color: 'text.primary',
                                borderRadius: 1,
                                p: 3,
                        }}>
                            <CardContent >
                                <SettingsIcon />
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Settings
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Link>
            </Grid>
        </Grid>
        <br/>
    </div>
    )
}
