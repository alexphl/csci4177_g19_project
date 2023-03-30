import LRU from "lru-cache"
const cache = new LRU({
  max: 200, // max number of cached responses
  ttl: 1000 * 60 * 25, // Response's Time to Live (ms)
});


async function stock_symbol(req, _res, next) {
  const cached = cache.get(req.url);
  if (cached) {
    _res.send(cached);
    return;
  }
  cachedFetch(`https://finnhub.io/api/v1/search?q=${req.params.q}`, _res, req.url, next);
}

async function cachedFetch(route, _res, reqUrl, next) {
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
export { stock_symbol };