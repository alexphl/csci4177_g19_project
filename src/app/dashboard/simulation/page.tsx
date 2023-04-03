/**Author: Herman Liang B00837314 */
"use client"
// Module import
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useContext } from "react"; 
import { userContext } from "@/app/UserContext";
import {
  Table,
  TableBody,
  Select,
  MenuItem,
  TableCell,
  TableRow,
  TextField,
  Typography,
  Button,
  TableHead,
  Container,
  Grid,
  NoSsr
} from '@mui/material';
import { motion } from 'framer-motion';
// [To Do] Replaced by a real user ID




// Main style of table
const stylePane =
  "bg-black sm:border border-neutral-800 flex-auto sm:rounded-2xl h-screen shadow-xl p-4 overflow-auto scrollbar-hide pb-32 transition-all";
// Main Code of Portfolio Component
export default function Portfolio() {
  const {user} = useContext<any>(userContext); 
  const owner_id = user.email;
  const owner_email = user.email;
  console.log(owner_email);
  console.log(owner_id);
  // UseStates
  const [isSellPopupOpen, setIsSellPopupOpen] = useState(false);
  const [netProfitLoss, setNetProfitLoss] = useState(0);
  const [sharesToSell, setSharesToSell] = useState<any>({});
  const [intervalMs, setIntervalMs] = useState(1000);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  


  // Framer motions
  const tableVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
    exit: { opacity: 0 },
  };

  const rowVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };
  //
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${month} ${day}, ${year}, ${formattedHours}:${formattedMinutes} ${amOrPm}`;
  };
  // [Function] Fetch a single stock price
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
  
  // [UseQuery and Related Functions]
  // [Function] Fetch whole asset of a user
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
  // [UseQuery] Retrieve the data to purchasedStocks
  const {
    data: purchasedStocks,
    isLoading: isLoadingPurchasedStocks,
    isError: isErrorPurchasedStocks,
    refetch: refetchPurchasedStocks,
  } = useQuery(["purchasedStocks"], fetchUserPortfolio, {
    initialData: [],
    refetchOnWindowFocus: false,
  });

  // [Function] Fetch accounts
  const fetchAccounts = async () => {
    const response = await fetch(`/api/simulation/accounts?email=${owner_email}`);
    const data = await response.json();
    const accounts = data.accounts;
    return accounts;
  };
  // [useQuery] Retrieve the data to accounts
  const {
    data: accounts,
    isLoading: isLoadingAccounts,
    isError: isErrorAccounts,
    refetch: refetchAccounts,
  } = useQuery(["accounts"], fetchAccounts, {
    initialData: [],
    refetchOnWindowFocus: false,
  });

  // [Function] Fetch stock prices of purchasedStocks[aka. asset]
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
  // [UseQuery] Retrieve the data to stockPrices
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
  
  // [Function] Fetch Profit/Loss from MongoDB's pastprofitLoss
  const fetchPastProfitLoss = async () => {
    const response = await fetch(`/api/simulation/profit/${owner_id}`);
    const data = await response.json();
    return data;
  };
  // [UseQuery] Retrieve the data to pastProfitLoss
  const {
    data: pastProfitLoss,
    isLoading: isLoadingPastProfitLoss,
    isError: isErrorPastProfitLoss,
    refetch: refetchPastProfitLoss,
  } = useQuery(["pastProfitLoss"], fetchPastProfitLoss, {
    initialData: 0,
    refetchOnWindowFocus: false,
  });

  // [Function] update net profit and loss [aka. Unrealized profit]
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
  
  // Handle Purchase_date Change
  const handleDateChange = async (stock: any, newDate: string) => {
    console.log("dateChange");
    // Fetch historical price for the given date
    
    const unixTimestamp = Math.floor(new Date(newDate).getTime() / 1000)+4*60*60;
    
    const response =  await fetch(`/api/stocks/stock/${stock.symbol}/price/${unixTimestamp}`);
    const msUnixTimeStamp =  (Math.floor(new Date(newDate).getTime() / 1000)+4*60*60)*1000;
    if (response.ok) {
      // Update the purchase price for the stock
      const historicalPrice = await response.json();
     
      const newresponse = await fetch('/api/simulation/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          owner_id: owner_id,
          asset_id: stock.id,
          newPurchaseDate: msUnixTimeStamp,
          newPurchasePrice: historicalPrice.price,
        }),
      });
        if (newresponse.ok) {
          const updatedStockData = await newresponse.json();
          console.log('Stock updated:', updatedStockData);
          refetchPurchasedStocks(); // Refetch the stocks after the update
        } else {
          console.error('Error updating the stock');
        }
    } else {
      console.error("Error fetching historical price for the new date");
    }
  };
  // [Function] Accounts on click
  const handleAccountClick = async () => {
    console.log(`Clicked on account: ${selectedAccount}`);
    const response1 = await fetch(`/api/simulation/stocks/${owner_email}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response1.ok) {
      throw new Error('Error fetching accounts');
    }
    const response = await fetch(`/api/simulation/holdingsync/${selectedAccount}/${owner_email}`);
    if (!response.ok) {
      throw new Error('Error fetching accounts');
    }

    refetchPurchasedStocks();
    return response.json();

    // Add your desired onClick functionality here
  };
  // [Function] Sell a stock
  const handleStockSell = async (stockToSell: any, sharesToSell: any) => {
    if (!stockToSell || !sharesToSell) {
      console.error('Stock or shares not provided');
      return;
    }
    const stockPrice = await fetchStockPrice(stockToSell.symbol);
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
  // Page Construction
  return (
    <div className="container max-w-5xl sm:px-8 mx-auto flex-auto">
      <Grid justifyContent="center" style={{ textAlign: 'center' }}>
        <motion.div initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
          <Container style={{ padding: 20 }}>
            <div>
              {/* <Typography variant="h3">
                <strong className="text-4xl text-white">
                  Profit: <span style={{ color: pastProfitLoss > 0 ? 'green' : pastProfitLoss < 0 ? 'red' : '' }}>
                    ${isNaN(pastProfitLoss) ? '0.00' : pastProfitLoss.toFixed(2)}
                  </span>
                </strong>
              </Typography> */}
            </div>
            <div>
              <Typography variant="h4" ><strong className="text-4xl text-white">Unrealized: <span style={{ color: netProfitLoss > 0 ? 'green' : netProfitLoss < 0 ? 'red' : '' }}>${netProfitLoss.toFixed(2)}</span></strong></Typography>
            </div>
          </Container>
        </motion.div>
      </Grid>
      
      <motion.div variants={tableVariants} initial="initial" animate="animate" exit="exit">

      <Grid container justifyContent="space-between" style={{ marginBottom: '20px' }}>
        {/* <Link href="/dashboard/simulation/transhistory" passHref>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button color="secondary" sx={{ position: 'relative' }}>
              View Transaction History
            </Button>
          </motion.div>
        </Link> */}
        <Grid>
        <Select
          value={selectedAccount}
          onChange={(event) => setSelectedAccount(event.target.value as string)}
          displayEmpty
          inputProps={{ 'aria-label': 'Select an option' }}
          sx={{ width: 200 }} 
        >
          {accounts?.map((account: any, index: number) => (
            <MenuItem key={index} value={account}>
              {account}
            </MenuItem>
          ))}
        </Select>
        <Tooltip style={{ backgroundColor: 'red', color: 'white' }} title="This action will synchronize the selected account number with the simulation account. It will erase any existing data in the simulation account, and this action cannot be undone. Please be aware of this before proceeding.">
          <Button
            color="primary"
            onClick={handleAccountClick}
          >
            Sync
          </Button>
        </Tooltip>
        </Grid>
        <Link href="/dashboard/simulation/buy" passHref>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button color="secondary" sx={{ position: 'relative' }}>
              Buy a new stock
            </Button>
          </motion.div>
        </Link>
      </Grid>

      <div className={stylePane}>
      <NoSsr>
        <Table>
          <TableHead>
            <TableRow>
              <Tooltip title="Unique ID">
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>ID</TableCell>
              </Tooltip>
              <Tooltip title="Symbol">
              <TableCell sx={{ display: { xs: 'table-cell', sm: 'none' } }}>
                Sym
              </TableCell>
              </Tooltip>
              <Tooltip title="A symbol for a stock is a unique combination of letters or characters that represents a publicly traded company on a stock exchange. ">
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                Symbol
              </TableCell>
              </Tooltip>
              
              <TableCell sx={{ display: { xs: 'table-cell', sm: 'none' } }}>
                No.
              </TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                Shares
              </TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Purchase Price</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Current Price</TableCell>
              <TableCell sx={{ display: { xs: 'table-cell', sm: 'none' } }}>
                Earn
              </TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                Profit
              </TableCell>
              <Tooltip title="Change the purchase date to see how buying a stock on that day would have turned out.">
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Purchase Date</TableCell>
              </Tooltip>
              <Tooltip title="Enter the number you want to sell here">
              <TableCell>
                Sell Num
              </TableCell>
              </Tooltip>
              <TableCell ></TableCell>
            </TableRow>
          </TableHead>
          <motion.tbody variants={tableVariants}>
   
            {purchasedStocks.map((stock: any) => {
              const stockPrice = stockPrices && typeof stock.symbol === 'string' ? stockPrices[stock.symbol] : undefined;
              const stockWithCurrentPrice = { ...stock, currentPrice: stockPrice };
              return (
                <motion.tr key={stock._id} variants={rowVariants}>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    {stock.id.slice(-3)}
                  </TableCell>
                  <TableCell >{stock.symbol}</TableCell>
                  <TableCell >{stock.shares}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>${stock.purchasePrice.toFixed(2)}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    {stockPrice ? `$${stockPrice}` : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {stockPrice
                      ? `$${((Number(stockPrice) - Number(stock.purchasePrice)) * Number(stock.shares)).toFixed(2)}`
                      : 'N/A'}
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{formatDate(stock.purchaseDate)}
                    <Tooltip title="Change the purchase date to see how buying a stock on that day would have turned out.">
                      <TextField
                        type="date"
                        value={stock.purchaseDate}
                        onChange={(e) =>
                          handleDateChange(stock, e.target.value)
                        }
                        fullWidth
                        sx={{ width: '100px' }} // Set a fixed width or maxWidth here
                      />
                    </Tooltip>
                  </TableCell>

                  <TableCell sx={{ display: {xs: 'none', sm:'table-cell'} }}>
                    
                    <TextField
                      type="number"
                      inputProps={{ min: 0, max: stock.shares }}
                      value={sharesToSell[stock.id] || 0}
                      onChange={(e) => setSharesToSell({ ...sharesToSell, [stock.id]: parseInt(e.target.value) })}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                        sx={{ display: {sm: 'none' } }}
                        type="number"
                        inputProps={{ min: 0, max: stock.shares }}
                        value={sharesToSell[stock.id] || 0}
                        onChange={(e) => setSharesToSell({ ...sharesToSell, [stock.id]: parseInt(e.target.value) })}
                        fullWidth
                      />
                    <Button size="small" onClick={() => handleStockSell(stock, sharesToSell[stock.id])}>
                      Sell
                    </Button>
                  </TableCell>
                </motion.tr>
              );
            })}
             
 
          </motion.tbody>
        </Table>
        </NoSsr>
      </div>
      </motion.div>
    </div>
  );

}
