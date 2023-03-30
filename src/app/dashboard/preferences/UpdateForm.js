/**Author: Crystal Parker B00440168 */
"use client";
import { Button, FormGroup, TextField } from "@mui/material";
import { useState, useContext, memo } from "react";
import useSessionStorage from "../../useSessionStorage";
import { userContext } from "../../UserContext";

function UpdateForm(props) {
  const { user, dispatchUser } = useContext(userContext);
  // fill in by default current info
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  // Customer Profile
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  // End Customer Profile

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit!", name, email);
    console.log(user)
    console.log()
    if(name && email){
      // update on server
      const updateUserRes = await updateUser(user.id, {email, name})
      const updatePortfolioRes = updatePortfolio({address,username, birthdate})
    
      if(updateUserRes.status===200){
        // dispatch changes
        dispatchUser({
          type: "SET_USER",
          payload: { email: email, loggedIn: true, id: user.id, name:name },
        }); 

        // update session
        const userToken = useSessionStorage("token");
        userToken.email = email
        userToken.name = name
        sessionStorage.setItem('token', JSON.stringify(userToken))
      }
      props.setOpen(false)
    }
  };

    // This only updates user fields, not portfolio fields
    const updateUser= async (id, update) =>{
      const response = await fetch('/api/users/'+id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
      });
  
      const json = await response.json()
  
      return json
    }

  // Customer Profile
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleBirthdateChange = (e) => {
    setBirthdate(e.target.value);
  };

  const updatePortfolio = (contents) =>{
    console.log("updating portfolio...")
    console.log(contents)
  }
  // End Customer Profile

  return (
    <form>
      <FormGroup>
        <TextField
          placeholder="Name"
          label="Name"
          color="primary"
          focused
          margin="normal"
          onChange={handleNameChange}
          value={name}
          autoComplete="off"
          required
        />
        <TextField
          placeholder="Email"
          label="Email"
          color="primary"
          focused
          margin="normal"
          onChange={handleEmailChange}
          value={email}
          required
          autoComplete="off"
        />
        {/* Customer Profile */}
        <TextField
              placeholder="Username"
              autoComplete="username"
              label="Username"
              margin="normal"
              onChange={handleUsernameChange}
        />
        <TextField
              placeholder="Address"
              autoComplete="street-address"
              label="Address"
              margin="normal"
              onChange={handleAddressChange}
        />
        <TextField
              placeholder="Birthdate"
              autoComplete="bday"
              label="Birthdate"
              type="date"
              InputLabelProps={{ shrink: true }}
              margin="normal"
              onChange={handleBirthdateChange}
        />
        {/* End Customer Profile */}
        <Button onClick={handleSubmit}>Submit</Button>
      </FormGroup>
    </form>
  );
}

export default memo(UpdateForm);
