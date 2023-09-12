import type { QueryError } from 'mysql2'
import { initDB } from '~/db'

export async function dbErrorHandler(
  error: QueryError,
) {
  try {
    if (error.code === 'ER_NO_SUCH_TABLE')
      await initDB()
  }
  catch (err) {
    return createError({
      message: err.message,
      statusCode: 500,
    })
  }
}
