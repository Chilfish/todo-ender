import { exportPKCS8, exportSPKI, generateKeyPair, importPKCS8, importSPKI } from 'jose'
import fs from 'fs-extra'

export const alg = 'ES256'

export async function generateKeys() {
  const {
    publicKey: ecPublicKey,
    privateKey: ecPrivateKey,
  } = await generateKeyPair(alg)

  const [privateKey, publicKey] = await Promise.all([
    exportPKCS8(ecPrivateKey),
    exportSPKI(ecPublicKey),
  ])

  await Promise.all([
    fs.writeFile('./private.pem', privateKey),
    fs.writeFile('./public.pem', publicKey),
  ])

  return {
    ecPublicKey,
    ecPrivateKey,
    privateKey,
    publicKey,
  }
}

export async function getKeys() {
  try {
    const [privateKey, publicKey] = await Promise.all([
      fs.readFile('./private.pem', 'utf8'),
      fs.readFile('./public.pem', 'utf8'),
    ])

    const [ecPublicKey, ecPrivateKey] = await Promise.all([
      importSPKI(publicKey, alg),
      importPKCS8(privateKey, alg),
    ])

    return {
      privateKey,
      publicKey,
      ecPublicKey,
      ecPrivateKey,
    }
  }
  catch (error) {
    return await generateKeys()
  }
}
