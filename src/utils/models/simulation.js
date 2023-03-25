import { Schema, model, models } from "mongoose";

const assetSchema = new Schema({
  asset_name: String,
  asset_type: String,
  ticker: String,
  quantity: Number,
  purchase_date: Date,
  purchase_price: Number,
});

const transactionSchema = new Schema({
  transaction_type: String,
  asset_name: String,
  asset_type: String,
  ticker: String,
  quantity: Number,
  transaction_date: Date,
  transaction_price: Number,
});

const portfolioSchema = new Schema({
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
  savedSymbols: [string],
});

export default models.Portfolio || model("Portfolio", portfolioSchema);
