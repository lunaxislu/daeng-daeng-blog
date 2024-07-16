import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const animalMedicineAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ANIMAL_MEDICINE}`,
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await animalMedicineAPI("LOCALDATA_020301_DB/1/10");
    console.log(result);
    res.status(200).send({ data: result.data });
  } catch (err) {
    res.status(500).send(err);
  }
}
