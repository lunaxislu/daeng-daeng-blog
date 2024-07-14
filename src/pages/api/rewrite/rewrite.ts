import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const originalUrl = req.url;
  const resolvedUrl = req.headers["x-forwarded-url"] || originalUrl;
  // console.log(req.query, "reolved");
  // console.log("Original URL: ", originalUrl);
  console.log(res);
  res.status(200).json({ originalUrl, resolvedUrl });
}
