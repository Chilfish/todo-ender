import db from '~/db'
import { getUserSQL } from '~/db/user'
import type { UserSQL } from '~/types'

export default defineEventHandler(async (event) => {
  const authRoutes = ['/todo'].map(route => new RegExp(`^${route}/?.*$`))
  const path = event.path

  const isAuthRoute = authRoutes.some(route => route.test(path))

  if (!isAuthRoute || path === '/')
    return

  const token = getHeader(event, 'Authorization')?.split(' ')?.[1]

  if (!token || token.trim() === '') {
    return createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  const { id } = await verifyToken(token)
  const [res] = await db.query<UserSQL>(getUserSQL, { id })
  const user = res[0]

  event.context = {
    ...event.context,
    uid: user.id,
    level: user.level,
  }
})
