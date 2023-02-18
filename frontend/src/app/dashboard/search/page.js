"use client";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import Search from "../CustomerSearch";

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Paper elevation={0} sx={{ p: 2, margin: 2, flexGrow: 1 }}>
        <h2 align="middle">Search</h2>
        <div align="middle">
          Search for customers by name, username, email or street address:
        </div>
        <Search />
      </Paper>
    </Container>
  );
}
