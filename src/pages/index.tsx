/* eslint-disable padding-line-between-statements */
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { GetStaticProps, NextPageWithLayout } from "next";
import Sample from "@/components/Checkbox/Checkbox";
import { ApiErrorType, isApiError } from "@/api/error";
import { usePopulationComposition } from "@/api/population/usePopulationComposition";
import { fetchPrefectures, PrefecturesType } from "@/api/prefectures";
import { queryClient } from "@/lib/react-query";

type PrefecturesProps = { data: PrefecturesType | ApiErrorType };

const Index: NextPageWithLayout<PrefecturesProps> = (props) => {
  const [checkedPrefCode, setCheckedPrefCode] = useState<number[]>([]);
  if (isApiError(props.data)) throw new Error("invalid type");
  const { result: prefectures } = props.data;
  const { isLoading, error, populationCompositionList } =
    usePopulationComposition(checkedPrefCode);
  console.log(isLoading);
  console.log(error);
  console.log(populationCompositionList);

  return (
    <>
      {prefectures.map((prefecture) => (
        <Sample
          prefCode={prefecture.prefCode}
          prefName={prefecture.prefName}
          setCheckedPrefCode={setCheckedPrefCode}
          key={prefecture.prefCode}
        />
      ))}
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
