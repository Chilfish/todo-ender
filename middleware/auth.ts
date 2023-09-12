export default defineEventHandler(async (event) => {
  if (getRequestURL(event).toString().includes('auth'))
    return

  const token = getHeader(event, 'Authorization').trim().split(' ')[1]

  if (token === 'undefined' || '') {
    return createError({
      statusMessage: 'Unauthorized',
      statusCode: 401,
    })
  }

  try {
    const { id } = await verifyToken(token)
    event.context.uid = id
  }
  catch (error) {
    return createError({
      statusMessage: 'Unauthorized',
      statusCode: 401,
    })
  }
})
