import { Button, FormGroup, TextField } from '@mui/material'
import React, { useState } from 'react'

function UpdateForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleNameChange = (e) =>{
    e.preventDefault()
    setName(e.target.value)
  }

  const handleEmailChange = (e) =>{
    e.preventDefault()
    setEmail(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log("Submit!",name, email)
  }

  return (
    <form>
    <FormGroup>
        <TextField 
            placeholder="Name"
            label="Name"
            color="primary"
            focused
            margin ='normal'
            onChange={handleNameChange}
            value={name}
            autoComplete='off'
        />
        <TextField 
            placeholder="Email"
            label="Email"
            color="primary"
            focused
            margin ='normal'
            onChange={handleEmailChange}
            value={email}
            required
            autoComplete='off'
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </FormGroup>
      </form>
  )
}

export default UpdateForm