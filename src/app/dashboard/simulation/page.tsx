"use client"
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from "next/link";






const owner_id = "user1";
const stocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 140.32 },
  { symbol: 'GOOG', name: 'Alphabet Inc.', price: 2223.54 },
  { symbol: 'TSL', name: 'Tesla, Inc.', price: 801.83 },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 3113.86 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 232.91 },
  { symbol: 'FB', name: 'Facebook, Inc.', price: 270.31 },
  { symbol: 'V', name: 'Visa Inc.', price: 221.75 },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 160.30 },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 157.47 },
];

const Portfolio = () => {
  //const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [shares, setShares] = useState(0);
  const [lastId, setLastId] = useState(6);
  const [purchasedStocks, setPurchasedStocks] = useState([]);
  const [netProfitLoss, setNetProfitLoss] = useState(0);
  const [pastProfitLoss, setPastProfitLoss] = useState(0);
  const [sharesToSell, setSharesToSell] = useState({});

  useEffect(() => {
    const fetchUserPortfolio = async () => {
      const response = await fetch(`/api/simulation/portfolio/${owner_id}`);
      const data = await response.json();
      const formattedAssets = data.map(asset => {
        return {
          id: asset._id,
          symbol: asset.ticker,
          name: asset.asset_name,
          shares: asset.quantity,
          purchasePrice: asset.purchase_price,
          purchaseDate: asset.purchase_date,
        };
      });
      setPurchasedStocks(formattedAssets);
    };

    const fetchPastProfitLoss = async () => {
      // Fetch past profit/loss data
      const response = await fetch(`/api/simulation/profit/${owner_id}`);
      const data = await response.json();
      console.log(data);
      setPastProfitLoss(data);
    };

    fetchUserPortfolio();
    fetchPastProfitLoss();

  }, [purchasedStocks]);
  const updateNetProfitLoss = () => {
    let net = 0;
    purchasedStocks.forEach(stock => {
      const stockInfo = stocks.find(s => s.symbol === stock.symbol);
      if (stockInfo != undefined) {
        net += (stockInfo.price - stock.purchasePrice) * stock.shares;
      }
    });
    setNetProfitLoss(net);

  };
  const updatePastProfitLoss = (e) => {
    let past = pastProfitLoss + e;
    setPastProfitLoss(past);
  }
  const handleStockSelection = (e) => {
    setSelectedStock(e.target.value);
  };

  const handleSharesChange = (e) => {
    setShares(e.target.value);
  };

  const handleStockPurchase = async () => {
    if (!selectedStock || !shares) {
      return;
    }
    const stockInfo = stocks.find(s => s.symbol === selectedStock);
    const payload = {
      owner_id: owner_id, // replace this with the actual owner_id
      ticker: selectedStock,
      quantity: parseInt(shares),
      asset_type: "Stock",
      asset_name: selectedStock,
      purchase_price: stockInfo.price,

    };

    const response = await fetch('/api/simulation/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const updatedPortfolio = await response.json();
      setPurchasedStocks(updatedPortfolio.assets);
      setShares(0);
      setSelectedStock(null);
      updateNetProfitLoss();
    } else {
      console.error('Error purchasing stock');
    }
  };


  const handleStockSell = async (stockToSell, sharesToSell) => {
    if (!stockToSell || !sharesToSell) {
      console.error('Stock or shares not provided');
      return;
    }

    const payload = {
      owner_id: 'user1', // replace this with the actual owner_id
      ticker: stockToSell.symbol,
      quantity: parseInt(sharesToSell),
      sell_price: stocks.find((s) => s.symbol === stockToSell.symbol).price,
      asset_id: stockToSell.id,
    };

    console.log('Payload:', payload);

    const response = await fetch('/api/simulation/sell', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const updatedPortfolio = await response.json();
      setPurchasedStocks(updatedPortfolio.assets);
      setPastProfitLoss(updatedPortfolio.profit);
      updateNetProfitLoss();
    } else {
      console.error('Error selling stock', await response.json());
    }
  };



  return (



      <div className="container max-w-5xl px-8 mx-auto">
        <Grid justifyContent="center" style={{ textAlign: 'center' }}>
          <Container style={{ padding: 20 }}>
            <Typography align="center" variant="h2" >Investment Simulation</Typography>
            <div>
              <Typography variant="h3">Past Profit/Loss: <span style={{ color: pastProfitLoss > 0 ? 'green' : pastProfitLoss < 0 ? 'red' : '' }}>${pastProfitLoss.toFixed(2)}</span></Typography>
            </div>
            <div>
              <Typography variant="h3">Net Profit/Loss: <span style={{ color: netProfitLoss > 0 ? 'green' : netProfitLoss < 0 ? 'red' : '' }}>${netProfitLoss.toFixed(2)}</span></Typography>
            </div>
          </Container>
        </Grid>

    
      <div>
        <Box >

          <Box >
            <Table sx={{ border: 1 }} >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>ID</TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Company</TableCell>
                  <TableCell>Shares</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Purchase Price</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Current Price</TableCell>
                  <TableCell>Profit/Loss</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Purchase Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purchasedStocks.map((stock) => {
                  console.log(stock.symbol);
                  const stockInfo = stocks.find(s => s.symbol === stock.symbol);
                  return (
                    <TableRow key={stock.id}>
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{stock.id}</TableCell>
                      <TableCell >{stock.symbol}</TableCell>
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{stock.purchase_price}</TableCell>
                      <TableCell >{stock.shares}</TableCell>
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>${stock.purchasePrice}</TableCell>
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                        {stockInfo ? `$${stockInfo.price}` : 'N/A'}
                      </TableCell>

                      <TableCell>
                        {stockInfo
                          ? `$${((stockInfo.price - stock.purchasePrice) * stock.shares).toFixed(2)}`
                          : 'N/A'}
                      </TableCell>

                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{stock.purchaseDate}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleStockSell(stock, sharesToSell[stock.id])}>
                          Sell
                        </Button>
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          inputProps={{ min: 0, max: stock.shares }}
                          value={sharesToSell[stock.id] || 0}
                          onChange={(e) => setSharesToSell({ ...sharesToSell, [stock.id]: parseInt(e.target.value) })}
                        />
                      </TableCell>

                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Box>
        <Grid justifyContent="center" style={{ textAlign: 'center' }}>
          <div>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel id="">Stock name</InputLabel>
              <Select
                value={selectedStock}
                onChange={handleStockSelection}
                label="Stock name"
              >
                {stocks.map(stock => (
                  <MenuItem key={stock.symbol} value={stock.symbol}>
                    {stock.symbol}
                  </MenuItem>
                ))}
              </Select>
              <br />
              <br />
              <TextField
                label="Shares"
                type="number"
                value={shares}
                onChange={handleSharesChange}
                variant="outlined"
              />
              <br />
              <br />
              <Button
                color="primary"
              >
                Purchase
              </Button>
            </FormControl>
            <Link href="/dashboard/simulation/transhistory" passHref>
              <Button
                color="secondary"
              >
                Transaction History
              </Button>
            </Link>
          </div>
        </Grid>
      </div>
      </div>

  );

};

export default Portfolio;
