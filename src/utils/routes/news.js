"use strict";

import { Router } from "express";
import { getnew, getnews_list } from "../controllers/newsController";
const router = Router();
import Model from "../models/News_Subscribed";

//Data retrieval routes:
const user = {
  account_id: 371138,
  subscribe_stocks: [
    {
      ticker_symbol: "TSLA",
      name: "Tesla",
    },

    {
      ticker_symbol: "AAPL",
      name: "Apple",
    },
    {
      ticker_symbol: "GOOG",
      name: "Alphabet",
    },
    {
      ticker_symbol: "AFRM",
      name: "Affirm Holdings",
    },
  ],
};
//Route to get nasdaq data for 4
router.get("/", async function (req, res) {
  await getnew("Nasdaq", 4)
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.error(err);
    });
});
//Route to get user subscribed news list
router.get("/user/:id", async function (req, res) {
  try {

    const subscribes = await Model.findOne({ account_id: req.params.id });
    var list = subscribes.subscribe_stocks;
    await getnews_list(list.slice(0, 4))
      .then((docs) => {
        var subscription = docs;
        for (var i = 0; i < subscription.length; i++) {
          subscription[i].ticker_symbol = list[i].ticker_symbol;
        }
        res.send(subscription);
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    console.log(error);
  }
});
// router.get("/deatil/:id", async function (req, res) {

// });

export default router;