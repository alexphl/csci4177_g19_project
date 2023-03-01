"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import Container from "@mui/material/Container";

import apiURL from "@/APIurl";
const baseURL = apiURL + "/transaction/account_id/";

export default function Transaction() {
  const router = useSearchParams();
  const { account_id } = router.query;

  const [transaction, getTransaction] = useState(null);

  useEffect(() => {
    axios.get(baseURL + account_id).then((response) => {
      getTransaction(response.data);
    });
  }, [router]);

  return (
    <Container style={{ minHeight: "100vh" }}>
      <pre>{JSON.stringify(transaction, null, 2)}</pre>
    </Container>
  );
}
