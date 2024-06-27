export default defineEventHandler(async e => {
  const { cookieName } = useRuntimeConfig()

  deleteCookie(e, cookieName, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production"
  })

  return { user: null }
})
