import { QueryClient } from "@tanstack/react-query";
import { isApiError } from "@/api/error";

const queryErrorBoundary = (error: unknown): boolean => {
  if (isApiError(error)) return error.statusCode >= 500;

  return false;
};

const queryConfig = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false,
    useErrorBoundary: queryErrorBoundary,
    cacheTime: 30000,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
