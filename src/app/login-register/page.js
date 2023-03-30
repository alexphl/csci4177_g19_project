/**Author: Crystal Parker B00440168 */
"use client";

import dynamic from "next/dynamic";
import { useContext, memo } from "react";
import { userContext } from "@/app/UserContext";
import { useRouter } from "next/navigation";
import useSessionStorage from "../useSessionStorage";

// lazy load components
const LoginOrRegister = dynamic(() => import("./LoginOrRegister"));

function Auth() {
  // user context - has properties: loggedIn, email
  const { user, dispatchUser } = useContext(userContext);
  const router = useRouter();

  // retrieves a token if it exists
  const userToken = useSessionStorage("token");
  if (userToken && userToken.token == "testing123") {
    dispatchUser({
      type: "SET_USER",
      payload: { email: userToken.email, loggedIn: true, id: userToken.id },
    });
  }

  if (user.loggedIn) {
    router.push("/dashboard");
  }

  return (
    <div
      className={
        "container my-10 max-w-md rounded-xl border border-neutral-800 bg-black p-2 pt-1 shadow-lg transition-all " +
        (user.loggedIn &&
          " pointer-events-none animate-pulse contrast-50 saturate-0")
      }
      aria-label="Login or Register"
    >
      <LoginOrRegister />
    </div>
  );
}

export default memo(Auth);
