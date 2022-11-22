import { useMemo } from "react";
import { ApiErrorType } from "../error";
import { fetcher } from "../fetcher";
import { DataType, PopulationCompositionType } from "./type";
import { useQueriesWrapper } from "@/lib/react-query";

type FetcherType = {
  error: Array<ApiErrorType | null>;
  isLoading: boolean;
  populationCompositionList: Array<DataType[] | undefined>;
};

const queriesFactory = (queryKeys: number[]) => {
  const queries = [];
  for (let i = 0; i < queryKeys.length; i++) {
    const queryKey = queryKeys[i];
    queries.push({
      queryKey: [queryKey],
      queryFn: async () =>
        await fetcher<PopulationCompositionType>(queryKey.toString()),
      staleTime: Infinity,
    });
  }

  return queries;
};

export const usePopulationComposition = (
  prefCodeList: number[]
): FetcherType => {
  const queries = queriesFactory(prefCodeList);

  const { data, error, isLoading } = useQueriesWrapper(queries);
  const populationCompositionList = useMemo(
    () => data.map((data) => data?.data[0].data),
    [data]
  );

  return {
    error,
    isLoading,
    populationCompositionList,
  };
};
