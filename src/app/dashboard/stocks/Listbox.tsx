/**Author: Olexiy Prokhvatylo B00847680 */

import { Listbox, Transition } from "@headlessui/react";
import { ArrowsUpDownIcon, CheckIcon, PlusIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useContext, useState, useTransition } from "react";
import { useMutation } from "@tanstack/react-query";
import { memo } from "react";
import { queryClient } from "@/app/QueryProvider";
import { ListContext } from "./ListContext";
import type { iUserStockList, iUserStockListItem } from "@/types/iStocks";
import { userContext } from "@/app/UserContext";

/**
 * Chart mode selection listbox
 **/
function StockListbox(props: { userStocksController: [iUserStockListItem[], any], lists: iUserStockList[], selector: [number, Dispatch<SetStateAction<number>>] }) {
  const { user } = useContext<any>(userContext);
  const userID = user.email;

  const [_isPending, startTransition] = useTransition();
  const modes = props.lists
  const listContext = useContext(ListContext);
  const selected = listContext.state;
  const setSelected = listContext.setState;
  const [hasHitDeleteOnce, setHitDeleteOnce] = useState(false);

  const [userStocks,] = props.userStocksController;

  // Function to update the lists of user's stock lists
  // Implements optimistic updates
  const userListsMut = useMutation({
    mutationFn: ((newLists: iUserStockList[]) =>
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
      startTransition(() => setSelected((0)));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/stocks/user/lists/${userID}`] });
    },
  });

  // Function to update user stock list
  // Implements optimistic updates
  const userStocksDelMut = useMutation({
    mutationFn: ((newList: iUserStockListItem[]) =>
      fetch(`/api/stocks/user/${userID}`, {
        method: "POST",
        body: JSON.stringify(newList),
        headers: { "Content-Type": "application/json" },
      })),
    // When mutate is called:
    onMutate: async (newList) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [`/api/stocks/user/${userID}`] });

      // Snapshot the previous value
      const previousList = queryClient.getQueryData([`/api/stocks/user/${userID}`]);

      // Optimistically update to the new value
      queryClient.setQueryData([`/api/stocks/user/${userID}`], () => newList);

      // Return a context object with the snapshotted value
      return { previousList };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (context: { previousList: iUserStockListItem[] }) => {
      queryClient.setQueryData([`/api/stocks/user/${userID}`], context.previousList);
    },
    // Remove the list on success
    onSuccess: () => {
      userListsMut.mutate([
        ...modes.filter((item: iUserStockList) => item.id !== modes[selected].id),
      ]);

      if (selected === modes.length - 1) setSelected(selected - 1);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/stocks/user/${userID}`] });
    },
  });


  // Creates a new list
  function handleAdd(e: any) {
    e.preventDefault();
    e.stopPropagation();

    const name = encodeURIComponent(e.target.value.trim());
    if (!name) return;

    const newList: iUserStockList = {
      id: (parseInt(modes[modes.length - 1].id) + 1).toString(),
      name: name
    }

    userListsMut.mutate([...modes.concat(newList)]);
    startTransition(() => setSelected((modes.length)));
  }

  // Deletes currently selected list and all its contents
  async function handleDelete(_e: any) {
    // delete contents first
    userStocksDelMut.mutate(
      [...userStocks.filter((item: iUserStockListItem) => item.listID !== modes[selected].id)]
    )

    startTransition(() => setHitDeleteOnce(false));

    // Rest of the logic is performed inside userStocksMut -> onSuccess
    // to avoid race conditions.
  }

  return (
    <div className="w-max text-sm font-medium text-neutral-300">
      <Listbox
        value={selected}
        onChange={(i: number) => startTransition(() => setSelected(i))}
      >
        {({ open }) =>
          <div className="relative">
            <Listbox.Button
              className={"relative w-full border border-neutral-800 cursor-pointer backdrop-blur-md rounded-md bg-white/[0.1] py-1 pl-3 pr-9 text-left hover:bg-white/[0.15] outline-none focus-visible:border-orange-200 transition-all" + (open ? " opacity-80 contrast-50" : "")}
            >
              <span className="block max-w-[8rem] truncate">{decodeURIComponent(modes[selected].name)}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
                <ArrowsUpDownIcon
                  className="mr-1.5 h-3 w-3 text-neutral-500"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              leave="transition duration-200 ease-out"
              leaveFrom="transform scale-200 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options className="absolute z-50 mt-1 max-h-96 w-60 overflow-x-hidden overflow-y-auto border border-white/[0.2] rounded-lg bg-neutral-800/[0.2] p-2 text-sm shadow-xl backdrop-blur-2xl backdrop-saturate-200 focus:outline-none">
                {modes.map((mode: iUserStockList, i) => (
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
                          {decodeURIComponent(mode.name)}
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
                  className="relative flex text-neutral-300 rounded-md relative w-full px-2 items-center hover:bg-neutral-100/[0.1] focus-within:border border-white/[0.2] focus-within:bg-neutral-100/[0.1] transition-all focus-within:py-1 focus-within:rounded-lg focus-within:mb-2"
                >
                  <PlusIcon className="w-5 flex-none" />
                  <input
                    onKeyDown={(e: any) => {
                      e.stopPropagation();
                      if (e.code === "Enter") { handleAdd(e); e.target.value = ""; }
                    }}
                    placeholder="New list"
                    className="flex-auto outline-none bg-transparent w-10 max-w-full p-2 placeholder:text-inherit placeholder:truncate focus:placeholder:text-white/50"
                    type="text"
                  />
                </div>

                {(modes.length > 1) &&
                  <div
                    className={
                      "cursor-pointer transition-all flex relative w-full px-2 rounded-md items-center text-neutral-300 hover:bg-rose-200/[0.12] hover:text-rose-300 "
                      + (hasHitDeleteOnce ? "hover:bg-rose-200/[0.2] bg-rose-200/[0.2] animate-wiggle py-0.5" : "")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (hasHitDeleteOnce) handleDelete(e);
                      !hasHitDeleteOnce && setHitDeleteOnce(true);
                    }}
                    onMouseLeave={() => hasHitDeleteOnce && startTransition(() => setHitDeleteOnce(false))}
                  >
                    <TrashIcon className="w-4 mx-0.5 flex-none" fill="rgba(255,255,255,0.2)" />
                    <p
                      className="flex-auto max-w-full p-2 truncate"
                    >
                      {hasHitDeleteOnce ? "Press again to confirm" : "Delete this list"}
                    </p>
                  </div>
                }

              </Listbox.Options>
            </Transition>
          </div>
        }
      </Listbox >
    </div >
  );
}

export default memo(StockListbox);
