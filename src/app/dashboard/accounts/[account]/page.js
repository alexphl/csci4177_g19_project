"use client";

import { useQuery } from "@tanstack/react-query";
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

import apiURL from "@/APIurl";
const accountBaseURL = apiURL + "/account/account_id/";
const transactionsBaseURL = apiURL + "/transaction/account_id/";
const symbolsBaseURL = apiURL + "/transaction/account_id/symbols/";


export default function Account({ params }) {
  const account_id = params.account;

  const account = useQuery({ queryKey: [accountBaseURL, account_id] });
  const transactions = useQuery({
    queryKey: [transactionsBaseURL, account_id],
  });
  const symbols = useQuery({
    queryKey: [symbolsBaseURL, account_id],
  });

  console.log(transactions.data);

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Paper sx={{ p: 2, margin: 2, flexGrow: 1 }}>
        <div color="primary">
          {account.isSuccess && (
            <div>
              <Typography variant="h5" component="div">
                Account Number: {account.data.account_id}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Limit: ${account.data.limit}
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
          {symbols.isSuccess && (
            <div>
              <Typography variant="h5" component="div" sx={{mb: 2 }}>
                Account Holdings:
              </Typography>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {symbols.data.map((symbol) => (
                <Grid item xs={6} sm={4} md={4} key={symbol}>
                  <Card>
                    <CardContent>
                      <Typography variant="h3">
                        {symbol.toUpperCase()}
                        <br />
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
