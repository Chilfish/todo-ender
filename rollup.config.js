import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

/** @type {import('rollup').RollupOptions} */
export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.cjs',
    format: 'cjs',
    plugins: [terser()],
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    json(),
  ],
  external: [
    'express',
    'lodash-es',
  ],
}
