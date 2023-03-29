/**Author: Crystal Parker B00440168 */
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
    /** ToDo
     * - Delete on server
     * - Delete session
     * - Dispatch changes with userContext -> reset to null/false
     */
  };

  const deleteUser= async (id) =>{
    const response = await fetch('/api/users/'+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const json = await response.json()

    return json
  }

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
        <Button color="error" onClick={handleSubmit}>
          DELETE
        </Button>
      </FormGroup>
    </form>
  );
}

export default memo(DeleteForm);
