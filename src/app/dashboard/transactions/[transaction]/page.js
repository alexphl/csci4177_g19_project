"use client";

import { useQuery } from "@tanstack/react-query";

import { useSearchParams } from "next/navigation";

import Container from "@mui/material/Container";

import apiURL from "@/APIurl";
const baseURL = apiURL + "/transaction/account_id/";

export default function Transaction() {
  const router = useSearchParams();
  const { account_id } = router.query;

  const transaction = useQuery({ queryKey: [baseURL, account_id] });

  return (
    <Container style={{ minHeight: "100vh" }}>
      <pre>{JSON.stringify(transaction.data, null, 2)}</pre>
    </Container>
  );
}
