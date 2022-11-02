import { ApiErrorType, switchErrorResponse } from "../error";
import { API_KEY } from "../key";
import { PrefecturesType } from "./type";
import { backendApiClient } from "@/lib/ky";

export const fetchPrefectures = async (): Promise<
  PrefecturesType | ApiErrorType
> => {
  const response = await backendApiClient
    .get("prefectures", {
      headers: { "X-API-KEY": API_KEY },
    })
    .json<PrefecturesType | ApiErrorType>();
  console.log(response);
  const error = switchErrorResponse(response);
  if (!error) return response;

  return error;
};
