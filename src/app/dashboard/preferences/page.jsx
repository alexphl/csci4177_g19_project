/**Author: Crystal Parker B00440168 */
"use client";

import dynamic from "next/dynamic";
import { UserIcon } from "@heroicons/react/24/outline";
import { userContext } from "../../UserContext";
import { useState, useContext, memo, useEffect } from "react";
import { Modal, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

// Lazy load components
const DeleteForm = dynamic(() => import("./DeleteForm"));
const ResetForm = dynamic(() => import("./ResetForm"));
const UpdateForm = dynamic(() => import("./UpdateForm"));

// Style for modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "background.paper",
  border: "3px solid #000",
  boxShadow: 10,
  color: "primary",
  p: 4,
  borderRadius: "15px",
};

function Preferences() {
  const { user, dispatchUser } = useContext(userContext);
  const router = useRouter();

  //modals
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const handleClose1 = () => setOpen1(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setOpen1(true);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setOpen2(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setOpen3(true);
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatchUser({
      type: "LOGOUT_USER",
    });
    sessionStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 text-neutral-500">
      <button className="flex cursor-default items-center rounded-full p-5 outline-none">
        <UserIcon className="h-20 w-20" />
        {user && user.name ? (
          <p>
            {user.name} {user.email}
          </p>
        ) : (
          <p>{user.email}</p>
        )}
      </button>
      <Button variant="outlined" color="primary" onClick={handleLogOut}>
        Log Out
      </Button>
      <Button variant="outlined" color="primary" onClick={handleUpdate}>
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
      <Modal open={open1} onClose={handleClose1}>
        <Box sx={style}>
          <h3>Update</h3>
          <UpdateForm setOpen={setOpen1} />
        </Box>
      </Modal>
      {/* Reset modal */}
      <Modal open={open2} onClose={handleClose2}>
        <Box sx={style}>
          <h3>Reset</h3>
          <ResetForm setOpen={setOpen2} />
        </Box>
      </Modal>
      {/* Delete modal */}
      <Modal open={open3} onClose={handleClose3}>
        <Box sx={style}>
          <h3>Delete</h3>
          <DeleteForm setOpen={setOpen3} />
        </Box>
      </Modal>
    </div>
  );
}

export default memo(Preferences);
