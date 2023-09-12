import { Buffer } from 'node:buffer'
import { CompactSign, compactVerify } from 'jose'
import { alg, getKeys } from './keys'
import type { UserWithPassword } from '~/types'

const { ecPrivateKey, ecPublicKey } = await getKeys()
const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30

export async function createToken(payload: any) {
  return await new CompactSign(
    Buffer.from(JSON.stringify(payload), 'utf8'),
  )
    .setProtectedHeader({ alg, exp })
    .sign(ecPrivateKey)
}

export async function verifyToken(token: string) {
  const { payload } = await compactVerify(token, ecPublicKey)

  return JSON.parse(payload.toString()) as {
    id: number
    username: string
  }
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
