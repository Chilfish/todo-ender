import process from 'node:process'
import 'dotenv/config'
import { createPool } from 'mysql2'
import { log } from './utils'

const {
  MYSQL_PORT = 3306,
  MYSQL_USER = 'root',
  MYSQL_PASS = '123456',
  MYSQL_HOST = 'localhost',
  MYSQL_DB = 'todos',
} = process.env

export const TABLE = 'todos'

const initDB = `CREATE TABLE IF NOT EXISTS ${TABLE} (
  id INT NOT NULL AUTO_INCREMENT,
  text VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`

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
  .query(initDB)
  .then(() => {
    log('database connect success')
  })
  .catch((err) => {
    log(`database connect fail: ${err.message}`, 'error')
  })

export default db
