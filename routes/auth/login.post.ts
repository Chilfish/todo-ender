import db from '~/db'
import { authUserSQL } from '~/db/user'
import type { AuthBody, UserWithPasswordSQL } from '~/types'

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody<AuthBody>(event)

  assertParams({ username, password })

  const [res] = await db.query<UserWithPasswordSQL>(authUserSQL, { username, password })
  const user = res[0]

  if (!user) {
    return createError({
      statusMessage: 'Invalid username or password',
      statusCode: 401,
    })
  }

  return await userWithToken(user)
})
