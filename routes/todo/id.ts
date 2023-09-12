import type { TodoSQL } from '~/types'
import db from '~/db'
import { getTodoSQL } from '~/db/todo'

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event) as { id: string }
  const uid = event.context.uid

  const _status = assertParams({ id })
  if (_status)
    return _status

  try {
    const [res] = await db.query<TodoSQL>(getTodoSQL, { id, uid })

    return {
      data: res[0],
      count: res.length,
      status: 'success',
    }
  }
  catch (error) {
    await dbErrorHandler(error)
  }
})
