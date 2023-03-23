"use client"
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
  Button,
  TableHead,
  Container,
  Grid
} from '@mui/material';

const owner_id = "user1";
// hardcode of stock current price [To be deleted]

// Style page
const stylePane =
  "bg-black sm:border border-neutral-800 flex-auto sm:rounded-2xl h-screen shadow-xl p-4 overflow-auto scrollbar-hide pb-32 transition-all";

// Main Code
export default function Portfolio() {

  // UseStates
  const [netProfitLoss, setNetProfitLoss] = useState(0);
  const [sharesToSell, setSharesToSell] = useState<any>({});
  const [intervalMs, setIntervalMs] = useState(1000);
  const [searchResults, setSearchResults] = useState([]);

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
  const fetchStockPrices = async (purchasedStocks: any[]) => {
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
    data: stockPrices,
    refetch: refetchStockPrices,
  } = useQuery(["stockPrices", purchasedStocks.map((stock: { symbol: any; }) => stock.symbol)], () => fetchStockPrices(purchasedStocks),
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


  // handle Sell
  const handleStockSell = async (stockToSell: any, sharesToSell: any) => {
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
    <div className="container max-w-5xl sm:px-8 mx-auto flex-auto">
      <Grid justifyContent="center" style={{ textAlign: 'center' }}>
        <Container style={{ padding: 20 }}>
          <div>
            <Typography variant="h3"><strong className="text-4xl text-white">Profit: <span style={{ color: pastProfitLoss > 0 ? 'green' : pastProfitLoss < 0 ? 'red' : '' }}>${pastProfitLoss ? pastProfitLoss.toFixed(2) : '0.00'}</span></strong></Typography>
          </div>
          <div>
            <Typography variant="h3"><strong className="text-4xl text-white">Unrealized Profit: <span style={{ color: netProfitLoss > 0 ? 'green' : netProfitLoss < 0 ? 'red' : '' }}>${netProfitLoss.toFixed(2)}</span></strong></Typography>
          </div>
        </Container>
      </Grid>
      <Link href="/dashboard/simulation/transhistory" passHref>
        <Button
          color="secondary"
        >
          Transaction History
        </Button>
      </Link>
      <Link href="/dashboard/simulation/buy" passHref>
        <Button
          color="secondary"
        >
          Buy a new stock
        </Button>
      </Link>
      <div className={stylePane}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>ID</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Shares</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Purchase Price</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Current Price</TableCell>
              <TableCell>Profit/Loss</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Purchase Date</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}></TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Sell Num</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchasedStocks.map((stock: any) => {
              const stockPrice = stockPrices && typeof stock.symbol === 'string' ? stockPrices[stock.symbol] : undefined;
              return (
                <TableRow key={stock.symbol}>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    {stock.id.slice(-3)}
                  </TableCell>

                  <TableCell >{stock.symbol}</TableCell>

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
                      fullWidth
                    />
                  </TableCell>

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>

  );

}
