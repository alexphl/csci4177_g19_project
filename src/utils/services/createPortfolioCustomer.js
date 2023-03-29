// createPortfolioCustomer.js

import axios from 'axios';

const registerNewCustomerAndPortfolio = async (email, name) => {
  const address = "";
  const username = "";
  const birthdate = "";

  try {
    // Create a Portfolio in database
    const portfolio = {
      owner_id: email,
      profit: 0,
      assets: [],
      transaction_history: [],
      watchlists: [],
      stock_list: [],
    };

    const portfolioResponse = await axios.post('http://localhost:3000/api/simulation/new', portfolio);
    const create_portfolio = portfolioResponse.data;

    // Create a customer profile in database
    const customer = { username, name, address, birthdate, email }
    const customerResponse = await axios.post('http://localhost:3000/api/customer/new', customer);
    const create_customer = customerResponse.data;

    // Return the results
    return {
      success: true,
      portfolioResponse: create_portfolio,
      customerResponse: create_customer
    };
  } catch (error) {
    console.error("Error in registerNewCustomerAndPortfolio:", error);
    return {
      success: false,
      error: error.message || 'An error occurred during registration'
    };
  }
};

export default registerNewCustomerAndPortfolio;
