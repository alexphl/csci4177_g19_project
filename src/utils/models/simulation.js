/**Author: Herman Liang B00837314 */
/**Author: Olexiy Prokhvatylo B00847680 */

"use strict";
import { Schema, model, models } from "mongoose";

const assetSchema = Schema({
  asset_name: String,
  asset_type: String,
  ticker: String,
  quantity: Number,
  purchase_date: Date,
  purchase_price: Number,
});

const transactionSchema = Schema({
  transaction_type: String,
  asset_name: String,
  asset_type: String,
  ticker: String,
  quantity: Number,
  transaction_date: Date,
  transaction_price: Number,
});

const stockListSchema = Schema({
  listID: String,
  symbol: String,
});

const portfolioSchema = Schema({
  last_update: {
    type: Date,
    default: Date.now,
  },
  owner_id: String,
  profit: {
    type: Number,
    default: 0,
  },
  assets: [assetSchema],
  transaction_history: [transactionSchema],
  watchlists: {
    type: [{ id: String, name: String }],
    default: [{ id: "1", name: "Watchlist" }],
  },
  stock_list: [stockListSchema],
});

export default models.Portfolio || model("Portfolio", portfolioSchema);
