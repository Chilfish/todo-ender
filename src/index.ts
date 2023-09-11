import type { Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { authRouter, todoRouter } from './routers'
import { auth } from './middlewares'

const app = express()
app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static('public'))

app
  .get('/', (req: Request, res: Response) => {
    res.json({ message: 'hello api' })
  })
  .use('/', auth)
  .use('/todos', todoRouter)
  .use('/auth', authRouter)

export default app
