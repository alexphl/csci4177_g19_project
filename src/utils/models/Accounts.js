"use strict";
import { Schema, model, models } from "mongoose";

const Accounts = Schema({
	account_id: Number,
	limit: Number,
	products: [String],
});

export default models.Accounts || model("Accounts", Accounts);
