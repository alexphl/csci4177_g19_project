/**Author: Herman Liang B00837314 */
/**Author: Liam Osler */
"use client";
import { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Container,
  Button,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";
const stylePane =
  "bg-black sm:border border-neutral-800 sm:rounded-2xl h-screen shadow-xl p-4 overflow-auto scrollbar-hide pb-48 sm:pb-40 transition-all overscroll-contain";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [username, setUsername] = useState("user1"); 
  const owner_id = username;
  // Framer motions
  const tableVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
    exit: { opacity: 0 },
  };

  const rowVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      const response = await fetch(
        `/api/simulation/transaction-history/${owner_id}`
      );
      const data = await response.json();
      setTransactions(data);
    };

    fetchTransactionHistory();
  }, [owner_id]);

  return (
    <div className="container mx-auto max-w-5xl flex-auto sm:px-8">
      <Grid justifyContent="center" style={{ textAlign: "center" }}>
        <Container style={{ padding: 20 }}>
          <div>
            <Typography variant="h4">
              <strong className="text-4xl text-white">
                Transaction History
              </strong>
            </Typography>
          </div>
        </Container>
      </Grid>

      <Grid container justifyContent="center" style={{ marginBottom: "20px" }}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginRight: "20px" }}
        />
      </Grid>

      <Grid
        container
        justifyContent="space-between"
        style={{ marginBottom: "20px" }}
      >
        <Link href="/dashboard/simulation" passHref>
          <Button color="secondary">GO BACK</Button>
        </Link>
      </Grid>
      <div className={stylePane}>
        <motion.div
          variants={tableVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ display: { xs: "table-cell", sm: "none" } }}>
                  T
                </TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  Type
                </TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  Asset Name
                </TableCell>
                <TableCell>Ticker</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell sx={{ display: { xs: "table-cell", sm: "none" } }}>
                  Date
                </TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  Transaction Date
                </TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  Transaction Price
                </TableCell>
              </TableRow>
            </TableHead>
            <motion.tbody variants={tableVariants}>
              {Array.isArray(transactions) &&
                transactions.map((transaction) => (
                  <motion.tr key={transaction._id} variants={rowVariants}>
                    <TableCell
                      sx={{ display: { xs: "table-cell", sm: "none" } }}
                    >
                      {transaction.transaction_type.charAt(0)}
                    </TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      {transaction.transaction_type}
                    </TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      {transaction.asset_name}
                    </TableCell>

                    <TableCell>{transaction.ticker}</TableCell>
                    <TableCell>{transaction.quantity}</TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      {transaction.transaction_date}
                    </TableCell>
                    <TableCell
                      sx={{ display: { xs: "table-cell", sm: "none" } }}
                    >
                      {transaction.transaction_date
                        .substring(0, 10)
                        .replace(/-/g, "")}
                    </TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      {transaction.transaction_price
                        ? `$${transaction.transaction_price.toFixed(2)}`
                        : ""}
                    </TableCell>
                  </motion.tr>
                ))}
            </motion.tbody>
          </Table>
        </motion.div>
      </div>
    </div>
  );
}
