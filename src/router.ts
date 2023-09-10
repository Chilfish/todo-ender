import { type Request, type Response, Router } from 'express'
import type { ResultSetHeader } from 'mysql2'
import db, { TABLE } from './sql'
import type { Todo, TodoSQL } from './types'
import { assertParams, log } from './utils'

async function getTodos(req: Request, res: Response) {
  db
    .query<TodoSQL>(`SELECT * FROM ${TABLE} ORDER BY updated_at DESC`)
    .then(([rows]) => {
      res.json({
        data: rows,
        count: rows.length,
        status: 'success',
      })
    })
    .catch((err) => {
      log(`${err.message}`, 'error')
      res.status(500).json({ message: err.message })
    })
}

async function getTodoById(req: Request, res: Response) {
  const id = req.params.id

  if (!assertParams({ id }, res))
    return

  const sqlStr = `SELECT * FROM ${TABLE} WHERE id = ${id}`

  db
    .query<TodoSQL>(sqlStr)
    .then(([rows]) => {
      res.json({
        data: rows,
        count: rows.length,
        status: 'success',
      })
    })
    .catch((err) => {
      log(`${err.message}, SQL: ${sqlStr}`, 'error')
      res.status(500).json({ message: err.message })
    })
}

async function addTodo(req: Request, res: Response) {
  const { text } = req.body as Todo
  if (!assertParams({ text }, res))
    return

  const sqlStr = `INSERT INTO ${TABLE} (text) VALUES ('${text}')`

  db
    .query<ResultSetHeader>(sqlStr)
    .then(([rows]) => {
      res.json({
        status: 'success',
        data: rows.affectedRows,
      })
    })
    .catch((err) => {
      log(`${err.message}, SQL: ${sqlStr}`, 'error')
      res.status(500).json({ message: err.message })
    })
}

async function rmTodo(req: Request, res: Response) {
  const id = req.params.id

  if (!assertParams({ id }, res))
    return

  const sqlStr = `DELETE FROM ${TABLE} WHERE id = ${id}`

  db
    .query<ResultSetHeader>(sqlStr)
    .then(([rows]) => {
      res.json({
        status: 'success',
        data: rows.affectedRows,
      })
    })
    .catch((err) => {
      log(`${err.message}, SQL: ${sqlStr}`, 'error')
      res.status(500).json({ message: err.message })
    })
}

async function upTodo(req: Request, res: Response) {
  const { id, completed, text } = req.body as Todo
  if (!assertParams({ id, completed, text }, res))
    return

  const sqlStr = `UPDATE ${TABLE} SET completed = ${completed}, text = '${text}' WHERE id = ${id}`

  db
    .query<ResultSetHeader>(sqlStr)
    .then(([rows]) => {
      res.json({
        status: 'success',
        data: rows.affectedRows,
      })
    })
    .catch((err) => {
      log(`${err.message}, SQL: ${sqlStr}`, 'error')
      res.status(500).json({ message: err.message })
    })
}

const todoRouter = Router()

todoRouter
  .get('/', getTodos)
  .get('/:id', getTodoById)
  .post('/add', addTodo)
  .post('/rm', rmTodo)
  .post('/up', upTodo)

export default todoRouter
