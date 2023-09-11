import { type Request, type Response, Router } from 'express'
import type { ResultSetHeader } from 'mysql2/promise'
import type { Todo, TodoSQL } from '~/types'
import db from '~/db'
import { assertParams, log } from '~/utils'
import { addTodoSQL, getTodoSQL, getTodosSQL, rmTodoSQL, upTodoSQL } from '~/db/todo'

async function getTodos(req: Request, res: Response) {
  const uid = req.body.uid as number
  db
    .query<TodoSQL>(getTodosSQL, { uid })
    .then(([rows]) => {
      res.json({
        data: rows,
        count: rows.length,
        status: 'success',
      })
    })
    .catch((err) => {
      log(`at getTodos, ${err.message}`, 'error')
      res.status(500).json({
        message: err.message,
        status: 'error',
      })
    })
}

async function getTodoById(req: Request, res: Response) {
  const id = req.params.id
  const uid = req.body.uid as number

  if (!assertParams({ id }, res))
    return

  db
    .query<TodoSQL>(getTodoSQL, { id, uid })
    .then(([rows]) => {
      res.json({
        data: rows[0],
        count: rows.length,
        status: 'success',
      })
    })
    .catch((err) => {
      log(`at getTodoById, ${err.message}`, 'error')
      res.status(500).json({
        message: err.message,
        status: 'error',
      })
    })
}

async function addTodo(req: Request, res: Response) {
  const { text } = req.body as Todo
  const uid = req.body.uid as number

  if (!assertParams({ text }, res))
    return

  db
    .query<ResultSetHeader>(addTodoSQL, { text, uid })
    .then(async ([rows]) => {
      const [todo] = await db.query<TodoSQL>(getTodoSQL, { id: rows.insertId, uid })
      res.json({
        status: 'success',
        data: todo[0],
      })
    })
    .catch((err) => {
      log(`at addTodo, ${err.message}`, 'error')
      res.status(500).json({
        message: err.message,
        status: 'error',
      })
    })
}

async function rmTodo(req: Request, res: Response) {
  const id = req.body.id
  const uid = req.body.uid as number

  if (!assertParams({ id }, res))
    return

  db
    .query<ResultSetHeader>(rmTodoSQL, { id, uid })
    .then(([rows]) => {
      const affected = rows.affectedRows
      res.json({
        status: affected ? 'success' : 'fail',
        data: affected,
      })
    })
    .catch((err) => {
      log(`at rmTodo, ${err.message}`, 'error')
      res.status(500).json({
        message: err.message,
        status: 'error',
      })
    })
}

async function upTodo(req: Request, res: Response) {
  const { id, completed, text } = req.body as Todo
  const uid = req.body.uid as number

  if (!assertParams({ id, completed, text }, res))
    return

  db
    .query<ResultSetHeader>(upTodoSQL, { id, completed, text, uid })
    .then(([rows]) => {
      const affected = rows.affectedRows
      res.json({
        status: affected ? 'success' : 'fail',
        data: affected,
      })
    })
    .catch((err) => {
      log(`at upTodo, ${err.message}`, 'error')
      res.status(500).json({
        message: err.message,
        status: 'error',
      })
    })
}

const todoRouter = Router()

todoRouter
  .get('/', getTodos)
  .get('/:id', getTodoById)
  .post('/add', addTodo)
  .post('/rm', rmTodo)
  .post('/up', upTodo)

export { todoRouter }
export default todoRouter
