<script setup>
import DefaultTheme from 'vitepress/theme'
import TencentCloudPromo from './TencentCloudPromo.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #aside-outline-after>
      <TencentCloudPromo placement="aside" />
    </template>

    <template #doc-footer-before>
      <TencentCloudPromo placement="inline" />
    </template>
  </DefaultTheme.Layout>
</template>

<style>
/* VitePress hides the document aside below 1280px. Keep one visible promotion. */
@media (min-width: 1280px) {
  .VPDoc.has-aside .tencent-cloud-promo--inline {
    display: none;
  }
}
</style>
