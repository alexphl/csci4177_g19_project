"use client"
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Typography from '@mui/material/Typography';

const Buy = () => {
  const router = useRouter();
  const [shares, setShares] = useState(0);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const owner_id = "user1";
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
  // handle purchase
  const handleStockPurchase = async () => {
    if (!selectedStock || !shares) {
      return;
    }
    setIsSubmitting(true);
    const stockPrice = await fetchStockPrice(selectedStock.symbol);
    console.log(selectedStock.symbol);
    // In the case stockInfo is not defined, throw an error
    if (!stockPrice) {
      throw new Error(`Stock with symbol ${selectedStock} not found`);
    }
    const payload = {
      owner_id: owner_id, // Todo
      ticker: selectedStock.symbol,
      quantity: shares,
      asset_type: "Stock",
      asset_name: selectedStock.symbol,
      purchase_price: stockPrice ?? 0,

    };
    console.log(payload);
    const response = await fetch('/api/simulation/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const updatedPortfolio = await response.json();
      router.push('/dashboard/simulation/');
      setIsSubmitting(false); // Set isSubmitting back to false when the request finishes but received a failed
    } else {
      setIsSubmitting(false); // Set isSubmitting back to false when the request finishes but received a failed
      console.error('Error purchasing stock');

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
  // handle stock share input for purchase function
  const handleSharesChange = (e: any) => {
    setShares(e.target.value);
  };

  return (

    <Grid justifyContent="center" style={{ textAlign: 'center' }}>
      <Typography variant="h3"><strong className="text-4xl text-white">BUY</strong></Typography>
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
          <Button onClick={handleStockPurchase} disabled={isSubmitting}
            color="primary"
          >
            Purchase
          </Button>
          <Link href="/dashboard/simulation" passHref>
            <Button
              color="secondary"
            >
              BACK
            </Button>
          </Link>
        </FormControl>

      </div>
    </Grid>
  );
}
export default Buy;
