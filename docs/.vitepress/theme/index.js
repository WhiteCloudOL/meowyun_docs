import DefaultTheme from 'vitepress/theme'
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'
import vitepressBackToTop from 'vitepress-plugin-back-to-top'
import HomePage from './HomePage.vue'
import SiteCounter from './SiteCounter.vue'
import { createCounterUrl, shouldTrackVisit } from './site-counter'
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/500.css'
import '@fontsource/nunito/600.css'
import '@fontsource/nunito/700.css'
import '@fontsource/zcool-kuaile/400.css'
import 'vitepress-plugin-back-to-top/dist/style.css'
import './custom.css'

export default {
  ...DefaultTheme,

  enhanceApp(context) {
    DefaultTheme.enhanceApp?.(context)
    context.app.component('HomePage', HomePage)
    context.app.component('SiteCounter', SiteCounter)
    vitepressBackToTop({ threshold: 360 })
  },

  setup() {
    const route = useRoute()
    let zoom
    const pendingCounters = new Set()

    const initZoom = () => {
      zoom?.detach()
      zoom = mediumZoom('.vp-doc img:not(.no-zoom)', {
        background: 'var(--vp-c-bg)',
        margin: 32,
        scrollOffset: 64,
      })
    }

    const trackSiteVisit = () => {
      // 欢迎页由可见的 SiteCounter 负责本次计数，避免产生两次请求。
      if (route.path === '/info/welcome' || !shouldTrackVisit()) return

      const counter = new Image()
      const release = () => pendingCounters.delete(counter)

      pendingCounters.add(counter)
      counter.addEventListener('load', release, { once: true })
      counter.addEventListener('error', release, { once: true })
      counter.src = createCounterUrl()
    }

    onMounted(() => {
      initZoom()
      trackSiteVisit()
    })

    watch(
      () => route.path,
      async () => {
        await nextTick()
        initZoom()
        trackSiteVisit()
      },
      { flush: 'post' },
    )

    onUnmounted(() => {
      zoom?.detach()
      pendingCounters.clear()
    })
  },
}
