import type { NextFunction, Request, Response } from 'express'
import db from '~/db'
import { getUserSQL } from '~/db/user'
import { log, verifyToken } from '~/utils'
import type { UserWithPasswordSQL } from '~/types'

export async function auth(req: Request, res: Response, next: NextFunction) {
  if (req.path.includes('/api/auth'))
    return next()

  const token = req.headers.authorization?.split(' ')[1]
  let uid = 0

  if (!token)
    return res.status(401).json({ message: 'Unauthorized' })

  try {
    const {
      payload: { id },
    } = await verifyToken(token!)
    req.body.uid = id
    uid = id as number
  }
  catch (error: any) {
    log(`auth, ${error.message}`, 'error')
    return res.status(401).json({
      message: 'Unauthorized',
      status: 'error',
    })
  }

  db
    .query<UserWithPasswordSQL>(getUserSQL, [uid])
    .then(([user]) => {
      if (!user.length) {
        return res.status(401).json({
          message: 'Unauthorized',
          status: 'error',
        })
      }

      req.body.uid = user[0].id
      next()
    })
    .catch((err) => {
      log(`auth, ${err.message}`, 'error')
      return res.status(500).json({
        message: err.message,
        status: 'error',
      })
    })
}
