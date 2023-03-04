"use strict";

import { Router, json as _json } from "express";
const router = Router();

// Get all stocks
router.get("/", _json(), async function (req, res) {
  fetch(
    `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${process.env.FINNHUB_API_KEY}`
  )
    .then((res) => res.json())
    .then((json) => res.send(json));
});

// Get quote for a stock
router.get("/quote/:symbol", _json(), async function (req, res) {
  fetch(
    `https://finnhub.io/api/v1/quote?symbol=${req.params.symbol}&token=${process.env.FINNHUB_API_KEY}`
  )
    .then((res) => res.json())
    .then((json) => res.send(json));
});

// Get quote for a stock
router.get("/profile/:symbol", _json(), async function (req, res) {
  fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${req.params.symbol}&token=${process.env.FINNHUB_API_KEY}`
  )
    .then((res) => res.json())
    .then((json) => res.send(json));
});

export default router;
