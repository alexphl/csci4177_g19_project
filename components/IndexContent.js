import Search from '@components/CustomerSearch';

import Divider  from '@mui/material/Divider'

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
        <Divider />
        <h2 align = "middle">Explore</h2>
        <p align = "middle">View analytic tools like charts, graphs and maps of StockVision's users:</p>
    </div>
    )
}
