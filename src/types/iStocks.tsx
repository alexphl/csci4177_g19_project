/**Author: Olexiy Prokhvatylo B00847680 */

export type iQuote = {
  c: number, // current price
  d: number, // change
  o: number, // open price
  h: number, // high
  l: number, // low
  t: number, // UNIX timestamp
}

export type iCandle = {
  c: Array<number>, // current price
  d: Array<number>, // change
  o: Array<number>, // open price
  t: Array<number>, // UNIX timestamp
  s: string 				//status
}

export type iProfile = {
  name: string,
  exchange: string,
  currency: string,
  marketCapitalization: number
}

export type iSearch = {
  count: number,
  result: [iSearchItem]
}

export type iSearchItem = {
  description: string,
  displaySymbol: string,
  symbol: string,
  type: string
}

export type iCompanyNews = {
  category: string,
  datetime: number,
  headline: string,
  id: number,
  image: string,
  related: string,
  source: string,
  summary: string,
  url: string
}

export type iUserStockList = {
  id: string,
  name: string,
}

export type iUserStockListItem = {
  listID: string,
  symbol: string,
}
