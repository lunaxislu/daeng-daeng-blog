import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const animalMedicineAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ANIMAL_MEDICINE}`,
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { api_type, query_type, area, endRange } = req.body;
  console.log("🚀 ~ body:", req.body);

  try {
    const result = await animalMedicineAPI(
      `${query_type}${area}/1/${endRange}/01`
    );
    console.log(result);
    res.setHeader("Cache-Control", "max-age=3600");
    res.status(200).send({ data: result.data, query_string: query_type, area });
  } catch (err) {
    res.status(500).send(err);
  }
}
