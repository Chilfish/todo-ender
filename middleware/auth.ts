import db from '~/db'
import { getUserSQL } from '~/db/user'
import { MyError } from '~/error'
import type { UserSQL } from '~/types'

export default defineEventHandler(async (event) => {
  const authRoutes = ['/todo', '/user']
    .map(route => new RegExp(`^${route}/?.*$`))

  const adminRoutes = ['/user', '/todo/all']
    .map(route => new RegExp(`^${route}/?.*$`))

  const path = event.path

  const isAuthRoute = authRoutes.some(route => route.test(path))
  const isAdminRoute = adminRoutes.some(route => route.test(path))

  if (!isAuthRoute || path === '/')
    return

  const token = getHeader(event, 'Authorization')?.split(' ')?.[1] || ''

  const { id } = await verifyToken(token)
  const [res] = await db.query<UserSQL>(getUserSQL, { id })
  const user = res[0]

  if (isAdminRoute && user.level !== 'admin')
    throw new MyError({ code: 'not_admin' })

  event.context = {
    ...event.context,
    uid: user.id,
    level: user.level,
  }
})
