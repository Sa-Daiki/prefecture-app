import { ApiErrorType, switchErrorResponse } from "./error";
import { frontendApiClient } from "@/lib/ky";

export const fetcher = async (
  prefCode: string
): Promise<ApiErrorType | unknown> => {
  const response = await frontendApiClient.get(
    "population/composition/perYear?" +
      new URLSearchParams({ prefCode }).toString()
  );
  const data = await response.json();
  const error = switchErrorResponse(data);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (!error) return data;

  return error;
};
