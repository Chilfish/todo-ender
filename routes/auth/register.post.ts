import type { ResultSetHeader } from 'mysql2/promise'
import type { AuthBody, UserWithPasswordSQL } from '~/types'
import { addUserSQL, getUserSQL } from '~/db/user'
import db from '~/db'

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody<AuthBody>(event)

  assertParams({ username, password })

  const [res] = await db.query<ResultSetHeader>(addUserSQL, { username, password })
  const [user] = await db.query<UserWithPasswordSQL>(getUserSQL, { id: res.insertId })

  return await userWithToken(user[0])
})
