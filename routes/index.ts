export default defineEventHandler((event) => {
  return {
    message: 'hello world',
    event,
  }
})
