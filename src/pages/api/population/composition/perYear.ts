import { NextApiHandler } from "next";
import { isApiError } from "@/api/error";
import { fetchPopulationCompositionPerYear } from "@/api/population/populationCompositionPerYear";

const handler: NextApiHandler = async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
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
