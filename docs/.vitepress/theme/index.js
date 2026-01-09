import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick } from "vue";
import { useRoute } from "vitepress";
import mediumZoom from "medium-zoom";
import vitepressBackToTop from 'vitepress-plugin-back-to-top'
import './custom.css'
import 'vitepress-plugin-back-to-top/dist/style.css'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        vitepressBackToTop({ threshold: 300 })
    },

    setup() {
        const route = useRoute();

        const initZoom = () => {
            mediumZoom('.vp-doc img:not(.medium-zoom-image)', {
                background: 'transparent',
                margin: 24,
                scrollOffset: 0,
            });
        };

        onMounted(() => {
            initZoom();
        });

        watch(
            () => route.path,
            () => nextTick(() => initZoom())
        );
    }
}