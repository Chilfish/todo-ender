import type { RowDataPacket } from 'mysql2'

export interface Todo {
  id: number
  text: string
  completed: boolean
  created_at: string
}

export type TodoSQL = Todo[] & RowDataPacket[]
