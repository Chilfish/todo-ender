import process from 'node:process'
import dotenv from 'dotenv'
import { createPool } from 'mysql2'
import { initUserDB } from './user'
import { initTodoDB } from './todo'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const {
  MYSQL_PORT = 3306,
  MYSQL_USER = 'root',
  MYSQL_PASS = '123456',
  MYSQL_HOST = 'localhost',
  MYSQL_DB = 'todos',
  MYSQL_SSL = 'false',
} = process.env

const ssl = MYSQL_SSL === 'true'
  ? {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
    }
  : undefined

export const db = createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASS,
  database: MYSQL_DB,
  port: Number(MYSQL_PORT),

  namedPlaceholders: true,
  ssl,
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
