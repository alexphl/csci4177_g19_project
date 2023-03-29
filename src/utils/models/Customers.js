/**Author: Liam Osler */
"use strict";
import { Schema, model, models } from "mongoose";

const Customers = Schema(
  {
    username: String,
    name: String,
    address: String,
    birthdate: Date,
    email: String,
  },
  { strict: true }
);

Customers.index({
  username: "text",
  name: "text",
  address: "text",
  email: "text",
});

export default models.Customers || model("Customers", Customers);
