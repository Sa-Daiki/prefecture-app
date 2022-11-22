import { ApiErrorType, switchErrorResponse } from "../error";
import { API_KEY } from "../key";
import { PopulationCompositionType } from "./type";
import { backendApiClient } from "@/lib/ky";

type ResultType = { message: null; result: PopulationCompositionType };

export const fetchPopulationCompositionPerYear = async (
  prefCode: string
): Promise<PopulationCompositionType | ApiErrorType> => {
  const URL =
    "population/composition/perYear?" +
    new URLSearchParams({ prefCode, cityCode: "-" }).toString();
  const response = await backendApiClient
    .get(URL, { headers: { "X-API-KEY": API_KEY } })
    .json<ResultType | ApiErrorType>();
  const error = switchErrorResponse(response);
  if (!error) {
    const { message: _, ...rest } = response as ResultType;

    return rest.result;
  }

  return error;
};
