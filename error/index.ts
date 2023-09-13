import { H3Error } from 'h3'

// the handled error codes
const errorCodes = [
  'not_admin',

  // mysql2 error codes
  'ER_NO_SUCH_TABLE',
  'ER_DUP_ENTRY',

  // jose error codes
  'ERR_JWS_SIGNATURE_VERIFICATION_FAILED',
] as const

export type ErrorCode = typeof errorCodes[number]

export interface MyErrorType {
  message: string
  code: ErrorCode
  statusCode: number
}

export class MyError extends H3Error {
  code: ErrorCode

  constructor(input: Partial<MyErrorType>) {
    super(input.message)
    this.code = input.code
    this.statusCode = input.statusCode
  }
}
