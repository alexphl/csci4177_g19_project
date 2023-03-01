"use client";

import { useContext } from "react";
import { userContext } from "../UserContext";
import LoginOrRegister from "./LoginOrRegister";

function Auth() {
  // user context - has properties: loggedIn, email
  const { user } = useContext(userContext);

  if (user.loggedIn) {
    return <div>Redirecting... {redirect("/dashboard")}</div>;
  }

  return (
    <div className="container m-auto my-10 max-w-md bg-black border border-neutral-800 pt-1 p-4 shadow-lg rounded-xl" aria-label="Login or Register">
      <LoginOrRegister />
    </div>
  );
}

export default Auth;
