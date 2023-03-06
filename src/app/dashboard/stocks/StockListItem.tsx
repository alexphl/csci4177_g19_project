import dynamic from "next/dynamic";
import Link from "next/link";
import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { TrashIcon, Bars2Icon, PlusIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
//import StockChartXS from "./ChartXS";

interface iQuote {
  c: number; // current price
  d: number; // change
}

const loading = "animate-pulse bg-neutral-800 w-4/6";

// Lazy load charts
const StockChartXS = dynamic(() => import("./ChartXS"));

const StockListItem = (props: {
  stock: string | null;
  selected: boolean;
  isEditMode?: boolean,
  searchIsActive: boolean,
  userStocks: any;
  onClick?: any;
  className?: string;
}) => {
  const quote = useQuery<iQuote>({
    queryKey: [`/api/stocks/quote/`, props.stock],
    enabled: !!props.stock,
  });
  const profile = useQuery<any>({
    queryKey: [`/api/stocks/profile/`, props.stock],
    staleTime: Infinity,
    enabled: !!props.stock,
  });

  const [userStocks, setUserStocks] = props.userStocks;
  const isAdded = userStocks.includes(props.stock);

  return (
    <Link
      className={props.className}
      onClick={props.onClick}
      draggable={!props.isEditMode && !props.selected}
      href={`/dashboard/stocks/${props.stock}`}
    >
      <div
        className={
          "group grid grid-cols-[2fr_1fr_1fr] hover:backdrop-blur-xl items-center gap-1 rounded-lg border border-neutral-900 p-3 transition-all hover:border-transparent hover:bg-white/[0.08] 2xl:p-4" +
          ((props.selected || props.isEditMode)
            ? " border-transparent bg-white/[0.12] py-4 pr-5 text-neutral-50 2xl:py-5"
            : " bg-transparent")
          + (props.isEditMode && " animate-wiggle")
        }
      >
        <div className="overflow-hidden text-clip">
          <h1 className="text-lg font-extrabold group-hover:text-neutral-50">
            {props.stock || <br />}
          </h1>
          <p
            className={
              "whitespace-nowrap text-xs font-medium text-neutral-400 " +
              (profile.isLoading && loading)
            }
          >
            {(profile.isSuccess && profile.data.name) || <br />}
          </p>
        </div>

        {!props.selected && !props.isEditMode && (
          <>
            <div className="h-8 w-16 justify-self-center sm:w-10 md:w-12 lg:w-16 xl:w-20">
              <StockChartXS />
            </div>

            <div className="col-start-3 text-end">
              <h1
                className={
                  "ml-auto text-lg font-bold group-hover:text-neutral-50 " +
                  (quote.isLoading && loading)
                }
              >
                {(quote.data && quote.data.c) || <br />}
              </h1>
              {(quote.isSuccess && (
                <p
                  className={
                    "text-xs font-medium " +
                    (quote.data!.d > 0 ? " text-green-400" : " text-red-400")
                  }
                >
                  {quote.data!.d > 0 ? `+${quote.data!.d}` : `${quote.data!.d}`}
                </p>
              )) || (
                <p className={"ml-auto text-xs font-medium " + loading}>
                  <br />
                </p>
              )}
            </div>
          </>
        )}

        {(props.selected || props.isEditMode) && (
          <motion.div
            className="col-span-2 ml-auto flex items-center gap-2"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
          >
            {isAdded && (
              <button
                className="rounded-lg border-[0.5px] border-black/[0.5] bg-neutral-100/[0.1] p-1.5 shadow-sm hover:bg-rose-400 hover:text-black"
                onClick={() =>
                  setUserStocks.mutate([
                    ...userStocks.filter((item: string) => {
                      return item !== props.stock;
                    }),
                  ])
                }
              >
                <TrashIcon className="w-4" />
              </button>
            )}
            {!isAdded && (
              <button
                className="rounded-lg border-[0.5px] border-black/[0.5] bg-neutral-100/[0.1] p-1.5 shadow-sm hover:bg-green-400 hover:text-black"
                onClick={() =>
                  setUserStocks.mutate([...userStocks.concat(props.stock)])
                }
              >
                <PlusIcon className="w-4" />
              </button>
            )}
            {!props.searchIsActive && <Bars2Icon className="relative z-50 ml-2 w-6 cursor-grab text-neutral-400 active:text-neutral-100" />}
          </motion.div>
        )}
      </div>
    </Link>
  );
};

export default memo(StockListItem);
