/* eslint-disable padding-line-between-statements */
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
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
import { GetStaticProps, NextPageWithLayout } from "next";
import { Line } from "react-chartjs-2";
import { Checkbox } from "@/components/Checkbox";
import { ApiErrorType, isApiError } from "@/api/error";
import { usePopulationComposition } from "@/api/population/usePopulationComposition";
import { fetchPrefectures, PrefecturesType } from "@/api/prefectures";
import { queryClient } from "@/lib/react-query";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type PrefecturesProps = { data: PrefecturesType | ApiErrorType };

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "都道府県一覧グラフ",
    },
  },
};

const getRandomColor = (): string => {
  const get256 = () => {
    return Math.floor(Math.random() * 256);
  };
  const [r, g, b] = [get256(), get256(), get256()];
  const color = `rgb(${r}, ${g}, ${b})`;
  return color;
};

const Index: NextPageWithLayout<PrefecturesProps> = (props) => {
  const [checkedPrefCode, setCheckedPrefCode] = useState<number[]>([]);
  if (isApiError(props.data)) throw new Error("invalid type");
  const { result: prefectures } = props.data;
  const { isLoading, error, populationCompositionList } =
    usePopulationComposition(checkedPrefCode);
  console.log(isLoading, error);

  const [labels, setLabels] = useState<number[]>([]);
  if (!labels.length) {
    populationCompositionList.forEach((elem) => {
      elem?.forEach((_, i) => {
        setLabels((prev) => [...prev, elem?.[i].year]);
      });
    });
  }

  const createObj = (i: number) => {
    if (isApiError(props.data)) throw new Error("invalid type");
    const obj: { label: string; data: number[]; borderColor: string } = {
      label: "",
      data: [],
      borderColor: "",
    };
    obj.label = props.data.result[checkedPrefCode[i] - 1].prefName;
    return obj;
  };

  const _arr: Array<{ label: string; data: number[]; borderColor: string }> =
    [];
  populationCompositionList.forEach((elem, i) => {
    const arr: number[] = [];
    const obj = createObj(i);
    elem?.forEach((elem2) => {
      arr.push(elem2.value);
    });
    obj.data = arr;
    obj.borderColor = getRandomColor();
    _arr.push(obj);
  });
  console.log(_arr);

  const data = {
    labels,
    datasets: _arr,
  };

  return (
    <>
      {prefectures.map((prefecture) => (
        <Checkbox
          prefCode={prefecture.prefCode}
          prefName={prefecture.prefName}
          setCheckedPrefCode={setCheckedPrefCode}
          key={prefecture.prefCode}
        />
      ))}
      <Line options={options} data={data} />
    </>
  );
};

Index.getLayout = (page) => (
  <QueryClientProvider client={queryClient}>{page}</QueryClientProvider>
);
export default Index;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const data = await fetchPrefectures();
    return { props: { data }, revalidate: 6000 };
  } catch (_) {
    return { notFound: true, revalidate: 10 };
  }
};
