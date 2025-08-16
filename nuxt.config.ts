// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  nitro: {
    preset: 'static'
  },
  ssr: true,
  app: {
    head: {
      title: 'PawSwipe - Znajdź swojego przyjaciela',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'description', content: 'Aplikacja do adopcji zwierząt ze schronisk w Polsce' }
      ]
    }
  }
})
