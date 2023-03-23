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
    // https://regex101.com/r/bC2gU7/3
    let regEx = new RegExp(
      /^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#%]*[!#%])[A-Za-z0-9!#%]{8,32}$/
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

  const handleSubmit = () => {
    let err = checkError();
    // password must be valid regex check
    // passwords must match

    if (err.length === 0) {
      dispatchUser({
        type: "SET_USER",
        payload: { email: email, loggedIn: true },
      });
    } else {
      setError(err);
    }
  };

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
