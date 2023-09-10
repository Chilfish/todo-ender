import { type Request, type Response, Router } from 'express'
import type { ResultSetHeader } from 'mysql2'
import db, { TABLE } from './sql'
import type { Todo, TodoSQL } from './types'

async function getTodos(req: Request, res: Response) {
  db
    .query<TodoSQL>(`SELECT * FROM ${TABLE} ORDER BY id DESC`)
    .then(([rows]) => {
      res.json({
        data: rows,
        count: rows.length,
      })
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({ message: err.message })
    })
}

async function getTodoById(req: Request, res: Response) {
  const id = req.params.id

  const sqlStr = `SELECT * FROM ${TABLE} WHERE id = ${id}`

  db
    .query<TodoSQL>(sqlStr)
    .then(([rows]) => {
      res.json({
        data: rows,
        count: rows.length,
      })
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({ message: err.message })
    })
}

async function addTodo(req: Request, res: Response) {
  const { text } = req.body as Todo

  const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ')

  const sqlStr = `INSERT INTO ${TABLE} (text,completed,created_at) 
    VALUES ('${text}',${false},'${created_at}')`

  db
    .query<ResultSetHeader>(sqlStr)
    .then(([rows]) => {
      res.json(rows)
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({ message: err.message })
    })
}

async function rmTodo(req: Request, res: Response) {
  const id = req.params.id

  const sqlStr = `DELETE FROM ${TABLE} WHERE id = ${id}`

  db
    .query<ResultSetHeader>(sqlStr)
    .then(([rows]) => {
      res.json(rows)
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({ message: err.message })
    })
}

async function upTodo(req: Request, res: Response) {
  const { id, completed, text } = req.body as Todo
  const sqlStr = `UPDATE ${TABLE} SET completed = ${completed}, text = '${text}' WHERE id = ${id}`

  db
    .query<ResultSetHeader>(sqlStr)
    .then(([rows]) => {
      res.json(rows)
    })
    .catch((err) => {
      console.log(err.message)
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
