import type { RowDataPacket } from 'mysql2/promise'

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

export type UserLevel = 'admin' | 'user'

export interface User {
  id: number
  username: string
  deleted: boolean
  deleted_at: string
  created_at: string
  updated_at: string
  level: UserLevel
}

export interface UserWithPassword extends User {
  password: string
}

export interface UserAuth {
  username: string
  password: string
}

export type UserSQL = User[] & RowDataPacket[]

export type UserWithPasswordSQL = UserWithPassword[] & RowDataPacket[]

export interface AuthBody {
  username: string
  password: string
}
