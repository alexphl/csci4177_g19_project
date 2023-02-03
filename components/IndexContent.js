import Search from '@components/CustomerSearch';

import Link from 'next/link'

import Divider  from '@mui/material/Divider'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import SettingsIcon from '@mui/icons-material/Settings';

export default function IndexContent() {
  return (
    <div>
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
            <Grid item xs={4} spacing = {1} >
                <Link href = "/customers/">
                    <a>
                        <Card >
                            <CardContent >
                                <PeopleAltIcon/>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Customers
                                </Typography>
                            </CardContent>
                        </Card>
                    </a>
                </Link>
            </Grid>
            <Grid item xs={4} spacing = {1}>
                <Link href = "/accounts/">
                    <a>
                        <Card >
                            <CardContent>
                                <AccountBalanceWalletIcon />
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Accounts
                                </Typography>
                            </CardContent>
                        </Card>
                    </a>
                </Link>
            </Grid>
            <Grid item xs={4} spacing = {1}>
                <Link href = "/transactions">
                    <a>
                        <Card >
                            <CardContent>
                                <ReceiptIcon />
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Transactions
                                </Typography>
                            </CardContent>
                        </Card>
                    </a>
                </Link>
            </Grid>
        </Grid>
        <br/>
        <Divider />
        <h2 align = "middle">Explore</h2>
        <p align = "middle">View analytic tools like charts, graphs and maps of StockVision's users:</p>
        <Grid container spacing={2} align = "center">
            <Grid item xs={6} spacing = {1}>
                <Link href = "/analytics/">
                    <a>
                        <Card >
                            <CardContent>
                                <AssessmentIcon />
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Analytics
                                </Typography>
                            </CardContent>
                        </Card>
                    </a>
                </Link>
            </Grid>
            <Grid item xs={6} spacing = {1} >
                <Link href = "/map/">
                    <a>
                        <Card >
                            <CardContent >
                                <PersonPinCircleIcon />
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Map
                                </Typography>
                            </CardContent>
                        </Card>
                    </a>
                </Link>
            </Grid>
        </Grid>
        <br/>
        <Divider />
        <h2 align = "middle">Configure</h2>
        <p align = "middle">View, edit and manage your profile settings:</p>
        <Grid container spacing={2} align = "center">
            <Grid item xs={12} spacing = {1} >
                <Link href = "/settings/">
                    <a>
                        <Card >
                            <CardContent >
                                <SettingsIcon />
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Settings
                                </Typography>
                            </CardContent>
                        </Card>
                    </a>
                </Link>
            </Grid>
        </Grid>
        <br/>
    </div>
    )
}
