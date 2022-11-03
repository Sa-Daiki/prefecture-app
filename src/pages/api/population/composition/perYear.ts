/* eslint-disable padding-line-between-statements */
import { NextApiHandler } from "next";
import { ApiErrorType, isApiError, switchErrorResponse } from "@/api/error";
import { API_KEY } from "@/api/key";
import { PopulationCompositionType } from "@/api/population/usePopulationComposition";
import { backendApiClient } from "@/lib/ky";

const fetchPopulationCompositionPerYear = async (
  prefCode: string
): Promise<PopulationCompositionType | ApiErrorType> => {
  const response = await backendApiClient
    .get(
      "population/composition/perYear?" +
        new URLSearchParams({ prefCode, cityCode: "-" }).toString(),
      {
        headers: { "X-API-KEY": API_KEY },
      }
    )
    .json<PopulationCompositionType | ApiErrorType>();
  const error = switchErrorResponse(response);
  if (!error) return response;

  return error;
};

const handler: NextApiHandler = async (req, res) => {
  if (typeof req.query.prefCode !== "string") {
    return res.status(500).json({ message: "Invalid Type" });
  }
  const { prefCode } = req.query;
  try {
    const response = await fetchPopulationCompositionPerYear(prefCode);
    if (isApiError(response)) {
      res.status(response.statusCode).json({ message: response.message });
      return;
    }
    res.status(200).json(response);
  } catch (_) {
    return res.status(500).json({ message: "Unexpected Error Occurred" });
  }
};

export default handler;
