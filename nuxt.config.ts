import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
const TWO_WEEKS = 60 * 60 * 24 * 1000 * 14;

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap" }
      ]
    }
  },
  css: ['~/assets/css/main.scss'],
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
    '@pinia/nuxt'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
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
