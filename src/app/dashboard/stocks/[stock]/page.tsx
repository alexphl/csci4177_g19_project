"use client";

import { useMemo, useState } from "react";
import { queryClient } from "@/app/QueryProvider";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BookmarkIcon, BookmarkSlashIcon, PhotoIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image"
import { motion } from "framer-motion";
import type { iQuote, iProfile, iCompanyNews } from "@/utils/types/iStocks";
const shortNum = require('number-shortener');

// Lazy load
const Chart = dynamic(() => import("./Chart"));
const NotFound = dynamic(() => import("../../[404]/page"));

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

const userID = "user1";

export default function StockDetails({
  params,
}: {
  params: { stock: string };
}) {
  const quote = useQuery<iQuote>({
    queryKey: [`/api/stocks/quote/`, params.stock],
  });
  const profile = useQuery<iProfile>({
    queryKey: [`/api/stocks/profile/`, params.stock],
    staleTime: Infinity,
  });
  const userStocks = useQuery<string[]>({
    queryKey: [`/api/stocks/user/${userID}`],
  });
  const companyNews = useQuery<iCompanyNews[]>({
    queryKey: [`/api/stocks/company-news/`, params.stock],
    enabled: !!profile.data
  });
  const [newsLimit, setNewsLimit] = useState(3);
  const isAdded =
    userStocks.isSuccess && userStocks.data.includes(params.stock);

  const filteredNews = useMemo(
    () =>
      filterNews(companyNews.data, profile.data),
    [companyNews.data, profile.data]
  );

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

  if (quote.isSuccess && quote.data.c === 0 && quote.data.d === null) {
    return <NotFound />;
  }

  return (quote.isSuccess &&
    <>
      <div className="w-[calc(100%) + 0.5rem] sticky top-0 z-50 -mx-8 -my-5 hidden h-10 -translate-y-8 rounded-2xl bg-gradient-to-b from-black to-transparent p-4 pb-0 sm:block" />
      <div className="w-full overflow-auto mb-5 transition-all scrollbar-hide">
        <nav className="flex w-full items-center justify-between pb-6 sm:hidden">
          <Link href={"/dashboard/stocks/"}>
            <ArrowLeftIcon className="h-9 w-9 rounded-md bg-white/[0.1] p-2 border border-neutral-800" />
          </Link>
          {userStocks.isSuccess && isAdded && (
            <button
              className="rounded-md bg-white/[0.1] p-2 hover:bg-rose-400 hover:text-black border border-neutral-800"
              onClick={() =>
                userStocksMut.mutate([
                  ...userStocks.data.filter((item: string) => {
                    return item !== params.stock;
                  }),
                ])
              }
            >
              <BookmarkSlashIcon className="w-4" />
            </button>
          )}
          {userStocks.isSuccess && !isAdded && (
            <button
              className="rounded-md bg-white/[0.1] p-2 hover:bg-green-400 hover:text-black border border-neutral-800"
              onClick={() =>
                userStocksMut.mutate([...userStocks.data.concat(params.stock)])
              }
            >
              <BookmarkIcon className="w-4" />
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

      <div className="flex gap-2 rounded-lg w-full text-xs font-medium text-neutral-400 mb-5 flex-wrap">
        <p className="bg-white/[0.1] rounded-lg px-2 py-1 border-neutral-800 border border-white/[0.05]">Open: {quote.data.o}</p>
        <p className="bg-white/[0.1] rounded-lg px-2 py-1 border-neutral-800 border border-white/[0.05]">High: {quote.data.h}</p>
        <p className="bg-white/[0.1] rounded-lg px-2 py-1 border-neutral-800 border border-white/[0.05]">Low: {quote.data.l}</p>
        {profile.isSuccess &&
          <p className="bg-white/[0.1] rounded-lg px-2 py-1 border-neutral-800 border border-white/[0.05]">
            Market Cap: {shortNum((profile.data.marketCapitalization * 1000000).toFixed(0)).replace('+', '').toUpperCase()}
          </p>
        }
      </div>

      {params.stock && quote.isSuccess && (
        <Chart symbol={params.stock} quote={quote.data} />
      )}

      {(companyNews.isSuccess && filteredNews.length > 0) &&
        <section className={"mt-8 text-neutral-100"} >
          <h1 className="text-lg font-bold">From the News</h1>
          <div className="mt-3 flex flex-col gap-3">
            {filteredNews.slice(0, newsLimit).map((story: iCompanyNews) => (
              <a
                key={story.id}
                href={story.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <motion.article
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative flex h-28 cursor-pointer items-center gap-3 rounded-xl border border-neutral-800 bg-white/[0.05] p-2 hover:border-neutral-700"
                >
                  <div className="relative flex place-content-center overflow-hidden h-full w-28 lg:w-36 object-cover rounded-lg bg-white/[0.1] shrink-0" >
                    {story.image && <Image src={story.image} alt="" fill sizes="100%" className="object-cover contrast-75 brightness-75 saturate-[1.25]" />}
                    {!story.image && <PhotoIcon className="w-10 text-black/50" />}
                  </div>
                  <div className="flex flex-col gap-1.5 h-full py-1 pr-3 w-10 flex-1">
                    <h1 className="font-semibold text-sm leading-tight max-w-prose line-clamp-2 text-ellipsis">{story.headline}</h1>
                    <p className="font-medium text-xs text-neutral-400 leading-tight max-w-prose text-ellipsis line-clamp-3">{story.summary}</p>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-neutral-900/75 rounded-tr-lg rounded-bl-lg py-1.5 px-2.5 w-fit text-xs backdrop-blur-lg text-neutral-200 font-medium backdrop-saturate-[3] max-w-[7rem] truncate">{story.source}</div>
                </motion.article>
              </a>
            ))}
          </div>
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
