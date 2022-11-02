import {
  ApiErrorType,
  isForbiddenOrNotFoundType,
  isTooManyRequestType,
} from "./type";

export const switchErrorResponse = (
  mayBeError: unknown
): undefined | ApiErrorType => {
  if (isForbiddenOrNotFoundType(mayBeError)) {
    if (mayBeError.statusCode === "403")
      return { statusCode: 403, message: "リトライしてください" };

    if (mayBeError.statusCode === "404")
      return { statusCode: 404, message: "見つかりませんでした" };
  }

  if (isTooManyRequestType(mayBeError))
    return { statusCode: 429, message: "リトライしてください" };

  if (typeof mayBeError === "string") {
    if (mayBeError === "400")
      return { statusCode: 400, message: "アクセスできません" };
    if (mayBeError === "404")
      return { statusCode: 404, message: "見つかりませんでした" };
  }
};
