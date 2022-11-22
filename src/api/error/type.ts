type ForbiddenOrNotFoundType = {
  statusCode: "403" | "404";
  message: string;
  description: string;
};

type TooManyRequestType = { message: null };

export type ApiErrorType = {
  statusCode: number;
  message: string;
};

const isNotNullish = (data: unknown): data is Record<string, unknown> =>
  data != null;

export const isForbiddenOrNotFoundType = (
  error: unknown
): error is ForbiddenOrNotFoundType => {
  if (!isNotNullish(error)) return false;

  return (
    typeof error.statusCode === "string" &&
    typeof error.message === "string" &&
    typeof error.description === "string"
  );
};

export const isTooManyRequestType = (
  error: unknown
): error is TooManyRequestType => {
  if (!isNotNullish(error)) return false;

  return typeof error.message === "string";
};

export const isApiError = (error: unknown): error is ApiErrorType => {
  if (!isNotNullish(error)) return false;

  return (
    typeof error.statusCode === "number" && typeof error.message === "string"
  );
};
