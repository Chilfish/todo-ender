import type { Response } from 'express'

export * from './token'
export * from './keys'

export function log(
  message: string | Record<string, unknown>,
  type: 'info' | 'warn' | 'error' = 'info',
) {
  const date = new Date().toLocaleString().split(' ')[1]

  if (typeof message === 'object')
    console.log(`${type}, [${date}]:`, message)
  else
    console.log(`${type}, [${date}]: ${message}`)
}

/**
 * assert if these's any value in the object is undefined
 */
export function hasUndefined(obj: Record<string, unknown>) {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (value === undefined)
        return key
      return null
    }).filter((e): e is string => e !== null)
}

export function assertParams(
  params: Record<string, unknown>,
  res: Response,
) {
  const paramsStatus = hasUndefined(params)
  if (paramsStatus.length > 0) {
    res.status(400).json({
      status: 'error',
      message: `Missing params: ${paramsStatus.join(', ')}`,
    })
    return false
  }

  return true
}
