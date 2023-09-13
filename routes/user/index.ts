import db from '~/db'
import { getUsersSQL } from '~/db/user'
import type { UserSQL } from '~/types'

export default defineEventHandler(async (event) => {
  const [res] = await db.query<UserSQL>(getUsersSQL)

  return {
    data: res,
    count: res.length,
    status: 'success',
  }
})
