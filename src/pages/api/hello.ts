// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { resolveObjectURL } from 'buffer'
type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log(req.body)
  req.on('data', (chunk) => {
    console.log(chunk, 'asidjfijsdfi')
  })
  req.on('end', () => {
    res.send({ name: 'asdf' })
  })
}
