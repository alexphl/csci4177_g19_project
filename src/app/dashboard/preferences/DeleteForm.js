import { Button, FormGroup, TextField } from '@mui/material'
import React, { useState } from 'react'

function DeleteForm() {
    const [deleteVerify, setDeleteVerify] = useState("")
  
    const handleDeleteVerifyChange = (e) =>{
      e.preventDefault()
      setDeleteVerify(e.target.value)
    }

    const handleSubmit = (e) =>{
      e.preventDefault()
      console.log("Submit!",deleteVerify, deleteVerify==="DELETE")
     /** ToDo
     * - Delete on server
     * - Dispatch changes with userContext -> reset to null/false
     */
    }
  
    return (
        
        <form>
         <FormGroup>
          <TextField 
              placeholder="DeleteVerify"
              label="Delete Verify"
              color="primary"
              focused
              margin ='normal'
              onChange={handleDeleteVerifyChange}
              value={deleteVerify}
              autoComplete='off'
          />
          <Button  color='error' onClick={handleSubmit}>DELETE</Button>
          </FormGroup>
        </form>
        
    )
}

export default DeleteForm