/* eslint-disable padding-line-between-statements */
import { NextApiHandler } from "next";
import { isApiError } from "@/api/error";
import { fetchPopulationCompositionPerYear } from "@/api/population/populationCompositionPerYear";

const handler: NextApiHandler = async (req, res) => {
  if (typeof req.query.prefCode !== "string") {
    return res.status(500).json({ message: "Invalid Type" });
  }
  const { prefCode } = req.query;
  res.setHeader("Access-Control-Allow-Origin", "*");
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
