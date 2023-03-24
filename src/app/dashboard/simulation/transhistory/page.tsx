"use client"
import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import Link from "next/link";
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
        <strong className="text-4xl text-white">Simulation Transaction History</strong>
        <Link href="/dashboard/simulation" passHref>
          <Button
            color="secondary"
          >
            GO BACK
          </Button>
        </Link>
        <div className={stylePane}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell sx={{ display: { xs: 'table-cell', sm: 'none' } }}>
                T
              </TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                Type
              </TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                Asset Name
              </TableCell>
                <TableCell>Ticker</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell sx={{ display: { xs: 'table-cell', sm: 'none' } }}>
                Date
              </TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                Transaction Date
              </TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                Transaction Price
              </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell sx={{ display: { xs: 'table-cell', sm: 'none' } }}>{transaction.transaction_type.charAt(0)}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{transaction.transaction_type}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    {transaction.asset_name}
                  </TableCell>
                  
                  <TableCell>{transaction.ticker}</TableCell>
                  <TableCell>{transaction.quantity}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{transaction.transaction_date}</TableCell>
                  <TableCell  sx={{ display: { xs: 'table-cell', sm: 'none' } }}>{transaction.transaction_date.substring(0,10).replace(/-/g, "")}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
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
};

export default TransactionHistory;
