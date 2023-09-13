import type { TodoSQL } from '~/types'
import db from '~/db'
import { getAllTodosSQL } from '~/db/todo'

export default defineEventHandler(async (event) => {
  const [res] = await db.query<TodoSQL>(getAllTodosSQL)

  return {
    data: res[0],
    count: res.length,
    status: 'success',
  }
})
