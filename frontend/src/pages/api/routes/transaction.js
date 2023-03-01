import { Router } from "express";
import Transactions from "../models/Transactions";
const router = Router();

router.get("/", async function (req, res) {
  Transactions.find({}, function (err, docs) {
    if (err) console.error(err);
    if (docs) res.send(docs);
  });
});

router.get("/account_id/:account_id", async function (req, res) {
  Transactions.findOne(
    { account_id: req.params.account_id },
    function (err, docs) {
      if (err) console.error(err);
      if (docs) res.send(docs);
    }
  );
});

router.get("/id/:id", async function (req, res) {
  Transactions.findOne({ _id: req.params.id }, function (err, docs) {
    if (err) console.error(err);
    if (docs) res.send(docs);
  });
});

export default router;
