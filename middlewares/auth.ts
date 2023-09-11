import { verifyToken } from '~/utils'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'Bearer')

  if (!token) {
    return createError({
      statusMessage: 'Unauthorized',
      statusCode: 401,
    })
  }

  try {
    const { id } = await verifyToken(token!)
    event.context.uid = id
  }
  catch (error: any) {
    return createError({
      statusMessage: 'Unauthorized',
      statusCode: 401,
    })
  }
})
