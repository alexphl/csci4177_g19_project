/**Author: Crystal Parker B00440168 */
import { Button, FormGroup, FormHelperText, TextField } from "@mui/material";
import { useState, memo, useContext } from "react";
import { userContext } from "@/app/UserContext";

function ResetForm(props) {
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const { user } = useContext(userContext);
  const [error, setError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit!", currPass, newPass, confirmPass);

    if(newPass === confirmPass){
      console.log("Passwords match")
      const updateUserRes = await resetUserPassword(user.id, newPass)
      if(updateUserRes.success){
        props.setOpen(false)
      }else{
        console.log("Failed")
        setError("Failed")
      }
      
    }else{
      console.log("Passwords don't match")
      setError("Passwords don't match")
    }
    
  };

  const resetUserPassword= async (id, password) =>{
    const response = await fetch('/api/users/'+id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({password}),
    });

    const json = await response.json()

    return json
  }

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
        <FormHelperText error={error.length > 0}>{error}</FormHelperText>
      </FormGroup>
    </form>
  );
}

export default memo(ResetForm);
