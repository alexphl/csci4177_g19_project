/**Author: Crystal Parker B00440168 */
// Two ways with async either .then or await, I used await
import bcrypt from "bcrypt"; // https://www.npmjs.com/package/bcrypt
import axios from "axios";
import registerNewCustomerAndPortfolio from "../services/createPortfolioCustomer"
const saltRounds = 10;

export const login = async (req, res) => {
  // get variables from req
  const { password, email } = req.body;
  
  if(!password){
    return res.status(400).json({ error: "missing password" });
  }

  try {
    // load hash from database
    const response = await axios.get(
      "http://localhost:3000/api/users/find/" + email
    );

    if (response.status === 200) {
      // get hash from response
      const hash = response.data[0].password;
      const id = response.data[0]._id;

      // compare password to hash
      const result = await bcrypt.compare(password, hash);

      console.log(result);

      // send response
      if (result) {
        // send token
        res.status(200).json({ token: "testing123", id: id }); // still need to come up with correct token
      } else {
        res.status(400).json({ error: "wrong password"});
      }
    } else {
      return res.status(500).json({ error: "something went wrong" });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: e.message });
  }
};

export const register = async (req, res) => {
  // get variables from req
  const { userPassword, email, name} = req.body;

  if(!userPassword){
    return res.status(400).json({ error: "missing userPassword" });
  }
  try {
    // hash received password
    const password = await bcrypt.hash(userPassword, saltRounds);
    const user = { name, email, password };
    // Store hash in database
    const response = await axios.post("http://localhost:3000/api/users/", user);
    
    // New Customer and Portfolio 
    const newCustomerPortfolioResponse = await registerNewCustomerAndPortfolio(email, name);

    const id = response.data[0]._id;
    if (response && response.status === 200) {
      // send token
      res.status(200).json({ token: "testing123" , id:id});
    } else {
      res.status(400).json({ error: "registration failed" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};
