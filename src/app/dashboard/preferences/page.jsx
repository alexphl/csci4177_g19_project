"use client"

import { UserIcon } from "@heroicons/react/24/outline";
import { useContext } from "react"
import { userContext } from "@/app/UserContext";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation"
import { useState } from "react";
import {Modal, Box} from '@mui/material';
import DeleteForm from "./DeleteForm";
import ResetForm from "./ResetForm";
import UpdateForm from "./UpdateForm";

// Style for modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'background.paper',
  border: '3px solid #000',
  boxShadow: 10,
  color: '#000',
  p: 4,
  borderRadius: '15px'
}
export default function Preferences() {
  const { user } = useContext(userContext)

  //modals
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const handleClose1 = () => setOpen1(false)
  const handleClose2 = () => setOpen2(false)
  const handleClose3 = () => setOpen3(false)
  let router= useRouter()

  const handleUpdate = (e) => {
    e.preventDefault()
    setOpen1(true)
  }

  const handleReset = (e) =>{
    e.preventDefault()
    setOpen2(true)
  }

  const handleDelete = (e) =>{
    e.preventDefault()
    setOpen3(true)
  }


  if(!user.loggedIn) return <div>Redirecting... {router.push("/")}</div>

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 text-neutral-500">
      <button className="flex cursor-default items-center rounded-full p-5 outline-none">
        <UserIcon className="h-20 w-20" />
        <p>{user.email}</p>
      </button>
      <Button variant="outlined" color="primary" onClick={handleUpdate} >
        Update
      </Button>
      <Button variant="outlined" color="primary" onClick={handleReset}>
        Reset Password
      </Button>
      <Button variant="outlined" color="error" onClick={handleDelete}>
        DELETE ACCOUNT!
      </Button>

      <p className="text-lg">User Preferences Pane</p>

      {/* Update modal */}
      <Modal
          open={open1}
          onClose={handleClose1}
      >
        <Box sx={style}>
          <h3>Update</h3> 
          <UpdateForm/>             
        </Box>
      </Modal>
      {/* Reset modal */}
      <Modal
          open={open2}
          onClose={handleClose2}
      >
        <Box sx={style}>
          <h3>Reset</h3>   
          <ResetForm/>              
        </Box>
      </Modal>
      {/* Delete modal */}
      <Modal
          open={open3}
          onClose={handleClose3}
      >
        <Box sx={style}>
          <h3>Delete</h3> 
          <DeleteForm/>      
        </Box>
      </Modal>
    </div>
  );
}
