import { Router } from "express";
import LRU from "lru-cache"
const router = Router();

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc)


const cache = new LRU({
  max: 200, // max number of cached responses
  ttl: 1000 * 60 * 25, // Response's Time to Live (ms)
});

const userStocks = { list: ["AAPL", "MSFT", "GOOG"] };

async function cachedFetch(route: string, _res: any, reqUrl: string, next: any) {
  await fetch(
    `${route}&token=${process.env.FINNHUB_API_KEY}`
  )
    .then((res) => {
      if (!res.ok) {
        _res.sendStatus(res.status);
        return;
      }
      return res.json();
    })
    .then((json) => {
      cache.set(reqUrl, json);
      _res.send(json);
    })
    .catch((error) => {
      console.error("Error:", error);
      next(error);
    });
}

// Get quote for a stock
router.get("/quote/:symbol", async function(req, _res, next) {
  const cached = cache.get(req.url);
  if (cached) {
    _res.send(cached);
    return;
  }

  cachedFetch(`https://finnhub.io/api/v1/quote?symbol=${req.params.symbol}`, _res, req.url, next);
});

// Get company description for a stock
router.get("/profile/:symbol", async function(req, _res, next) {
  const cached = cache.get(req.url);
  if (cached) {
    _res.send(cached);
    return;
  }

  cachedFetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${req.params.symbol}`, _res, req.url, next);
});

// Search for a stock symbol
router.get("/search/:q", async function(req, _res, next) {
  const cached = cache.get(req.url);
  if (cached) {
    _res.send(cached);
    return;
  }

  cachedFetch(`https://finnhub.io/api/v1/search?q=${req.params.q}`, _res, req.url, next);
});

// Get candlestick data for the last 24h
router.get("/hist/today/:symbol", async function(req, _res, next) {
  const cached = cache.get(req.url);
  if (cached) {
    _res.send(cached);
    return;
  }

  const intervalMin = "15";

  let marketOpen = dayjs().utc().startOf('day').hour(13);
  while (marketOpen.day() === 0 || marketOpen.day() === 6) {
    marketOpen = marketOpen.subtract(1, 'day');
  }

  const to = dayjs().unix();
  const from = marketOpen.unix();

  // const intervalMin = "30";

  // let yesterday = dayjs().subtract(1, 'day');
  // while (yesterday.day() === 0 || yesterday.day() === 6) {
  //   yesterday = yesterday.subtract(1, 'day');
  // }

  // const to = dayjs().unix();
  // const from = yesterday.unix();

  cachedFetch(`https://finnhub.io/api/v1/stock/candle?symbol=${req.params.symbol}&resolution=${intervalMin}&from=${from}&to=${to}`, _res, req.url, next);
});

// Get candlestick data for the last 24h
// payload must be of type {symbol: string, from: Date, to: Date}
router.get("/company-news/:symbol", async function(req, _res, next) {
  const cached = cache.get(req.url);
  if (cached) {
    _res.send(cached);
    return;
  }

  const to = dayjs().format('YYYY-MM-DD');
  const from = dayjs().subtract(7, 'day').format('YYYY-MM-DD');

  cachedFetch(`https://finnhub.io/api/v1/company-news?symbol=${req.params.symbol}&from=${from}&to=${to}`, _res, req.url, next);
});

// Get user stocks
router.get("/user", async function(_req, res) {
  res.send(userStocks.list);
});

// Set user stocks
router.post("/user", async function(req, res) {
  const newList = req.body;
  if (newList) userStocks.list = newList;
  res.sendStatus(200);
});

export default router;
