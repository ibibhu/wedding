// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  
  // App configuration
  app: {
    head: {
      title: "Devi & Deepa | We're getting married!",
      meta: [
        { charset: 'utf-8' },
        { name: 'google', content: 'notranslate' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'You are cordially invited to celebrate our marriage.',
        },
        // Open Graph
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: 'https://chiku-deepa.netlify.app/',
        },
        {
          property: 'og:title',
          content: "Devi & Deepa | We're getting married!",
        },
        {
          property: 'og:description',
          content: 'You are cordially invited to celebrate our marriage.',
        },
        {
          property: 'og:image',
          content: '/og-image1.jpg',
        },
        // Twitter
        {
          property: 'twitter:card',
          content: 'summary',
        },
        {
          property: 'twitter:url',
          content: 'https://chiku-deepa.netlify.app/',
        },
        {
          property: 'twitter:title',
          content: "Devi & Deepa | We're getting married!",
        },
        {
          property: 'twitter:description',
          content: 'You are cordially invited to celebrate our marriage.',
        },
        {
          property: 'twitter:image',
          content: '/og-image.jpg',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'dns-prefetch',
          href: 'https://res.cloudinary.com/',
        },
        {
          rel: 'preconnect',
          href: 'https://res.cloudinary.com/',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect', 
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap',
        },
      ],
    },
  },

  // Global CSS
  css: ['@/assets/styles/app.scss'],

  // Plugins
  plugins: [
    { src: '~/plugins/aos.client.ts', mode: 'client' },
    '~/plugins/firebase.ts',
    // Temporary placeholder for vue-lazy-youtube-video
  ],

  // Auto import components
  components: true,

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@stefanobartoletti/nuxt-social-share',
  ],

  // Google Fonts configuration
  googleFonts: {
    families: {
      'IBM Plex Sans': [400, 500],
      'IBM Plex Serif': [400, 500],
      'Playfair Display': [400, 500, 600],
    },
  },

  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: '~/assets/styles/app.scss'
  },



  // Build configuration
  nitro: {
    preset: 'static'
  },

  // Development tools
  devtools: { enabled: true },

  // Compatibility
  compatibilityDate: '2024-01-01',
})