import { closeDB } from '~/db'

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('close', async () => {
    await closeDB()
  })
})
