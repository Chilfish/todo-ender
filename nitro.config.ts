export default defineNitroConfig({
  preset: 'vercel',
  esbuild: {
    options: {
      target: 'esnext',
    },
  },
  // should return the json response manually
  errorHandler: '~/utils/nitroErrorHandler.ts',
})
