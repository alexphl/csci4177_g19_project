import dynamic from "next/dynamic";
import Link from "next/link";
import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Bars2Icon,
  BookmarkIcon,
  BookmarkSlashIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
//import StockChartXS from "./ChartXS";

interface iQuote {
  c: number; // current price
  d: number; // change
  o: number;
}

const loadingVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
}

const loading = "animate-pulse bg-neutral-900 w-4/6";

// Lazy load charts
const StockChartXS = dynamic(() => import("./ChartXS"));

const StockListItem = (props: {
  stock: string | null;
  selected?: boolean;
  isEditMode?: boolean;
  searchIsActive?: boolean;
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
          "group grid grid-cols-[2fr_1fr_1fr] items-center gap-1 rounded-lg border border-neutral-900 p-3 transition-[padding] ease-out hover:bg-white/[0.08] active:backdrop-blur-xl 2xl:p-4" +
          (props.selected || props.isEditMode
            ? " border-transparent bg-white/[0.12] py-4 pr-5 text-neutral-50 2xl:py-5"
            : " bg-transparent") +
          (props.isEditMode && " animate-wiggle")
        }
      >
        <div className="overflow-hidden text-clip">
          <h1 className="text-lg font-extrabold group-hover:text-neutral-50">
            {props.stock || <br />}
          </h1>
          <div
            className={
              "whitespace-nowrap text-xs font-medium text-neutral-400 " +
              (profile.isLoading && loading)
            }
          >
            {(profile.isSuccess && (
              <motion.p variants={loadingVariants} initial="initial" animate="animate">
                {profile.data.name}
              </motion.p>
            )) || <br />}
          </div>
        </div>

        {!props.selected && !props.isEditMode && (
          <>
            <div
              className={
                "h-8 w-16 justify-self-center sm:w-10 md:w-12 lg:w-16 xl:w-20" +
                (props.searchIsActive && " group-hover:hidden")
              }
            >
              {(props.stock && quote.isSuccess) && <StockChartXS symbol={props.stock} open={quote.data.o} change={quote.data.d} />}
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
                  <motion.h1 variants={loadingVariants} initial="initial" animate="animate">
                    {quote.data.c && quote.data.c.toFixed(2)}
                  </motion.h1>
                )) || <br />}
              </div>
              {(quote.isSuccess && (
                <motion.p
                  variants={loadingVariants} initial="initial" animate="animate"
                  className={
                    "text-xs font-medium " +
                    (quote.data!.d > 0 ? " text-green-400" : " text-red-400")
                  }
                >
                  {quote.data.d && (quote.data!.d > 0 ? `+${quote.data!.d.toFixed(2)}` : `${quote.data!.d.toFixed(2)}`)}
                </motion.p>
              )) || (
                <p className={"ml-auto text-xs font-medium " + loading}>
                  <br />
                </p>
              )}
            </div>
          </>
        )}

        {(props.selected || props.isEditMode || props.searchIsActive) && (
          <motion.div
            className={
              "col-span-2 ml-auto flex items-center gap-2 " +
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
            {isAdded && (
              <button
                className="rounded-xl border border-white/[0.2] bg-black/[0.5] p-2 shadow-sm hover:bg-rose-400 hover:text-black"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setUserStocks.mutate([
                    ...userStocks.filter((item: string) => {
                      return item !== props.stock;
                    }),
                  ]);
                }}
              >
                <BookmarkSlashIcon className="w-4" />
              </button>
            )}
            {!isAdded && (
              <button
                className="rounded-xl border border-white/[0.2] bg-black/[0.5] p-2 shadow-sm hover:bg-green-400 hover:text-black"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setUserStocks.mutate([...userStocks.concat(props.stock)]);
                }}
              >
                <BookmarkIcon className="w-4" />
              </button>
            )}
            {!props.searchIsActive && (
              <Bars2Icon className="relative z-50 ml-2 w-6 cursor-grab text-neutral-500 active:text-neutral-100" />
            )}
          </motion.div>
        )}
      </div>
    </Link>
  );
};

export default memo(StockListItem);
