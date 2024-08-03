import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { body } = req;

    const token = jwt.sign({ email: body.email }, "secret", {
      expiresIn: "60h",
    });

    console.log(jwt.verify(token, "secret"));
    const { data } = await axios.post("http://localhost:4000/users", {
      ...body,
      token,
    });

    res.status(200).send({ data });
  } catch (err) {
    res.status(500).send("에러임");
  }
}
