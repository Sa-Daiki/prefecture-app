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

export const isForbiddenOrNotFoundType = (
  error: unknown
): error is ForbiddenOrNotFoundType => {
  const e = error as ForbiddenOrNotFoundType;

  return (
    typeof e.statusCode === "string" &&
    typeof e.message === "string" &&
    typeof e.description === "string"
  );
};

export const isTooManyRequestType = (
  error: unknown
): error is TooManyRequestType => {
  const e = error as TooManyRequestType;

  return typeof e.message === "string";
};
