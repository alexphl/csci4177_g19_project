"use client";

import { Line } from "react-chartjs-2";
import { memo, useState } from "react";
import dynamic from "next/dynamic";
import type { iQuote } from "../StockListItem";
import { useQuery } from "@tanstack/react-query";

const Tabs = dynamic(() => import("./Tabs"));

const chartTimeframes = ["1D", "1W", "1M", "6M", "1Y", "5Y", "ALL"];

const StockChart = (props: { symbol: string; quote: iQuote }) => {
  const points = useQuery<any>({
    queryKey: ["/api/stocks/hist/today/", props.symbol],
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState(2);

  const lineColor =
    props.quote.d > 0 ? "rgba(74, 222, 128, 1)" : "rgba(248, 113, 113, 1)";

  return (
    points.isSuccess &&
    points.data.c && (
      <>
        <div
          className={
            `relative z-10 h-56 w-full rounded-xl border border-neutral-800 bg-gradient-to-bl p-1 shadow-2xl md:h-64 lg:h-72 2xl:h-80 2xl:p-2 ` +
            (props.quote.d > 0
              ? "from-green-300/[0.2] via-green-100/[0.09] to-green-100/[0.09] shadow-green-300/[0.17] "
              : "from-red-300/[0.2] via-red-100/[0.09] to-red-100/[0.09] shadow-red-300/[0.17] ")
          }
        >
          <Line
            data={{
              labels: points.data.t.concat(props.quote.t),
              datasets: [
                {
                  label: "Price",
                  data: points.data.c.concat(props.quote.c),
                  borderColor: lineColor,
                  borderWidth: 3,
                  spanGaps: true,
                  normalized: true,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              interaction: {
                mode: "nearest",
                axis: "x",
              },
              elements: {
                point: {
                  pointStyle: "cross",
                  hoverRadius: 15,
                  radius: 0,
                  hoverBorderWidth: 2,
                  hitRadius: 400,
                  hoverBackgroundColor: "white",
                  hoverBorderColor: "white",
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  display: true,
                  beginAtZero: false,
                  ticks: {
                    display: true,
                    padding: 8,
                    maxTicksLimit: 5,
                    color: "rgba(255,255,255,0.6)",
                    font: {
                      size: 12,
                      weight: "500",
                    },
                  },
                  grid: {
                    color: "rgba(255,255,255,0.12)",
                    lineWidth: 0.5,
                  },
                },
                x: {
                  display: true,
                  offset: true,
                  ticks: {
                    display: true,
                    maxTicksLimit: 6,
                    maxRotation: 0,
                    padding: 6,
                    labelOffset: 24,
                    color: "rgba(255,255,255,0.3)",
                    font: {
                      size: 10,
                      weight: "400",
                    },
                  },
                  grid: {
                    color: "rgba(255,255,255,0.12)",
                    lineWidth: 0.5,
                  },
                },
              },
            }}
          />

          {/*<svg className="absolute top-0 left-0 rounded-lg w-full h-full opacity-20 contrast-200 brightness-50 pointer-events-none">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>

            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>*/}
        </div>

        <Tabs
          selector={[selectedTimeframe, setSelectedTimeframe]}
          components={chartTimeframes}
          className="my-1.5 px-6 xl:my-2"
        />
      </>
    )
  );
};

export default memo(StockChart);
