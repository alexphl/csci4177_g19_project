"use client"

import { useContext } from "react"
import { userContext } from "../UserContext"
import LoginOrRegister from "./LoginOrRegister"
import { useRouter } from "next/navigation"

function Auth() {
  // user context - has properties: loggedIn, email
  const { user } = useContext(userContext)
  let router= useRouter()

  if (user.loggedIn) {
    return <div>Redirecting... {router.push("/dashboard")}</div>
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

export default Auth
