import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { GetStaticProps, NextPageWithLayout } from "next";
import { Chart } from "@/components/Chart";
import { Checkbox } from "@/components/Checkbox";
import { ApiErrorType, isApiError } from "@/api/error";
import { fetchPrefectures, PrefecturesType } from "@/api/prefectures";
import { queryClient } from "@/lib/react-query";

type PrefecturesProps = { data: PrefecturesType | ApiErrorType };

const Index: NextPageWithLayout<PrefecturesProps> = (props) => {
  if (isApiError(props.data)) throw new Error("invalid type");
  const { result: prefectures } = props.data;
  const [checkedPrefCode, setCheckedPrefCode] = useState<number[]>([]);

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
      <Chart data={props.data} checkedPrefCode={checkedPrefCode} />
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

    return { props: { data } };
  } catch (_) {
    return { notFound: true };
  }
};
