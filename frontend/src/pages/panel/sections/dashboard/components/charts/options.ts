import { ChartOptions } from "chart.js";
import { formatCurrencyBRL } from "../../../../../../utils/monetary";

export const defaultOptions: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    colors: {
      enabled: true,
      forceOverride: true,
    },
    legend: {
      position: "bottom",
      labels: {
        padding: 10,
        boxWidth: 12,
        boxHeight: 12,
        font: {
          size: 14,
          weight: "bolder",
        },
        color: "#FFF",
      },
    },
  },
};

export const pieMonetaryOptions: ChartOptions<"pie"> = {
  ...defaultOptions,
  plugins: {
    ...defaultOptions.plugins,
    tooltip: {
      callbacks: {
        label: (context) => " " + formatCurrencyBRL(context.parsed),
      },
    },
  },
};
