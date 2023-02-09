# MERN Stack Project: Stock Market Accounts
*Author*: Liam Osler 
*Date*: 2023-02-07

#### Link to Prototype: https://scintillating-toffee-28fea0.netlify.app/
##### Main Readme: https://git.cs.dal.ca/osler/csci4177-project-readme

# Table of Contents:


# General Overview:
## Technology Stack:
```text
 ┌────────────┐ ┌────────────┐ ┌────────────┐
 │CLIENT      │ │SERVER      │ │DATABASE    │
 │            │ │            │ │            │
 │   ┌─────┐  │ │ ┌───────┐  │ │            │
 │   │Axios├──┼─┼─┤Express│  │ │            │
 │   └──┬──┘  │ │ └───┬───┘  │ │            │
 │      │     │ │     │      │ │            │
 │      │     │ │     │      │ │            │
 │ ┌────┴──┐  │ │ ┌───┴───┐  │ │            │
 │ │Next.js│  │ │ │Node.js│  │ │            │
 │ └────┬──┘  │ │ └───┬───┘  │ │            │
 │      │     │ │     │      │ │            │
 │      │     │ │     │      │ │            │
 │ ┌────┴──┐  │ │ ┌───┴────┐ │ │ ┌───────┐  │
 │ │ React │  │ │ │Mongoose├─┼─┼─┤MongoDB│  │
 │ └───────┘  │ │ └────────┘ │ │ └───────┘  │
 │            │ │            │ │            │
 │            │ │            │ │            │
 └────────────┘ └────────────┘ └────────────┘
```
### Client-side Technologies:
* **Next.js**: A React framework that allows for server-side rendering and static site generation.
* **React**: A JavaScript library for building user interfaces.
* **Axios**: A promise-based HTTP client for the browser and Node.js.

### Server-side Technologies:
* **Node.js**: A JavaScript runtime engine
* **Express**: A web application framework for Node.js
* **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js

### Database Technologies:
* **MongoDB**: A document-oriented, NoSQL database

## Hosting:
### Back-End:
* **Back-End Github Pipeline Repository**: 
  * Github: https://github.com/LiamOsler/express-mongoose-sample_analytics/
* **Back-End Deployment URLs**: 
  * Cyclic: https://faithful-cyan-trunks.cyclic.app/
  * Azure: https://ticker-tape-api.azurewebsites.net/

### Front-end:
* **Front-End Github Pipeline Repository**: 
  * Github: https://github.com/LiamOsler/ticker-tape-website
* **Front-End Deployment URLs**: 
  * Netlify: https://scintillating-toffee-28fea0.netlify.app/

## Local Development:
* Clone the API repository
  * Set up the API for local use
* Clone the website repository
  * Set up the website for local use

## Deployment:
Pipelines are set up for both the front-end of the website (through Netlify) from the front-end repository, and the back-end of the API (through Cyclic) from the back-end repository.

* * * * *
# Back-End:

## Overview:
The back-end of this project is a RESTful API built using Node.js, Express, and Mongoose. The live version of the API has been hosted on Azure and Cyclic.

## Dependencies:
* [Node.js](https://nodejs.org/en/)
  * [Express.js](https://expressjs.com/)
  * [Mongoose](https://mongoosejs.com/)
  * [Morgan](https://www.npmjs.com/package/morgan)
  * [Dotenv](https://www.npmjs.com/package/dotenv)

## Installation:
* Clone the repository
* Run `npm install` to install the dependencies
* Run `npm start` to start the server
  * The server will run on port `3000` by default
* Visit [http://localhost:3000](http://localhost:3000) to view the full API documentation. 
  * [Mirror 1: Cyclic](https://faithful-cyan-trunks.cyclic.app/)
  * [Mirror 2: Azure](https://ticker-tape-api.azurewebsites.net/)

From scratch:

```bash
npx express-generator --ejs

npm install mongoose morgan dotenv
```

## Run the server:
```bash
npm start
```

### Technologies Used:
Built using the MongoDB.com [sample_analytics](https://www.mongodb.com/docs/atlas/sample-data/sample-analytics/) database.

### Setting up a MongoDB.com account and database:
- Head to [MongoDB.com](https://www.mongodb.com/) and create an account.
- Browse through the online documentation and familiarize yourself with the MongoDB Atlas platform.
- Navigate to your organization
- Create a new project and add yourself as a member (project owner)
- Navigate to the deployment area
- Select "create a database"
- Choose a tier (shared free tier is fine)
- Create a new user navigate to the "Security" section in the sidebar, and click on "Quickstart" or "Database Access" and add a new user.
- Generate a username and password for the user, use the autogenerate secure password for a strong password and copy the password to a secure location.
- Navigate to "Network Access" in the sidebar and click "Add IP Address" and add your current IP address. Or add `0.0.0.0` to allow all IP addresses.
- Navigate to "Database" below "Deployment" in the sidebar and look at your Database deployments.
- Create a new cluster if one does not exist.
- Click on the " ... " button and select "Load Sample Data"
- Wait for the sample dataset to load, this may take a few minutes.
- Find your connection string by clicking on the "Connect" button and selecting "Connect your application"
- Modify the connection string to include your username and password.
- Modify the connection string to include the name of the database you want to connect to. (sample_analytics)

### Modifying the connection string:

### Connecting to the database:

#### Add the database URL and credentials to a `.env` file:
```bash
DB_USER=""
DB_USER_PASSWORD=""
DB_URL=""
```
With your correct credentials and connection URL generated from the MongoDB.com Atlas website.

You will need to add these as environment variables to your server. For instructions on how to do so on Azure, see [this article](https://docs.microsoft.com/en-us/azure/app-service/configure-common#configure-app-settings). For documentation on doing so for Cyclic, see [this article](https://docs.cyclic.sh/concepts/env_vars).

#### Setup Mongoose:
`./app.js`
```js
var mongoose = require('mongoose');

var dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_URL}`;
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.set("strictQuery", true);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("DB Connected Successfully");
});

```

### Fetching Data

#### Customers
Customer schema:

`./models/Customers.js`:
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

Example item:

```json
{
  "tier_and_details": {
      "benefits": [],
      "0df078f33aa74a2e9696e0520c1a828a": {
          "tier": "Bronze",
          "id": "0df078f33aa74a2e9696e0520c1a828a",
          "active": true,
          "benefits": ["sports tickets"]
      },
      "699456451cc24f028d2aa99d7534c219": {
          "tier": "Bronze",
          "benefits": ["24 hour dedicated line", "concierge services"],
          "active": true,
          "id": "699456451cc24f028d2aa99d7534c219"
      }
  },
  "_id": "5ca4bbcea2dd94ee58162a68",
  "username": "fmiller",
  "name": "Elizabeth Ray",
  "address": "9286 Bethany Glens\nVasqueztown, CO 22939",
  "birthdate": "1977-03-02T02:20:31.000Z",
  "email": "arroyocolton@gmail.com",
  "active": true,
  "accounts": [371138, 324287, 276528, 332179, 422649, 387979]
}
```

##### Customer URLs

##### Get all customers:
**Base URL:** <http://localhost:3000/customer/>

##### Skip and limit:
/customer/:n/:k

Where n = the starting index and k = the number of items

Example: <http://localhost:3000/customer/10/5>

Returns items 10 through 15

##### username:
**Base URL:** <http://localhost:3000/customer/username/>

(Base URL returns list of usernames)

Find by username: /customer/username/:username

Example: <http://localhost:3000/customer/username/fmiller>

##### Email:
**Base URL:** <http://localhost:3000/customer/email/> (Returns list of email addresses)

Find by username: customer/email/:email
Example: <http://localhost:3000/customer/email/arroyocolton@gmail.com>

##### Search for user:
**Base URL:** customer/search/:query
Example: <http://localhost:3000/customer/search/miller>

#### Accounts
Account schema:

`./models/Accounts.js`:
```js
const schema = mongoose.Schema({
  account_id: Number,
  limit: Number,
  products: [String]
})
```

Example item:

```json
{
  "_id": "5ca4bbc7a2dd94ee5816238d",
  "account_id": 557378,
  "limit": 10000,
  "products": ["InvestmentStock", "Commodity", "Brokerage", "CurrencyService"]
}
```

##### Account URLs

##### Get all accounts:
****Base URL:**** <http://localhost:3000/account/>

##### Get account by account_id:
**Base URL:** account/account_id/:id

Example: <http://localhost:3000/account/account_id/557378>

### Transactions

Transaction schema:

`./models/Transactions.js`:
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

Example item:
```json
{
  "_id": "5ca4bbc1a2dd94ee58161cb1",
  "account_id": 443178,
  "transaction_count": 66,
  "bucket_start_date": "1969-02-04T00:00:00.000Z",
  "bucket_end_date": "2017-01-03T00:00:00.000Z",
  "transactions": [{
      "_id": "63d9fec316c2d0f2a46058fd",
      "date": "2003-09-09T00:00:00.000Z",
      "amount": 7514,
      "transaction_code": "buy",
      "symbol": "adbe",
      "price": "19.1072802650074180519368383102118968963623046875",
      "total": "143572.1039112657392422534031"
  },
  ...
  {
      "_id": "63d9fec316c2d0f2a460593e",
      "date": "2005-07-07T00:00:00.000Z",
      "amount": 2881,
      "transaction_code": "buy",
      "symbol": "msft",
      "price": "20.6769287918292690164889791049063205718994140625",
      "total": "59570.23184926012403650474880"
  }]
}
```

#### Transaction URLs
##### Get all transactions:
**Base URL:** <http://localhost:3000/transaction/>

##### Get transactions by account_id:
**Base URL:** /transaction/account_id/:id

Example: <http://localhost:3000/transaction/account_id/557378>

### Creating routes with Express:

Add the route files to `./app.js`:
```js
var indexRouter = require('./routes/index');
var accountRouter = require('./routes/account');
var customerRouter = require('./routes/customer');
var transactionRouter = require('./routes/transaction');

app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/customer', customerRouter);
app.use('/transaction', transactionRouter);
```

`./routes/account.js`
```js
var express = require('express');
var router = express.Router();
var Model = require('../models/Accounts');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var test = Model.find({}, function (err, docs) {
    if(err)  console.error(err);
    if(docs) res.send(docs);
  });
});

/* GET user by account_id. */
router.get('/account_id/:account_id', async function(req, res, next) {
  var test = Model.findOne({account_id: req.params.account_id}, function (err, docs) {
    if(err)  console.error(err);
    if(docs) res.send(docs);
  });
});

module.exports = router;
```

`./routes/customer.js`
```js
var express = require('express');
var router = express.Router();
var Model = require('../models/Customers');

//Data retrieval routes:

//Route to get all customers
router.get('/', async function(req, res, next) {
  var result = Model.find({}, function (err, docs) {
    if(err)  console.error(err);
    if(docs) res.json(docs);
  });
});

//Route to get a range of the customers
router.get('/:n(\\d+)/:k(\\d+)', async function(req, res, next) {
  var result = Model.find({}, function (err, docs) {
    if(err)  console.error(err);
    if(docs) res.json(docs);
  }).skip(parseInt(req.params.n)).limit(parseInt(req.params.k));
});

//Route to get customer usernames
router.get('/username/', async function(req, res, next) {
  var result = Model.find({}, function (err, docs) {
    if(err)  res.json(err);
    if(docs) res.json(docs);
  }).select('username');
});

//Route to get a customer by their specific username
router.get('/username/:username', async function(req, res, next) {
  var result = Model.findOne({username:req.params.username}, function (err, docs) {
    if(err)  res.json(err);
    if(docs) res.json(docs);
  });
});

//Route to get customer usernames
router.get('/email/', async function(req, res, next) {
  var result = Model.find({}, function (err, docs) {
    if(err)  res.json(err);
    if(docs) res.json(docs);
  }).select('email');
});

//Route to get a customer by their specific username
router.get('/email/:email', async function(req, res, next) {
  var result = Model.findOne({email:req.params.email}, function (err, docs) {
    if(err)  res.json(err);
    if(docs) res.json(docs);
  });
});

//Search for a user using their text index
router.get('/search/:query', async function(req, res, next) {
  var result = Model.find({$text: {$search: req.params.query}}, function (err, docs) {
    if(err)  res.json(err);
    if(docs) res.json(docs);
  });
});

module.exports = router;
```

`./routes/tranasction.js`
```js
var express = require('express');
var router = express.Router();
var Model = require('../models/Transactions');

router.get('/', async function(req, res, next) {
  var test = Model.find({}, function (err, docs) {
    if(err)  console.error(err);
    if(docs) res.send(docs);
  });
});

router.get('/account_id/:account_id', async function(req, res, next) {
  var test = Model.findOne({account_id: req.params.account_id}, function (err, docs) {
    if(err)  console.error(err);
    if(docs) res.send(docs);
  });
});

router.get('/id/:id', async function(req, res, next) {
  var model = Model.findOne({_id:req.params.id}, function (err, docs) {
    if(err)  console.error(err);
    if(docs) res.send(docs);
  });
});

module.exports = router;
```

### Cross-Origin Resource Sharing (CORS):
CORS is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.

In order to allow requests from a domain other than the one serving the API, you must add the domain to the list of allowed domains in the `app.js` file.

For instance, if you are running the API server on port 3000 and the app on port 3001, you would add the following to the `app.js` file:

```js
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  // res.setHeader('Access-Control-Allow-Origin', 'https://scintillating-toffee-28fea0.netlify.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
```

For deployment:

```js
app.use(function (req, res, next) {
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Origin', 'https://scintillating-toffee-28fea0.netlify.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
```



* * * * *
# Front-end:
## Getting Started

First, clone the repository:
```bash
git clone https://github.com/LiamOsler/express-mongoose-sample_analytics/
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Some functionality will not be present unless the front-end of the application can connect to the back-end.

Note: when running the app locally, you should start the API server first, then start the app. In this case the app will be running on port 3001 and the API server will be running on port 3000. Open [http://localhost:3001](http://localhost:3001) in this case. The `npm run dev` script will try to find the first open port. 

You will need to set an `API_URL` environment variable to the API server URL if you are running the app on a different port. Alternatively, you can modify the contents of `APIurl.js` to point to the API server:
```js
const apiURL = "https://faithful-cyan-trunks.cyclic.app"
// const apiURL = "http://localhost:3000"

export default apiURL;
```

becomes:
```js
// const apiURL = "https://faithful-cyan-trunks.cyclic.app"
const apiURL = "http://localhost:3000"

export default apiURL;
```

Which are accessed in this manner in the app, for example in `./src/components/accounts/[username].js`:
```js
import apiURL from '../../APIurl';
const accountBaseURL = apiURL + "/account/account_id/";
const tranasctionsBaseURL = apiURL + "/transaction/account_id/";
```

or create a `.env` file in the root directory of the app and add the following line:
```bash
API_URL="http://localhost:3000/"
```

You could then access the API URLs like this:
```js
const const accountBaseURL = process.env.API_URL + "/account/account_id/";
const tranasctionsBaseURL = process.env.API_URL + "/transaction/account_id/";
```
