import type { ResultSetHeader } from 'mysql2'
import type { TodoSQL } from '~/types'
import db from '~/db'
import { addTodoSQL, getTodoSQL } from '~/db/todo'

export default defineEventHandler(async (event) => {
  const { text } = await readBody(event) as { text: string }
  const uid = event.context.uid as number

  const _status = assertParams({ text })
  if (_status)
    return _status

  db
    .query<ResultSetHeader>(addTodoSQL, { text, uid })
    .then(async ([rows]) => {
      const [todo] = await db.query<TodoSQL>(getTodoSQL, { id: rows.insertId, uid })
      return {
        status: 'success',
        data: todo[0],
      }
    })
    .catch((err) => {
      log(`at addTodo, ${err.message}`, 'error')

      return createError({
        statusMessage: err.message,
        statusCode: 500,
      })
    })
})
