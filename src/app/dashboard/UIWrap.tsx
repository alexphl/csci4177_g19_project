'use client'

import dynamic from "next/dynamic";
import { memo, createContext, useState } from "react";
import Overlay from "./Overlay";
const NavDesktop = dynamic(() => import("./NavDesktop"));
const NavMobile = dynamic(() => import("./NavMobile"));

function UIWrap() {
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  return (
    <>
      <NavDesktop overlayController={[isOverlayOpen, setOverlayOpen]} />
      <NavMobile overlayController={[isOverlayOpen, setOverlayOpen]} />
      {isOverlayOpen && <Overlay setOpen={setOverlayOpen} />}
    </>
  );
}

export default memo(UIWrap);
