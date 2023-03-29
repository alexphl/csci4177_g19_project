/**Author: Olexiy Prokhvatylo B00847680 */

import dynamic from "next/dynamic";
import Link from "next/link";
import { memo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { m, useInView } from "framer-motion";
import {
  Bars2Icon,
  BookmarkIcon,
  BookmarkSlashIcon,
} from "@heroicons/react/24/outline";
import type { iProfile, iQuote } from "@/types/iStocks";

// Lazy load charts
const StockChartXS = dynamic(() => import("./ChartXS"));

const loadingVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const loading = "animate-pulse bg-neutral-900 w-4/6";

function StockListItem(props: {
  stock: string | null;
  selected?: boolean;
  isEditMode?: boolean;
  isAdded: boolean;
  searchIsActive?: boolean;
  addStock: (stock: string) => false | void;
  removeStock: (stock: string) => false | void;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const quote = useQuery<iQuote>({
    queryKey: [`/api/stocks/quote/`, props.stock],
    retry: true,
    enabled: !!props.stock && isInView,
  });
  const profile = useQuery<iProfile>({
    queryKey: [`/api/stocks/profile/`, props.stock],
    staleTime: Infinity,
    retry: true,
    refetchOnWindowFocus: false,
    enabled: !!props.stock && !!quote.isSuccess && isInView,
  });

  return (
    <div
      className={
        "relative group grid grid-cols-[2fr_1fr_1fr] w-full items-center gap-1 rounded-lg border border-neutral-800 p-3 bg-white/[0.05] transition-[padding] ease-out hover:bg-white/[0.08] transform-gpu active:backdrop-blur-xl 2xl:p-4" +
        (props.selected || props.isEditMode
          ? " border-transparent bg-white/[0.12] py-4 pr-5 text-neutral-50 2xl:py-5"
          : " bg-transparent") +
        (props.isEditMode && " animate-wiggle") + ` ${props.className}`
      }
    >
      <Link
        ref={ref}
        className={'absolute w-full h-full'}
        draggable={!props.isEditMode && !props.selected}
        href={`/dashboard/stocks/${props.stock}`}
      />
      <div className="overflow-hidden text-clip">
        <h2 className="text-lg font-extrabold group-hover:text-neutral-50">
          {props.stock || <br />}
        </h2>
        <div
          className={
            "whitespace-nowrap text-xs font-medium text-neutral-400 " +
            (profile.isLoading && loading)
          }
        >
          {(profile.isSuccess && (
            <m.p
              variants={loadingVariants}
              initial="initial"
              animate="animate"
            >
              {profile.data.name}
            </m.p>
          )) || <br />}
        </div>
      </div>

      {
        // Graphs and quote data
        !props.selected && !props.isEditMode && (
          <>
            <div
              className={
                "h-8 w-16 justify-self-center sm:w-10 md:w-12 lg:w-16 xl:w-20" +
                (props.searchIsActive && " group-hover:hidden")
              }
            >
              {props.stock && quote.isSuccess && profile.isSuccess && (
                <StockChartXS symbol={props.stock} quote={quote.data} />
              )}
            </div>

            <div
              className={
                "col-start-3 text-end " +
                (props.searchIsActive && " group-hover:hidden")
              }
            >
              <div
                className={
                  "ml-auto text-lg font-bold group-hover:text-neutral-50 " +
                  (quote.isLoading && loading)
                }
              >
                {(quote.data && (
                  <m.h1
                    variants={loadingVariants}
                    initial="initial"
                    animate="animate"
                  >
                    {quote.data.c && quote.data.c.toFixed(2)}
                  </m.h1>
                )) || <br />}
              </div>
              {(quote.isSuccess && (
                <m.p
                  variants={loadingVariants}
                  initial="initial"
                  animate="animate"
                  className={
                    "text-xs font-medium " +
                    (quote.data.d > 0 ? " text-green-400" : " text-red-400")
                  }
                >
                  {quote.data.d &&
                    (quote.data.d > 0
                      ? `+${quote.data.d.toFixed(2)}`
                      : `${quote.data.d.toFixed(2)}`)}
                </m.p>
              )) || (
                  <p className={"ml-auto text-xs font-medium " + loading}>
                    <br />
                  </p>
                )}
            </div>
          </>
        )
      }

      {
        // Add / remove, drag, and other actions
        (props.selected || props.isEditMode || props.searchIsActive) && (
          <m.div
            className={
              "relative z-50 col-span-2 ml-auto flex items-center gap-2 " +
              (props.searchIsActive &&
                !props.selected &&
                " col-start-2 row-start-1 mx-2 hidden group-hover:block")
            }
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
          >
            {props.isAdded && (
              <button
                className="rounded-xl border border-white/[0.4] bg-black/[0.5] p-2 shadow-sm hover:bg-rose-300/75 hover:text-black"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  props.removeStock(props.stock || "");
                }}
              >
                <BookmarkSlashIcon className="w-4" fill="rgba(255,255,255,0.2)" />
              </button>
            )}
            {!props.isAdded && (
              <button
                className="rounded-xl border border-white/[0.4] bg-black/[0.5] p-2 shadow-sm hover:bg-green-300/75 hover:text-black"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  props.addStock(props.stock || "");
                }}
              >
                <BookmarkIcon className="w-4" fill="rgba(255,255,255,0.2)" />
              </button>
            )}
            {!props.searchIsActive && (
              <Bars2Icon className="relative z-50 ml-2 w-6 cursor-grab text-neutral-500 active:text-neutral-100" />
            )}
          </m.div>
        )
      }
    </div>
  );
}

export default memo(StockListItem);
