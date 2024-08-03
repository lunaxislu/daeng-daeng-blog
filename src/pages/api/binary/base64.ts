import axios from "axios";
import FormData from "form-data";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body } = req;
  const fileBuffer = base64ToBuffer(body.file);

  const formData = new FormData();
  formData.append("file", fileBuffer);
  formData.append("text", body.text);

  res.send(formData);
}

function base64ToBuffer(base64String: string) {
  const base64Data = base64String.replace(/^data:image\/png;base64,/, "");
  return Buffer.from(base64Data, "base64");
}
