export default defineEventHandler(async e => {
  const user = await getUserFromToken(e)
  e.context.user = user
})
