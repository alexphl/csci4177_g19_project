/**Author: Olexiy Prokhvatylo B00847680 */

"use client";

import { memo, useContext, useEffect, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { userContext } from "@/app/UserContext";
import { useDebounce } from "use-debounce";
import {
  FaceFrownIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { m, Reorder } from "framer-motion";
import { queryClient } from "@/app/QueryProvider";
import { CubeTransparentIcon } from "@heroicons/react/20/solid";
import type { iSearchItem, iUserStockList, iUserStockListItem } from "@/types/iStocks";
import Loading from "../loading";
import { ListContext } from "./ListContext";

// Lazy-load components
const StockListItem = dynamic(() => import("./StockListItem"));
const StockListbox = dynamic(() => import("./Listbox"));

const listStyle = "flex flex-auto flex-col gap-2.5 transition-transform";

function StockList(props: {
  searchIsActive: boolean;
  searchQuery: string;
  selectedStock: string | undefined;
}) {
  const { user } = useContext<any>(userContext);
  const userID = user.email;

  const listContext = useContext(ListContext);
  const [selectedList, setSelectedList] = [listContext.state, listContext.setState];
  const userLists = useQuery<iUserStockList[]>({
    queryKey: [`/api/stocks/user/lists/${userID}`],
  });
  const [_isPending, startTransition] = useTransition();
  const selectedStock = props.selectedStock;
  const userStocks = useQuery<iUserStockListItem[]>({
    queryKey: [`/api/stocks/user/${userID}`],
  });

  // Function to update user stock list
  // Implements optimistic updates
  const userStocksMut = useMutation({
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
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/stocks/user/${userID}`] });
    },
  });

  // Search state with debouncing and deferred value
  const [isEditMode, setEditMode] = useState(false);
  const [debouncedQuery] = useDebounce(props.searchQuery, 600); // Debounce query with a delay
  const [resultLimit, setResultLimit] = useState(5);
  const searchResult = useQuery<iSearchItem[]>({
    queryKey: [`/api/stocks/search/`, encodeURIComponent(debouncedQuery.trim())],
    enabled: !!debouncedQuery,
    staleTime: Infinity,
    retry: true,
    retryDelay: 1000
  });

  // Reset search result limit between searches
  useEffect(() => {
    startTransition(() => setResultLimit(5));
  }, [searchResult.data]);


  // Create default list for new users or if things go south
  if (userLists.isSuccess && selectedList === 0 && !userLists.data[selectedList]) {
    const newList: iUserStockList = {
      id: "1",
      name: "Watchlist"
    }

    fetch(`/api/stocks/user/lists/${userID}`, {
      method: "POST",
      body: JSON.stringify([newList]),
      headers: { "Content-Type": "application/json" },
    });

    queryClient.setQueryData([`/api/stocks/user/lists/${userID}`], () => [newList]);
  }

  if (!userLists.isSuccess || !userStocks.isSuccess || !userLists.data[selectedList]) { return <div className="relative h-24 -mt-12 flex"> <Loading /> </div> }

  const stockList = userStocks.data.filter((item: iUserStockListItem) => item.listID === userLists.data[selectedList].id);

  function removeStock(stock: string) {
    return (
      userStocks.isSuccess &&
      userStocksMut.mutate([
        ...userStocks.data.filter((item: iUserStockListItem) => {
          return (item.symbol !== stock) || (item.listID !== userLists.data![selectedList].id);
        }),
      ])
    );
  }

  function addStock(stock: string) {
    return (
      userStocks.isSuccess && userLists.isSuccess &&
      userStocksMut.mutate([...userStocks.data.concat({ listID: userLists.data[selectedList].id, symbol: stock })])
    );
  }

  function handleReorder(newOrder: iUserStockListItem[]) {
    //if (!userStocks.isSuccess || userLists.isSuccess) return;
    const formatted = userStocks.data!.filter((item: iUserStockListItem) => item.listID !== newOrder[0].listID);
    console.log(formatted.concat(newOrder));
    userStocksMut.mutate(formatted.concat(newOrder));
  }

  return (
    <>
      {
        /* SHOW USER STOCKS */
        !props.searchIsActive && userStocks.isSuccess && (
          <>
            <div className="w-[calc(100%) + 0.5rem] sticky top-0 z-50 -mx-4 flex flex-auto items-center rounded-2xl bg-gradient-to-b from-black to-transparent p-4">
              <StockListbox userStocksController={[userStocks.data, userStocksMut]} lists={userLists.data} selector={[selectedList, setSelectedList]} />
              <button
                className={
                  "ml-auto rounded-md border border-neutral-800 p-1.5 backdrop-blur-md transition " +
                  (isEditMode
                    ? " bg-white/[0.8] text-black"
                    : " bg-white/[0.1]")
                }
                onClick={() => startTransition(() => setEditMode(!isEditMode))}
              >
                <CubeTransparentIcon className="w-4" />
              </button>
            </div>
            <hr className="mx-auto mb-4 w-10 rounded-full border-neutral-600 2xl:mb-6" />

            <Reorder.Group
              axis="y"
              values={stockList}
              onReorder={handleReorder}
              as="ol"
              className={listStyle}
            >
              {stockList.map((item: iUserStockListItem, i) => (
                <Reorder.Item
                  key={item.symbol}
                  value={item}
                  dragListener={isEditMode || item.symbol === selectedStock}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 400,
                  }}
                >
                  <m.div
                    initial={{ opacity: 0.5, scale: 0.95, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "none" }}
                    transition={{
                      type: "spring",
                      damping: 20,
                      stiffness: 350,
                      delay: i / 16,
                    }}
                  >
                    <StockListItem
                      key={item.symbol}
                      stock={item.symbol}
                      isEditMode={isEditMode}
                      isAdded={stockList.filter((savedItem: iUserStockListItem) => item.symbol === savedItem.symbol).length > 0}
                      addStock={addStock}
                      removeStock={removeStock}
                      selected={item.symbol === selectedStock}
                      searchIsActive={props.searchIsActive}
                    />
                  </m.div>
                </Reorder.Item>
              ))}
            </Reorder.Group>

            { // EMPTY LIST MESSAGE
              stockList.length === 0 && (
                <m.div
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "none" }}
                  className="flex w-full flex-col items-center justify-center gap-4 py-20 text-lg text-neutral-500"
                >
                  <div className="w-16 ">
                    <SparklesIcon />
                  </div>
                  <div className="flex flex-col items-center">
                    <h1 className="text-lg font-bold">This list is empty</h1>
                    <h2 className="text-sm font-medium">
                      You can add stocks here via search
                    </h2>
                  </div>
                </m.div>
              )}
          </>
        )
      }

      {
        /* SHOW SEARCH RESULTS OR ALL STOCKS */
        props.searchIsActive && (
          <>
            <h1 className="px-1.5 py-6 font-bold">
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
                searchResult.isSuccess && searchResult.data
                  .slice(0, resultLimit)
                  .map((result: iSearchItem) => (
                    <StockListItem
                      key={result.symbol}
                      isAdded={stockList.filter((item: iUserStockListItem) => item.symbol === result.symbol).length > 0}
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
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={listStyle}
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
                  </m.div>
                )
              }

              {
                /* NOT FOUND MESSAGE */
                searchResult.isSuccess && searchResult.data.length === 0 && (
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
                searchResult.data.length > resultLimit && (
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
