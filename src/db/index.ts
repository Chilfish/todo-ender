import process from 'node:process'
import { createPool } from 'mysql2'
import { initUserDB } from './user'
import { initTodoDB } from './todo'
import { log } from '~/utils'
import 'dotenv/config'

const {
  MYSQL_PORT = 3306,
  MYSQL_USER = 'root',
  MYSQL_PASS = '123456',
  MYSQL_HOST = 'localhost',
  MYSQL_DB = 'todos',
} = process.env

export const db = createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASS,
  database: MYSQL_DB,
  port: MYSQL_PORT as number,

  namedPlaceholders: true,
})
  .promise()

export async function initDB() {
  try {
    await Promise.all([
      db.query(initUserDB),
      db.query(initTodoDB),
    ])

    log('Database connected')
  }
  catch (error: any) {
    log(`Database connected failed: ${error.message}`, 'error')
  }
}

export async function closeDB() {
  try {
    await db.end()
    log('Database closed')
  }
  catch (error: any) {
    log(`Database closing failed: ${error.message}`, 'error')
  }
}

export default db
