import db from '~/db'
import { getTodosSQL } from '~/db/todo'
import type { TodoSQL } from '~/types'

export default defineEventHandler(async (event) => {
  const uid = event.context.uid as number

  const [res] = await db.query<TodoSQL>(getTodosSQL, { uid })
  return {
    data: res,
    count: res.length,
    status: 'success',
  }
})
