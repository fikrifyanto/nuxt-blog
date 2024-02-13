// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          "IBM Plex Sans": [400, 600],
          Raleway: [500, 600, 800],
        },
      },
    ],
  ],
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL || "https://gorest.co.in",
      API_TOKEN: process.env.API_TOKEN,
    },
  },
  routeRules: {
    "/": { prerender: true },
  },
})
