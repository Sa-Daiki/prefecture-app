import { QueryKey, useQueries, UseQueryOptions } from "@tanstack/react-query";
import { ApiErrorType } from "@/api/error";

type QueryOptions<T> = Omit<
  UseQueryOptions<T, ApiErrorType, unknown, QueryKey>,
  "initialData"
>;

type Results<T> = {
  data: Array<T | undefined>;
  error: Array<ApiErrorType | null>;
  isLoading: boolean;
};

export const useQueriesWrapper = <T>(
  queries: Array<QueryOptions<T>>
): Results<T> => {
  const results = useQueries({ queries });

  return {
    data: results.map(({ data }) => data),
    error: results.map(({ error }) => error),
    isLoading: results.some((result) => result.isLoading !== null),
  };
};
