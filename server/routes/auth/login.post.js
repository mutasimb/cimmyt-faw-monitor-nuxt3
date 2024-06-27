import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { Users } from '~~/server/utils/models'


export default defineEventHandler(async e => {
  const
    { phone, password } = await readBody(e),
    { secretJWT, cookieName, cookieExpires } = useRuntimeConfig()

  if (!phone || !password) throw createError({ statusCode: 400, message: "Phone number and password are required" })

  const userWithPassword = await Users.findOne({ phone })
  if (!userWithPassword) throw createError({ statusCode: 401, message: "User with phone number doesn't exist" })

  const isMatched = await bcryptjs.compare(password, userWithPassword.password)
  if (!isMatched) throw createError({ statusCode: 401, message: "Incorrect password" })

  const
    { password: password_, ...userWithoutPassword } = userWithPassword._doc,
    signedToken = await jwt.sign({ userID: userWithoutPassword._id.toString() }, secretJWT, { expiresIn: '365 days' })


  setCookie(e, cookieName, signedToken, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + parseInt(cookieExpires))
  });

  return { user: userWithoutPassword }
})
