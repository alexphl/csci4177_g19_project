'use client'

import Link from "next/link";
import { UserIcon, Bars3Icon, RectangleGroupIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, m } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";

import { contentBrowse, contentExplore, mobileBar } from "./NavSchema";
import { useState } from "react";

const linkStyle = "active:brightness-125";

export default function NavMobile(props: { overlayController: [boolean, Dispatch<SetStateAction<boolean>>] }) {
  const segment = useSelectedLayoutSegment();
  const [isExpanded, setExpanded] = useState(false);
  const [isOverlayOpen, setOverlayOpen] = props.overlayController;

  return (
    <>
      <div className="fixed z-50 flex bottom-0 justify-center items-center w-full px-8 md:hidden">
        <nav className="z-50 text-white/[0.8] mb-5 flex items-center justify-around bg-neutral-900/[0.6] border-[1.5px] border-white/[0.1] backdrop-blur-lg backdrop-saturate-[3.0] shadow-xl w-full max-w-sm h-[3.25rem] rounded-2xl">
          {mobileBar.map((entry) =>
            <Link key={entry.link} href={entry.link}>
              <div className="w-[2.15rem] p-1.5 hover:bg-white/[0.05] rounded-xl drop-shadow-sm">
                {entry.icon}
                {entry.heading.toLowerCase() === segment && <div className="absolute w-6 flex justify-center"><hr className="border w-3 rounded-full mt-3 border-white/[0.8]" /></div>}
              </div>
            </Link>
          )}
          <button className={"w-[2.15rem] p-1.5 hover:bg-white/[0.1] rounded-xl" + (isExpanded ? " bg-white/[0.1]" : "")} onClick={() => setExpanded(!isExpanded)}>
            <Bars3Icon fill="rgba(255,255,255,0.2)" />
          </button>
        </nav>

        <AnimatePresence>
          {
            isExpanded &&
            <>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setExpanded(false)}
                className="absolute h-screen w-screen bg-black bottom-0 bg-black/25 backdrop-blur-sm"
              />

              <div
                onClick={() => setExpanded(false)}
                className="absolute bottom-[-3rem] h-screen overflow-scroll overscroll-contain scrollbar-hide max-w-md w-screen"
              >
                <m.div
                  initial={{ y: "34rem" }}
                  animate={{ y: 0 }}
                  exit={{ y: "42rem" }}
                  transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 300,
                  }}
                  className="mt-[80%] pb-36 flex h-fit flex-col font-medium items-center gap-4 p-4 w-full rounded-t-3xl border-[1.5px] border-white/[0.1] shadow-[0_-20px_60px_rgba(0,0,0,0.6)] bg-neutral-800/50 backdrop-blur-2xl backdrop-saturate-[3.0]"
                >
                  <hr className="border border-white/[0.5] w-8 rounded-full" />

                  <button
                    className="border text-neutral-100 p-5 gap-5 border-white/[0.1] bg-white/[0.05] flex items-center rounded-2xl w-full"
                    onClick={() => setOverlayOpen(!isOverlayOpen)}
                  >
                    <div className="flex aspect-square w-fit items-center rounded-full bg-black/[0.4] p-2 group-hover:mx-0 shadow-md">
                      <UserIcon className="w-6" fill="rgba(255,255,255,0.2)" />
                    </div>
                    <div className="flex items-start flex-col">
                      <p className="font-bold">John Doe</p>
                      <p className="text-xs text-neutral-400">johndoe@email.com</p>
                    </div>
                  </button>

                  <section className="flex flex-col gap-1 w-full rounded-xl border p-1 border-white/[0.1] bg-white/[0.05]">
                    <Link href="/dashboard" className={linkStyle} onClick={() => setExpanded(false)}>
                      <div
                        className="flex gap-5 items-center w-full rounded-lg p-3 hover:bg-white/[0.1] hover:text-white text-sm "
                      >
                        <RectangleGroupIcon className="w-5 shrink-0 ml-0.5" fill="rgba(255,255,255,0.2)" />
                        <h2>
                          Dashboard
                        </h2>
                      </div>
                    </Link>
                  </section>

                  <section className="flex flex-col gap-1 w-full rounded-xl border p-1 border-white/[0.1] bg-white/[0.05]">
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
                  </section>

                  <section className="flex flex-col gap-1 w-full rounded-xl border p-1 border-white/[0.1] bg-white/[0.05]">
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
                  </section>
                </m.div>
              </div>
            </>
          }
        </AnimatePresence>
      </div>
    </>
  );
}
