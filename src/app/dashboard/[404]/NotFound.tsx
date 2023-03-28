/**Author: Olexiy Prokhvatylo B00847680 */

"use client";

import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { memo } from "react";

function NotFound(props: { message?: string }) {
  const router = useRouter();

  return (
    <div className="container flex h-screen flex-auto flex-col items-center justify-center gap-16 px-8">
      <div className="flex flex-col items-center justify-center gap-8 text-neutral-400">
        <DocumentMagnifyingGlassIcon
          className="w-36 text-indigo-200 drop-shadow-xl shadow-indigo-200/[0.1]"
          strokeWidth={"0.5px"}
          fill="rgba(255,255,255,0.2)"
        />
        <section className="flex max-w-prose flex-col gap-4 text-center">
          <h1 className="font-display text-5xl font-bold text-indigo-200">
            404
          </h1>
          <p className="font-medium">
            {props.message || "This page does not exist or is under construction."}
          </p>
        </section>
      </div>
      <button
        className="rounded-lg border border-neutral-600 bg-white/[0.1] px-6 py-2 shadow-xl shadow-indigo-200/[0.1]"
        onClick={() => router.back()}
      >
        Take me back
      </button>
    </div>
  );
}

export default memo(NotFound)
