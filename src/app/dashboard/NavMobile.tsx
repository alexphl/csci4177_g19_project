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
    <div className="fixed z-50 flex bottom-2 justify-center items-center w-full p-6 md:hidden">
      <nav className="text-white/[0.7] flex items-center justify-around bg-neutral-900/[0.8] border border-neutral-800 backdrop-blur-md saturate-200 shadow-lg w-full max-w-sm h-14 rounded-2xl">
        {mobileBar.map((entry) =>
          <Link key={entry.link} href={entry.link}>
            <div className="w-10 p-2 hover:bg-white/[0.05] rounded-xl saturate-200l">
              {entry.icon}
              {entry.heading.toLowerCase() === segment && <div className="absolute w-6 flex justify-center"><hr className="border w-3 rounded-full mt-3.5 border-white/[0.7]" /></div>}
            </div>
          </Link>
        )}
        <div className="w-10 p-2 hover:bg-white/[0.1] rounded-xl saturate-200">
          <Bars3Icon />
        </div>
      </nav>
    </div>
  );
};

export default NavMobile;
