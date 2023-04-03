/**Author: Olexiy Prokhvatylo B00847680 */

"use client";

import { useMemo, useState, useContext } from "react";
import { queryClient } from "@/app/QueryProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BookmarkIcon, BookmarkSlashIcon, PhotoIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import type { iQuote, iProfile, iCompanyNews, iUserStockListItem, iUserStockList } from "@/types/iStocks";
import { ListContext } from "../ListContext";
import shortNum from 'number-shortener';
import { userContext } from "@/app/UserContext";

// Lazy load
const Chart = dynamic(() => import("./Chart"));
const NotFound = dynamic(() => import("../../[404]/NotFound"));
const StockListItem = dynamic(() => import("../StockListItem"));
const Loading = dynamic(() => import("../../loading"));

// Filters search results to hide stock subvariants
// This logic will likely be moved to backend
function filterNews(results: iCompanyNews[] | undefined, company: iProfile | undefined) {
  if (!results || !results[0]) { return []; }
  if (!company || !company.name) { return []; }
  const companyName = company.name.split(' ')[0];
  return (
    results.filter((item: iCompanyNews) => {
      if (!item.summary || !item.source) return false;
      if (item.headline.includes(companyName) || item.summary.includes(companyName)) return true;
      return false;
    })
  );
}

export default function StockDetails({
  params,
}: {
  params: { stock: string, list?: string };
}) {
  params.stock = params.stock.toUpperCase();

  const { user } = useContext<any>(userContext);
  const userID = user.email;

  const listContext = useContext(ListContext);
  const selectedList = listContext.state;

  const router = useRouter();
  const quote = useQuery<iQuote>({
    queryKey: [`/api/stocks/quote/`, params.stock],
    retryDelay: 1000,
    retry: true,
  });
  const profile = useQuery<iProfile>({
    refetchOnWindowFocus: false,
    enabled: quote.isSuccess,
    queryKey: [`/api/stocks/profile/`, params.stock],
    staleTime: Infinity,
    retry: true,
  });
  const userStocks = useQuery<iUserStockListItem[]>({
    queryKey: [`/api/stocks/user/${userID}`],
  });
  const userLists = useQuery<iUserStockList[]>({
    queryKey: [`/api/stocks/user/lists/${userID}`],
  });
  const peerSymbols = useQuery<string[]>({
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    queryKey: [`/api/stocks/peers/`, params.stock],
    enabled: !!profile.isSuccess
  });
  const companyNews = useQuery<iCompanyNews[]>({
    queryKey: [`/api/stocks/company-news/`, params.stock],
    enabled: !!peerSymbols.isSuccess
  });

  const [newsLimit, setNewsLimit] = useState(3);

  const filteredNews = useMemo(
    () =>
      filterNews(companyNews.data, profile.data),
    [companyNews.data, profile.data]
  );

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

  if (!quote.isSuccess || !userLists.isSuccess || !userStocks.isSuccess || !userLists.data[selectedList]) {
    // Loading
    return <div className="relative h-24 -mt-12 flex"> <Loading /> </div>
  }

  if (quote.isSuccess && quote.data.c === 0 && quote.data.d === null) {
    return <div className="relative h-24 -mt-12 flex"> <NotFound message="Sorry, this stock was not found in our records." /> </div>;
  }

  const stockList = userStocks.data.filter((item: iUserStockListItem) => item.listID === userLists.data[selectedList].id);
  const isAdded = stockList.filter((savedItem: iUserStockListItem) => params.stock === savedItem.symbol).length > 0;

  return (
    <>
      <div className="w-[calc(100%) + 0.5rem] sticky top-0 z-50 -mx-8 -my-5 hidden h-10 -translate-y-8 rounded-2xl bg-gradient-to-b from-black to-transparent p-4 pb-0 sm:block" />
      <div className="w-full overflow-auto mb-5 transition-all scrollbar-hide">
        <nav className="flex w-full items-center justify-between pb-6 sm:hidden">
          <button
            className="rounded-md bg-white/[0.1] p-2 border border-neutral-800"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className="w-4" />
          </button>
          {userStocks.isSuccess && isAdded && (
            <button
              className="rounded-md bg-white/[0.1] p-2 hover:bg-rose-300/75 hover:text-black border border-neutral-800"
              onClick={() => removeStock(params.stock)}
            >
              <BookmarkSlashIcon className="w-4" fill="rgba(255,255,255,0.2)" />
            </button>
          )}
          {userStocks.isSuccess && !isAdded && (
            <button
              className="rounded-md bg-white/[0.1] p-2 hover:bg-green-300/75 hover:text-black border border-neutral-800"
              onClick={() => addStock(params.stock)}
            >
              <BookmarkIcon className="w-4" fill="rgba(255,255,255,0.2)" />
            </button>
          )}
        </nav>

        <section className="flex w-full justify-between gap-2">
          <div className="text-scroll flex-auto overflow-auto scrollbar-hide">
            <section className="flex items-end gap-4">
              <h2 className="text-xl font-extrabold">{params.stock}</h2>
              {profile.isSuccess && (
                <h2 className="whitespace-nowrap text-neutral-400">
                  {profile.data.exchange && profile.data.exchange.split(" ")[0]}{" "}
                  · {profile.data.currency}
                </h2>
              )}
            </section>

            <h1 className="max-w-[200px] whitespace-nowrap text-3xl sm:max-w-full">
              {(profile.isSuccess && profile.data.name) || <br />}
            </h1>
          </div>

          <div className="text-end">
            <h1 className="text-xl font-extrabold leading-8 group-hover:text-neutral-50">
              {quote.isSuccess && quote.data.c}
            </h1>
            {quote.isSuccess && (
              <p
                className={
                  "text-lg font-medium " +
                  (quote.data.d > 0 ? "text-green-400" : "text-red-400")
                }
              >
                {quote.data.d > 0 ? `+${quote.data.d}` : `${quote.data.d}`}
              </p>
            )}
          </div>
        </section>
      </div>

      <div className="flex gap-2 rounded-lg w-full text-xs font-medium text-neutral-300 mb-5 flex-wrap">
        <p className="bg-white/[0.1] rounded-lg px-2 py-1 border-neutral-800 border border-white/[0.06]">Open: {quote.data.o}</p>
        <p className="bg-white/[0.1] rounded-lg px-2 py-1 border-neutral-800 border border-white/[0.06]">High: {quote.data.h}</p>
        <p className="bg-white/[0.1] rounded-lg px-2 py-1 border-neutral-800 border border-white/[0.06]">Low: {quote.data.l}</p>
        {profile.isSuccess &&
          <p className="bg-white/[0.1] rounded-lg px-2 py-1 border-neutral-800 border border-white/[0.06]">
            Market Cap: {shortNum((profile.data.marketCapitalization * 1000000).toFixed(0)).replace('+', '').toUpperCase()}
          </p>
        }
      </div>

      {params.stock && quote.isSuccess && (
        <Chart symbol={params.stock} quote={quote.data} />
      )}

      {(userStocks.isSuccess && peerSymbols.isSuccess) &&
        <section className={"relative mt-8 text-neutral-100 empty:hidden flex flex-col"} >
          <div
            className="peer mt-3 flex content-center items-center gap-3 pr-10 w-full overflow-x-scroll scrollbar-hide empty:hidden"
          >
            {peerSymbols.data.map((symbol) => (
              <div key={symbol} className="snap-start relative w-72 flex-none">
                <StockListItem
                  stock={symbol}
                  isAdded={stockList.filter((savedItem: iUserStockListItem) => symbol === savedItem.symbol).length > 0}
                  searchIsActive={true}
                  addStock={addStock}
                  removeStock={removeStock}
                />
              </div>
            ))}
          </div>
          <div className="absolute bg-gradient-to-r from-transparent to-black w-10 p-2 h-[100%] right-0 z-50 peer-empty:hidden" />
          <h1 className="order-first text-lg font-bold peer-empty:hidden">Similar stocks</h1>
        </section>
      }

      {companyNews.isSuccess &&
        <section className={"mt-8 text-neutral-100 empty:hidden flex flex-col"} >
          <div className="peer mt-3 flex flex-col gap-3 empty:hidden">
            {filteredNews.slice(0, newsLimit).map((story: iCompanyNews) => (
              <a
                key={story.id}
                href={story.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <m.article
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative flex h-28 cursor-pointer items-center gap-3 rounded-xl border border-neutral-800 bg-white/[0.05] p-2 hover:border-neutral-700 hover:bg-white/[0.075]"
                >
                  <div className="relative border border-neutral-700 shadow-md flex place-content-center overflow-hidden h-full w-28 lg:w-36 object-cover rounded-lg bg-white/[0.1] shrink-0" >
                    {story.image &&
                      <>
                        <div className="bg-gradient-to-bl from-white/25 via-transparent to-transparent rounded-lg relative z-50 w-full h-full"> </div>
                        <Image src={story.image} alt="" fill sizes="100%" className="object-cover contrast-75 brightness-75 saturate-[1.25]" />
                      </>}
                    {!story.image && <PhotoIcon className="w-10 text-black/50" />}
                  </div>
                  <div className="flex flex-col gap-1.5 h-full py-1 pr-3 w-10 flex-1">
                    <h2 className="font-semibold text-sm leading-tight max-w-prose line-clamp-2 text-ellipsis">{story.headline}</h2>
                    <p className="font-medium text-xs text-neutral-400 leading-tight max-w-prose text-ellipsis line-clamp-3">{story.summary}</p>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-neutral-900/75 rounded-tr-lg rounded-bl-lg py-1.5 px-2.5 w-fit text-xs backdrop-blur-lg text-neutral-200 font-medium backdrop-saturate-[3] max-w-[7rem] truncate">{story.source}</div>
                </m.article>
              </a>
            ))}
          </div>
          <h1 className="order-first text-lg font-bold peer-empty:hidden">From the News</h1>
        </section>
      }

      {
        filteredNews && filteredNews.length > newsLimit && (
          <div className="flex mt-6 w-full flex-col items-center justify-center">
            <button
              className="rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm font-medium active:opacity-70"
              onClick={() => setNewsLimit(newsLimit + 3)}
            >
              Show more stories
            </button>
          </div>
        )
      }
    </>
  );
}
