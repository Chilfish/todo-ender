export default defineNitroConfig({
  preset: 'vercel',
  esbuild: {
    options: {
      target: 'node18',
      platform: 'node',
      minify: true,
    },
  },
  routeRules: {
    '/**': { cors: true },
  },
  // should return the json response manually
  errorHandler: '~/error/nitroErrorHandler.ts',
})
