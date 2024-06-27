import jwt from 'jsonwebtoken'

import { Users } from "~~/server/utils/models"

export const getUserFromToken = async e => {
  const
    { cookieName, secretJWT } = useRuntimeConfig(e),
    cookie = getCookie(e, cookieName)

  if (!cookie) return null

  const tokenDecoded = await jwt.verify(cookie, secretJWT)
  if(!tokenDecoded) return null

  const
    { userID } = tokenDecoded,
    user = await Users.findById(userID)

  return user._doc
}
