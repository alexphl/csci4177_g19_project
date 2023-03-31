/**Author: Olexiy Prokhvatylo B00847680 */

"use client";

import { memo } from "react";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

import { useQuery } from "@tanstack/react-query";

import type { iQuote, iCandle } from "@/types/iStocks";

function StockChartXS(props: { symbol: string; quote: iQuote }) {
  const points = useQuery<iCandle>({
    queryKey: ["/api/stocks/hist/1D/", props.symbol],
    placeholderData: { c: [], d: [], o: [], t: [], s: "no_data" },
    retry: true,
  });

  if (!points.data || points.data.s !== "ok") { return (<> </>) }

  const lineColor = props.quote.d > 0 ? "rgba(74, 222, 128, 1)" : "rgba(248, 113, 113, 1)";

  const dataPoints = Array<{ x: number, y: number }>(points.data.c.length);

  for (let i = 0; i < points.data.c.length; i++) {
    dataPoints[i] = { x: points.data.t[i], y: points.data.c[i] }
  }

  return (
    <>
      <Line
        data={{
          datasets: [
            {
              label: "Price",
              data: dataPoints,
              backgroundColor: "transparent",
              borderColor: [lineColor],
              borderWidth: 2.5,
              spanGaps: true,
              normalized: true,
              tension: 0.05,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          layout: {
            autoPadding: true,
          },
          elements: {
            point: {
              radius: 0,
              hitRadius: 40,
            },
          },
          parsing: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
            decimation: {
              enabled: true,
              algorithm: "lttb",
              threshold: 1,
              samples: 20,
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
                  borderColor: lineColor,
                  borderWidth: 1,
                  borderDash: [5, 5],
                },
              },
            },
          },
          scales: {
            y: {
              display: false,
              beginAtZero: false,
              ticks: {
                display: false,
                maxRotation: 0,
                autoSkip: true,
              },
              offset: false,
            },
            x: {
              type: 'time',
              display: false,
              ticks: {
                display: false,
                maxRotation: 0,
                autoSkip: true,
              },
              offset: false,
            },
          },
        }}
      />
    </>
  );
}

export default memo(StockChartXS);
