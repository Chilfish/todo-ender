import type { RowDataPacket } from 'mysql2'

export interface Todo {
  id: number
  text: string
  completed: boolean
  deleted: boolean
  deleted_at: string
  created_at: string
  updated_at: string
}

export type TodoSQL = Todo[] & RowDataPacket[]
