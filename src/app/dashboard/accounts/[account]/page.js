"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";

import Link from "next/link";


import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button';

import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TextField from "@mui/material/TextField";

import apiURL from "@/APIurl";
const accountBaseURL = apiURL + "/account/account_id/";
const transactionsBaseURL = apiURL + "/transaction/account_id/";
const symbolsBaseURL = apiURL + "/transaction/account_id/symbols/";
const marketQuoteBaseURL = apiURL + "/stocks/prices/list/";


export default function Account({ params }) {
  const account_id = params.account;

  const account = useQuery({ queryKey: [accountBaseURL, account_id] });

  const transactions = useQuery({
    queryKey: [transactionsBaseURL, account_id],
  });

  const symbols = useQuery({
    queryKey: [symbolsBaseURL, account_id],
  });

  let transactionStatistics = {
    isSuccess : false,
    totalPurchases: 0,
    totalPurchaseAmount: 0,
    totalSales: 0,
    totalSalesAmount: 0,
    
    stockList : {
    }
  }

  let marketURLs = [];

  if (transactions.isSuccess) {
    console.log(transactions.data)
    transactions.data.transactions.forEach((transaction) => {
      if (transaction.transaction_code == "buy") {
        transactionStatistics.totalPurchases += Number(transaction.amount);
        if(transactionStatistics.stockList[transaction.symbol] == undefined) {
          marketURLs.push(marketQuoteBaseURL + transaction.symbol)
          transactionStatistics.stockList[transaction.symbol] = {
            totalVolume : Number(transaction.amount),
            totalPurchases: Number(transaction.amount),
            totalPurchaseAmount: Number(transaction.total),
            totalSales: 0,
            totalSalesAmount: 0
          }
        }else{
          transactionStatistics.stockList[transaction.symbol].totalPurchases += Number(transaction.amount);
          transactionStatistics.stockList[transaction.symbol].totalVolume += Number(transaction.amount);
          transactionStatistics.stockList[transaction.symbol].totalPurchaseAmount += Number(transaction.total);

        }
      } else {
        transactionStatistics.totalSales += Number(transaction.amount);
        if(transactionStatistics.stockList[transaction.symbol] == undefined) {
          marketURLs.push(marketQuoteBaseURL + transaction.symbol)
          transactionStatistics.stockList[transaction.symbol] = {
            totalVolume : -Number(transaction.amount),
            totalPurchases: 0,
            totalPurchaseAmount: 0,
            totalSales: Number(transaction.amount),
            totalSalesAmount: Number(transaction.total),
          }
        }else{
          transactionStatistics.stockList[transaction.symbol].totalSales += Number(transaction.amount);
          transactionStatistics.stockList[transaction.symbol].totalVolume -= Number(transaction.amount);
          transactionStatistics.stockList[transaction.symbol].totalSalesAmount += Number(transaction.total);

        }
      }
    });
    transactionStatistics.isSuccess = true;
  }

  let marketString = Object.keys(transactionStatistics.stockList).join(",");
  const markets = useQuery({
    queryKey: [marketQuoteBaseURL, marketString],
  });

  let accountValuation = 0;
  if (markets.isSuccess && transactionStatistics.isSuccess) {
    console.log(markets.data)
    for(let item of Object.keys(markets.data)){
      if(transactionStatistics.stockList[item].totalVolume > 0){
        accountValuation += markets.data[item] * transactionStatistics.stockList[item].totalVolume;
      }
    }
  }

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
        <div color="primary">
        <Typography variant="h3" component="div">
          Account Information
        </Typography>
        <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
          {account.isSuccess && (
            <div>
              <Typography variant="h5" component="div">
                Account ID:
              </Typography>
              <Typography variant="h3" component="div">
                {account.data.account_id}
              </Typography>
              <Typography>Products:</Typography>
              {account.data.products.map((product) => (
                <div key={product}>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {product.replace(/([A-Z])/g, " $1").trim()}
                  </Typography>
                </div>
              ))}
              <Typography variant="h5" component="div">
                Limit:
              </Typography>
              <Typography variant="h3" component="div">
                ${account.data.limit.toLocaleString(undefined, {minimumFractionDigits: 2, minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </Typography>
            </div>
          )}
          {account.isLoading && (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress color="success" />
            </Grid>
          )}
          </Paper>
        </div>
      </Paper>

      <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
        <div color="primary">
          {account.isSuccess && (
            <div>
              <Typography variant="h4" component="div">
                Account Statement
              </Typography>
              <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg = {6}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm = {6}>
                        <Typography variant="h5" component="div">
                          Total Purchases:
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm = {7}>
                        <Typography variant="h4" component="div">
                          ${transactionStatistics.totalPurchases.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg = {6}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm = {6}>
                        <Typography variant="h5" component="div">
                          Total Sales:
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm = {8}>
                        <Typography variant="h4" component="div">
                          ${transactionStatistics.totalSales.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
              <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
                <Typography variant="h5" component="div">
                  Balance:
                </Typography>
                <Typography variant="h3" component="div">
                  ${ (Number(transactionStatistics.totalSales) -Number(transactionStatistics.totalPurchases)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </Typography>
              </Paper>
            </div>
          )}
          {account.isLoading && (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress color="success" />
            </Grid>
          )}
        </div>
      </Paper>
      
      <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
        <div color="primary">
          {account.isSuccess && (
            <div>
              <Typography variant="h4" component="div">
                Account Valuation
              </Typography>
              <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
                <Typography variant="h5" component="div">
                  Current Market Value:
                </Typography>
                <Typography variant="h3" component="div">
                  ${accountValuation.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </Typography>
              </Paper>
              <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
                <Typography variant="h5" component="div">
                  Unrealized Gain/Loss:
                </Typography>
                <Typography variant="h3" component="div">
                  ${(accountValuation - Number(transactionStatistics.totalPurchases) - (Number(transactionStatistics.totalSales) ) ).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </Typography>
              </Paper>
            </div>
          )}
          {account.isLoading && (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress color="success" />
            </Grid>
          )}
        </div>
      </Paper>

      <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
        <div color="primary">
          {account.isSuccess && symbols.isSuccess && transactionStatistics.isSuccess &&markets.isSuccess  &&(
            <div>
              <Typography variant="h4" component="div" sx={{mb: 2 }}>
                Account Holdings
              </Typography>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 4, md: 8, xl: 12 }}>
              {symbols.data.map((symbol) => (
                <Grid item xs={6} sm={4} md={4} key={symbol}>
                  <Card>
                    <CardContent>
                      <Typography variant="h3">
                        {symbol.toUpperCase()}
                        <br />
                      </Typography>
                      <Typography variant="h5">
                        Shares: 
                      </Typography>
                      <Typography variant="h4">
                        {(typeof transactionStatistics.stockList[symbol].totalVolume !== undefined )&& (
                          transactionStatistics.stockList[symbol].totalVolume >= 0 ? transactionStatistics.stockList[symbol].totalVolume : 0
                        )}    
                      </Typography>
                      <Typography variant="h5">
                         Share Price:
                      </Typography>
                      <Typography variant="h4">
                          ${markets.data[symbol]}
                      </Typography>
                      <Typography variant="h5">
                        Current Market Value:
                      </Typography>
                      <Typography variant="h4">
                      ${(typeof transactionStatistics.stockList[symbol].totalVolume !== undefined )&& (
                          transactionStatistics.stockList[symbol].totalVolume >= 0 ? (transactionStatistics.stockList[symbol].totalVolume * markets.data[symbol]).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : 0
                        )}  
                      </Typography>
                      <br/>
                      <Typography variant="p">
                        Total Shares Purchased:&nbsp;
                        {(typeof transactionStatistics.stockList[symbol].totalPurchases !== undefined )&& (
                          transactionStatistics.stockList[symbol].totalPurchases >= 0 ? transactionStatistics.stockList[symbol].totalPurchases : 0
                        )}
                      </Typography>
                      <br/>
                      <Typography variant="p">
                        Total Shares Sold:&nbsp;
                        {(typeof transactionStatistics.stockList[symbol].totalSales !== undefined )&& (
                          transactionStatistics.stockList[symbol].totalSales >= 0 ? transactionStatistics.stockList[symbol].totalSales : 0
                        )}
                      </Typography>
                      <br/>
                      <Typography variant="p">
                        Total Purchase Price:&nbsp;
                        ${(typeof transactionStatistics.stockList[symbol].totalPurchaseAmount !== undefined )&& (
                          transactionStatistics.stockList[symbol].totalPurchaseAmount >= 0 ? (transactionStatistics.stockList[symbol].totalPurchaseAmount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : 0
                        )}
                      </Typography>
                      <br/>
                      <Typography variant="p">
                        Total Sale Price:&nbsp;
                        ${(typeof transactionStatistics.stockList[symbol].totalSalesAmount !== undefined )&& (
                          transactionStatistics.stockList[symbol].totalSalesAmount >= 0 ? (transactionStatistics.stockList[symbol].totalSalesAmount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : 0
                        )}
                      </Typography>
                      <br/>
                      <Typography variant="p">
                        Balance:&nbsp;
                        ${(typeof transactionStatistics.stockList[symbol].totalSalesAmount !== undefined )&& (typeof transactionStatistics.stockList[symbol].totalPurchaseAmount !== undefined )&& (
                          (Number(transactionStatistics.stockList[symbol].totalSalesAmount) - Number(transactionStatistics.stockList[symbol].totalPurchaseAmount)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
                        )}
                      </Typography>
                      <Typography variant="h5">
                        Unrealized Gains/Losses:&nbsp;
                      </Typography>
                      <Typography variant="h3" color={
                        (typeof transactionStatistics.stockList[symbol].totalVolume !== undefined )&& (
                         (transactionStatistics.stockList[symbol].totalVolume * markets.data[symbol]) + (Number(transactionStatistics.stockList[symbol].totalSalesAmount) - Number(transactionStatistics.stockList[symbol].totalPurchaseAmount)) >= 0 ? "#4caf50" : "error" 
                        )
                      }>
                        ${(typeof transactionStatistics.stockList[symbol].totalVolume !== undefined )&& (
                          ((Number(transactionStatistics.stockList[symbol].totalVolume) * Number(markets.data[symbol])) + (Number(transactionStatistics.stockList[symbol].totalSalesAmount) - Number(transactionStatistics.stockList[symbol].totalPurchaseAmount))).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
                        )}  
                      </Typography>
                    </CardContent>
                    <CardActions>
                    <Link href={"dashboard/stocks/" + symbol} passHref>
                      <Button size="small">View Stock</Button>
                    </Link>
                    </CardActions>
                  </Card>
                </Grid>
                ))}
              </Grid>
            </div>
          )}
          {symbols.isLoading && (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress color="success" />
            </Grid>
          )}
        </div>
      </Paper>

      <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
        <div color="primary">
          <Typography variant="h4" component="div" sx={{mb: 2 }}>
              Transaction History
          </Typography>
          <TextField
              sx = {{mb: 2}}
              label="Filter by Symbol"
              id="outlined-start-adornment"
              margin="dense"
            />
          {transactions.isSuccess && (
            <div>
              <TableContainer component={Paper} sx={{ fontSize: 4 }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Symbol</TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="right">Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.data.transactions.map((row) => (
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.symbol}
                        </TableCell>
                        <TableCell align="right">
                          {row.transaction_code}
                        </TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                        <TableCell align="right">
                          {Number(row.price).toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          {Number(row.total).toFixed(2)}
                        </TableCell>
                        <TableCell align="right">{row.date.substring(0, 10)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
          {account.isLoading && (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress color="success" />
            </Grid>
          )}
        </div>
      </Paper>
    </Container>
  );
}
