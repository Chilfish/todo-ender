import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: true, // enable stylistic formatting rules
  typescript: true,
  vue: true,
  jsonc: false,
  yml: false,
}, {
  rules: {
    'no-console': 'off',
    'node/prefer-global/process': 'off',
  },
}, {
  ignores: [
    'dist',
    '.output',
    'node_modules',
    '*ignore',
    '.vercel',
  ],
})
