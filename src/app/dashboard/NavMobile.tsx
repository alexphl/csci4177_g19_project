'use client'

import Link from "next/link";
import { UserIcon, Bars3Icon, RectangleGroupIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";

import { contentBrowse, contentExplore, contentSettings, mobileBar } from "./NavSchema";
import { useState } from "react";

const linkStyle = "active:brightness-125 active:saturate-200";

export default function NavMobile() {
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
              initial={{ y: "34rem" }}
              animate={{ y: 0 }}
              exit={{ y: "34rem" }}
              transition={{
                type: "spring",
                damping: 42,
                stiffness: 650,
              }}
              className="overflow-auto scrollbar-hide pb-40 flex flex-col font-medium items-center gap-4 fixed p-4 bottom-[-2rem] w-[100vw] max-w-md rounded-t-3xl h-[90%] max-h-[34rem] border-[1.5px] border-white/[0.1] shadow-[0_-20px_60px_rgba(0,0,0,0.6)] bg-neutral-800/50 backdrop-blur-2xl backdrop-saturate-[3.0]"
            >
              <hr className="border border-white/[0.5] w-8 rounded-full" />

              <div className="border text-neutral-100 p-4 gap-4 border-white/[0.1] bg-white/[0.05] flex items-center rounded-2xl w-full h-16">
                <button className="flex aspect-square w-fit items-center rounded-full bg-black/[0.4] p-2 group-hover:mx-0 shadow-md">
                  <UserIcon className="w-5 text-neutral-400" />
                </button>
                <p className="text-sm">John Doe</p>
              </div>

              <div className="flex flex-col gap-1 w-full rounded-xl border p-1 border-white/[0.1] bg-white/[0.05]">
                <Link href="/dashboard" className={linkStyle} onClick={() => setExpanded(false)}>
                  <div
                    className="flex gap-5 items-center w-full rounded-lg p-3 hover:bg-white/[0.1] hover:text-white text-sm "
                  >
                    <RectangleGroupIcon className="w-5 shrink-0 ml-0.5" />
                    <h2>
                      Dashboard
                    </h2>
                  </div>
                </Link>
              </div>

              <div className="flex flex-col gap-1 w-full rounded-xl border p-1 border-white/[0.1] bg-white/[0.05]">
                {contentBrowse.map((link) => (
                  <Link key={link.link} href={link.link} className={linkStyle} onClick={() => setExpanded(false)}>
                    <div
                      className="flex gap-5 items-center w-full rounded-lg p-3 hover:bg-white/[0.1] hover:text-white text-sm "
                    >
                      <div className="w-5 shrink-0 ml-0.5">{link.icon}</div>
                      <h2>
                        {link.heading}
                      </h2>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-1 w-full rounded-xl border p-1 border-white/[0.1] bg-white/[0.05]">
                {contentExplore.map((link) => (
                  <Link key={link.link} href={link.link} className={linkStyle} onClick={() => setExpanded(false)}>
                    <div
                      className="flex gap-5 items-center w-full rounded-lg p-3 hover:bg-white/[0.1] hover:text-white text-sm "
                    >
                      <div className="w-5 shrink-0 ml-0.5">{link.icon}</div>
                      <h2>
                        {link.heading}
                      </h2>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-1 w-full rounded-xl border p-1 border-white/[0.1] bg-white/[0.05]">
                {contentSettings.map((link) => (
                  <Link key={link.link} href={link.link} className={linkStyle} onClick={() => setExpanded(false)}>
                    <div
                      className="flex gap-5 items-center w-full rounded-lg p-3 hover:bg-white/[0.1] hover:text-white text-sm "
                    >
                      <div className="w-5 shrink-0 ml-0.5">{link.icon}</div>
                      <h2>
                        {link.heading}
                      </h2>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </>
  );
};
