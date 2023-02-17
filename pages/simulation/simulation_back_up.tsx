import React, { useState } from 'react';

const stocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 140.32 },
  { symbol: 'GOOG', name: 'Alphabet Inc.', price: 2223.54 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 801.83 },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 3113.86 }
];

const Portfolio = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [shares, setShares] = useState(0);
  const [purchasedStocks, setPurchasedStocks] = useState([
    { symbol: 'AAPL', shares: 5, purchasePrice: 130.00, purchaseDate: '2022-01-01' },
    { symbol: 'TSLA', shares: 2, purchasePrice: 700.00, purchaseDate: '2022-01-02' }
  ]);
  const [netProfitLoss, setNetProfitLoss] = useState(0);

  const updateNetProfitLoss = () => {
    let net = 0;
    purchasedStocks.forEach(stock => {
      const stockInfo = stocks.find(s => s.symbol === stock.symbol);
      net += (stockInfo.price - stock.purchasePrice) * stock.shares;
    });
    setNetProfitLoss(net);
  };

  const handleStockSelection = (e) => {
    setSelectedStock(e.target.value);
  };

  const handleSharesChange = (e) => {
    setShares(e.target.value);
  };

  const handleStockPurchase = () => {
    if (!selectedStock || !shares) {
      return;
    }
    const newStock = {
      symbol: selectedStock,
      shares: parseInt(shares),
      purchasePrice: stocks.find(s => s.symbol === selectedStock).price,
      purchaseDate: new Date().toISOString().substring(0, 10)
    };
    setPurchasedStocks([...purchasedStocks, newStock]);
    setShares(0);
    setSelectedStock(null);
    updateNetProfitLoss();
  };

  return (
    <div>
      <h1>Portfolio</h1>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            
            <th>Shares</th>
            <th>Purchase Price</th>
            <th>Current Price</th>
            <th>Profit/Loss</th>
            <th>Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          {purchasedStocks.map(stock => {
            const stockInfo = stocks.find(s => s.symbol === stock.symbol);
            return (
              <tr key={stock.symbol}>
              <td>{stockInfo.name} ({stockInfo.symbol})</td>
              <td>{stock.shares}</td>
              <td>${stock.purchasePrice.toFixed(2)}</td>
              <td>${stockInfo.price.toFixed(2)}</td>
              <td>${((stockInfo.price - stock.purchasePrice) * stock.shares).toFixed(2)}</td>
              <td>{stock.purchaseDate}</td>
              </tr>
              );
              })}
              </tbody>
              </table>
              <div>
              <select onChange={handleStockSelection} value={selectedStock || ''}>
              <option value="" disabled>Select a stock to purchase</option>
              {stocks.map(stock => (
              <option key={stock.symbol} value={stock.symbol}>{stock.name} ({stock.symbol})</option>
              ))}
              </select>
              <input type="number" placeholder="Shares" value={shares} onChange={handleSharesChange} />
              <button onClick={handleStockPurchase}>Purchase Stock</button>
              </div>
              <h2>Net Profit/Loss: ${netProfitLoss.toFixed(2)}</h2>
              </div>
              );
              };
              
              export default Portfolio;
