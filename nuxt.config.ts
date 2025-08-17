// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  nitro: {
    preset: 'static'
  },
  ssr: true,
  vite: {
    server: {
      host: true,
      allowedHosts: ['artur171.mikrus.xyz', 'srv39-30171.wykr.es']
    }
  },
  app: {
    head: {
      title: 'PawSwipe - Znajdź swojego przyjaciela',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'description', content: 'Aplikacja do adopcji zwierząt ze schronisk w Polsce. Znajdź swojego nowego przyjaciela na łapkę!' },
        
        // Open Graph tags for Facebook
        { property: 'og:title', content: 'PawSwipe - Znajdź swojego przyjaciela' },
        { property: 'og:description', content: 'Aplikacja do adopcji zwierząt ze schronisk w Polsce. Znajdź swojego nowego przyjaciela na łapkę!' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: '' },
        { property: 'og:image', content: '/images/shelter-logo.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:site_name', content: 'PawSwipe' },
        { property: 'og:locale', content: 'pl_PL' },
        
        // Twitter Card tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'PawSwipe - Znajdź swojego przyjaciela' },
        { name: 'twitter:description', content: 'Aplikacja do adopcji zwierząt ze schronisk w Polsce. Znajdź swojego nowego przyjaciela na łapkę!' },
        { name: 'twitter:image', content: '/images/shelter-logo.jpg' },
        
        // Additional meta tags
        { name: 'author', content: 'Iławskie Schronisko dla zwierząt' },
        { name: 'keywords', content: 'adopcja zwierząt, schronisko, psy, koty, Iława, adopcja wirtualna' }
      ]
    }
  }
})
