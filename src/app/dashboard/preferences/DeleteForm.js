/**Author: Crystal Parker B00440168 */
import { Button, FormGroup, TextField } from "@mui/material";
import { useState, memo, useContext } from "react";
import { userContext } from "@/app/UserContext";
import { useRouter } from "next/navigation";

function DeleteForm() {
  const [deleteVerify, setDeleteVerify] = useState("");
  const { user, dispatchUser } = useContext(userContext);
  const router = useRouter();

  const handleDeleteVerifyChange = (e) => {
    e.preventDefault();
    setDeleteVerify(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit!", deleteVerify, deleteVerify === "DELETE");
    console.log(user)
    if(deleteVerify === "DELETE" && user.id){
      //delete on server
      const deleteRes = await deleteUser(user.id)

      if(deleteRes.success){
        sessionStorage.removeItem('token')
        dispatchUser({
          type: "LOGOUT_USER"
        })
        router.push("/");
      }
    }
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

  // Herman 
  const deletePortfolio = () =>{
    console.log("delete profile")
  }

  return (
    <form>
      <FormGroup>
        <TextField
          placeholder="DELETE"
          label="Type DELETE to verify"
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
