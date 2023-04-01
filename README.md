# CSCI4177 - Assignment 3

**Author**:[Liam Osler](mailto:osler@cs.dal.ca)

**Last Modification Date**: 31 MAR 2023

## Repository URLS:

**Main Git Repository**: https://git.cs.dal.ca/cparker/csci4177_group19_project/

**Author Branch**: https://git.cs.dal.ca/cparker/csci4177_group19_project/-/tree/osler

## Remote Deployment URLs:

**Vercel**: https://4177-g19-mirror.vercel.app/

## Running the Project Locally:

Check that you have Node.js installed on your machine. If not, you can download it from https://nodejs.org/en/download/.

Ensure that you have Node 14.6.0 or later installed:

```bash
node -v
```

Clone the repository:

```bash
git clone https://git.cs.dal.ca/cparker/csci4177_group19_project.git
```

Navigate to the csci4177_group19_project directory:

```bash
cd csci4177_group19_project
```

Checkout the author branch (osler):

```bash
git checkout osler
```

Create a `.env` file in the root of the project folder to store the environment variables like the database username and password and third-party API keys. The `.env` file should look like this:

```
DB_USER="admin"
DB_USER_PASSWORD="pdGtt15zG252Iayf"
DB_URL="cluster0.zvtktko.mongodb.net/sample_analytics?retryWrites=true&w=majority"
FINNHUB_API_KEY=cg1bco1r01qpqqs2jcrgcg1bco1r01qpqqs2jcs0
Newsapikey=e0db6158b82c4b33bbae734d6db29a34
```

Install the required dependencies:

```bash
npm install
```

Start the server:

```bash
npm run dev
```

Wait for the project to build, then open your browser and navigate to http://localhost:3000 or the port specified in the console when prompted.

#### Dependencies:
- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [Next](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Tanstack Query](https://tanstack.com/)

## Deployment

The website is deployed with Vercel using a pipeline from the main Git repository:
https://4177-g19-mirror.vercel.app/
This build runs when there are changes to the main branch of the Git repository.

## Overview
The purpose of the app is to make stock trading easy to understand and accessible for everyone. Additionally, the app offers exclusive tools and resources to help users find the best investments and diversify their portfolios.

### Aggregating Information

The aggregate statistics are used to provide descriptive statistics and summary information about the data. This includes the mean, median, standard deviation, minimum and maximum values, as well as the total number of records, total number of unique values, and the percentage of missing values. These summary statistics can provide valuable insights into the data, allowing users to make informed decisions about their stock portfolios. Additionally, the aggregate statistic features can be used to compare different datasets and to identify any trends or patterns in the data.

Some examples of aggregate statistics include:
- The list of stocks which a user is holding in a specific account
- The list of stocks which a user is holding across all accounts
- The total buy price of all stocks in a user's portfolio
- The total sell price of all stocks in a user's portfolio
- The total number of shares owned for each stock in a user's portfolio
- Total profit or loss for a user's portfolio
- Total unrealized profit or loss for a user's portfolio

Some of these statistics can be used to calculate other statistics, such as the total profit or loss for a user's portfolio. Other statistics can be used to compare different datasets, such as the total number of shares owned for each stock in a user's portfolio compared to the total number of shares owned for each stock in a user's portfolio.

Some of these aggregations could be performed on the client-side of the application, while others could be performed on the server-side. Some of these aggregations may be more efficient to perform on the server-side, while others may be more efficient to perform on the client-side. 

In other cases we may want to perform the aggregation on both the client and server-side. An example of an operation that can be performed both client-side and server-side is retrieving the list of the symbols (stock tickers) for all stocks in an account.

### Task: Retrieve a customer or account's list of symbols:

#### The Database Schema
First, recall the database schema from the previous assignment:

##### Customer Model:
File: `/src/utils/models/Customers.js`
```js
const schema = mongoose.Schema({
  username: String,
  name: String,
    address: String,
    birthdate: Date,
    email: String,
    active: Boolean,
    accounts: [Number],
    tier_and_details: {
      tier: String,
      id: String,
      active: Boolean,
      benefits: [String]
    }
})
```

##### Account Model:
File: `/src/utils/models/Accounts.js`
```js
const schema = mongoose.Schema({
  account_id: Number,
  limit: Number,
  products: [String]
})
```

##### Transactions Model:
File: `/src/utils/models/Transactions.js`
```js
const schema = mongoose.Schema({
  account_id: Number,
  transaction_count: Number,
  bucket_start_date: Date,
  bucket_end_date: Date,
  transactions: [{
    date: Date,
    amount: Number,
    transaction_code: String,
    description: String,
    balance: Number,
    price: String,
    total: String
  }]
})
```

The `Customers` model contains information about a customer such as their name, address, birthdate, email, and active status. It also contains an array of account numbers and an object for tier and details related to the customer's membership. 

The `Accounts` model contains information about a customer's account such as the account ID, limit, and products. 

The `Transactions` model contains a list of the transactions for a specific account. Each transaction contains information about the date, amount, transaction code, description, balance, price, and total. These transactions are grouped into buckets based on the date range. The transaction for the specific bucket dates is stored in the `transactions` array.

Therefore, there is no list of the holding for a specific customer or account. Instead, the list of holdings for a specific customer or account can be retrieved by querying the `Transactions` model for all transactions for a specific account and then aggregating the results to get the list of symbols (stock tickers) for all stocks in an account.

To do this, a new route is created in `.../pages/api/transactions.js` to handle the request for the list of symbols (stock tickers) for all stocks in an account. The route is defined as follows:

File: `/src/utils/routes/transactions.js`
```js
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
```

Finding the unique symbols across all transactions for a specific account is done using the `distinct()` method. The `distinct()` method returns an array of all unique values for the specified field. In this case, the field is `transactions.symbol`. The `distinct()` method is used to find the unique symbols across all transactions for a specific account.

Thus, when a request is made to the route `/api/transactions/account_id/symbols/:account_id`, the route handler will find the unique symbols across all transactions for the account with the specified account ID. The results are then returned as an array of strings.

For instance, if we wanted to retrieve a list of all the symbols on the account `440243`, we can make a request here:
https://4177-g19-mirror.vercel.app/api/transaction/account_id/symbols/422649

You are returned an array for the symbols on the account `440243`:
```json
[
    "crm",
    "ebay",
    "intc",
    "nvda",
    "sap",
    "team"
]
```

If you visit an account page such as https://4177-g19-mirror.vercel.app/dashboard/accounts/440243, you can see that the list of symbols is used to display a card deck of the unique symbols held on the account.

We can also create this list on the client-side using the information that is fetched by the account viewer page, but this is server-side retrieval of the list of unique symbols is still useful because it allows us to easily retrieve the list of symbols for a specific account. This list can be passed to the stock viewing dashboard to specify the contents of a watchlist. This helps to minimize bandwidth usage and improve performance in situations where the full transaction history is not needed.

However, this is not the full list of stocks for a specific customer. This is because customers can hold multiple accounts, each with a different set of stocks. Therefore, we may want to find the list of symbols for all accounts for a specific customer. Performing this operation on the client-side would require us to make multiple requests to the server, which would be inefficient. Instead, we can perform this operation on the server-side. The example account above is associated with the customer `andrewhamilton`. This particular customer holds several accounts:
```json
[
    385397,
    337979,
    325377,
    440243,
    586395,
    86702
]
```

Each of these accounts has a different set of stocks. Therefore, we can use the list of accounts to find the list of symbols for all accounts for a specific customer. To do this, a new route is created in `.../pages/api/customer.js` to handle the request for the list of symbols (stock tickers) for all stocks in an account. The route is defined as follows:
File: `/src/utils/routes/customer.js`
```js

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
```
This code is a GET request that takes in a username parameter and returns an array of unique symbols related to that `username`, retrieved from the request URL slug.
The code begins by performing an aggregation query on the Customers collection. This query then uses a $lookup to join the Customers collection with the Transactions collection, matching the local field `accounts` to the foreign field `account_id`. The result of the lookup is stored in the `transactions` field.

The query then matches the username parameter to the username field in the `Customers` collection. The `$unwind` path is then used to flatten the transactions array. A group operation is then performed to group the documents by the `account_id` field, and create an array of symbols for each account.

Finally, a `$project` operation is used to remove the `_id` field, and create a setUnion of the symbols array, which will return a set of unique symbols associated with the username. The result of this query is then sent back to the client as a response after being flattened and filtered to remove duplicates by the server.

Therefore, if we wanted to retrieve a list of all the unique symbols for the customer `andrewhamilton`, we can make a request here:

https://4177-g19-mirror.vercel.app/api/customer/username/symbols/andrewhamilton

We will be returned an array of unique symbols for the customer `andrewhamilton`:
```json
[
    "bb",
    "sap",
    "team",
    "znga",
    "intc",
    "crm",
    "nvda",
    "ebay"
]
```

Which you may observe has the same symbols as the account `440243` above, as well as some additional symbols. This is because the customer `andrewhamilton` holds multiple accounts, each with a different set of stocks.

This list is then presented on the client-side in the form of a card deck on the customer viewer page, which can be accessed for customer `andrewhamilton` here:
https://4177-g19-mirror.vercel.app/dashboard/customers/andrewhamilton


### Task: Search for a user
Searching for users in a MERN stack app involves using the React front end to create a search field, which is then sent to the backend using an AJAX call. The backend then makes a call to the MongoDB database, which is the MERN stack's default database, and returns any results that match the search criteria. The results are then displayed in the React front end. The process can be enhanced by adding additional criteria such as sorting or filtering, to narrow down the results.

To perform a search for a user, we can use the search bar on the dashboard:

https://4177-g19-mirror.vercel.app/dashboard/

When the user enters a search term, the search bar will perform a request to the search API URL:



### Task: Provide a REST API
For the convenience of the developers, a REST API has been created to allow for easy access to the data stored in the database. The API is hosted on the same server as the application, and can be accessed at the following URLs:

https://4177-g19-mirror.vercel.app/api/

#### Customer URLs
Get all customers: **/api/customer/**
Base URL: https://4177-g19-mirror.vercel.app/api/customer/

By skip and limit: **/api/customer/:n/:k**
Where `n = the starting index` and `k = the number of items`
Example: https://4177-g19-mirror.vercel.app/api/customer/10/5 (Returns items 10 through 15)

Get customers by username: **/api/customer/username/:username**
Example: https://4177-g19-mirror.vercel.app/api/customer/username/fmiller

#### Account URLs:
Get all accounts: **/api/account/**
Example: https://4177-g19-mirror.vercel.app/api/account/

Get account by account_id: **/account/account_id/:id**
Example: https://4177-g19-mirror.vercel.app/api/account/account_id/557378

#### Transaction URLs:
Get all transactions: **/api/transaction/**
Example: https://4177-g19-mirror.vercel.app/api/transaction/

Get transactions by account_id:
Base URL: **/api/transaction/account_id/:id**
Example: http://localhost:3000/transaction/account_id/557378
