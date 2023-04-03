/**Author: Crystal Parker B00440168 */
"use client";

import dynamic from "next/dynamic";
import { UserIcon } from "@heroicons/react/24/outline";
import { userContext } from "../../UserContext";
import { useState, useContext, memo } from "react";
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
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <div className="mb-6 flex cursor-default flex-col items-center gap-4 rounded-full px-6 outline-none">
        <UserIcon
          className="m-4 h-20 w-20 rounded-full border-2 border-neutral-800 p-4 text-neutral-400"
          fill="rgba(255,255,255,0.2)"
        />
        {user && (
          <section className="text-center">
            <h2 className="font-medium">{user.name}</h2>
            <p className="text-sm text-neutral-400">{user.email}</p>
          </section>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <Button variant="outlined" color="primary" onClick={handleLogOut}>
          Sign Out
        </Button>
        <Button variant="outlined" color="primary" onClick={handleUpdate}>
          Update Profile
        </Button>
        <Button variant="outlined" color="primary" onClick={handleReset}>
          Reset Password
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete Account
        </Button>
      </div>

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
