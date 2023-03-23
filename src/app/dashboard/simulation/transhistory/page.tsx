"use client"
import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const stylePane =
  "bg-black sm:border border-neutral-800 sm:rounded-2xl h-screen shadow-xl p-4 overflow-auto scrollbar-hide pb-48 sm:pb-40 transition-all overscroll-contain";
const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const owner_id = 'user1';

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      const response = await fetch(
        `/api/simulation/transaction-history/${owner_id}`,
      );
      const data = await response.json();
      setTransactions(data);
    };

    fetchTransactionHistory();
  }, []);

  return (

    <ThemeProvider theme={darkTheme}>
      <Container>
        <strong className="text-4xl text-white">CUSTOMERS</strong>
        <div className={stylePane}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Asset Name</TableCell>
              <TableCell>Ticker</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Transaction Date</TableCell>
              <TableCell>Transaction Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>{transaction.transaction_type}</TableCell>
                <TableCell>{transaction.asset_name}</TableCell>
                <TableCell>{transaction.ticker}</TableCell>
                <TableCell>{transaction.quantity}</TableCell>
                <TableCell>{transaction.transaction_date}</TableCell>
                <TableCell>
                  {transaction.transaction_price
                    ? `$${transaction.transaction_price.toFixed(2)}`
                    : ''}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </Container>
    </ThemeProvider>
  );
}
