import db from '~/db'
import { getTodosSQL } from '~/db/todo'
import { log } from '~/utils'
import type { TodoSQL } from '~/types'

export default defineEventHandler(async (event) => {
  const uid = event.context.uid as number
  assertParams({ uid })

  db
    .query<TodoSQL>(getTodosSQL, { uid })
    .then(([rows]) => {
      return {
        data: rows,
        count: rows.length,
        status: 'success',
      }
    })
    .catch((err) => {
      log(`at getTodos, ${err.message}`, 'error')

      return createError({
        statusMessage: err.message,
        statusCode: 500,
      })
    })
})
