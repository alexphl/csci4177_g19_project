"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Chart, registerables } from "chart.js";
import Searchbox from "./Searchbox";
import Menubar from "./MenubarDesktop";

// Lazy load components
const OverlayComponent = dynamic(() => import("./OverlayComponent"));
const StockList = dynamic(() => import("./StockList"));

// Necessary for charts to render
Chart.register(...registerables);

const stylePane =
  "bg-black sm:border border-neutral-800 sm:rounded-2xl h-screen shadow-xl p-4 overflow-auto scrollbar-hide pb-32 sm:pb-40 transition-all overscroll-contain shadow-inner";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [overlayIsOpen, setOverlayIsOpen] = useState(false);
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Destrucutre path to see if user selected a particular stock
  const path = usePathname();
  let selectedStock: string | undefined = undefined;
  if (path) {
    const pathBits = path.split("/");
    if (pathBits.length > 3) selectedStock = pathBits[3];
  }

  return (
    <>
      <OverlayComponent controller={[overlayIsOpen, setOverlayIsOpen]} />
      <nav
        className={
          "mx-auto block grid-cols-[3fr_5fr] items-center gap-2 transition-all lg:container sm:grid sm:h-20 sm:py-0 sm:px-6 md:px-10 lg:h-28 lg:gap-6 lg:px-4 xl:px-24 2xl:h-32 " +
          (selectedStock ? " p-0" : " p-3")
        }
      >
        <Searchbox
          controller={[searchIsActive, setSearchIsActive]}
          query={[searchQuery, setSearchQuery]}
          className={selectedStock ? " hidden sm:flex" : " flex"}
        />
        <Menubar
          controller={[overlayIsOpen, setOverlayIsOpen]}
          className="hidden sm:block"
        />
      </nav>

      <main className="mx-auto grid-cols-[3fr_5fr] gap-2 transition-all lg:container sm:grid sm:px-6 md:px-10 lg:gap-6 lg:px-4 xl:px-24">
        <div /* LEFT pane */
          className={stylePane + (selectedStock ? " hidden sm:block" : "")}
        >
          <StockList
            searchIsActive={[searchIsActive, setSearchIsActive]}
            searchQuery={[searchQuery, setSearchQuery]}
            selectedStock={selectedStock}
          />
        </div>

        <div /* RIGHT pane */
          className={
            stylePane +
            " p-7 sm:block sm:p-8 " +
            (selectedStock
              ? "col-start-1 block sm:col-start-2"
              : "hidden translate-y-20 opacity-40")
          }
        >
          {/* STOCK PAGE LAYOUT */ children}
        </div>
      </main>
    </>
  );
}
