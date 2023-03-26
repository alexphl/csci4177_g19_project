"use client";

import { memo, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useDebounce } from "use-debounce";
import {
  FaceFrownIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion, Reorder } from "framer-motion";
import { queryClient } from "@/app/QueryProvider";
import { CubeTransparentIcon } from "@heroicons/react/20/solid";
import type { iSearch, iSearchItem } from "@/types/iStocks";

// Lazy-load components
const StockListItem = dynamic(() => import("./StockListItem"));
const StockListbox = dynamic(() => import("./Listbox"));

const listStyle = "flex flex-col gap-2.5 transition";

// Filters search results to hide stock subvariants
// This logic will likely be moved to backend
function filterResults(results: iSearch | undefined) {
  if (!results || !results.result) { return null; }
  return (
    results.result.filter((item: iSearchItem) => {
      if (item.symbol.includes(".") || item.symbol.includes(":")) return false;
      if (item.type === "Common Stock" || item.type === "ADR") return true;

      return false;
    })
  );
}

const userID = "user1";

function StockList(props: {
  searchIsActive: boolean;
  searchQuery: string;
  selectedStock: string | undefined;
}) {
  const selectedStock = props.selectedStock;
  const userStocks = useQuery<string[]>({
    queryKey: [`/api/stocks/user/${userID}`],
  });

  // Function to update user stock list
  // Implements optimistic updates
  const userStocksMut = useMutation({
    mutationFn: ((newList: string[]) =>
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
    onError: (context: { previousList: string[] }) => {
      queryClient.setQueryData([`/api/stocks/user/${userID}`], context.previousList);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/stocks/user/${userID}`] });
    },
  });

  function removeStock(stock: string) {
    return (
      userStocks.isSuccess &&
      userStocksMut.mutate([
        ...userStocks.data.filter((item: string) => {
          return item !== stock;
        }),
      ])
    );
  }

  function addStock(stock: string) {
    return (
      userStocks.isSuccess &&
      userStocksMut.mutate([...userStocks.data.concat(stock)])
    );
  }

  // Search state with debouncing and deferred value
  const [isEditMode, setEditMode] = useState(false);
  const [debouncedQuery] = useDebounce(props.searchQuery, 600); // Debounce query with a delay
  const [resultLimit, setResultLimit] = useState(5);
  const searchResult = useQuery<iSearch>({
    queryKey: [`/api/stocks/search/`, encodeURIComponent(debouncedQuery.trim())],
    enabled: !!debouncedQuery,
    staleTime: Infinity,
    retry: true,
    retryDelay: 1000
  });

  // Filter search results
  const filtered = useMemo(
    () =>
      filterResults(
        searchResult.data
      ),
    [searchResult]
  );

  // Reset search result limit between searches
  useEffect(() => {
    setResultLimit(5);
  }, [searchResult.data]);

  if (!userStocks.isSuccess) { return (<> </>) }

  return (
    <>
      {
        /* SHOW USER STOCKS */
        !props.searchIsActive && userStocks.isSuccess && (
          <>
            <div className="w-[calc(100%) + 0.5rem] sticky top-0 z-50 -mx-4 flex -translate-y-4 items-center rounded-2xl bg-gradient-to-b from-black to-transparent p-4 pb-0">
              <StockListbox />
              <button
                className={
                  "ml-auto rounded-md border border-neutral-800 p-1.5 backdrop-blur-md transition " +
                  (isEditMode
                    ? " bg-white/[0.8] text-black"
                    : " bg-white/[0.1]")
                }
                onClick={() => setEditMode(!isEditMode)}
              >
                <CubeTransparentIcon className="w-4" />
              </button>
            </div>
            <hr className="mx-auto mb-4 w-10 rounded-full border-neutral-600 2xl:mb-6" />

            <Reorder.Group
              axis="y"
              values={userStocks.data}
              onReorder={(newOrder: string[]) => userStocksMut.mutate(newOrder)}
              as="ol"
              className={listStyle}
            >
              {userStocks.data.map((stock: string, i) => (
                <Reorder.Item
                  key={stock}
                  value={stock}
                  dragListener={isEditMode || stock === selectedStock}
                  initial={{ opacity: 0.5, scale: 0.95, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "none" }}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 400,
                    delay: i / 18,
                  }}
                >
                  <StockListItem
                    key={stock}
                    stock={stock}
                    isEditMode={isEditMode}
                    isAdded={userStocks.data.includes(stock)}
                    addStock={addStock}
                    removeStock={removeStock}
                    selected={stock === selectedStock}
                    searchIsActive={props.searchIsActive}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>

            {userStocks.data.length === 0 && (
              <div className="flex w-full flex-col items-center justify-center gap-4 py-20 text-lg text-neutral-500">
                <div className="w-16 ">
                  <SparklesIcon />
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="text-lg font-bold">Your list is empty</h1>
                  <h2 className="text-sm font-medium">
                    You can add stocks using search
                  </h2>
                </div>
              </div>
            )}
          </>
        )
      }

      {
        /* SHOW SEARCH RESULTS OR ALL STOCKS */
        props.searchIsActive && (
          <>
            <h1 className="px-2.5 pt-1 pb-6 font-bold text-neutral-300">
              Search Results
            </h1>

            <ul
              className={
                listStyle +
                (props.searchQuery !== debouncedQuery || searchResult.isFetching
                  ? " pointer-events-none scale-[0.98] blur-sm saturate-0"
                  : "")
              }
            >
              {
                /* SHOW SEARCH ICON BG */
                !searchResult.isFetching && !searchResult.data && (
                  <div className="flex w-full flex-col items-center justify-center py-20 text-lg text-neutral-900">
                    <div className="w-24 ">
                      <MagnifyingGlassIcon />
                    </div>
                  </div>
                )
              }

              {
                /* SHOW SEARCH RESULTS */
                searchResult.isSuccess &&
                filtered &&
                filtered
                  .slice(0, resultLimit)
                  .map((result: iSearchItem) => (
                    <StockListItem
                      key={result.symbol}
                      isAdded={userStocks.data.includes(result.symbol)}
                      addStock={addStock}
                      removeStock={removeStock}
                      stock={result.symbol}
                      searchIsActive={props.searchIsActive}
                      selected={result.symbol === selectedStock}
                    />
                  ))
              }

              {
                /* SHOW LOADING PLACEHOLDER */
                searchResult.isFetching && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-4"
                  >
                    {[...Array(3)].map((_x, i) => (
                      <StockListItem
                        isAdded={false}
                        addStock={addStock}
                        removeStock={removeStock}
                        key={i}
                        searchIsActive={props.searchIsActive}
                        stock={null}
                        selected={false}
                      />
                    ))}
                  </motion.div>
                )
              }

              {
                /* NOT FOUND MESSAGE */
                searchResult.isSuccess && filtered && filtered.length === 0 && (
                  <div className="flex w-full flex-col items-center justify-center gap-4 py-20 text-lg text-neutral-500">
                    <div className="w-16 ">
                      <FaceFrownIcon />
                    </div>
                    <div className="flex flex-col items-center">
                      <h1 className="text-lg font-bold">
                        Sorry, we found nothing
                      </h1>
                      <h2 className="text-sm font-medium">
                        Try a different search query
                      </h2>
                    </div>
                  </div>
                )
              }

              {
                /* SHOW MORE BUTTON */
                searchResult.isSuccess &&
                filtered &&
                filtered.length > resultLimit && (
                  <button
                    className="mx-auto mt-4 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm font-medium active:opacity-70"
                    onClick={() => setResultLimit(resultLimit + 3)}
                  >
                    Show more
                  </button>
                )
              }
            </ul>
          </>
        )
      }
    </>
  );
}

export default memo(StockList);
