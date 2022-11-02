/* eslint-disable padding-line-between-statements */
import { GetStaticProps, NextPage } from "next";
import { ApiErrorType } from "@/api/error";
import { fetchPrefectures, PrefecturesType } from "@/api/prefectures";

type PrefecturesProps = { data: PrefecturesType | ApiErrorType };

const Index: NextPage<PrefecturesProps> = (props) => {
  console.log(props);
  return <div />;
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const data = await fetchPrefectures();
    return { props: { data }, revalidate: 6000 };
  } catch (_) {
    return { notFound: true, revalidate: 10 };
  }
};
