"use strict";
import { Schema, model, models } from "mongoose";

const News_Subscribe = Schema({
	account_id: Number,
	subscribe_stocks: [String],
});

export default models.News_Subscribe || model("News_Subscribe", News_Subscribe);