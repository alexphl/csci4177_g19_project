import dynamic from "next/dynamic";
import Link from "next/link";
import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
//import StockChartXS from "./ChartXS";

interface iQuote {
  c: number, // current price
  d: number, // change
}

// Lazy load charts
const StockChartXS = dynamic(() => import("./ChartXS"));

const StockListItem = (props: {
  stock: string;
  selected: boolean;
  onClick?: any;
  className?: string;
}) => {
  const quote = useQuery<iQuote>({ queryKey: [`/api/stocks/quote/`, props.stock] });
  const profile = useQuery<any>({ queryKey: [`/api/stocks/profile/`, props.stock] });

  return (
    <li className={props.className}>
      <Link onClick={props.onClick} href={`/dashboard/stocks/${props.stock}`}>
        <div
          className={
            "group grid grid-cols-[2fr_1fr_1fr] items-center gap-1 rounded-lg border border-neutral-900 p-3 transition-all hover:border-transparent hover:bg-white/[0.08] 2xl:p-4" +
            (props.selected
              ? " border-transparent bg-white/[0.12] py-4 text-neutral-50 2xl:py-5"
              : " bg-transparent")
          }
        >
          <div className="overflow-hidden text-clip">
            <h1 className="text-lg font-extrabold group-hover:text-neutral-50">
              {props.stock}
            </h1>
            <p className="whitespace-nowrap text-xs font-medium text-neutral-400">
              {profile.isSuccess && profile.data.name || <br/>}
            </p>
          </div>

          <div className="h-8 w-16 justify-self-center sm:w-10 md:w-12 lg:w-16 xl:w-20">
            <StockChartXS />
          </div>

          <div className="col-start-3 text-end">
            <h1 className="text-lg font-bold group-hover:text-neutral-50">
              {quote.data && quote.data.c}
            </h1>
            {quote.isSuccess && (
              <p
                className={
                  "text-xs font-medium " +
                  (quote.data!.d > 0 ? "text-green-400" : "text-red-400")
                }
              >
                {quote.data!.d > 0 ? `+${quote.data!.d}` : `${quote.data!.d}`}
              </p>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default memo(StockListItem);
