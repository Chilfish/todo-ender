import type { TodoSQL } from '~/types'
import db from '~/db'
import { getTodoSQL } from '~/db/todo'
import { assertParams, log } from '~/utils'

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event) as { id: string }
  const uid = event.context.uid

  assertParams({ id })

  db
    .query<TodoSQL>(getTodoSQL, { id, uid })
    .then(([rows]) => {
      return {
        data: rows[0],
        count: rows.length,
        status: 'success',
      }
    })
    .catch((err) => {
      log(`at getTodoById, ${err.message}`, 'error')

      return createError({
        statusMessage: err.message,
        statusCode: 500,
      })
    })
})
