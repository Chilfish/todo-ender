import type { VercelRequest, VercelResponse } from '@vercel/node'
import { add } from './_utils.js'

export default function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  res.status(200).json({ result: add(1, 2) })
}

