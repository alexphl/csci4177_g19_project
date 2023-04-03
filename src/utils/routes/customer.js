/**Author: Liam Osler */
/**Author: Herman Liang B00837314 */
"use strict";

import { Router } from "express";
import Customers from "../models/Customers";
const router = Router();

// Route to create a new customer
router.post("/new", async function (req,res){
  try {
    const customer = new Customers(req.body);
    await customer.save();

    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

//Route to get all customers
router.get("/", async function (_req, res) {
  await Customers.find({})
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.error(err);
    });
});

//Route to get a range of the customers
router.get("/:n(\\d+)/:k(\\d+)", async function (req, res) {
  await Customers.find({})
    .skip(parseInt(req.params.n))
    .limit(parseInt(req.params.k))
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.error(err);
    });
});

//Route to get customer usernames
router.get("/username/", async function (_req, res) {
  await Customers.find({})
    .select("username")
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.error(err);
    });
});

//Route to get a customer by their specific username
router.get("/username/:username", async function (req, res) {
  await Customers.findOne({ username: req.params.username })
    .then((docs) => {
      res.send(docs);
    })
    .catch(() => {
      //
    });
});

//Get all of the transactions for a specific customer
router.get("/username/transactions/:username", async function (req, res) {
  await Customers.aggregate(
    [
      {
        $lookup: {
          from: "transactions",
          localField: "accounts",
          foreignField: "account_id",
          as: "transactions"
        }
      },
      { $match: { username: req.params.username } }
    ]
    )
    .then((docs) => {
      res.send(docs);
    })
    .catch(() => {
      //
    });
});

router.get("/username/symbols/:username", async function (req, res) {
  await Customers.aggregate([
    {
      $lookup: {
        from: "transactions",
        localField: "accounts",
        foreignField: "account_id",
        as: "transactions"
      }
    },
    { $match: { username: req.params.username } },
    { $unwind: { path: "$transactions"} },
    {
      $group: {
        _id: { account_id: "$accounts" },
        symbols: { $addToSet: "$transactions.transactions.symbol" }
      }
    }, 
    {
      $project: {
          _id: 0,
          symbols: { $setUnion: "$symbols" }
      }
    },
    ])
    .then((docs) => {
      let uniqueSymbols = []
      let flattened = docs[0].symbols.flat();
      for (let i = 0; i < flattened.length; i++) {
        if(!uniqueSymbols.includes(flattened[i])){
          uniqueSymbols.push(flattened[i]);
        } 
      }
      res.send(uniqueSymbols);
    })
    .catch(() => {
      //
    });
});


//Route to get customer usernames
router.get("/email/", async function (_req, res) {
  await Customers.find({})
    .select("email")
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.error(err);
    });
});

//Route to get a customer by their specific username
router.get("/email/:email", async function (req, res) {
  await Customers.findOne({ email: req.params.email })
    .then((docs) => {
      res.send(docs);
    })
    .catch(() => {
      //
    });
});

//Search for a user using their text index
router.get("/search/:query", async function (req, res) {
  await Customers.find({ $text: { $search: req.params.query } })
    .then((docs) => {
      res.send(docs);
    })
    .catch(() => {
      //
    });
});

//Aggregate statistic routes:
//Route to get total count of customers:
router.get("/count/", async function (_req, res) {
  await Customers.countDocuments({})
    .then((count) => {
      console.log("Count :", count);
      res.json({ count: count });
    })
    .catch((err) => {
      console.error(err);
    });
});

export default router;
