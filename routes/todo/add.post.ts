import type { ResultSetHeader } from 'mysql2'
import type { TodoSQL } from '~/types'
import db from '~/db'
import { addTodoSQL, getTodoSQL } from '~/db/todo'

export default defineEventHandler(async (event) => {
  const { text } = await readBody(event) as { text: string }
  const uid = event.context.uid as number

  assertParams({ text })

  const [res] = await db.query<ResultSetHeader>(addTodoSQL, { text, uid })
  const [todo] = await db.query<TodoSQL>(getTodoSQL, { id: res.insertId, uid })

  return {
    status: 'success',
    data: todo[0],
  }
})
