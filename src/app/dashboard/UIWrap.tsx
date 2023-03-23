'use client'

import dynamic from "next/dynamic";
import { useState } from "react";
const NavDesktop = dynamic(() => import("./NavDesktop"));
const NavMobile = dynamic(() => import("./NavMobile"));
const PreferencesOverlay = dynamic(() => import("./PreferencesOverlay"));

export default function UIWrap() {
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  return (
    <>
      <NavDesktop overlayController={[isOverlayOpen, setOverlayOpen]} />
      <NavMobile overlayController={[isOverlayOpen, setOverlayOpen]} />
      {isOverlayOpen && <PreferencesOverlay setOpen={setOverlayOpen} />}
    </>
  );
}
