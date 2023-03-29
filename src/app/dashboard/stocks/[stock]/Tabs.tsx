/**Author: Olexiy Prokhvatylo B00847680 */

import { Tab } from "@headlessui/react";
import { memo, useTransition } from "react";
import type { Dispatch, SetStateAction } from "react";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Tab navigation panel
 **/
function Tabs(props: {
  selector: [number, Dispatch<SetStateAction<number>>];
  components: string[];
  className?: string;
}) {
  const categories = props.components;
  const [selectedIndex, setSelectedIndex] = props.selector;
  const [_isPending, startTransition] = useTransition();

  return (
    <div className={props.className}>
      <Tab.Group
        selectedIndex={selectedIndex}
        onChange={(newIndex: number) => startTransition(() => setSelectedIndex(newIndex))}
      >
        <Tab.List className="flex space-x-1 rounded-2xl bg-black/[0.4] p-1">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-xl py-1 text-xs font-bold backdrop-saturate-200 leading-5 outline-none",
                  selected
                    ? "bg-white/[0.1] font-extrabold text-white/[0.95] border border-white/[0.1]"
                    : "text-white/[0.4] hover:bg-white/[0.04] hover:text-white/[0.90]"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
}

export default memo(Tabs);
