/**Author: Herman Liang B00837314 */
import { Router } from "express";
import Model from "../models/simulation";
import Transactions from "../models/Transactions";
import customersModel from '../models/Customers';
//import Portfolio from '../schemas/simulation';
const router = Router();
//Post Method
router.get("/", function (_req, res, _next) {
  res.render("index", { title: "Express" });
});

import bcrypt from "bcrypt"; // https://www.npmjs.com/package/bcrypt
import axios from "axios";
import { getApiBaseUrl } from "../utils"; 
  
// hash received password
router.get("/addNewUser/:name/:email", async function (req, res) {
  const email = req.params.email;
  const name = req.params.name;
  const password = await bcrypt.hash("AAAaaa123456!", 10);
  const user = { name, email, password };
  // Store hash in database
  try {
    const response = await axios.post(getApiBaseUrl() + "/api/users/", user);
    res.status(200).json({ message: 'User added successfully', data: response.data });
  } catch (error) {
    console.error('Error while adding user:', error);
    res.status(500).json({ message: 'Error while adding user', error: error.message });
  }
});
// get accounts info
router.get('/accounts', async (req, res) => {
  const { email } = req.query;
  try {
    const customer = await customersModel.findOne({ email });
    console.log(customer);
    if (customer) {
      res.status(200).json({ accounts: customer.accounts });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error occurred', error });
  }
});
// Sync account to portfolio
router.get("/holdingsync/:account_id/:owner_id", async (req, res) => {
  try {
    const { account_id, owner_id } = req.params;
    const transactions = await Transactions.find({ account_id });
    
    // Calculate holdings and average purchase price for each stock
    const holdings = {};
    transactions.forEach((transaction) => {
      console.log(transaction);
      transaction.transactions.forEach((trx) => {
        const { symbol, amount, price } = trx;
        if (!holdings[symbol]) {
          holdings[symbol] = { quantity: 0, totalCost: 0 };
        }
        holdings[symbol].quantity += amount;
        holdings[symbol].totalCost += amount * parseFloat(price);
        holdings[symbol].avgPurchasePrice = holdings[symbol].totalCost / holdings[symbol].quantity;
      });
    });

    // Save the holdings to assets using owner_id
    const assets = Object.entries(holdings).map(([symbol, holding]) => {
      return {
        asset_name: symbol,
        asset_type: "stock",
        ticker: symbol,
        quantity: holding.quantity,
        purchase_date: new Date(),
        purchase_price: holding.avgPurchasePrice,
      };
    });

    const updatedPortfolio = await Model.findOneAndUpdate(
      { owner_id },
      { 
        $push: { assets: { $each: assets } },
        $set: { profit: 0 } 
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Holdings and average purchase price calculated successfully", updatedPortfolio });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while processing your request" });
  }
});

router.put('/update', async (req, res) => {
  const { owner_id, asset_id, newPurchaseDate, newPurchasePrice } = req.body;
  try {
    const portfolio = await Model.findOne({ owner_id });

  if (!portfolio) {
    throw new Error('User not found');
  }

  const assetToUpdate = portfolio.assets.find((asset) => asset._id.toString() === asset_id);

  if (!assetToUpdate) {
    throw new Error('Asset not found');
  }
  const parsedDate = new Date(Number(newPurchaseDate));
  if (isNaN(parsedDate)) {
    throw new Error('Invalid purchase date');
  } else {
    assetToUpdate.purchase_date = parsedDate;
  }
  assetToUpdate.purchase_price = parseFloat(newPurchasePrice);

  await portfolio.save();

  
  res.status(200).json(assetToUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the stock' });
  }

});



router.post('/new', async (req, res) => {
  try {
    const newPortfolio = new Model(req.body);
    const result = await newPortfolio.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
router.post("/buy", async (req, res) => {
  const { owner_id, asset_name, asset_type, ticker, quantity, purchase_price } =
    req.body;
  const purchase_date = new Date();
  try {
    // Search by owner id
    let portfolio = await Model.findOne({ owner_id });

    if (!portfolio) {
      // If user does not exist, create a new model
      portfolio = new Model({
        owner_id,
        assets: [],
        transaction_history:[],
        stock_list:[],
        watch_list:[],
      });
    }
    if (quantity === 0) {
      return res.status(400).json({ message: "Quantity cannot be zero" });
    }
    const newAsset = {
      asset_name,
      asset_type,
      ticker,
      quantity,
      purchase_date,
      purchase_price,
    };
    portfolio.assets.push(newAsset);

    // ADD A NEW TRANSACTION HISTORY
    const transaction = {
      transaction_type: "BUY",
      asset_name,
      asset_type,
      ticker,
      quantity,
      transaction_date: purchase_date,
      transaction_price: purchase_price,
    };

    portfolio.transaction_history.push(transaction);
    const updatedPortfolio = await portfolio.save();

    // SAVE NEW ASSETS

    res.status(200).json(updatedPortfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// fetching profit
router.get("/profit/:owner_id", async (req, res) => {
  try {
    const { owner_id } = req.params;
    const portfolio = await Model.findOne({ owner_id });

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.status(200).json(portfolio.profit);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
// Sell Stock
router.put("/sell", async (req, res) => {
  const {
    owner_id,
    ticker,
    quantity: quantity_to_sell,
    sell_price,
    asset_id,
  } = req.body;

  try {
    const portfolio = await Model.findOne({ owner_id });

    if (!portfolio) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the asset matching the provided asset_id
    const asset = portfolio.assets.id(asset_id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    if (asset.quantity < quantity_to_sell) {
      return res.status(400).json({ message: "Not enough quantity to sell" });
    }

    // Calculate the profit for this sell transaction
    const profit = (sell_price - asset.purchase_price) * quantity_to_sell;

    // Add the profit to the total profit in the portfolio
    portfolio.profit += profit;

    asset.quantity -= quantity_to_sell;

    // If the quantity becomes zero, remove the asset from the assets array
    if (asset.quantity === 0) {
      portfolio.assets = portfolio.assets.filter((item) => item !== asset);
    }

    const transaction = {
      transaction_type: "SELL",
      asset_name: asset.asset_name,
      asset_type: asset.asset_type,
      ticker,
      quantity: quantity_to_sell,
      transaction_date: new Date(),
      transaction_price: sell_price,
      purchase_price: asset.purchase_price,
    };

    portfolio.transaction_history.push(transaction);
    const updatedPortfolio = await portfolio.save();
    res.status(200).json(updatedPortfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/portfolio/:owner_id", async (req, res) => {
  const { owner_id } = req.params;

  try {
    const portfolio = await Model.findOne({ owner_id });

    if (!portfolio) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(portfolio.assets);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/transaction-history/:owner_id", async (req, res) => {
  const { owner_id } = req.params;

  try {
    const portfolio = await Model.findOne({ owner_id });

    if (!portfolio) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(portfolio.transaction_history);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Clear one person's current stock
router.delete("/stocks/:owner_id", async (req, res) => {
  const { owner_id } = req.params;

  try {
    const portfolio = await Model.findOne({ owner_id });

    if (!portfolio) {
      return res.status(404).json({ message: "User not found" });
    }

    // Clear all stocks
    portfolio.assets = [];

    // Save the updated portfolio
    const updatedPortfolio = await portfolio.save();
    res.status(200).json({ message: "All stocks cleared", updatedPortfolio });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
