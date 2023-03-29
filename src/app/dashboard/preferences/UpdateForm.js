/**Author: Crystal Parker B00440168 */
import { Button, FormGroup, TextField } from "@mui/material";
import { useState, memo } from "react";

function UpdateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit!", name, email);

    /** ToDo
     * - Update on server
     * - Dispatch changes with userContext
     */
  };

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
  // End Customer Profile

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
