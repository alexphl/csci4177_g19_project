"use client"

import { UserIcon } from "@heroicons/react/24/outline";
import { useContext } from "react"
import { userContext } from "@/app/UserContext";
export default function Preferences() {
  const { user } = useContext(userContext)
  console.log(user)
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 text-neutral-500">
      <button className="flex cursor-default items-center rounded-full p-5 outline-none">
        <UserIcon className="h-20 w-20" />
        <p>{user.email}</p>
      </button>

      <p className="text-lg">User Preferences Pane</p>
    </div>
  );
}
