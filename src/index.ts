import express from 'express'
import { sum } from 'lodash-es'

const app = express()

interface User {
  name: string
  age: number
}

app.get('/', (req, res) => {
  res.send(`1 + 1 = ${sum([1, 1])}`)
})

app.get('/hello', (req, res) => {
  const { name, age } = req.query as unknown as User

  res.json({ name, age })
})

app.listen(3003, () => {
  console.log('Server is listening on port 3003')
})
