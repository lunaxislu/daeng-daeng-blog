import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { body } = req;

    const token = jwt.sign(body.email, "secret");

    console.log(token);
    const { data } = await axios.post("http://localhost:4000/users", {
      ...body,
      token,
    });

    res.status(200).send({ data });
  } catch (err) {
    res.status(500).send("에러임");
  }
}
