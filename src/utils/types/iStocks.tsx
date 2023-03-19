export type iQuote = {
  c: number; // current price
  d: number; // change
  o: number; // open price
  t: number; // UNIX timestamp
}

export type iCandle = {
  c: Array<number>; // current price
  d: Array<number>; // change
  o: Array<number>; // open price
  t: Array<number>; // UNIX timestamp
  s: string; 				//status
}

export type iProfile = {
  name: string,
  exchange: string,
  currency: string;
}
