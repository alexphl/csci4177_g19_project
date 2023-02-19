"use client";

import { Container } from "@mui/material";
import { Fragment } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import { useEffect, useState, useContext } from "react";
import LoginOrRegister from "./LoginOrRegister";
import { userContext } from "../UserContext";

function Assignment1() {
  // const [loggedIn, setLoggedIn] = useState(false)
  // const [email, setEmail] = useState('')

  // prop for modal
  const [open, setOpen] = useState(false);

  // user context - has properties: loggedIn, email
  const { user } = useContext(userContext);

  useEffect(() => {
    //
  }, [user]);

  return (
    <div aria-label="Login or Register Modal">
      <Fragment>
        <br />
        <img
          alt="circle graph"
          width="100%"
          src="https://upload.wikimedia.org/wikipedia/commons/7/70/US_Stock_Market_Value_by_Sector.png"
        />
        <img
          alt="dot graph"
          width="100%"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Price-Earnings_Ratios_as_a_Predictor_of_Twenty-Year_Returns_%28Shiller_Data%29.png/800px-Price-Earnings_Ratios_as_a_Predictor_of_Twenty-Year_Returns_%28Shiller_Data%29.png"
        />

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
              bgcolor: "background.body",
            }}
          >
            <ModalClose
              variant="outlined"
              sx={{
                top: "calc(1/4 * var(--IconButton-size))",
                right: "calc(1/4 * var(--IconButton-size))",
                boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
                borderRadius: "50%",
                bgcolor: "background.body",
              }}
            />

            {/* This is the tabs */}
            <Container maxWidth="sm">
              <LoginOrRegister />
            </Container>
          </Sheet>
        </Modal>
      </Fragment>
    </div>
  );
}

export default Assignment1;
