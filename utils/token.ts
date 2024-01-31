import { Buffer } from 'node:buffer'
import { CompactSign, compactVerify } from 'jose'

import { alg, getKeys } from './keys'
import { TOKEN_EXP } from '~/constants'
import type { User, UserWithToken, uid } from '~/types'

const { ecPrivateKey, ecPublicKey } = await getKeys()

export async function createToken(payload: any) {
  return await new CompactSign(
    Buffer.from(JSON.stringify(payload), 'utf8'),
  )
    .setProtectedHeader({ alg, exp: TOKEN_EXP })
    .sign(ecPrivateKey)
}

export async function verifyToken(token: string) {
  const { payload } = await compactVerify(token, ecPublicKey)

  const data = new TextDecoder().decode(payload)

  return JSON.parse(data) as {
    id: uid
    name: string
  }
}

export async function userWithToken(user: User): Promise<UserWithToken> {
  const token = await createToken({ id: user.id, name: user.name })

  return {
    user,
    token,
  }
}
