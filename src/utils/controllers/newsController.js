import axios from 'axios';



//for search the single news
const getnew = (input, number) => {
  var q = input;
  var apiKey = `${process.env.Newsapikey}`;
  var pageSize = number;
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
};
//for the final news list return back to dashboard page
const getnews_list = async (user_stock_list) => {
  let promises = [];
  user_stock_list.map((value) => {
    promises.push(getnew(value.name, 1));
  });
  let results = await Promise.all(promises).catch((error) => {
    return error;
  });

  if (results) {
    return results;
  } else {
    console.log(results);
  }
};

export { getnews_list, getnew };