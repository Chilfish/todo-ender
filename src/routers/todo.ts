import { type Request, type Response, Router } from 'express'
import type { ResultSetHeader } from 'mysql2'
import type { Todo, TodoSQL } from '~/types'
import db from '~/db'
import { assertParams, log } from '~/utils'
import { addTodoSQL, getTodoSQL, getTodosSQL, rmTodoSQL, upTodoSQL } from '~/db/todo'

async function getTodos(req: Request, res: Response) {
  db
    .query<TodoSQL>(getTodosSQL)
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

  if (!assertParams({ id }, res))
    return

  db
    .query<TodoSQL>(getTodoSQL, [id])
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
  if (!assertParams({ text }, res))
    return

  db
    .query<ResultSetHeader>(addTodoSQL, [text])
    .then(async ([rows]) => {
      const [todo] = await db.query<TodoSQL>(getTodoSQL, [rows.insertId])
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

  if (!assertParams({ id }, res))
    return

  db
    .query<ResultSetHeader>(rmTodoSQL, [id])
    .then(([rows]) => {
      res.json({
        status: 'success',
        data: rows.affectedRows,
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
  if (!assertParams({ id, completed, text }, res))
    return

  db
    .query<ResultSetHeader>(upTodoSQL, [id, completed, text])
    .then(([rows]) => {
      res.json({
        status: 'success',
        data: rows.affectedRows,
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
