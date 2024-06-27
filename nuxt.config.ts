// https://nuxt.com/docs/api/configuration/nuxt-config
const TWO_WEEKS = 60 * 60 * 24 * 1000 * 14;

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    cookieName: process.env.COOKIE_NAME,
    cookieSecret: "secret",
    cookieExpires: TWO_WEEKS.toString(),
    hostDB: process.env.DB_HOST,
    nameDB: process.env.DB_NAME,
    userDB: process.env.DB_USER,
    passDB: process.env.DB_PASSWORD,
    secretJWT: process.env.JWT_SECRET
  }
})
