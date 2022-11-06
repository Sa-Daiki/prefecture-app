import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { GetStaticProps, NextPageWithLayout } from "next";
import { Chart } from "@/components/Chart";
import { Checkbox } from "@/components/Checkbox";
import Layout from "@/layout/Layout";
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
      <h1 style={prefectureHeading}>都道府県</h1>
      <div style={checkBoxesWrapper}>
        {prefectures.map((prefecture) => (
          <Checkbox
            prefCode={prefecture.prefCode}
            prefName={prefecture.prefName}
            setCheckedPrefCode={setCheckedPrefCode}
            key={prefecture.prefCode}
          />
        ))}
      </div>
      <Chart data={props.data} checkedPrefCode={checkedPrefCode} />
    </>
  );
};

Index.getLayout = (page) => (
  <QueryClientProvider client={queryClient}>
    <Layout>{page}</Layout>
  </QueryClientProvider>
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

const prefectureHeading = {
  paddingLeft: "30px",
  fontSize: "20px",
} as const;

const checkBoxesWrapper = {
  margin: "10px",
  display: "flex",
  flexWrap: "wrap",
  alignItem: "center",
  justifyContent: "center",
} as const;
