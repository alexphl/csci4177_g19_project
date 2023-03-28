/**Author: Olexiy Prokhvatylo B00847680 */

import { Listbox, Transition } from "@headlessui/react";
import { ArrowsUpDownIcon, CheckIcon, PlusIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import type { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import { memo } from "react";
import { queryClient } from "@/app/QueryProvider";

const userID = "user1";

/**
 * Chart mode selection listbox
 **/
function StockListbox(props: { lists: string[], selector: [number, Dispatch<SetStateAction<number>>] }) {
  const modes = props.lists
  const [selected, setSelected] = props.selector;

  // Function to update user stock list
  // Implements optimistic updates
  const userListsMut = useMutation({
    mutationFn: ((newLists: string[]) =>
      fetch(`/api/stocks/user/lists/${userID}`, {
        method: "POST",
        body: JSON.stringify(newLists),
        headers: { "Content-Type": "application/json" },
      })),
    // When mutate is called:
    onMutate: async (newLists) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [`/api/stocks/user/lists/${userID}`] });

      // Snapshot the previous value
      const previousList = queryClient.getQueryData([`/api/stocks/user/lists/${userID}`]);

      // Optimistically update to the new value
      queryClient.setQueryData([`/api/stocks/user/lists/${userID}`], () => newLists);

      // Return a context object with the snapshotted value
      return { previousList };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (context: { previousList: string[] }) => {
      queryClient.setQueryData([`/api/stocks/user/lists/${userID}`], context.previousList);
      setSelected(0);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/stocks/user/lists/${userID}`] });
    },
  });

  function handleAdd(e: any) {
    e.preventDefault();
    e.stopPropagation();

    const name = encodeURIComponent(e.target.value.trim());
    if (!name) return;

    userListsMut.mutate([...modes.concat(name)]);
    setSelected(modes.length);
  }

  function handleDelete(e: any) {
    e.preventDefault();
    e.stopPropagation();

    userListsMut.mutate([
      ...modes.filter((item: string) => {
        return item !== modes[selected];
      }),
    ])
    setSelected(selected - 1);
  }

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
            <Listbox.Options className="absolute z-50 mt-1 max-h-96 w-60 overflow-x-hidden overflow-y-auto border border-white/[0.2] rounded-lg bg-neutral-800/[0.2] p-2 text-sm shadow-xl backdrop-blur-2xl backdrop-saturate-200 focus:outline-none">
              {modes.map((mode: string, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `relative cursor-pointer rounded-md select-none py-2 pl-9 pr-6 ${active
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
                        {mode}
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

              <div
                className="flex text-neutral-300 rounded-md relative w-full px-2 items-center hover:bg-neutral-100/[0.1]"
              >
                <PlusIcon className="w-5 flex-none" />
                <input
                  onBlur={(e) => handleAdd(e)}
                  name="newlist"
                  placeholder="New list"
                  className="flex-auto outline-none bg-transparent w-10 max-w-full p-2 placeholder:text-inherit placeholder:truncate focus:placeholder:text-transparent"
                  type="text"
                />
              </div>

              {(modes.length > 1) &&
                <div
                  className="flex relative w-full px-2 rounded-md text-neutral-300 items-center hover:bg-neutral-100/[0.1] hover:text-red-300"
                  onClick={(e) => handleDelete(e)}
                >
                  <TrashIcon className="w-4 mx-0.5 flex-none" fill="rgba(255,255,255,0.2)" />
                  <p className="flex-auto max-w-full p-2 truncate">Delete this list</p>
                </div>
              }

            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default memo(StockListbox);
