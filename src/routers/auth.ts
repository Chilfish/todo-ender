import { type Request, type Response, Router } from 'express'
import type { ResultSetHeader } from 'mysql2/promise'
import db from '~/db'
import { addUserSQL, authUserSQL, getUserSQL } from '~/db/user'
import { userWithToken } from '~/utils/token'
import { assertParams, log } from '~/utils'
import type { UserAuth, UserWithPasswordSQL } from '~/types'

async function authUser(req: Request, res: Response) {
  const { username, password } = req.body as UserAuth

  if (!assertParams({ username, password }, res))
    return

  db
    .query<UserWithPasswordSQL>(authUserSQL, { username, password })
    .then(async ([row]) => {
      const user = row[0]
      if (!user)
        return res.status(404).json({ message: 'User not found' })

      if (user.password !== password)
        return res.status(401).json({ message: 'Invalid password' })

      const data = await userWithToken(user)
      res.json(data)
    })
    .catch((err) => {
      log(`authUser, ${err.message}`, 'error')
      res.status(500).json({
        message: err.message,
        status: 'error',
      })
    })
}

async function register(req: Request, res: Response) {
  const { username, password } = req.body as UserAuth
  if (!assertParams({ username, password }, res))
    return

  db
    .execute<ResultSetHeader>(addUserSQL, { username, password })
    .then(async ([rows]) => {
      const [user] = await db.query<UserWithPasswordSQL>(getUserSQL, { id: rows.insertId })

      const data = await userWithToken(user[0])
      res.json(data)
    })
    .catch((err) => {
      log(`register, ${err.message}`, 'error')
      res.status(500).json({
        message: err.message,
        status: 'error',
      })
    })
}

const authRouter = Router()

authRouter
  .post('/login', authUser)
  .post('/register', register)

export default authRouter
export { authRouter }
