import type { RowDataPacket } from 'mysql2/promise'

export type UserLevel = 'admin' | 'user'

export type uid = number

export interface User {
  id: uid
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
