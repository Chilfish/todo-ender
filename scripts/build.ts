import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync as exec } from 'node:child_process'
import fs from 'fs-extra'

const __dirname = fileURLToPath(import.meta.url)
const root = path.resolve(__dirname, '../../')

const copyDest = {
  '.env.example': '.env',
  'README.md': 'README.md',
}

// remove devDependencies
async function genPackJson() {
  const packageJson = await fs.readJson(path.resolve(root, 'package.json'))

  const rest = {}

  Object.keys(packageJson)
    .forEach((key) => {
      if (!['devDependencies', 'scripts', 'simple-git-hooks', 'lint-staged', 'eslintConfig']
        .includes(key)
      )
        rest[key] = packageJson[key]
    })

  await fs.writeJson(path.resolve(root, 'dist/package.json'), rest, {
    spaces: 2,
  })
}

// copy files to dist
async function copy() {
  await Promise.all(
    Object.keys(copyDest).map(async (key) => {
      return await fs.copyFile(path.resolve(root, key), path.resolve(root, 'dist', copyDest[key]))
    }),
  )
}

export default async function build() {
  console.log('build start')
  await fs.remove(path.resolve(root, 'dist'))

  exec('pnpm build:rollup', { stdio: 'inherit' })

  await genPackJson()
  await copy()
}

build()
