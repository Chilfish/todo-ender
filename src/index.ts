import process from 'node:process'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import todoRouter from './router'

const {
  PORT = 3000,
} = process.env

const app = express()
app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static('public'))

app
  .get('/', (req, res) => {
    res.send('Hello World!')
  })
  .get('/api', (req, res) => {
    res.json({ message: 'hello api' })
  })
  .use('/api/todos', todoRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`)
})
