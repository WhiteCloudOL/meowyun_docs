import DefaultTheme from 'vitepress/theme'
import vitepressBackToTop from 'vitepress-plugin-back-to-top'
import './custom.css'
import 'vitepress-plugin-back-to-top/dist/style.css'
import Layout from "./Layout.vue";

export default {
    ...DefaultTheme,
    enhanceApp({ app }){
        vitepressBackToTop({threshold: 300})
    },
    // zoomable
    Layout,
}