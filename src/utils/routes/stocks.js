"use strict";

import { Router } from "express";
import LRU from "lru-cache";
const router = Router();

const cache = new LRU({
  max: 200, // max number of cached responses
  ttl: 1000 * 60 * 25, // Response's Time to Live (ms)
});

let userStocks = { list: ["AAPL", "MSFT", "GOOG"] };

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
    .then((res) => {
      if (!res.ok) {
        res.sendStatus(res.status);
        throw new Error(`Server responded with ${res.status}`);
      }
      return res.json();
    })
    .then((json) => {
      cache.set(req.url, json, [{ ttl: 1000 * 60 * 60 * 48 }]);
      res.send(json);
    });
});

// Get quote for a stock
router.get("/quote/:symbol", async function (req, res, next) {
  const cached = cache.get(req.url);
  if (cached) {
    res.send(cached);
    return;
  }

  fetch(
    `https://finnhub.io/api/v1/quote?symbol=${req.params.symbol}&token=${process.env.FINNHUB_API_KEY}`
  )
    .then((res) => {
      if (!res.ok) {
        res.sendStatus(res.status);
        throw new Error(`Server responded with ${res.status}`);
      }
      return res.json();
    })
    .then((json) => {
      cache.set(req.url, json);
      res.send(json);
    })
    .catch((error) => {
      console.error("Error:", error);
      next(error);
    });
});

// Get company description for a stock
router.get("/profile/:symbol", async function (req, res, next) {
  const cached = cache.get(req.url);
  if (cached) {
    res.send(cached);
    return;
  }

  fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${req.params.symbol}&token=${process.env.FINNHUB_API_KEY}`
  )
    .then((res) => {
      if (!res.ok) {
        res.sendStatus(res.status);
        throw new Error(`Server responded with ${res.status}`);
      }
      return res.json();
    })
    .then((json) => {
      cache.set(req.url, json, [{ ttl: 1000 * 60 * 60 * 48 }]);
      res.send(json);
    })
    .catch((error) => {
      console.error("Error:", error);
      next(error);
    });
});

// Search for a stock symbol
router.get("/search/:q", async function (req, res, next) {
  const cached = cache.get(req.url);
  if (cached) {
    res.send(cached);
    return;
  }

  fetch(
    `https://finnhub.io/api/v1/search?q=${req.params.q}&token=${process.env.FINNHUB_API_KEY}`
  )
    .then((res) => {
      if (!res.ok) {
        res.sendStatus(res.status);
        throw new Error(`Server responded with ${res.status}`);
      }
      return res.json();
    })
    .then((json) => {
      cache.set(req.url, json, [{ ttl: 1000 * 60 * 60 * 48 }]);
      res.send(json);
    })
    .catch((error) => {
      console.error("Error:", error);
      next(error);
    });
});

// TESTING
router.get("/hist/today/:symbol", async function (req, res, next) {
  const cached = cache.get(req.url);
  if (cached) {
    res.send(cached);
    return;
  }

  const timeStamp = new Date();
  const yesterdayDate = new Date(timeStamp.getTime() - 24 * 60 * 60 * 1000);

  const from = (yesterdayDate.getTime() / 1000) | 0;
  const to = (Date.now() / 1000) | 0;
  const intervalMin = "30";

  fetch(
    `https://finnhub.io/api/v1/stock/candle?symbol=${req.params.symbol}&resolution=${intervalMin}&from=${from}&to=${to}&token=${process.env.FINNHUB_API_KEY}`
  )
    .then((res) => {
      if (!res.ok) {
        res.sendStatus(res.status);
        throw new Error(`Server responded with ${res.status}`);
      }
      return res.json();
    })
    .then((json) => {
      cache.set(req.url, json);
      res.send(json);
    })
    .catch((error) => {
      console.error("Error:", error);
      next(error);
    });
});

// Get user stocks
router.get("/user", async function (req, res) {
  res.send(userStocks.list);
});

// Set user stocks
router.post("/user", async function (req, res) {
  const newList = req.body;
  if (newList) userStocks.list = newList;
  res.sendStatus(200);
});

export default router;
