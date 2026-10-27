<script setup>
import asideImage from '../../resources/images/tencentcloud/cloud-products-sidebar.webp'
import inlineImage from '../../resources/images/tencentcloud/cloud-products-card.webp'
import wideImage from '../../resources/images/tencentcloud/cloud-products-wide.webp'

defineProps({
  placement: {
    type: String,
    default: 'inline',
  },
})

const promotionUrl = 'https://cloud.tencent.com/act/cps/redirect?redirect=2446&cps_key=48cf6cf512e7'
</script>

<template>
  <aside
    class="tencent-cloud-promo"
    :class="`tencent-cloud-promo--${placement}`"
    aria-label="腾讯云优惠推广"
  >
    <a
      class="tencent-cloud-promo__link"
      :href="promotionUrl"
      target="_blank"
      rel="sponsored noopener noreferrer"
      aria-label="腾讯云云产品精选福利（推广链接，在新标签页打开）"
    >
      <picture>
        <source
          v-if="placement !== 'aside'"
          media="(min-width: 640px)"
          :srcset="wideImage"
          width="1504"
          height="228"
        />
        <img
          class="tencent-cloud-promo__image no-zoom"
          :src="placement === 'aside' ? asideImage : inlineImage"
          :width="placement === 'aside' ? 648 : 1168"
          :height="placement === 'aside' ? 548 : 648"
          alt="腾讯云云产品精选福利：云服务器、数据库等多款产品特惠，立即选购"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <span class="tencent-cloud-promo__caption">
        <span>腾讯云精选福利</span>
        <span>推广 <span aria-hidden="true">↗</span></span>
      </span>
    </a>
  </aside>
</template>

<style scoped>
.tencent-cloud-promo {
  width: 100%;
  max-width: 728px;
  margin: 24px auto 32px;
}

.tencent-cloud-promo--aside {
  margin: 20px 0 0;
}

.tencent-cloud-promo--home {
  width: min(728px, calc(100% - 48px));
  margin: 32px auto 0;
}

.tencent-cloud-promo__link {
  display: block;
  border-radius: var(--duck-radius-sm);
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.tencent-cloud-promo__link:focus-visible {
  outline: 3px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}

.tencent-cloud-promo__link:hover {
  color: var(--vp-c-brand-1);
}

.tencent-cloud-promo__image {
  display: block;
  width: 100%;
  height: auto;
}

.tencent-cloud-promo__caption {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 4px 12px 0;
  font-size: 11px;
  line-height: 1.6;
}
</style>
