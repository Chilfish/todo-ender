export default defineNitroConfig({
  preset: 'vercel',
  esbuild: {
    options: {
      target: 'node18',
      platform: 'node',
      minify: true,
    },
  },
  // should return the json response manually
  errorHandler: '~/utils/nitroErrorHandler.ts',
})
