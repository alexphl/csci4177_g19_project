"use client";

import { Container } from "@mui/material";
import { redirect } from 'next/navigation';
import { useContext, useEffect, useState } from "react";
import { userContext } from "../UserContext";
import LoginOrRegister from "./LoginOrRegister";

function Assignment1() {
  // user context - has properties: loggedIn, email
  const { user } = useContext(userContext)


  useEffect(() => {
    //
  }, [user])

  if(user.loggedIn){
    return(
      <div>Redirecting... {redirect('/dashboard')}</div>
    )
  }

  return (
    <div aria-label="Login or Register">
            {/* This is the tabs */}
            <Container maxWidth="sm">
              <LoginOrRegister />
            </Container>
    </div>
  )
}

export default Assignment1;
