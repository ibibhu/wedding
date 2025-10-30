// @/plugins/aos.client.ts
// Nuxt 3 plugin for AOS (Animate On Scroll)
// https://github.com/michalsnik/aos

import AOS from 'aos'
import 'aos/dist/aos.css'
import { nextTick } from 'vue'

export default defineNuxtPlugin(() => {
  // Initialize AOS with configuration
  const aosInstance = AOS.init({
    // offset: 200,
    duration: 300,
    easing: 'ease',
    once: true,
    mirror: false,
    anchorPlacement: 'top-bottom',
  })

  // Refresh AOS on route change
  const router = useRouter()
  router.afterEach(() => {
    nextTick(() => {
      AOS.refresh()
    })
  })

  // Provide AOS instance to the app
  return {
    provide: {
      aos: AOS,
      aosInstance
    }
  }
})