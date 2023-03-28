import { Listbox, Transition } from "@headlessui/react";
import { ArrowsUpDownIcon, CheckIcon, PlusIcon } from "@heroicons/react/20/solid";
import type { Dispatch, SetStateAction } from "react";
import { memo } from "react";

/**
 * Chart mode selection listbox
 **/
function StockListbox(props: { lists: string[], selector: [number, Dispatch<SetStateAction<number>>] }) {
  const modes = props.lists
  const [selected, setSelected] = props.selector;

  return (
    <div className="w-max text-sm font-medium text-neutral-300">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative w-full border border-neutral-800 cursor-pointer backdrop-blur-md rounded-md bg-white/[0.1] py-1 pl-3 pr-9 text-left hover:bg-white/[0.15] focus:outline-none focus-visible:border-orange-200">
            <span className="block truncate">{modes[selected]}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
              <ArrowsUpDownIcon
                className="mr-1.5 h-3 w-3 text-neutral-500"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            leave="transition duration-100 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-max overflow-auto border border-white/[0.2] rounded-md bg-neutral-800/[0.2] py-1 text-sm shadow-lg backdrop-blur-2xl backdrop-saturate-200 focus:outline-none">
              {modes.map((mode: string, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-9 pr-6 ${active
                      ? "bg-neutral-100/[0.1] text-orange-200"
                      : "text-white"
                    }`
                  }
                  value={i}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"
                          }`}
                      >
                        {"Show " + mode}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-orange-200">
                          <CheckIcon className="h-4 w-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
              <hr className="border border-white/[0.2] rounded-full my-4 w-10 mx-auto" />
              <form className="flex relative w-full px-2 items-center hover:bg-neutral-100/[0.1]">
                <PlusIcon className="w-5" />
                <input
                  placeholder="Create new list"
                  className="flex-auto bg-transparent max-w-full p-2 text-neutral-100 placeholder:text-neutral-100 focus:placeholder:text-transparent" type="text"
                />
              </form>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default memo(StockListbox);
