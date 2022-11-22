import { useQueries } from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import {
  DataType,
  isPopulationCompositionType,
  PopulationCompositionType,
} from "./type";

type FetcherType = {
  error: boolean;
  isLoading: boolean;
  populationCompositionList: Array<DataType[] | undefined>;
};

const queriesFactory = (queryKeys: number[]) => {
  const queries = [];
  for (let i = 0; i < queryKeys.length; i++) {
    const queryKey = queryKeys[i];
    queries.push({
      queryKey: [queryKey],
      queryFn: async () => await fetcher(queryKey.toString()),
      staleTime: Infinity,
    });
  }

  return queries;
};

export const usePopulationComposition = (prefCode: number[]): FetcherType => {
  const queries = queriesFactory(prefCode);
  const results = useQueries({ queries });
  const error = results.some((result) => result.error !== null);
  const isLoading = results.some((result) => result.isLoading !== null);
  const populationCompositionList = results.map((queryResult) => {
    const data = queryResult.data as PopulationCompositionType | undefined;
    // 必要なデータを抽出
    if (data && isPopulationCompositionType(data)) return data.data[0].data;

    return undefined;
  });

  return {
    error,
    isLoading,
    populationCompositionList,
  };
};
