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
import { useQuery } from "@tanstack/react-query";
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';




const owner_id = "user1";
// hardcode of stock current price [To be deleted]
// Main Code
const Portfolio = () => {
  // UseStates 
  const [selectedStock, setSelectedStock] = useState(null);
  const [shares, setShares] = useState(0);
  const [netProfitLoss, setNetProfitLoss] = useState(0);
  const [sharesToSell, setSharesToSell] = useState({});
  const [intervalMs, setIntervalMs] = React.useState(1000);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  // UseQuery() and related functions
  // UseQuery() function for fetch Portfolio
  const fetchUserPortfolio = async () => {
    const response = await fetch(`/api/simulation/portfolio/${owner_id}`);
    const data = await response.json();
    const formattedAssets = data.map((asset: { _id: any; ticker: any; asset_name: any; quantity: any; purchase_price: any; purchase_date: any; }) => {
      return {
        id: asset._id,
        symbol: asset.ticker,
        name: asset.asset_name,
        shares: asset.quantity,
        purchasePrice: asset.purchase_price,
        purchaseDate: asset.purchase_date,
      };
    });
    return formattedAssets;
  };
  const {
    data: purchasedStocks,
    isLoading: isLoadingPurchasedStocks,
    isError: isErrorPurchasedStocks,
    refetch: refetchPurchasedStocks,
  } = useQuery(["purhcasedStocks"], fetchUserPortfolio, {
    initialData: [],
    refetchOnWindowFocus: false,
  });
  // useQuery() function for fetch Quotes
  const fetchStockPrices = async (purchasedStocks:any[]) =>{
    const requests = purchasedStocks.map((stock) => {
      return fetch(`/api/stocks/quote/${stock.symbol}`);
    });
  
    const responses = await Promise.all(requests);
  
    const prices = await Promise.all(
      responses.map((response) => response.json())
    );

    const result = prices.reduce((accumulator, price, index) => {
      const symbol = purchasedStocks[index].symbol;
      accumulator[symbol] = price.c;
      return accumulator;
    }, {});
    return result;
  }

  const {
    data : stockPrices,
    refetch: refetchStockPrices ,
  } =  useQuery( ["stockPrices", purchasedStocks.map((stock: { symbol: any; }) => stock.symbol)], ()=>fetchStockPrices(purchasedStocks),
  {
    refetchInterval: intervalMs,
    refetchOnWindowFocus: false, 
    onSuccess: () => updateNetProfitLoss(),
  });
  console.log("Stock prices from useQuery:", stockPrices); 


  // UseQuery() function for fetch Profit and Loss
  const fetchPastProfitLoss = async () => {
    const response = await fetch(`/api/simulation/profit/${owner_id}`);
    const data = await response.json();
    return data;
  };

  const {
    data: pastProfitLoss,
    isLoading: isLoadingPastProfitLoss,
    isError: isErrorPastProfitLoss,
    refetch: refetchPastProfitLoss,
  } = useQuery(["pastProfitLoss"], fetchPastProfitLoss, {
    initialData: 0,
    refetchOnWindowFocus: false,
  });
  // fetch a single stock price
  const fetchStockPrice = async (symbol: String) => {
    try {
      const response = await fetch(`/api/stocks/quote/${symbol}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch stock price for ${symbol}`);
      }
      const data = await response.json();
      return data.c; 
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  // handle stock Purchase function
  const handleSearchInputChange = async (event: any, value: string) => {
    setSearchQuery(value);
  
    if (value.length >= 2) {
      setLoading(true);
  
      try {
        const response = await fetch(`/api/stocks/search/${value}`);
        if (!response.ok) {
          console.log(`Failed to search for stocks with the symbol ${value}`);
        }
        const data = await response.json();
        setSearchResults(data.result);
      } catch (error) {
        console.error(error);
      }
  
      setLoading(false);
    } else {
      setSearchResults([]);
    }
  };
  // updateNetProfitLoss
  const updateNetProfitLoss = () => {
    let net = 0;
    purchasedStocks.forEach((stock: { symbol: string; purchasePrice: number; shares: number; }) => {
      const stockPrice = stockPrices && typeof stock.symbol === 'string' ? stockPrices[stock.symbol] : undefined;
      // In the case stockInfo is not defined, throw an error
      if (!stockPrice) {
        console.log(`Stock with symbol ${stock.symbol} not found`);
      }
      net += (stockPrice - stock.purchasePrice) * stock.shares;
    });
    setNetProfitLoss(net);
  };
  
  // handle stock share input for purchase function
  const handleSharesChange = (e: { target: { value: React.SetStateAction<number>; }; }) => {
    setShares(e.target.value);
  };
  // handle purchase
  const handleStockPurchase = async () => {
    if (!selectedStock || !shares) {
      return;
    }
    const stockPrice = await fetchStockPrice(selectedStock);
    // In the case stockInfo is not defined, throw an error
    if (!stockPrice) {
      throw new Error(`Stock with symbol ${selectedStock} not found`);
    }
    const payload = {
      owner_id: owner_id, // Todo
      ticker: selectedStock,
      quantity: shares,
      asset_type: "Stock",
      asset_name: selectedStock,
      purchase_price: stockPrice??0,
 
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
      refetchPurchasedStocks();
      refetchPastProfitLoss();
      setShares(0);
      setSelectedStock(null);
      updateNetProfitLoss();
      refetchStockPrices();
    } else {
      console.error('Error purchasing stock');
    }
  };

  // handle Sell
  const handleStockSell = async (stockToSell:any, sharesToSell:any) => {
    if (!stockToSell || !sharesToSell) {
      console.error('Stock or shares not provided');
      return;
    }
    const stockPrice = await fetchStockPrice(stockToSell.symbol);
    // In the case stockInfo is not defined, throw an error
    if (!stockPrice) {
      throw new Error(`Stock with symbol ${stockToSell.symbol} not found`);
    }
    const payload = {
      owner_id: 'user1', // To do
      ticker: stockToSell.symbol,
      quantity: parseInt(sharesToSell),
      sell_price: stockPrice,
      asset_id: stockToSell.id,
    };


    const response = await fetch('/api/simulation/sell', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const updatedPortfolio = await response.json();
      refetchPurchasedStocks();
      refetchPastProfitLoss();
      updateNetProfitLoss();
      refetchStockPrices();
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
             <Typography variant="h3">Past Profit/Loss: <span style={{ color: pastProfitLoss > 0 ? 'green' : pastProfitLoss < 0 ? 'red' : '' }}>${pastProfitLoss ? pastProfitLoss.toFixed(2) : '0.00'}</span></Typography>

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
                {purchasedStocks.map((stock: { symbol: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; id: boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.Key | null | undefined; purchase_price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; shares: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; purchasePrice: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; purchaseDate: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
                  const stockPrice = stockPrices && typeof stock.symbol === 'string' ? stockPrices[stock.symbol] : undefined;

                  return (
                    <TableRow key={stock.id}>
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{stock.id}</TableCell>
                      <TableCell >{stock.symbol}</TableCell>
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{stock.purchase_price}</TableCell>
                      <TableCell >{stock.shares}</TableCell>
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>${stock.purchasePrice}</TableCell>
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                        {stockPrice ? `$${stockPrice}` : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {stockPrice
                          ? `$${((Number(stockPrice) - Number(stock.purchasePrice)) * Number(stock.shares)).toFixed(2)}`
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
              <Autocomplete
                options={searchResults}
                loading={loading}
                getOptionLabel={(option: any) => `${option.symbol} - ${option.description}`}
                value={selectedStock}
                onChange={(event: any, newValue: any) => setSelectedStock(newValue || null)}
                onInputChange={handleSearchInputChange}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    label="Stock name"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>

                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
          </>
        ),
      }}
    />
  )}
/>
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
              <Button onClick={handleStockPurchase}
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
