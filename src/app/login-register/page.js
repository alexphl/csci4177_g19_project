/**Author: Crystal Parker B00440168 */
"use client";

import dynamic from "next/dynamic";
import { useContext, memo, useEffect } from "react";
import { userContext } from "@/app/UserContext";
import { useRouter } from "next/navigation";
import useSessionStorage from "../useSessionStorage";

// lazy load components
const LoginOrRegister = dynamic(() => import("./LoginOrRegister"));

function Auth() {
  // user context - has properties: loggedIn, email
  const { user } = useContext(userContext);
  const router = useRouter();

  

  // This doesn't want to work
  // useEffect(() => {
  //   // retrieves a token if it exists -should work but it doesn't
  //   const userToken = useSessionStorage("token");
  //   console.log(userToken)
  //   if (userToken && JSON.parse(userToken).token == "testing123") {
  //     console.log("Has token")
  //     dispatchUser({
  //       type: "SET_USER",
  //       payload: { email: userToken.email, loggedIn: true, id: userToken.id },
  //     });
  //   }
  //   console.log("Use Effect called")
  //   router.push("/dashboard");
  // },[]);
  

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
