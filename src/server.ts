import process from 'node:process'
import { log } from './utils'
import app from './index'

const {
  PORT = 3000,
} = process.env

app.listen(PORT, () => {
  log(`Server is running on http://localhost:${PORT}/`)
})
