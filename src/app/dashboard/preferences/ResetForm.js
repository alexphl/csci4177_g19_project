/**Author: Crystal Parker B00440168 */
import { Button, FormGroup, TextField } from "@mui/material";
import { useState, memo } from "react";

function ResetForm() {
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleCurrPassChange = (e) => {
    e.preventDefault();
    setCurrPass(e.target.value);
  };

  const handleNewPassChange = (e) => {
    e.preventDefault();
    setNewPass(e.target.value);
  };

  const handleConfirmPassChange = (e) => {
    e.preventDefault();
    setConfirmPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit!", currPass, newPass, confirmPass);

    /** ToDo
     * - Update on server
     * - Dispatch changes with userContext
     */
  };

  return (
    <form>
      <FormGroup>
        <TextField
          placeholder="Current Password"
          label="Current Password"
          color="primary"
          focused
          type="password"
          margin="normal"
          onChange={handleCurrPassChange}
          value={currPass}
          autoComplete="off"
        />
        <TextField
          placeholder="New Password"
          label="New Password"
          type="password"
          color="primary"
          focused
          margin="normal"
          onChange={handleNewPassChange}
          value={newPass}
          required
          autoComplete="off"
        />
        <TextField
          placeholder="Confirm Password"
          label="Confirm Password"
          type="password"
          color="primary"
          focused
          margin="normal"
          onChange={handleConfirmPassChange}
          value={confirmPass}
          required
          autoComplete="off"
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </FormGroup>
    </form>
  );
}

export default memo(ResetForm);
