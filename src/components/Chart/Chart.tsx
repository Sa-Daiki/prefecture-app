import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { genDatasets } from "./genDatasets";
import { ChartProps } from "./type";
import { useGenLabels } from "./useGenLabels";
import { usePopulationComposition } from "@/api/population";
import { setupConfig } from "@/lib/react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Chart = ({ data, checkedPrefCode }: ChartProps): JSX.Element => {
  const { populationCompositionList } =
    usePopulationComposition(checkedPrefCode);
  const labels = useGenLabels(populationCompositionList);
  const datasets = genDatasets(
    data,
    populationCompositionList,
    checkedPrefCode
  );

  return (
    <Line
      options={setupConfig("人口構成比グラフ")}
      data={{ labels, datasets }}
    />
  );
};

export default Chart;
