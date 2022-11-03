import { ApiErrorType, switchErrorResponse } from "./error";
import { frontendApiClient } from "@/lib/ky";

export const fetcher = async (key: string): Promise<ApiErrorType | unknown> => {
  const response = await frontendApiClient.get(key);
  const data = await response.json();
  const error = switchErrorResponse(data);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (!error) return data;

  return error;
};
