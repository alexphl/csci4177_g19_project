/**Author: Olexiy Prokhvatylo B00847680 */

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { memo, useTransition } from "react";
import type { Dispatch, SetStateAction } from "react";

function Searchbox(
  props: {
    searchController: [boolean, Dispatch<SetStateAction<boolean>>],
    queryController: [string, Dispatch<SetStateAction<string>>],
    className?: string
  }) {
  const [_isPending, startTransition] = useTransition();
  const [searchIsActive, setSearchIsActive] = props.searchController;
  const [query, setQuery] = props.queryController;

  function exitSearch() {
    startTransition(() => {
      setSearchIsActive(false);
      setQuery("");
    });
  }

  return (
    <div
      className={
        "relative flex h-12 items-center gap-4 rounded-2xl border-2 px-4 text-neutral-400 transition-all focus-within:gap-2 focus-within:border-neutral-600 focus-within:bg-black focus-within:text-neutral-100 focus:shadow-2xl " +
        props.className + (searchIsActive ? " bg-black border-neutral-800" : " bg-black/[0.35] border-neutral-900")
      }
    >
      <input
        type="text"
        value={query}
        className="peer h-full w-full bg-transparent text-neutral-100 outline-none placeholder:text-neutral-400"
        placeholder="Explore symbols"
        spellCheck="false"
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => startTransition(() => setSearchIsActive(true))}
      />

      <MagnifyingGlassIcon className={"order-first h-full w-5 transition-all peer-focus:w-0 shrink-0 " + (searchIsActive ? "text-neutral-300" : "text-neutral-400")} />
      <button
        className={"order-last h-full w-6 transition-all shrink-0" + (searchIsActive ? " text-neutral-300" : " hidden")}
        onClick={() => exitSearch()}
      >
        <XMarkIcon />
      </button>
    </div>
  );
}

export default memo(Searchbox);
