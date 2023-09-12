import type { ResultSetHeader } from 'mysql2/promise'
import type { AuthBody, UserWithPasswordSQL } from '~/types'
import { addUserSQL, getUserSQL } from '~/db/user'
import db from '~/db'

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody<AuthBody>(event)
  assertParams({ username, password })

  db
    .execute<ResultSetHeader>(addUserSQL, { username, password })
    .then(async ([rows]) => {
      const [user] = await db.query<UserWithPasswordSQL>(getUserSQL, { id: rows.insertId })

      const data = await userWithToken(user[0])
      return data
    })
    .catch((err) => {
      log(`register, ${err.message}`, 'error')

      return createError({
        statusMessage: err.message,
        statusCode: 500,
      })
    })
})
