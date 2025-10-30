/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', ...defaultTheme.fontFamily.sans],
        serif: ['IBM Plex Serif'],
        display: ['Playfair Display'],
      },
      backgroundImage: {
        'hero-pattern': "url('@/assets/images/lights.png')",
        'footer-pattern': "url('@/assets/images/footer.jpg')",
      },
    },
  },
  plugins: [],
}
