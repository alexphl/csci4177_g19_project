"use client";

import { queryClient } from "@/app/QueryProvider";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import Link from "next/link";

// Lazy load
const Chart = dynamic(() => import("./Chart"));
const NotFound = dynamic(() => import("../../[404]/page"));

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
    staleTime: Infinity,
  });
  const userStocks = useQuery<string[]>({
    queryKey: [`/api/stocks/user`],
  });
  const isAdded =
    userStocks.isSuccess && userStocks.data.includes(params.stock);

  // Function to update user stock list
  // Implements optimistic updates
  const userStocksMut = useMutation({
    mutationFn: (newList: string[]) =>
      fetch(`/api/stocks/user`, {
        method: "POST",
        body: JSON.stringify(newList),
        headers: { "Content-Type": "application/json" },
      }),
    // When mutate is called:
    onMutate: async (newList) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["/api/stocks/user"] });

      // Snapshot the previous value
      const previousList = queryClient.getQueryData(["/api/stocks/user"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["/api/stocks/user"], () => newList);

      // Return a context object with the snapshotted value
      return { previousList };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["/api/stocks/user"], context!.previousList);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stocks/user"] });
    },
  });

  if (quote.isSuccess && quote.data.c === 0 && quote.data.d === null) {
    return <NotFound />;
  }

  return (
    <>
    <div className="w-[calc(100%) + 1rem] h-10 sticky top-0 z-50 -mx-8 -my-5 -translate-y-8 rounded-2xl bg-gradient-to-b from-black to-transparent p-4 pb-0"/>
      <div className="w-full overflow-auto pb-6 transition-all scrollbar-hide">
        <nav className="flex w-full items-center justify-between pb-6 sm:hidden">
          <Link href={"/dashboard/stocks/"}>
            <ArrowLeftIcon className="h-9 w-9 rounded-md bg-white/[0.1] p-2" />
          </Link>
          {userStocks.isSuccess && isAdded && (
            <button
              className="rounded-md bg-white/[0.1] p-2 hover:bg-rose-400 hover:text-black"
              onClick={() =>
                userStocksMut.mutate([
                  ...userStocks.data.filter((item: string) => {
                    return item !== params.stock;
                  }),
                ])
              }
            >
              <TrashIcon className="w-4" />
            </button>
          )}
          {userStocks.isSuccess && !isAdded && (
            <button
              className="rounded-md bg-white/[0.1] p-2 hover:bg-green-400 hover:text-black"
              onClick={() =>
                userStocksMut.mutate([...userStocks.data.concat(params.stock)])
              }
            >
              <PlusIcon className="w-4" />
            </button>
          )}
        </nav>

        <div className="flex w-full justify-between gap-2">
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
