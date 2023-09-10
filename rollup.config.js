import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import esbuild from 'rollup-plugin-esbuild'

/** @type {import('rollup').RollupOptions} */
export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.cjs',
    format: 'cjs',
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
  ],
}
