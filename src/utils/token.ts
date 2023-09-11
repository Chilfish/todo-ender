import process from 'node:process'
import { SignJWT, jwtVerify } from 'jose'
import type { UserWithPassword } from '~/types'

const {
  HOST = 'localhost:3000',
  SECRET = 'secret',
} = process.env

const secret = new TextEncoder().encode(SECRET)

const issuer = HOST
const audience = HOST

export async function createToken(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime('12h')
    .sign(secret)
}

export async function verifyToken(token: string) {
  return jwtVerify(token, secret, {
    issuer,
    audience,
  })
}

export async function userWithToken(user: UserWithPassword) {
  const { password: __dirname, ...userWithoutPass } = user

  const token = await createToken({ id: user.id, username: user.username })

  return {
    data: userWithoutPass,
    token,
    status: 'success',
  }
}
