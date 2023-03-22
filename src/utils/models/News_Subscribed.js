const mongoose = require("mongoose");

const News_Subscribe = new mongoose.Schema({
  account_id: Number,
  subscribe_stocks: [
    {
      ticker_symbol: String,
      name: String,
    },
  ],
});

module.exports =
  mongoose.models.news_subscribes ||
  mongoose.model("news_subscribes", News_Subscribe);
