"use strict";

import { Router } from 'express';
import Accounts from '../models/Accounts';
const router = Router();

/* GET users listing. */
router.get('/', async function(req, res) {
  Accounts.find({}, function (err, docs) {
    if(err)  console.error(err);
    if(docs) res.send(docs);
  });
});

/* GET users listing. */
router.get('/account_id/:account_id', async function(req, res) {
  Accounts.findOne({account_id: req.params.account_id}, function (err, docs) {
    if(err)  console.error(err);
    if(docs) res.send(docs);
  });
});

router.get('/id/:id', async function(req, res) {
  Accounts.findOne({_id:req.params.id}, function (err, docs) {
    if(err)  console.error(err);
    if(docs) res.send(docs);
  });
});

export default router;
