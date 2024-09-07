import { Users } from '../../utils/models'

export default defineEventHandler(async e => {
  const
    { user } = e.context,

    roles = ["Super Admin", "Moderator", "User Manager"]

  if (!user) throw createError({
    status: 401,
    statusMessage: 'User not logged in'
  })
  
  if (roles.indexOf(user.role) === -1) throw createError({
    status: 401,
    statusMessage: 'User don\'t have access to admin data'
  })
  
  const admins = await Users.find({ role: { $in: roles } }).select("-password");

  return { admins }
})
