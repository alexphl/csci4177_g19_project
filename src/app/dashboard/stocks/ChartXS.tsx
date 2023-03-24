"use client";

import { memo } from "react";
import { Line } from "react-chartjs-2";

import { useQuery } from "@tanstack/react-query";

import type { iQuote, iCandle } from "@/utils/types/iStocks";

function StockChartXS(props: { symbol: string; quote: iQuote }) {
  const points = useQuery<iCandle>({
    queryKey: ["/api/stocks/hist/1D/", props.symbol],
    initialData: { c: [], d: [], o: [], t: [], s: "no_data" },
  });

  const lineColor =
    props.quote.d > 0 ? "rgba(74, 222, 128, 1)" : "rgba(248, 113, 113, 1)";

  if (points.data.s !== "ok") { return (<> </>) }

  return (
    <>
      <Line
        data={{
          labels: points.data.t.concat(props.quote.t),
          datasets: [
            {
              label: "Price",
              data: points.data.c.concat(props.quote.c),
              backgroundColor: "transparent",
              borderColor: [lineColor],
              borderWidth: 2.5,
              spanGaps: true,
              normalized: true,
              tension: 0.3,
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
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
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
              },
              offset: false,
            },
            x: {
              display: false,
              ticks: {
                display: false,
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
