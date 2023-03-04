"use strict";

import { Router } from "express";
import LRU from "lru-cache";
const router = Router();

const cache = new LRU({
  max: 200, // max number of cached responses
  ttl: 1000 * 60 * 25, // Response's Time to Live (ms)
});

// Get all stocks
router.get("/", async function (req, res) {
  const cached = cache.get(req.url);
  if (cached) {
    res.send(cached);
    return;
  }

  fetch(
    `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${process.env.FINNHUB_API_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      cache.set(req.url, json);
      res.send(json);
    });
});

// Get quote for a stock
router.get("/quote/:symbol", async function (req, res) {
  const cached = cache.get(req.url);
  if (cached) {
    res.send(cached);
    return;
  }

  fetch(
    `https://finnhub.io/api/v1/quote?symbol=${req.params.symbol}&token=${process.env.FINNHUB_API_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      cache.set(req.url, json);
      res.send(json);
    });
});

// Get quote for a stock
router.get("/profile/:symbol", async function (req, res) {
  const cached = cache.get(req.url);
  if (cached) {
    res.send(cached);
    return;
  }

  fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${req.params.symbol}&token=${process.env.FINNHUB_API_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      cache.set(req.url, json);
      res.send(json);
    });
});

export default router;
