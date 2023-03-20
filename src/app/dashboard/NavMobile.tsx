'use client'

import Link from "next/link";
import { UserIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { RectangleGroupIcon } from "@heroicons/react/24/solid";
import { useSelectedLayoutSegment } from "next/navigation";

import { contentBrowse, contentExplore, contentSettings, mobileBar } from "./NavSchema";

const linkStyle = "active:brightness-125 active:saturate-200";

const NavMobile = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="fixed z-50 flex bottom-6 justify-center items-center w-full p-6 md:hidden">
      <nav className="text-neutral-400 flex items-center justify-around bg-neutral-900/[0.8] border border-neutral-800 backdrop-blur-md shadow-lg w-full max-w-sm h-14 rounded-2xl">
        {mobileBar.map((entry) =>
          <div className="w-10 p-2 hover:bg-white/[0.1] rounded-xl">
            {entry.icon}
          </div>)}
        <div className="w-10 p-2 hover:bg-white/[0.1] rounded-xl">
          <Bars3Icon />
        </div>
      </nav>
    </div>
  );
};

export default NavMobile;
