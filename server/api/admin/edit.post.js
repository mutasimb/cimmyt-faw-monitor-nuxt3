import { Users } from '../../utils/models'

export default defineEventHandler(async e => {
  const
    { user } = e.context,
    {
      id,
      name,
      role,
      title,
      org,
      phone
    } = await readBody(e),

    roles = ["Super Admin", "Moderator"],
    phoneRegex = /^8801[0-9]{9}$/

  if (roles.indexOf(user.role) === -1) throw createError({
    status: 401,
    statusMessage: 'User don\'t have access to edit admin data'
  })

  if(!phoneRegex.test(phone)) throw createError({
    status: 403,
    statusMessage: 'Invalid phone number'
  })

  const targetUser = await Users.findById(id)
  targetUser.name = name
  targetUser.role = role
  targetUser.title = title
  targetUser.org = org
  targetUser.phone = phone

  const savedUser = await targetUser.save()

  return { savedUser }
})
