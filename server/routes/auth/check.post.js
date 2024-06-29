import { Users } from '~~/server/utils/models'


export default defineEventHandler(async e => {
  const { phone } = await readBody(e)
  if (!phone) throw createError({ statusCode: 400, message: "Phone number required" })

  const userWithPassword = await Users.findOne({ phone })
  if (!userWithPassword) throw createError({ statusCode: 404, message: "Unregistered phone number" })

  return {}
})
