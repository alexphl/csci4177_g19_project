/**Author: Crystal Parker B00440168 */
"use strict";

import { Router } from "express";
import Accounts from "../models/Accounts";
const router = Router();

/* GET users listing. */
router.get("/", async function (_req, res) {
  await Accounts.find({})
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.error(err);
    });
});

/* GET users listing. */
router.get("/account_id/:account_id", async function (req, res) {
  await Accounts.findOne({ account_id: req.params.account_id })
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/id/:id", async function (req, res) {
  await Accounts.findOne({ _id: req.params.id })
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.error(err);
    });
});

export default router;
