'use client'

import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Link from "next/link";

// Lazy load
const Chart = dynamic(() => import("./Chart"));

interface iQuote {
  c: number; // current price
  d: number; // change
}

export default function StockDetails({
  params,
}: {
  params: { stock: string };
}) {
  const quote = useQuery<iQuote>({
    queryKey: [`/api/stocks/quote/`, params.stock],
  });
  const profile = useQuery<any>({
    queryKey: [`/api/stocks/profile/`, params.stock],
  });

  return (
    <>
      <div className="w-full overflow-auto pb-6 transition-all scrollbar-hide">
        <nav className="flex w-full pb-6 sm:hidden">
          <Link href={"/dashboard/stocks/"}>
            <ArrowLeftIcon className="h-9 w-9 rounded-md bg-white/[0.1] p-2" />
          </Link>
        </nav>

        <div className="flex w-full justify-between gap-2">
          <div className="text-scroll overflow-auto scrollbar-hide">
            <section className="flex items-end gap-4">
              <h2 className="text-xl font-extrabold">{params.stock}</h2>
              {profile.isSuccess && (
                <h2 className="whitespace-nowrap text-neutral-400">
                  {profile.data.exchange && profile.data.exchange.split(" ")[0]} · {profile.data.currency}
                </h2>
              )}
            </section>

            <h1 className="whitespace-nowrap text-3xl max-w-[300px] sm:max-w-full">{profile.isSuccess && profile.data.name || <br/>}</h1>
          </div>

          <div className="text-end">
            <h1 className="text-xl font-extrabold leading-8 group-hover:text-neutral-50">
              {quote.isSuccess && quote.data.c}
            </h1>
            {quote.isSuccess &&
            <p
              className={
                "text-lg font-medium " +
                (quote.data.d > 0 ? "text-green-400" : "text-red-400")
              }
            >
              {quote.data.d > 0
                ? `+${quote.data.d}`
                : `${quote.data.d}`}
            </p>
          }
          </div>
        </div>
      </div>

      <Chart />

      <div className="mt-6 text-neutral-100 transition-all">
        <h1 className="text-xl font-bold">Related News</h1>
        <div className="mt-4 flex flex-col gap-3">
          {[...Array(4)].map((_x, i) => (
            <article
              key={i}
              className="flex h-28 cursor-pointer items-center gap-4 rounded-xl border border-neutral-800 p-2 hover:border-neutral-700"
            >
              <div className="h-full w-32 rounded-lg bg-white/[0.1]" />
              <div className="flex h-full flex-col py-1">
                <h2 className="text-lg font-bold">Story Title</h2>
                <p className="text-sm text-neutral-400">Lorem Ipsum</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
