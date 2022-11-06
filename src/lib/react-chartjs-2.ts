import { ChartOptions } from "chart.js";

export const setupConfig = (title: string): ChartOptions => ({
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: title,
    },
  },
});
