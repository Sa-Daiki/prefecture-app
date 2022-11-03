import { Dispatch, SetStateAction, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { ApiErrorType } from "../error";

export type PopulationCompositionType = {
  message: null;
  result: {
    boundaryYear: number;
    data: Array<{
      label: string;
      data: Array<{
        year: number;
        value: number;
        rate?: number;
      }>;
    }>;
  };
};

export type FetcherType = {
  data?: PopulationCompositionType;
  error?: ApiErrorType;
  isLoading: boolean;
  setShouldFetch: Dispatch<SetStateAction<boolean>>;
};

export const usePopulationComposition = (prefCode: number): FetcherType => {
  const [shouldFetch, setShouldFetch] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error } = useSWRImmutable<
    PopulationCompositionType,
    ApiErrorType
  >(
    shouldFetch
      ? "population/composition/perYear?" +
          new URLSearchParams({
            prefCode: prefCode.toString(),
          }).toString()
      : null
  );

  return {
    data,
    error,
    isLoading: !error && !data,
    setShouldFetch,
  };
};
