import { Button, FormGroup, TextField } from "@mui/material";
import { useState, memo } from "react";

function DeleteForm() {
  const [deleteVerify, setDeleteVerify] = useState("");

  const handleDeleteVerifyChange = (e) => {
    e.preventDefault();
    setDeleteVerify(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit!", deleteVerify, deleteVerify === "DELETE");
  };

  return (
    <form>
      <FormGroup>
        <TextField
          placeholder="DeleteVerify"
          label="Delete Verify"
          color="primary"
          focused
          margin="normal"
          onChange={handleDeleteVerifyChange}
          value={deleteVerify}
          autoComplete="off"
        />
        <Button onClick={handleSubmit}>DELETE</Button>
      </FormGroup>
    </form>
  );
}

export default memo(DeleteForm);
