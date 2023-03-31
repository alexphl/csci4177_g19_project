/**Author: Olexiy Prokhvatylo B00847680 */

"use client";

import { Line } from "react-chartjs-2";
import { memo, useState } from "react";
import dynamic from "next/dynamic";
import type { iCandle, iQuote } from "@/types/iStocks";
import { useQuery } from "@tanstack/react-query";
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

const Tabs = dynamic(() => import("./Tabs"));

const chartTimeframes = ["1D", "1W", "1M", "6M", "1Y"];

function formatPoints(points: iCandle | undefined) {
  if (!points) return;
  const dataPoints = points && Array<{ x: any, y: number }>(points.c.length);

  for (let i = 0; i < points.c.length; i++) {
    dataPoints[i] = { x: points.t[i] * 1000, y: points.c[i] }
  }

  return dataPoints;
}

function StockChart(props: { symbol: string; quote: iQuote }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState(0);

  const points = useQuery<iCandle>({
    queryKey: ["/api/stocks/hist/", `${chartTimeframes[selectedTimeframe]}/`, props.symbol],
    retry: true,
    retryDelay: 1000,
    placeholderData: { c: [], d: [], o: [], t: [], s: "no_data" },
  });


  if (!points.data || (!points.isFetching && points.data.s !== "ok")) { return (<> </>) }

  const lineColor =
    selectedTimeframe === 0
      ? (props.quote.d > 0 ? "rgba(74, 222, 128, 1)" : "rgba(248, 113, 113, 1)")
      : (points.data.c[points.data.c.length - 1] - points.data.c[0] > 0 ? "rgba(74, 222, 128, 1)" : "rgba(248, 113, 113, 1)");

  return (
    <>
      <div
        className={
          `relative z-10 h-56 w-full rounded-xl border border-neutral-800 bg-gradient-to-bl p-1 shadow-2xl md:h-64 lg:h-72 2xl:h-80 2xl:p-2 `
          + (selectedTimeframe === 0
            ? (props.quote.d > 0
              ? "from-green-300/[0.2] via-green-100/[0.09] to-green-100/[0.09] shadow-green-300/[0.17] "
              : "from-red-300/[0.2] via-red-100/[0.09] to-red-100/[0.09] shadow-red-300/[0.17] ")
            : (points.data.c[points.data.c.length - 1] - points.data.c[0] > 0
              ? "from-green-300/[0.2] via-green-100/[0.09] to-green-100/[0.09] shadow-green-300/[0.17] "
              : "from-red-300/[0.2] via-red-100/[0.09] to-red-100/[0.09] shadow-red-300/[0.17] ")
          )
        }
      >
        <Line
          data={{
            datasets: [
              {
                label: "Price",
                data: formatPoints(points.data),
                borderColor: lineColor,
                borderWidth: 3,
                normalized: true,
                tension: 0.05,
                indexAxis: 'x',
              },
            ],
          }}
          options={{
            spanGaps: true, // 2 days
            responsive: true,
            maintainAspectRatio: false,
            parsing: false,
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
              annotation: {
                common: {
                  drawTime: "beforeDatasetsDraw",
                },
                annotations: {
                  line1: {
                    type: "line",
                    yMin: props.quote.o,
                    yMax: props.quote.o,
                    borderColor: "rgba(255,255,255,0.4)",
                    borderWidth: 1.5,
                    borderDash: [10, 10],
                  },
                },
              },
            },
            scales: {
              y: {
                ticks: {
                  display: true,
                  padding: 8,
                  maxRotation: 0,
                  autoSkip: true,
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
                type: "timeseries",
                offset: true,
                ticks: {
                  display: true,
                  maxTicksLimit: 6,
                  maxRotation: 0,
                  padding: 6,
                  autoSkip: true,
                  //labelOffset: 24,
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
      </div>

      <Tabs
        selector={[selectedTimeframe, setSelectedTimeframe]}
        components={chartTimeframes}
        className="my-1 px-8 lg:px-12 xl:my-2"
      />
    </>
  );
}

export default memo(StockChart);
