/**Author: Liam Osler */
"use strict";

import { Router } from "express";
import Transactions from "../models/Transactions";
const router = Router();

router.get("/", async function (req, res) {
  await Transactions.find({})
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/account_id/:account_id", async function (req, res) {
  await Transactions.findOne({ account_id: req.params.account_id })
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/account_id/symbols/:account_id", async function (req, res) {
  await Transactions.findOne({ account_id: req.params.account_id })
    .distinct("transactions.symbol")
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/id/:id", async function (req, res) {
  await Transactions.findOne({ _id: req.params.id })
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.error(err);
    });
});

export default router;
