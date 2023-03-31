/**Author: Olexiy Prokhvatylo B00847680 */

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Chart, registerables } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import Searchbox from "./Searchbox";
import Loading from "../loading";
import ListContextProvider from "./ListContext";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc)

// Lazy load components
const StockList = dynamic(() => import("./StockList"), {
  loading: () => <div className="relative h-24 -mt-12 flex"> <Loading /> </div>,
});

// Necessary for charts to render
Chart.register(...registerables);
Chart.register(annotationPlugin);

const stylePane =
  "relative bg-black sm:border border-neutral-800 sm:rounded-2xl h-screen shadow-xl px-4 overflow-scroll scrollbar-hide pb-64 sm:pb-40 transition-transform overscroll-contain";

export default function StocksLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const today = dayjs().startOf('minute');
  const marketOpen = today.startOf('day').utc().hour(13);
  const marketClose = today.startOf('day').utc().hour(21);
  const isWeekend = today.day() === 0 || today.day() === 6;

  // Destrucutre path to see if user selected a particular stock
  const path = usePathname();
  let selectedStock: string | undefined = undefined;
  if (path) {
    const pathBits = path.split("/");
    if (pathBits.length > 3) selectedStock = pathBits[3];
  }

  return (
    <ListContextProvider>
      <div className="flex-auto overflow-y-clip h-screen w-full">
        <nav
          className={
            "mx-auto block grid-cols-[3fr_5fr] items-center gap-2 transition-all lg:container sm:grid sm:h-20 sm:py-0 sm:px-2 md:px-4 lg:gap-4 lg:px-6 xl:h-28 xl:gap-5 xl:px-20 2xl:h-32 " +
            (selectedStock ? " p-0" : " p-3")
          }
        >
          <Searchbox
            searchController={[searchIsActive, setSearchIsActive]}
            queryController={[searchQuery, setSearchQuery]}
            className={selectedStock ? " hidden sm:flex" : " flex"}
          />

          <div className="ml-auto mr-1 hidden sm:block">
            <div className="font-display font-bold text-lg text-end">
              {today.format("MMMM D")}
            </div>
            <p className="font-medium text-neutral-400 text-sm text-end">
              {!isWeekend && (today.diff(marketOpen.local()) < 0 && `Markets open today at ${marketOpen.local().format("HH:mm")}`)}
              {!isWeekend && (today.diff(marketOpen.local()) > 0 && (today.diff(marketClose.local()) < 0 ? `Markets close today at ${marketClose.local().format("HH:mm")}` : "The markets have closed"))}
              {isWeekend && `The markets reopen on Monday at ${marketOpen.local().format('HH:mm')}`}
            </p>
          </div>
        </nav>

        <main className="mx-auto grid-cols-[auto] sm:grid-cols-[3fr_5fr] gap-2 transition-all lg:container grid sm:px-2 md:px-4 lg:gap-3 lg:px-6 xl:gap-5 xl:px-20">
          <div /* LEFT pane */
            className={stylePane + (selectedStock ? " hidden sm:block" : "")}
          >
            <StockList
              searchIsActive={searchIsActive}
              searchQuery={searchQuery}
              selectedStock={selectedStock}
            />
          </div>
          <div /* RIGHT pane */
            className={
              stylePane +
              " px-6 py-6 sm:block sm:col-start-2 sm:p-8 " +
              (selectedStock
                ? "col-start-1 block"
                : "hidden translate-y-20 opacity-40")
            }
          >
            {/* STOCK PAGE LAYOUT */ children}
          </div>
        </main>
      </div>
    </ListContextProvider>
  );
}
