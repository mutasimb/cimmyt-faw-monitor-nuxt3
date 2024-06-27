export default defineEventHandler(async e => {
  const { user: userWithPassword } = e.context
  if (!userWithPassword) return { user: null }

  const { password: _password, ...userWithoutPassword } = userWithPassword

  return { user: userWithoutPassword }
})
