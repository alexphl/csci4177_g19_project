"use client";

import { Line } from "react-chartjs-2";
import { memo, useState } from "react";
import dynamic from "next/dynamic";

const Tabs = dynamic(() => import("./Tabs"));

import data from "../../../dummy_data/prices.json";

let prices = JSON.parse(JSON.stringify(data.prices)).reverse();

// Remove every second entry for performance
prices = prices.filter(function (_: any, i: number) {
  return (i + 1) % 2;
});

const chartTimeframes = ["1D", "1W", "1M", "6M", "1Y", "5Y", "ALL"];

const StockChart = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState(2);

  // randomize data a little on each render
  const randomPrices = JSON.parse(JSON.stringify(prices));
  randomPrices.splice(0, Math.random() * (3000 - 2500) + 2500);
  const isPositive = randomPrices[0]?.close - randomPrices[randomPrices.length - 1]?.close < 0;

  return (
    <>
      <div
        className={
          `relative z-10 h-56 w-full rounded-xl border border-neutral-800 shadow-2xl p-1 bg-gradient-to-bl md:h-64 lg:h-72 2xl:h-80 2xl:p-2 ` +
          (isPositive ? "from-green-300/[0.2] shadow-green-300/[0.17] via-green-100/[0.09] to-green-100/[0.09] " : "from-red-300/[0.2] shadow-red-300/[0.17] via-red-100/[0.09] to-red-100/[0.09] ")
        }
      >
        <Line
          data={{
            labels: [],
            datasets: [
              {
                label: "Price",
                data: randomPrices,
                backgroundColor: ["rgba(220, 255, 255, 0.4)"],
                borderColor: [
                  isPositive
                    ? "rgba(74, 222, 128, 0.9)"
                    : "rgba(248, 113, 113, 0.9)",
                ],
                borderWidth: 3,
                spanGaps: true,
                normalized: true,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            interaction: {
              mode: 'nearest',
              axis: 'x',
            },
            parsing: {
              xAxisKey: "date",
              yAxisKey: "close",
            },
            elements: {
              point: {
                pointStyle: "cross",
                hoverRadius: 15,
                radius: 0,
                hoverBorderWidth: 2,
                hitRadius: 400,
                hoverBackgroundColor: "white",
                hoverBorderColor: "white"
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
                  }
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
                  }
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
        className="my-1.5 xl:my-2 px-6"
      />
    </>
  );
};

export default memo(StockChart);
