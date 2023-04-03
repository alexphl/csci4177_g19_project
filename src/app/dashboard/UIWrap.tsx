/**Author: Olexiy Prokhvatylo B00847680 */

'use client'

import dynamic from "next/dynamic";
import { useState, useEffect, useContext } from "react";
import { userContext } from "@/app/UserContext";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion"

const NavDesktop = dynamic(() => import("./NavDesktop"));
const NavMobile = dynamic(() => import("./NavMobile"));
const PreferencesOverlay = dynamic(() => import("./PreferencesOverlay"));

export default function UIWrap() {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const router = useRouter();
  const { user } = useContext<any>(userContext);

  //the effect forces router to only run on client - necessary for build to work
  useEffect(() => {
    if (!user.isLoggedIn) {
      router.replace("/");
    }
  }, []);

  return (
    <>
      <NavDesktop overlayController={[isOverlayOpen, setOverlayOpen]} user={user} />
      <NavMobile overlayController={[isOverlayOpen, setOverlayOpen]} user={user} />
      <AnimatePresence>
        {isOverlayOpen && <PreferencesOverlay setOpen={setOverlayOpen} />}
      </AnimatePresence>
    </>
  );
}
