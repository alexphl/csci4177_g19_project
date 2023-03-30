/**Author: Crystal Parker B00440168 */
"use client";

import { memo, useEffect, useState, useContext } from "react";
import { userContext } from "../UserContext";
import {
  FormGroup,
  Container,
  TextField,
  FormHelperText,
  Button,
} from "@mui/material";


// Form styled using material UI, referenced the docs : https://mui.com/material-ui/
function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // user context - has properties: loggedIn, email
  const { user, dispatchUser } = useContext(userContext);

  // input validation functions
  const isValidEmail = (val) => {
    // https://www.emailregex.com/
    // Must be at least 8 digits long, and include capitals, numbers and a symbol: !#%
    // regex used in type=”email” from W3C
    let regEx = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    return regEx.test(val);
  };

  const isValidPassword = (val) => {
    // https://stackoverflow.com/a/59317682
    let regEx = new RegExp(
    // ^                               start anchor
    // (?=(.*[a-z]){1,})               lowercase letters. {1,} indicates that you want 1 of this group
    // (?=(.*[A-Z]){1,})               uppercase letters. {1,} indicates that you want 1 of this group
    // (?=(.*[0-9]){1,})               numbers. {1,} indicates that you want 1 of this group
    // (?=(.*[!@#$%^&*()\-__+.]){1,})  all the special characters in the [] fields. The ones used by regex are escaped by using the \ or the character itself. {1,} is redundant, but good practice, in case you change that to more than 1 in the future. Also keeps all the groups consistent
    // {8,}                            indicates that you want 8 or more
    // $                               end anchor

      /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/
    );
    return regEx.test(val);
  };

  // Input handlers
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // updateError()
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // updateError()
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let err = checkError();
    // password must be valid regex check
    // passwords must match
    if (err.length === 0) {
      // check with database
      const response = await loginUser({email : email, password: password})

      if(response.token){
        console.log(response.token)
        // set state
        dispatchUser({
          type: "SET_USER",
          payload: { email: email, name:response.name, loggedIn: true, id: response.id },
        });  
        // This is for our session token so it remembers you when you refresh
        // Local storage would remember longer but this is how we're doing it kiss
        const userToken = {token:response.token, email:email, id: response.id, name:response.name}
        sessionStorage.setItem('token', JSON.stringify(userToken))
      }else{
        console.log(response.error)
        setError("Login failed")
      }
    } else {
      console.log(err)
      setError(err)
    }
  };

  const loginUser= async (credentials) =>{
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const json = await response.json()

    return json
  }

  const checkError = () => {
    // error starts out as none
    let err = "";
    // inputs can't be empty

    if (!email || email.length === 0) {
      err = err + " Need email.";
    }
    if (!password || password.length === 0) {
      err = err + " Need password.";
    }
    // email must be valid regex check
    if (!isValidEmail(email)) {
      err = err + " Not a valid email.";
    }
    if (!isValidPassword(password)) {
      console.log(password)
      err = err + "Sorry Wrong Password";
    }

    console.log(err, password, email)

    return err;
  };

  // const updateError = () =>{
  //     setError(checkError())
  // }

  /** Work around so don't have to remember a password... who put it here?? */
  // useEffect(() => {
  //   setEmail("test@dal.ca");
  //   setPassword("4GSuqb5apL44h2w!");
  // }, []);

  useEffect(() => {
    //
  }, [error]);

  return (
    <Container maxWidth="xs">
      <div style={{ fontSize: "10px" }}>
        <form>
          <FormGroup>
            <TextField
              placeholder="Email"
              autoComplete="email"
              label="Email"
              value={email}
              focused
              margin="normal"
              onChange={handleEmailChange}
            />
            <TextField
              placeholder="Password"
              autoComplete="current-password"
              label="Password"
              type="password"
              value={password}
              focused
              margin="normal"
              onChange={handlePasswordChange}
            />
            <Button variant="outlined" className="mt-6" onClick={handleSubmit}>
              Login!
            </Button>
            <FormHelperText error={error.length > 0}>{error}</FormHelperText>
          </FormGroup>
        </form>
      </div>
    </Container>
  );
}

export default memo(LoginForm);
