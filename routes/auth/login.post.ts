import db from '~/db'
import { authUserSQL } from '~/db/user'
import type { AuthBody, UserWithPasswordSQL } from '~/types'

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody<AuthBody>(event)

  assertParams({ username, password })

  db
    .query<UserWithPasswordSQL>(authUserSQL, { username, password })
    .then(async ([row]) => {
      const user = row[0]
      if (!user) {
        return createError({
        })
      }

      if (user.password !== password) {
        return createError({
          statusMessage: 'Invalid password',
          statusCode: 401,
        })
      }

      return await userWithToken(user)
    })
    .catch((err) => {
      log(`authUser, ${err.message}`, 'error')

      return createError({
        statusMessage: err.message,
        statusCode: 500,
      })
    })
})
