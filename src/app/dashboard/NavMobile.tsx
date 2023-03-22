'use client'

import Link from "next/link";
import { UserIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";

import { contentBrowse, contentExplore, contentSettings, mobileBar } from "./NavSchema";
import { useState } from "react";

const linkStyle = "active:brightness-125 active:saturate-200";

const NavMobile = () => {
  const segment = useSelectedLayoutSegment();
  const [isExpanded, setExpanded] = useState(false);

  return (
    <>
      <div className="fixed z-50 flex bottom-5 justify-center items-center w-full px-8 md:hidden">
        <nav className="z-50 text-white/[0.8] flex items-center justify-around bg-neutral-900/[0.6] border-[1.5px] border-white/[0.1] backdrop-blur-lg backdrop-saturate-[5.0] shadow-xl w-full max-w-sm h-[3.25rem] rounded-2xl">
          {mobileBar.map((entry) =>
            <Link key={entry.link} href={entry.link}>
              <div className="w-[2.15rem] p-1.5 hover:bg-white/[0.05] rounded-xl drop-shadow-sm">
                {entry.icon}
                {entry.heading.toLowerCase() === segment && <div className="absolute w-6 flex justify-center"><hr className="border w-3 rounded-full mt-3 border-white/[0.8]" /></div>}
              </div>
            </Link>
          )}
          <button className={"w-[2.15rem] p-1.5 hover:bg-white/[0.1] rounded-xl saturate-200" + (isExpanded ? " bg-white/[0.1]" : "")} onClick={() => setExpanded(!isExpanded)}>
            <Bars3Icon />
          </button>
        </nav>

        <AnimatePresence>
          {
            isExpanded &&
            <motion.div
              initial={{ y: "30rem" }}
              animate={{ y: 0 }}
              exit={{ y: "30rem" }}
              transition={{
                type: "spring",
                damping: 40,
                stiffness: 650,
              }}
              className="fixed bottom-[-2rem] w-[100vw] max-w-md rounded-t-2xl h-4/5 max-h-[30rem] border-[1.5px] border-neutral-800 shadow-[0_-20px_60px_rgba(0,0,0,0.6)] bg-zinc-800/50 backdrop-blur-xl backdrop-saturate-[4.0]"
            >

            </motion.div>
          }
        </AnimatePresence>
      </div>
    </>
  );
};

export default NavMobile;
