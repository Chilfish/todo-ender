import type { ResultSetHeader } from 'mysql2'
import db from '~/db'
import { rmTodoSQL } from '~/db/todo'

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event) as { id: number }
  const uid = event.context.uid as number

  assertParams({ id })

  const [res] = await db.query<ResultSetHeader>(rmTodoSQL, { id, uid })

  const affected = res.affectedRows
  return {
    status: affected ? 'success' : 'fail',
    data: affected,
  }
})
