/**Author: Olexiy Prokhvatylo B00847680 */

import { Router } from "express";
import LRU from "lru-cache"
const router = Router();

import Model from '../models/simulation';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { iSearchItem } from "@/types/iStocks";
import axios from "axios";
import Portfolio from "../models/simulation";
dayjs.extend(utc)

const cache = new LRU({
  max: 200, // max number of cached responses
  ttl: 1000 * 60 * 25, // Response's Time to Live (ms)
});

// Get user stocks
router.get("/user/:id", async function(_req, res, next) {
  const owner_id = _req.params.id;

  await Model.findOne({ owner_id })
    .then((portfolio) => {
      res.send(portfolio.stock_list);
    })
    .catch((error) => {
      console.error("Error:", error);
      next(error);
    });
});

// Set user stocks
router.post("/user/:id", async function(req, res) {
  const owner_id = req.params.id;
  const newList = req.body;

  const portfolio = await Model.findOne({ owner_id });

  if (!portfolio) {
    return res.status(404).json({ message: 'Portfolio not found' });
  }

  portfolio.stock_list = newList;

  const writeResult = await portfolio.save();
  if (writeResult.hasWriteError) {
    return res.status(500).json({ message: 'Write error' });
  }

  return res.sendStatus(200);
});
// Get historical price
router.get('/stock/:symbol/price/:timestamp', async (req, res) => {
  const { symbol, timestamp } = req.params;

  try {
      const response = await axios.get(`https://finnhub.io/api/v1/stock/candle`, {
          params: {
              symbol,
              resolution: 'D',
              from: parseInt(timestamp),
              to: parseInt(timestamp) + 86400, // Add one day in seconds
              token: process.env.FINNHUB_API_KEY, 
          },
      });

      if (response.data && response.data.c && response.data.c.length > 0) {
          res.json({ price: response.data.c[0] });
      } else {
          res.status(404).json({ error: 'Stock price not found' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch stock price' });
  }
});

// Get user stock watchlists
router.get("/user/lists/:id", async function(_req, res, next) {
  const owner_id = _req.params.id;

  await Model.findOne({ owner_id })
    .then((portfolio) => {
      res.send(portfolio.watchlists);
    })
    .catch((error) => {
      console.error("Error:", error);
      next(error);
    });
});

// Set user watchlists
router.post("/user/lists/:id", async function(req, res) {
  const owner_id = req.params.id;
  const newList = req.body;

  const portfolio = await Model.findOne({ owner_id });

  if (!portfolio) {
    return res.status(404).json({ message: 'Portfolio not found' });
  }

  portfolio.watchlists = newList;

  const writeResult = await portfolio.save();
  if (writeResult.hasWriteError) {
    return res.status(500).json({ message: 'Write error' });
  }

  return res.sendStatus(200);
});

async function cachedFetch(route: string, _res: any, reqUrl: string, next: any) {
  await fetch(
    `${route}&token=${process.env.FINNHUB_API_KEY}`
  )
    .then((res) => {
      if (!res.ok) { return _res.sendStatus(res.status); }
      return res.json();
    })
    .then((json) => {
      if (json) cache.set(reqUrl, json);
      return _res.send(json);
    })
    .catch((error) => {
      console.error("Error:", error);
      next(error);
    });
}

// Get quote for a stock
router.get("/quote/:symbol", async function(req, _res, next) {
  const cached = cache.get(req.url);
  if (cached) { return _res.send(cached); }

  cachedFetch(`https://finnhub.io/api/v1/quote?symbol=${req.params.symbol}`, _res, req.url, next);
});

async function getStockPrice(symbol: any) {
  const response = await axios.get(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`
  );
  return response.data;
}
// Get prices for a stock
router.post('/stock-prices', async (req, res) => {
  // console.log(req.body);
  const stockSymbols = req.body.stocks;
  console.log(stockSymbols);
  const stockPrices: { [key: string]: number } = {};

  if (!stockSymbols || !Array.isArray(stockSymbols)) {
    return res.status(400).json({ error: 'Invalid stocks input.' });
  }

  const promises = stockSymbols.map(async (symbol) => {
    try {
      const priceData = await getStockPrice(symbol);
      stockPrices[symbol] = priceData.c;
    } catch (error) {
      return res.status(500).json({ error: 'Error in fetching.' });
    }
  });

  await Promise.all(promises);

  res.json(stockPrices);
});

//Retrieve stock prices for a list of stocks from a GET request
//Format: /api/stocks/prices/list/:<comma separated list of stock symbols>
//Ex: http://localhost:3000/api/stocks/prices/list/AMD,INTC
//Returns: {"AMD": 32.67, "INTC": 98.01}
//Modified by: Liam Osler
router.get('/prices/list/:list', async (req, res) => {
  // console.log(req.body);
  console.log(req.params.list);
  const stockSymbols = req.params.list.split(',');
  console.log(stockSymbols);
  const stockPrices: { [key: string]: number } = {};

  if (!stockSymbols || !Array.isArray(stockSymbols)) {
    return res.status(400).json({ error: 'Invalid stocks input.' });
  }

  const promises = stockSymbols.map(async (symbol) => {
    try {
      const priceData = await getStockPrice(symbol);
      stockPrices[symbol] = priceData.c;
    } catch (error) {
      return res.status(500).json({ error: 'Error in fetching.' });
    }
  });

  await Promise.all(promises);

  res.json(stockPrices);
});



// Get company description for a stock
router.get("/profile/:symbol", async function(req, _res, next) {
  const cached = cache.get(req.url);
  if (cached) { return _res.send(cached); }

  cachedFetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${req.params.symbol}`, _res, req.url, next);
});

// Search for a stock symbol
router.get("/search/:q", async function(req, _res, next) {
  const cached = cache.get(req.url);
  if (cached) { return _res.send(cached); }

  await fetch(
    `https://finnhub.io/api/v1/search?q=${req.params.q}&token=${process.env.FINNHUB_API_KEY}`
  )
    .then((res) => {
      if (!res.ok) { return _res.sendStatus(res.status); }
      return res.json();
    })
    .then((json) => {
      // FILTER STOCK RESULTS
      if (!json || !json.result) { return null; }
      json = json.result.filter((item: iSearchItem) => {
        if (item.symbol.includes(".") || item.symbol.includes(":")) return false;
        if (item.type === "Common Stock" || item.type === "ADR") return true;

        return false;
      });
      cache.set(req.url, json);
      return _res.send(json);
    })
    .catch((error) => {
      console.error("Error:", error);
      next(error);
    });
});

// Get candlestick for the last market open day
router.get("/hist/1D/:symbol", async function(req, _res, next) {
  const cached = cache.get(req.url);
  if (cached) { return _res.send(cached); }

  const intervalMin = "5";

  const today = dayjs().startOf('hour');
  let marketOpen = today.startOf('day').utc().hour(13);

  while (today.utc().diff(marketOpen) < 0 || marketOpen.day() === 0 || marketOpen.day() === 6) {
    marketOpen = marketOpen.subtract(1, 'day');
  }

  const to = today.unix();
  const from = marketOpen.unix();

  cachedFetch(`https://finnhub.io/api/v1/stock/candle?symbol=${req.params.symbol}&resolution=${intervalMin}&from=${from}&to=${to}`, _res, req.url, next);
});

// Get candlestick data for the last week
router.get("/hist/1W/:symbol", async function(req, _res, next) {
  const cached = cache.get(req.url);
  if (cached) { return _res.send(cached); }

  const interval = "30";

  const today = dayjs().startOf('hour');
  let lastWeek = today.startOf('day').utc().hour(13).subtract(1, 'week');
  while (lastWeek.day() === 0 || lastWeek.day() === 6) {
    lastWeek = lastWeek.subtract(1, 'day');
  }

  const to = today.unix();
  const from = lastWeek.unix();

  cachedFetch(`https://finnhub.io/api/v1/stock/candle?symbol=${req.params.symbol}&resolution=${interval}&from=${from}&to=${to}`, _res, req.url, next);
});

// Get candlestick data for the last month
router.get("/hist/1M/:symbol", async function(req, _res, next) {
  const cached = cache.get(req.url);
  if (cached) { return _res.send(cached); }

  const interval = "60";

  const today = dayjs().startOf('hour');
  let lastMonth = today.startOf('day').utc().hour(13).subtract(1, 'month');
  while (lastMonth.day() === 0 || lastMonth.day() === 6) {
    lastMonth = lastMonth.subtract(1, 'day');
  }

  const to = today.unix();
  const from = lastMonth.unix();

  cachedFetch(`https://finnhub.io/api/v1/stock/candle?symbol=${req.params.symbol}&resolution=${interval}&from=${from}&to=${to}`, _res, req.url, next);
});

// Get candlestick data for the last 6 months
router.get("/hist/6M/:symbol", async function(req, _res, next) {
  const cached = cache.get(req.url);
  if (cached) { return _res.send(cached); }

  const interval = "D";

  const today = dayjs().startOf('hour')
  let lastMonths = today.startOf('day').utc().hour(13).subtract(6, 'month');
  while (lastMonths.day() === 0 || lastMonths.day() === 6) {
    lastMonths = lastMonths.subtract(1, 'day');
  }

  const to = today.unix();
  const from = lastMonths.unix();

  cachedFetch(`https://finnhub.io/api/v1/stock/candle?symbol=${req.params.symbol}&resolution=${interval}&from=${from}&to=${to}`, _res, req.url, next);
});

// Get candlestick data for the last year
router.get("/hist/1Y/:symbol", async function(req, _res, next) {
  const cached = cache.get(req.url);
  if (cached) { return _res.send(cached); }

  const interval = "D";

  const today = dayjs().startOf('hour');
  let lastYear = today.startOf('day').utc().hour(13).subtract(1, 'year');
  while (lastYear.day() === 0 || lastYear.day() === 6) {
    lastYear = lastYear.subtract(1, 'day');
  }

  const to = today.unix();
  const from = lastYear.unix();

  cachedFetch(`https://finnhub.io/api/v1/stock/candle?symbol=${req.params.symbol}&resolution=${interval}&from=${from}&to=${to}`, _res, req.url, next);
});

// Get company news for the last 2-3 days
router.get("/company-news/:symbol", async function(req, _res, next) {
  const cached = cache.get(req.url);
  if (cached) { return _res.send(cached); }

  const today = dayjs().startOf('hour');
  const to = today.utc().format('YYYY-MM-DD');

  let fromDay = today.startOf('day').utc()
  while (fromDay.day() === 0 || fromDay.day() === 6) {
    fromDay = fromDay.subtract(1, 'day');
  }
  const from = fromDay.subtract(2, 'day').format('YYYY-MM-DD');

  cachedFetch(`https://finnhub.io/api/v1/company-news?symbol=${req.params.symbol}&from=${from}&to=${to}`, _res, req.url, next);
});

// Get list of related symbols (operating  in the same sub-Industry)
router.get("/peers/:symbol", async function(req, _res, next) {
  const cached = cache.get(req.url);
  if (cached) { return _res.send(cached); }

  await fetch(
    `https://finnhub.io/api/v1/stock/peers?symbol=${req.params.symbol}&token=${process.env.FINNHUB_API_KEY}`
  )
    .then((res) => {
      if (!res.ok) { return _res.sendStatus(res.status); }
      return res.json();
    })
    .then((json) => {
      json = json.filter((symbol: string) => (!symbol.includes(".") && !symbol.includes(":") && !symbol.includes(req.params.symbol)));
      cache.set(req.url, json);
      return _res.send(json);
    })
    .catch((error) => {
      console.error("Error:", error);
      next(error);
    });
});

export default router;
