import process from 'node:process'
import { createPool } from 'mysql2'
import { initDB as initTodo } from './todo'
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

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})
  .promise()

db
  .query(initTodo)
  .then(() => {
    log('database connect success')
  })
  .catch((err) => {
    log(`database connect fail: ${err.message}`, 'error')
  })

export default db
