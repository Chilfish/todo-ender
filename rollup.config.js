import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import esbuild from 'rollup-plugin-esbuild'
import fs from 'fs-extra'

/** @type {import('rollup').RollupOptions[]} */
const configs = []

const packageJson = fs.readJsonSync('./package.json')

const deps = Object.keys(packageJson.dependencies || {})

configs.push({
  input: {
    index: 'src/index.ts',
    server: 'src/server.ts',
    utils: 'src/utils/index.ts',
  },
  output: {
    dir: 'dist',
    entryFileNames: '[name].mjs',
    format: 'es',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    json(),
    esbuild({
      minify: true,
    }),
  ],
  external: [
    ...deps,
  ],
})

export default configs
