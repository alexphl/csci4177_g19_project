"use client";

import dynamic from "next/dynamic";
import { useContext, memo } from "react";
import { userContext } from "../UserContext";

// lazy load components
const LoginOrRegister = dynamic(() => import("./LoginOrRegister"));

function Auth() {
  // user context - has properties: loggedIn, email
  const { user } = useContext(userContext);

  if (user.loggedIn) {
    return <div>Redirecting... {redirect("/dashboard")}</div>;
  }

  return (
    <div
      className="container my-10 max-w-md rounded-xl border border-neutral-800 bg-black p-2 pt-1 shadow-lg"
      aria-label="Login or Register"
    >
      <LoginOrRegister />
    </div>
  );
}

export default memo(Auth);
