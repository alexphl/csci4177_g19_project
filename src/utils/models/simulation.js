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
  stock_list: [String],
});

export default models.Portfolio || model("Portfolio", portfolioSchema);
