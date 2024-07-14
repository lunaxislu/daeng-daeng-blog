import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

// const animalHospitalAPI = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_ANIMAL_HOSPITAL}`,
// });

// const animalPharamcyAPI = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_ANIMAL_PHARAMCY}`,
// });
const animalHospitalAPI = axios.create({});

const animalPharamcyAPI = axios.create({});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { api_type, query_type, area, endRange } = req.body;
  console.log("🚀 ~ body:", req.body);

  const api_fn = {
    animal_hospital: animalHospitalAPI,
    animal_pharmacy: animalPharamcyAPI,
  };
  try {
    const result = await api_fn[
      api_type as "animal_hospital" | "animal_pharmacy"
    ](`${query_type}${area}/1/${endRange}/01`);
    console.log(result);
    res.status(200).send({ data: result.data, query_string: query_type, area });
  } catch (err) {
    res.status(500).send(err);
  }
}
