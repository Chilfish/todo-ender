import type { ResultSetHeader } from 'mysql2'
import db from '~/db'
import { rmTodoSQL } from '~/db/todo'

export default defineEventHandler(async (event) => {
  const id = await readBody(event) as { id: number }
  const uid = event.context.uid as number

  const _status = assertParams({ id })
  if (_status)
    return _status

  db
    .query<ResultSetHeader>(rmTodoSQL, { id, uid })
    .then(([rows]) => {
      const affected = rows.affectedRows
      return {
        status: affected ? 'success' : 'fail',
        data: affected,
      }
    })
    .catch((err) => {
      log(`at rmTodo, ${err.message}`, 'error')
      return createError({
        statusMessage: err.message,
        statusCode: 500,
      })
    })
})
