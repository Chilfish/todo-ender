import type { ResultSetHeader } from 'mysql2/promise'
import type { Todo } from '~/types'
import db from '~/db'
import { upTodoSQL } from '~/db/todo'

export default defineEventHandler(async (event) => {
  const { id, completed, text } = await readBody(event) as Todo
  const uid = event.context.uid as number

  const _status = assertParams({ text, completed, id })
  if (_status)
    return _status

  db
    .query<ResultSetHeader>(upTodoSQL, { id, completed, text, uid })
    .then(([rows]) => {
      const affected = rows.affectedRows
      return {
        status: affected ? 'success' : 'fail',
        data: affected,
      }
    })
    .catch((err) => {
      log(`at upTodo, ${err.message}`, 'error')
      return createError({
        statusMessage: err.message,
        statusCode: 500,
      })
    })
})
