import { Router } from "express";
import LRU from "lru-cache"
const router = Router();

import Model from '../models/simulation';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { TabOutlined } from "@mui/icons-material";
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
      if (json) cache.set(reqUrl, json);
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
  if (cached) { return _res.send(cached); }

  cachedFetch(`https://finnhub.io/api/v1/quote?symbol=${req.params.symbol}`, _res, req.url, next);
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

  cachedFetch(`https://finnhub.io/api/v1/search?q=${req.params.q}`, _res, req.url, next);
});

// Get candlestick data for the last 24h
router.get("/hist/1D/:symbol", async function(req, _res, next) {
  const cached = cache.get(req.url);
  if (cached) { return _res.send(cached); }

  const intervalMin = "15";

  const today = dayjs().startOf('hour');
  let marketOpen = today.startOf('day').utc().hour(13);

  while (marketOpen.day() === 0 || (marketOpen.day() === 1 && (today.hour() < marketOpen.hour())) || marketOpen.day() === 6) {
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

  const interval = "60";

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

  const interval = "D";

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

  const interval = "W";

  const today = dayjs().startOf('hour');
  let lastYear = today.startOf('day').utc().hour(13).subtract(1, 'year');
  while (lastYear.day() === 0 || lastYear.day() === 6) {
    lastYear = lastYear.subtract(1, 'day');
  }

  const to = today.unix();
  const from = lastYear.unix();

  cachedFetch(`https://finnhub.io/api/v1/stock/candle?symbol=${req.params.symbol}&resolution=${interval}&from=${from}&to=${to}`, _res, req.url, next);
});

// Get candlestick data for the last month
router.get("/hist/month/:symbol", async function(req, _res, next) {
  const cached = cache.get(req.url);
  if (cached) { return _res.send(cached); }

  const interval = "D";

  const today = dayjs().startOf('hour');
  let lastMonth = today.startOf('day').utc().hour(13).subtract(1, 'month');
  while (lastMonth.day() === 0 || lastMonth.day() === 6) {
    lastMonth = lastMonth.subtract(1, 'day');
  }

  const to = today.unix();
  const from = lastMonth.unix();

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

// Get list of related simbols (operating  in the same sub-Industry)
router.get("/peers/:symbol", async function(req, _res, next) {
  const cached = cache.get(req.url);
  if (cached) { return _res.send(cached); }

  cachedFetch(`https://finnhub.io/api/v1/stock/peers?symbol=${req.params.symbol}`, _res, req.url, next);
});

export default router;
