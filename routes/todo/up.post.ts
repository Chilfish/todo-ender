import type { ResultSetHeader } from 'mysql2/promise'
import type { Todo } from '~/types'
import db from '~/db'
import { upTodoSQL } from '~/db/todo'

export default defineEventHandler(async (event) => {
  const { id, completed, text } = await readBody(event) as Todo
  const uid = event.context.uid as number

  assertParams({ text, completed, id })

  const [res] = await db.query<ResultSetHeader>(upTodoSQL, { id, completed, text, uid })

  const affected = res.affectedRows
  return {
    status: affected ? 'success' : 'fail',
    data: affected,
  }
})
