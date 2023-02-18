"use client";

import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const stocks: any = [
  { symbol: "AAPL", name: "Apple Inc.", price: 140.32 },
  { symbol: "GOOG", name: "Alphabet Inc.", price: 2223.54 },
  { symbol: "TSLA", name: "Tesla, Inc.", price: 801.83 },
  { symbol: "AMZN", name: "Amazon.com, Inc.", price: 3113.86 },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 232.91 },
  { symbol: "FB", name: "Facebook, Inc.", price: 270.31 },
  { symbol: "V", name: "Visa Inc.", price: 221.75 },
  { symbol: "JNJ", name: "Johnson & Johnson", price: 160.3 },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 157.47 },
];

const Portfolio = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [shares, setShares] = useState(0);
  const [lastId, setLastId] = useState(6);
  const [purchasedStocks, setPurchasedStocks] = useState([
    {
      id: 1,
      symbol: "AAPL",
      shares: 5,
      purchasePrice: 130.0,
      purchaseDate: "2022-01-01",
    },
    {
      id: 2,
      symbol: "TSLA",
      shares: 2,
      purchasePrice: 700.0,
      purchaseDate: "2022-01-02",
    },
    {
      id: 3,
      symbol: "GOOG",
      shares: 10,
      purchasePrice: 2000.0,
      purchaseDate: "2022-01-03",
    },
    {
      id: 4,
      symbol: "AMZN",
      shares: 7,
      purchasePrice: 2800.0,
      purchaseDate: "2022-01-04",
    },
    {
      id: 5,
      symbol: "MSFT",
      shares: 3,
      purchasePrice: 220.0,
      purchaseDate: "2022-01-05",
    },
    {
      id: 6,
      symbol: "FB",
      shares: 20,
      purchasePrice: 220.0,
      purchaseDate: "2022-01-06",
    },
  ]);
  const [netProfitLoss, setNetProfitLoss] = useState(0);
  const [pastProfitLoss, setPastProfitLoss] = useState(0);

  const updateNetProfitLoss = () => {
    let net = 0;
    purchasedStocks.forEach((stock) => {
      const stockInfo = stocks.find((s: any) => s.symbol === stock.symbol);
      if (stockInfo != undefined) {
        net += (stockInfo.price - stock.purchasePrice) * stock.shares;
      }
    });
    setNetProfitLoss(net);
  };
  const updatePastProfitLoss = (e: number) => {
    const past = pastProfitLoss + e;
    setPastProfitLoss(past);
  };
  const handleStockSelection = (e: any) => {
    setSelectedStock(e.target.value);
  };

  const handleSharesChange = (e: any) => {
    setShares(e.target.value);
  };

  const handleStockPurchase = () => {
    if (!selectedStock || !shares) {
      return;
    }
    const r = lastId + 1;
    setLastId(lastId + 1);
    const newStock = {
      id: r,
      symbol: selectedStock,
      shares: shares,
      purchasePrice: stocks.find((s: any) => s.symbol === selectedStock)?.price,
      purchaseDate: new Date().toISOString().substring(0, 10),
    };
    // @ts-ignore
    setPurchasedStocks([...purchasedStocks, newStock]);
    setShares(0);
    setSelectedStock(null);
    updateNetProfitLoss();
  };

  const handleStockSell = (stockToSell: any) => {
    setPurchasedStocks(
      purchasedStocks.filter((stock) => stock.id !== stockToSell.id)
    );
    const lossEarn =
      (stocks.find((s: any) => s.symbol === stockToSell.symbol)?.price -
        stockToSell.purchasePrice) *
      stockToSell.shares;
    updatePastProfitLoss(lossEarn);
    updateNetProfitLoss();
  };

  return (
    <div className="px-6">
      <Grid justifyContent="center" style={{ textAlign: "center" }}>
        <Container style={{ padding: 20 }}>
          <Typography align="center" variant="h2">
            Investment Simulation
          </Typography>
          <div>
            <Typography variant="h3">
              Past Profit/Loss:{" "}
              <span
                style={{
                  color:
                    pastProfitLoss > 0
                      ? "green"
                      : pastProfitLoss < 0
                      ? "red"
                      : "white",
                }}
              >
                ${pastProfitLoss.toFixed(2)}
              </span>
            </Typography>
          </div>
          <div>
            <Typography variant="h3">
              Net Profit/Loss:{" "}
              <span
                style={{
                  color:
                    netProfitLoss > 0
                      ? "green"
                      : netProfitLoss < 0
                      ? "red"
                      : "white",
                }}
              >
                ${netProfitLoss.toFixed(2)}
              </span>
            </Typography>
          </div>
        </Container>
      </Grid>

      <div>
        <Box>
          <Box>
            <Table sx={{ border: 1 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    ID
                  </TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    Company
                  </TableCell>
                  <TableCell>Shares</TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    Purchase Price
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    Current Price
                  </TableCell>
                  <TableCell>Profit/Loss</TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    Purchase Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purchasedStocks.map((stock) => {
                  const stockInfo: any = stocks.find(
                    (s: any) => s.symbol === stock.symbol
                  );
                  return (
                    <TableRow key={stock.symbol}>
                      <TableCell
                        sx={{ display: { xs: "none", sm: "table-cell" } }}
                      >
                        {stock.id}
                      </TableCell>
                      <TableCell>{stock.symbol}</TableCell>
                      <TableCell
                        sx={{ display: { xs: "none", sm: "table-cell" } }}
                      >
                        {stockInfo.name}
                      </TableCell>
                      <TableCell>{stock.shares}</TableCell>
                      <TableCell
                        sx={{ display: { xs: "none", sm: "table-cell" } }}
                      >
                        ${stock.purchasePrice}
                      </TableCell>
                      <TableCell
                        sx={{ display: { xs: "none", sm: "table-cell" } }}
                      >
                        ${stockInfo.price}
                      </TableCell>
                      <TableCell>
                        $
                        {(
                          (stockInfo.price - stock.purchasePrice) *
                          stock.shares
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell
                        sx={{ display: { xs: "none", sm: "table-cell" } }}
                      >
                        {stock.purchaseDate}
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleStockSell(stock)}>
                          Sell
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Box>
        <Grid justifyContent="center" style={{ textAlign: "center" }}>
          <div>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel id="">Stock name</InputLabel>
              <Select
                value={selectedStock}
                onChange={handleStockSelection}
                label="Stock name"
              >
                {stocks.map((stock: any) => (
                  <MenuItem key={stock.symbol} value={stock.symbol}>
                    {stock.name}
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
                variant="contained"
                color="primary"
                onClick={handleStockPurchase}
              >
                Purchase
              </Button>
            </FormControl>
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default Portfolio;
