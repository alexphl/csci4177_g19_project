import { Router } from "express";
import Model from "../models/simulation";
//import Portfolio from '../schemas/simulation';
const router = Router();
//Post Method
router.get("/", function (_req, res, _next) {
  res.render("index", { title: "Express" });
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
      });
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
