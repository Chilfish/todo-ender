import db from '~/db'
import { authUserSQL } from '~/db/user'
import type { AuthBody, UserWithPasswordSQL } from '~/types'

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody<AuthBody>(event)

  const _status = assertParams({ username, password })
  if (_status)
    return _status

  try {
    const [res] = await db.query<UserWithPasswordSQL>(authUserSQL, { username, password })
    const user = res[0]

    if (!user) {
      return createError({
        statusMessage: 'Invalid username',
        statusCode: 401,
      })
    }

    if (user.password !== password) {
      return createError({
        statusMessage: 'Invalid password',
        statusCode: 401,
      })
    }

    return await userWithToken(user)
  }
  catch (error) {
    await dbErrorHandler(error)
  }
})
