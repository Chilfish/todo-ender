import type { Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { todoRouter } from './routers'

const app = express()
app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static('public'))

app
  .get('/', (req: Request, res: Response) => {
    res.send('hello world')
  })
  .get('/api', (req: Request, res: Response) => {
    res.json({ message: 'hello api' })
  })
  .use('/api/todos', todoRouter)

export default app
