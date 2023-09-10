import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync as exec } from 'node:child_process'
import fs from 'fs-extra'

const __dirname = fileURLToPath(import.meta.url)
const root = path.resolve(__dirname, '../../')

// remove devDependencies
async function genPackJson() {
  const packageJson = await fs.readJson(path.resolve(root, 'package.json'))
  const { devDependencies, scripts, eslintConfig, ...rest } = packageJson

  await fs.writeJson(path.resolve(root, 'dist/package.json'), rest, {
    spaces: 2,
  })
}

export default async function build() {
  console.log('build start')
  await fs.remove(path.resolve(root, 'dist'))

  exec('pnpm build:rollup', { stdio: 'inherit' })
  await genPackJson()
}

build()
