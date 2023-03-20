'use client'

import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";
import { RectangleGroupIcon } from "@heroicons/react/24/solid";
import { useSelectedLayoutSegment } from "next/navigation";

import { contentBrowse, contentExplore, contentSettings } from "./NavSchema";

const linkStyle = "active:brightness-125 active:saturate-200";

const NavMobile = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="fixed z-50 flex bottom-6 justify-center items-center w-full p-6 md:hidden">
      <nav className="bg-neutral-900/[0.8] border border-neutral-800 backdrop-blur-md shadow-lg w-full max-w-sm h-14 rounded-2xl">

      </nav>
    </div>
  );
};

export default NavMobile;
