import db from '~/db'
import { getUserSQL } from '~/db/user'
import type { UserSQL } from '~/types'

export default defineEventHandler(async (event) => {
  const authReg = ['/todo']
  const path = event.path

  if (!authReg.some(reg => reg.split('/').includes(path.split('/')[1])))
    return

  const token = getHeader(event, 'Authorization')?.split(' ')?.[1]

  const { id } = await verifyToken(token)
  const [res] = await db.query<UserSQL>(getUserSQL, { id })
  const user = res[0]

  event.context = {
    ...event.context,
    uid: user.id,
    level: user.level,
  }
})
