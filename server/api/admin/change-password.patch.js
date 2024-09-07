import { Users } from '../../utils/models'
import generatePassword from '../../utils/generatePassword'

export default defineEventHandler(async e => {
  const
    { user } = e.context,
    { id } = await readBody(e),

    roles = ["Super Admin", "Moderator"]

  if (roles.indexOf(user.role) === -1) throw createError({
    status: 401,
    statusMessage: 'User don\'t have access to change password of admin'
  })

  const
    targetUser = await Users.findById(id),

    { password, hashedPassword } = await generatePassword(targetUser.phone)

  targetUser.password = hashedPassword
  await targetUser.save()

  return { savedpassword: password }
})
