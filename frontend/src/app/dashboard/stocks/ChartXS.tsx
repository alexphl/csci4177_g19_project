"use client";

import { memo } from "react";
import { Line } from "react-chartjs-2";

import data from "@/dummy_data/prices.json";

const prices = JSON.parse(JSON.stringify(data.prices)).reverse();
prices.splice(0, 6030);

//@ts-ignore
const isPositive = prices[0]?.close - prices[prices.length - 1]?.close < 0;
const lineColor = isPositive
  ? "rgba(74, 222, 128, 0.9)"
  : "rgba(248, 113, 113, 0.9)";

const StockChartXS = () => {
  return (
    <>
      <Line
        data={{
          labels: [],
          datasets: [
            {
              label: "Price",
              data: prices,
              backgroundColor: "transparent",
              borderColor: [lineColor],
              borderWidth: 3,
              spanGaps: true,
              normalized: true,
              tension: 0.05,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          parsing: {
            xAxisKey: "date",
            yAxisKey: "close",
          },
          layout: {
            autoPadding: false,
          },
          elements: {
            point: {
              radius: 0,
              hitRadius: 40,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
          scales: {
            y: {
              display: false,
              grid: { lineWidth: 2 },
              beginAtZero: false,
              ticks: {
                display: false,
              },
              offset: false,
            },
            x: {
              display: false,
              ticks: {
                // maxTicksLimit: 2,
                display: false,
              },
              grid: { lineWidth: 2 },
              offset: false,
            },
          },
        }}
      />
    </>
  );
};

export default memo(StockChartXS);
