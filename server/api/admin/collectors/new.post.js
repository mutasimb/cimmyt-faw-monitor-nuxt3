import bcryptjs from 'bcryptjs'

import { Users } from '../../../utils/models'

export default defineEventHandler(async e => {
  const
    { user } = e.context,

    {
      season,
      csv,
      batch,
      password
    } = await readBody(e),

    roles = ["Super Admin", "Moderator", "User Manager"],
    passwordRegex = /^[a-z]{5}$/,
    phoneRegex = /^8801[0-9]{9}$/

  if (roles.indexOf(user.role) === -1) throw createError({
    status: 401,
    statusMessage: 'User don\'t have access to create new users'
  })

  if (!passwordRegex.test(password)) throw createError({
    status: 403,
    statusMessage: 'Invalid password'
  })
  if (csv.filter(el => !phoneRegex.test(el.Phone)).length) throw createError({
    status: 403,
    statusMessage: 'Invalid phone number'
  })
  if (csv.filter(el => !el.Name).length) throw createError({
    status: 403,
    statusMessage: 'Invalid name'
  })

  try {
    const promises = csv.map(async userRow => {
      const
        passwordNew = password + `${ userRow.Phone }`.slice(`${ userRow.Phone }`.length - 3),
        salt = await bcryptjs.genSalt(10),
        hashedPassword = await bcryptjs.hash(passwordNew, salt)

      const doc = await Users.findOne({ phone: userRow.Phone })
      if (!doc) {
        const newDoc = new Users({
          name: userRow.Name,
          phone: userRow.Phone,
          role: 'Data',
          title: userRow.Title,
          org: userRow.Organization,
          adm: {
            adm1: userRow.Division,
            adm2: userRow.District,
            adm3: userRow.Upazila,
            adm4: userRow.Union
          },
          defaultSeason: season,
          editSeasons: [season],
          viewSeasons: [],
          password: hashedPassword,
          tag: [batch]
        })

        const savedUser = await newDoc.save()

        return savedUser
      } else {
        doc.name = userRow.Name
        doc.role = 'Data'
        doc.title = userRow.Title
        doc.org = userRow.Organization
        doc.adm = {
          adm1: userRow.Division,
          adm2: userRow.District,
          adm3: userRow.Upazila,
          adm4: userRow.Union
        }
        doc.defaultSeason = season
        if (
          doc.editSeasons.map(el => el.toString()).indexOf(season) === -1
        ) doc.editSeasons.push(season)
        doc.password = hashedPassword

        if('tag' in doc) {
          if (doc.tag.indexOf(batch) === -1) doc.tag.push(batch)
        } else {
          doc.tag = [batch]
        }

        const savedUser = await doc.save()

        return savedUser
      }
    })

    await Promise.all(promises)

    const users = await Users.find({ editSeasons: season })

    return { users }
  } catch (error) {
    throw createError({
      status: 400,
      statusMessage: 'Unknown error'
    })
  }
})
