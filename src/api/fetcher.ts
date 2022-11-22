import { frontendApiClient } from "@/lib/ky";

export const fetcher = async <T>(prefCode: string): Promise<T> => {
  const response = await frontendApiClient.get(
    "population/composition/perYear?" +
      new URLSearchParams({ prefCode }).toString()
  );
  const data = (await response.json()) as T;

  return data;
};
