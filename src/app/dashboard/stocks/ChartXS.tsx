"use client";

import { memo } from "react";
import { Line } from "react-chartjs-2";

import { useQuery } from "@tanstack/react-query";

const StockChartXS = (props: { symbol: string; open: number, change: number }) => {
  const points = useQuery<any>({
    queryKey: ["/api/stocks/hist/today/", props.symbol],
  });

  const isPositive = props.change > 0;

  const lineColor = isPositive
    ? "rgba(74, 222, 128, 1)"
    : "rgba(248, 113, 113, 1)";

  return (
    points.isSuccess &&
    points.data.c && (
      <>
        <Line
          data={{
            labels: points.data.t,
            datasets: [
              {
                label: "Price",
                data: points.data.c,
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
              annotation: {
                annotations: {
                  line1: {
                    type: "line",
                    yMin: props.open,
                    yMax: props.open,
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
                  // maxTicksLimit: 2,
                  display: false,
                },
                offset: false,
              },
            },
          }}
        />
      </>
    )
  );
};

export default memo(StockChartXS);
