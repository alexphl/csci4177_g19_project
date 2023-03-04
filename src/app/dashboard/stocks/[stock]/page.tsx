'use client'

import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Link from "next/link";

// Lazy load
const Chart = dynamic(() => import("./Chart"));
const News = dynamic(() => import("../../news/page"));

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
                  {profile.data.exchange.split(" ")[0]} · {profile.data.currency}
                </h2>
              )}
            </section>

            <h1 className="whitespace-nowrap text-3xl">{profile.isSuccess && profile.data.name || <br/>}</h1>
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
        <News />
      </div>
    </>
  );
}
