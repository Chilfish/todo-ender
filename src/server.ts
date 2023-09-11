import process from 'node:process'
import { log } from './utils'
import { closeDB, initDB } from './db'
import app from './index'

const {
  PORT = 3000,
} = process.env

app.listen(PORT, async () => {
  await initDB()
  log(`Server is running on http://localhost:${PORT}/`)
})

process.on('SIGINT', async () => {
  await closeDB()
  process.exit(0)
})
