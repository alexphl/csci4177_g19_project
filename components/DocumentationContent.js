import Link from 'next/link'

import Divider  from '@mui/material/Divider'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import SettingsIcon from '@mui/icons-material/Settings';

import Search from '@components/CustomerSearch';

export default function IndexContent() {
  return (
    <div color = "primary">
        <h1 align = "middle">Welcome to STOCKVISION!</h1>
    </div>
    )
}
