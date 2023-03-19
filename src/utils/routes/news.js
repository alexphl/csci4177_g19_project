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
//Route to get all customers
router.get("/", async function (req, res) {
  await getnew("Nasdaq", 2)
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.error(err);
    });
});
router.get("/user/:id", async function (req, res) {
  try {
    const { account_id } = req.params.id;
    // const portfolio = await Model.findOne({ account_id });
    res.send(account_id);


  // await getnews_list(user.subscribe_stocks)
  //   .then((docs) => {
  //     res.send(docs);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
// router.get("/deatil/:id", async function (req, res) {

// });

export default router;