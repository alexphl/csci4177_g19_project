'use client'

import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";
import { RectangleGroupIcon } from "@heroicons/react/24/outline";
import { useSelectedLayoutSegment } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";

import { contentBrowse, contentExplore, contentSettings } from "./NavSchema";

const linkStyle = "active:brightness-125 active:saturate-200";

export default function NavDesktop(props: { overlayController: [boolean, Dispatch<SetStateAction<boolean>>] }) {
  const segment = useSelectedLayoutSegment();
  const [isOverlayOpen, setOverlayOpen] = props.overlayController;

  return (
    <nav className="group md:grid grid-rows-[15%_auto] z-[90] border-r border-white/[0.1] hidden h-screen w-20 min-w-fit max-w-fit gap-3 bg-neutral-800/50 p-3 text-sm font-medium text-neutral-400 shadow-md backdrop-saturate-[3.0] backdrop-blur-xl transition-[width] hover:w-60 hover:max-w-sm hover:min-w-0 hover:text-neutral-200 md:fixed lg:p-4 2xl:p-5">
      <button
        className="place-self-start gap-3 border-white/[0.1] bg-white/[0.05] flex items-center rounded-full w-full"
        onClick={() => setOverlayOpen(!isOverlayOpen)}
      >
        <div className="transition-all shadow-md border border-neutral-800 flex aspect-square w-fit items-center rounded-full bg-black/[0.6] p-2 group-hover:p-4">
          <UserIcon className="w-6" />
        </div>
        <div className="flex hidden items-start flex-col group-hover:block overflow-hidden whitespace-nowrap w-[60%]">
          <p className="font-bold w-fit text-md">John Doe</p>
          <p className="text-xs text-neutral-400 w-fit">johndoe@email.com</p>
        </div>
      </button>

      <div className="flex-none h-fit flex flex-col gap-2">
        <Link href="/dashboard" className={linkStyle}>
          <div
            className={
              "flex items-center gap-5 rounded-md p-2 hover:bg-neutral-200/[0.15]" +
              (!segment ? " bg-neutral-200/[0.1] text-neutral-100" : "")
            }
          >
            <RectangleGroupIcon className="w-5 shrink-0 ml-0.5" />
            <h2 className="hidden opacity-0 group-hover:inline-block group-hover:opacity-100">
              Dashboard
            </h2>
          </div>
        </Link>

        <section className="flex flex-col gap-2">
          <hr className="my-1 w-full rounded-full border border-white/[0.1]" />
          {contentBrowse.map((link) => (
            <Link key={link.link} href={link.link} className={linkStyle}>
              <div
                className={
                  "flex items-center gap-5 rounded-md p-2 hover:bg-orange-200/[0.15] hover:text-orange-200" +
                  (link.heading.toLowerCase() === segment
                    ? " bg-orange-200/[0.1] text-orange-200"
                    : "")
                }
              >
                <div className="w-5 shrink-0 ml-0.5">{link.icon}</div>
                <h2 className="hidden opacity-0 group-hover:inline-block group-hover:opacity-100">
                  {link.heading}
                </h2>
              </div>
            </Link>
          ))}
          <hr className="my-1 w-full rounded-full border border-white/[0.1]" />
        </section>

        <section className="flex flex-col gap-2">
          {contentExplore.map((link) => (
            <Link key={link.link} href={link.link} className={linkStyle}>
              <div
                className={
                  "flex items-center gap-5 rounded-md p-2 hover:bg-sky-200/[0.15] hover:text-sky-200" +
                  (link.heading.toLowerCase() === segment
                    ? " bg-sky-200/[0.1] text-sky-200"
                    : "")
                }
              >
                <div className="w-5 shrink-0 ml-0.5">{link.icon}</div>
                <h2 className="hidden opacity-0 group-hover:inline-block group-hover:opacity-100">
                  {link.heading}
                </h2>
              </div>
            </Link>
          ))}
          <hr className="my-1 w-full rounded-full border border-white/[0.1]" />
        </section>

        <section className="flex flex-col gap-2">
          {contentSettings.map((link) => (
            <Link key={link.link} href={link.link} className={linkStyle}>
              <div
                className={
                  "flex items-center gap-5 rounded-md p-2 hover:bg-violet-200/[0.15] hover:text-violet-200" +
                  +(link.heading.toLowerCase() === segment
                    ? " bg-violet-200/[0.1] text-violet-200"
                    : "")
                }
              >
                <div className="w-5 shrink-0 ml-0.5">{link.icon}</div>
                <h2 className="hidden opacity-0 group-hover:inline-block group-hover:opacity-100">
                  {link.heading}
                </h2>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </nav>
  );
}
