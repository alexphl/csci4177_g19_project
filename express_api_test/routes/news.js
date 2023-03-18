"use strict";

import { Router } from "express";
import getnews_list from "../controllers/newsController";
const router = Router();

//Data retrieval routes:

//Route to get all customers
router.get("/", async function (req, res) {
  await getnews_list
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.error(err);
    });
});

export default router;