/**Author: Crystal Parker B00440168 */
"use client";

import dynamic from "next/dynamic";
import { useContext, memo, useEffect } from "react";
import { userContext } from "@/app/UserContext";
import { useRouter } from "next/navigation";

// lazy load components
const LoginOrRegister = dynamic(() => import("./LoginOrRegister"));

function Auth() {
  // user context - has properties: isLoggedIn, email
  const { user } = useContext(userContext);
  const router = useRouter();
  console.log("Status of user", user);

  if (user.isLoggedIn) {
    console.log("Should be pushing to dashboard...");
    router.push("/dashboard");
  }

  return (
    <div
      className={
        "container my-10 max-w-md rounded-xl border border-neutral-800 bg-black p-2 pt-1 shadow-lg transition-all " +
        (user.isLoggedIn &&
          " pointer-events-none animate-pulse contrast-50 saturate-0")
      }
      aria-label="Login or Register"
    >
      <LoginOrRegister />
    </div>
  );
}

export default memo(Auth);
