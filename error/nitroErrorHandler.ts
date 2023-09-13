import type { NitroErrorHandler } from 'nitropack'
import { type DBError, myErrorHandler } from './errorHandler'

export default <NitroErrorHandler> async function (error, event) {
  const err = await myErrorHandler(error as unknown as DBError)

  const res = event.node.res
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = err.statusCode

  res.end(JSON.stringify(err.cause))
}
