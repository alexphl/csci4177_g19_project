import axios from 'axios';

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.send(getnews_list());
// });



const user_stock_list = [
  {
    ticker_symbol: "TSLA",
    name: "Tesla",
    symbol: "Inc",
  },

  {
    ticker_symbol: "AAPL",
    name: "Apple",
    symbol: "Inc",
  },
  {
    ticker_symbol: "GOOG",
    name: "Alphabet",
    symbol: "Inc",
  },
  {
    ticker_symbol: "AFRM",
    name: "Affirm Holdings",
    symbol: "Inc",
  },
];

//for search the single news
function getnew(input) {
  var q = input;
  var apiKey = `${process.env.Newsapikey}`;
  var pageSize = 1;
  var language = "en";
  // the qury sentence
  var querysentence =
    "q=" +
    q +
    "&" +
    "pageSize=" +
    pageSize +
    "&" +
    "language=" +
    language +
    "&" +
    "apiKey=" +
    apiKey;

  return new Promise((resolve, reject) => {
    axios
      .get("https://newsapi.org/v2/everything?" + querysentence)
      .then((response) => {
        resolve(response.data.articles[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
//for the final news list return back to dashboard page
export const getnews_list =async()=> {
  let promises = [];
  user_stock_list.map((value) => {
    promises.push(getnew(value.name));
  });
  let results = await Promise.all(promises).catch((error) => {
    return false;
  });

  if (results) {
    return results;
  } else {
    console.log(results);
  }
}

