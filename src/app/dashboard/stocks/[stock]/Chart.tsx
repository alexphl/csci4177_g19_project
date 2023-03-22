"use client";

import { Line } from "react-chartjs-2";
import { memo, useState } from "react";
import dynamic from "next/dynamic";
import type { iCandle, iQuote } from "@/utils/types/iStocks";
import { useQuery } from "@tanstack/react-query";

const Tabs = dynamic(() => import("./Tabs"));

const chartTimeframes = ["1D", "1W", "1M", "6M", "1Y", "5Y", "ALL"];

function formatLabels(labels: number[], timeframe: number) {
  switch (timeframe) {
    case 0:
      return labels.map((timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString("en-GB", {
          hour: "numeric",
          minute: "2-digit"
        });
      })
    default:
      return labels.map((timestamp) => new Date(timestamp * 1000).toString())
  }
}

function StockChart(props: { symbol: string; quote: iQuote }) {
  const points = useQuery<iCandle>({
    queryKey: ["/api/stocks/hist/today/", props.symbol],
    initialData: { c: [], d: [], o: [], t: [], s: "ok" },
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState(0);

  const lineColor =
    props.quote.d > 0 ? "rgba(74, 222, 128, 1)" : "rgba(248, 113, 113, 1)";

  if (points.data.s !== "ok") { return (<> </>) }

  return (
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
            labels: formatLabels(points.data.t.concat(props.quote.t), selectedTimeframe),
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
        className="my-1.5 px-6 xl:my-2"
      />
    </>
  );
};

export default memo(StockChart);
