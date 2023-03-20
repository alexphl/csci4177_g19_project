"use strict";
import { Schema, model, models } from "mongoose";

const News_Subscribe = Schema({
  account_id: Number,
  subscribe_stocks: [
    {
      ticker_symbol: String,
      name: String,
    },
  ],
});

export default models.News_Subscribe ||
  model("news_subscribes", News_Subscribe);