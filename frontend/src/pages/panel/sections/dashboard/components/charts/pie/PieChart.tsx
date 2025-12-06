import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  Colors,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

type ChartSize = "sm" | "md" | "lg" | "full";

interface PieChartProps {
  size?: ChartSize;
  data: ChartData<"pie", number[], string>;
  options: ChartOptions<"pie">;
}

const sizeClasses: Record<ChartSize, string> = {
  sm: "w-32 h-32",
  md: "w-48 h-48",
  lg: "w-64 h-64",
  full: "w-full h-72",
};

export default function PieChart(props: PieChartProps) {
  const { size = "full", data, options } = props;

  return (
    <div className={`relative ${sizeClasses[size]} max-w-full`}>
      <Pie data={data} options={options} />
    </div>
  );
}
