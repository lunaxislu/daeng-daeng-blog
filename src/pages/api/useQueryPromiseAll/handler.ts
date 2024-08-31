import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const animalMedicineAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ANIMAL_MEDICINE}`,
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query_key, api_query } = req.body;
  console.log(query_key, api_query);
  try {
    const result = await animalMedicineAPI(
      `${query_key}${api_query}/1/${500}/01`
    );

    res
      .status(200)
      .send({ data: result.data, query_string: query_key, api_query });
  } catch (err) {
    res.status(500).send(err);
  }
}
