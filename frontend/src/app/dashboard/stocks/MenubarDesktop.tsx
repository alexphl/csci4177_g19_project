import { UserIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { memo } from "react";

const Menubar = (props: { controller: any; className?: string }) => {
  const [, setOverlayIsOpen] = props.controller;

  return (
    <div className={props.className}>
      <div className="flex items-center justify-end gap-8 text-sm font-medium text-neutral-200">
        <Link href={"/dashboard"}>News</Link>
        <Link href={"/dashboard"}>Accounts</Link>

        <button
          className="flex items-center rounded-full border border-neutral-800 bg-black p-2.5 shadow-xl transition-all hover:scale-105"
          onClick={() => setOverlayIsOpen(true)}
        >
          <UserIcon className="h-6 w-6 text-neutral-600" />
        </button>
      </div>
    </div>
  );
};

export default memo(Menubar);
