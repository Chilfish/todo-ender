import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import esbuild from 'rollup-plugin-esbuild'

/** @type {import('rollup').RollupOptions[]} */
const configs = []

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
    'express',
    'mysql2',
    'cors',
  ],
})

export default configs
