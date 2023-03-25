import { Schema, model, models } from "mongoose";

const news_subscribesSchema = Schema({
  account_id: Number,
  subscribe_stocks: [
    {
      ticker_symbol: String,
      name: String,
    },
  ],
});
export default models.news_subscribes ||
  model("news_subscribes", news_subscribesSchema);
