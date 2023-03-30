/**Author: Crystal Parker B00440168 */
"use client";

import { useEffect, useState, useContext, memo } from "react";
import { userContext } from "../UserContext";
import {
  FormGroup,
  Container,
  TextField,
  FormHelperText,
  Button,
} from "@mui/material";

// Form styled using material UI, referenced the docs : https://mui.com/material-ui/
function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  // user context - has properties: loggedIn, email
  const { dispatchUser } = useContext(userContext);

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
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // updateError()
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    let err = checkError();
    // password must be valid regex check
    // passwords must match

    if (err.length === 0) {
      console.log("Registering...")
      // check with database
        const response = await registerUser({
            email: email,
            userPassword: password,
            name:name,
        });

      if(response.token){
        console.log(response.token)

        // set state
      dispatchUser({
        type: "SET_USER",
        payload: { email: email, loggedIn: true, id: response.id },
      });

      // store a session cookie
      const userToken = {token:response.token, email:email, id: response.id}
      sessionStorage.setItem('token', JSON.stringify(userToken))
      }else{
        console.log(response.error)
        setError("Registration failed")
      }

    } else {
      setError(err);
    }
  };

  const registerUser= async (credentials) =>{
    const response = await fetch('/api/auth/register', {
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

    if (email.length === 0) {
      err = err + " Need email.";
    }
    if (password.length === 0) {
      err = err + " Need password.";
    }
    if (confirmPassword.length === 0) {
      err = err + " Need to confirm password.";
    }
    // email must be valid regex check
    if (!isValidEmail(email)) {
      err = err + " Not a valid email.";
    }
    if (!isValidPassword(password)) {
      err =
        err +
        " Password not secure. Must be at least 8 digits long, include capitals, numbers and a symbol: !#%";
    }
    if (password !== confirmPassword) {
      err = err + " Passwords don't match.";
    }

    return err;
  };

  // const updateError = () =>{
  //     setError(checkError())
  // }

  useEffect(() => {
    //
  }, [error]);

  return (
    <Container maxWidth="xs">
      <div style={{ fontSize: "10px" }}>
        <form>
          <FormGroup>
            <TextField
              placeholder="Name"
              autoComplete="name"
              label="Name"
              focused
              margin="normal"
              onChange={handleNameChange}
            />
            <TextField
              placeholder="Email"
              autoComplete="email"
              label="Email"
              focused
              margin="normal"
              onChange={handleEmailChange}
            />
            <TextField
              placeholder="Password"
              autoComplete="new-password"
              label="Password"
              type="password"
              focused
              margin="normal"
              onChange={handlePasswordChange}
            />
            <TextField
              placeholder="Confirm Password"
              type="password"
              autoComplete="new-password"
              label="Confirm Password"
              focused
              margin="normal"
              onChange={handleConfirmPasswordChange}
            />
            <Button variant="outlined" className="mt-6" onClick={handleSubmit}>
              Register!
            </Button>
            <FormHelperText error={error.length > 0}>{error}</FormHelperText>
          </FormGroup>
        </form>
      </div>
    </Container>
  );
}

export default memo(RegistrationForm);
