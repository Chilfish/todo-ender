import type { QueryError } from 'mysql2'
import type { ErrorCode } from '.'
import { initTables } from '~/db'

export type DBError = QueryError & {
  cause?: QueryError
}

export async function myErrorHandler(
  error: DBError,
) {
  const code = (error.cause?.code || error.code) as ErrorCode

  try {
    switch (code) {
      case 'ER_NO_SUCH_TABLE':
        return await initTables()

      case 'ER_DUP_ENTRY':
        return createError({
          message: 'already exists',
          statusCode: 409,
        })

      case 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED':
        return createError({
          message: 'Unauthorized',
          statusCode: 401,
        })

      case 'not_admin':
        return createError({
          message: 'You have no permission to do this',
          statusCode: 403,
        })

      default:
        throw error
    }
  }
  catch (err) {
    return createError({
      message: err.message,
      statusCode: err.statusCode || 500,
    })
  }
}
