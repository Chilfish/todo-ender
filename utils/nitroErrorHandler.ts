import type { NitroErrorHandler } from 'nitropack'

export default <NitroErrorHandler> function (error, event) {
  const res = event.node.res
  res.setHeader('Content-Type', 'application/json')
  const { cause, ...err } = error

  res.end(JSON.stringify({
    ...err,
  }))
}
