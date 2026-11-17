<script setup>
import DocTag from './DocTag.vue'

defineProps({
  name: { type: String, required: true },
  repo: { type: String, default: '' },
  href: { type: String, default: '' },
  label: { type: String, default: '' },
  description: { type: String, required: true },
  author: { type: String, default: '' },
  notice: { type: String, default: '' },
})
</script>

<template>
  <article class="plugin-card">
    <div class="plugin-card__heading">
      <h3>{{ name }}</h3>
      <DocTag v-if="label" :text="label" />
    </div>
    <p v-if="author || repo" class="plugin-card__author">作者 · {{ author || repo.split('/')[0] }}</p>
    <p class="plugin-card__description">{{ description }}</p>
    <p v-if="notice" class="plugin-card__notice">{{ notice }}</p>
    <a class="plugin-card__link" :href="href || `https://github.com/${repo}`">{{ repo ? '查看仓库' : '配置指南' }}<span class="plugin-card__sr">：{{ name }}</span></a>
    <details class="plugin-card__details">
      <summary>配置与使用</summary>
      <div class="plugin-card__body"><slot /></div>
    </details>
  </article>
</template>

<style scoped>
:global(.plugin-grid) {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 18px;
  margin: 24px 0 36px;
}
.plugin-card {
  min-width: 0;
  padding: 22px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg-elv);
}
.plugin-card__heading { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.vp-doc .plugin-card h3 { margin: 0; padding: 0; font-size: 18px; line-height: 1.5; letter-spacing: 0; }
.vp-doc .plugin-card h3::before, .vp-doc .plugin-card h3::after { display: none; }
.vp-doc .plugin-card__author { margin: 8px 0 0; color: var(--vp-c-text-2); font-size: 13px; line-height: 1.5; }
.vp-doc .plugin-card__description { margin: 14px 0; font-size: 15px; line-height: 1.8; }
.vp-doc .plugin-card__notice {
  margin: 12px 0;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--vp-custom-block-warning-bg);
  font-size: 13px;
  line-height: 1.7;
}
.plugin-card__link { display: inline-block; font-size: 14px; }
.plugin-card__details { margin-top: 18px; border-top: 1px solid var(--vp-c-divider); }
.plugin-card__details summary { padding: 14px 0 0; cursor: pointer; font-size: 14px; font-weight: 600; }
.plugin-card__body { font-size: 14px; overflow-wrap: anywhere; }
.plugin-card__body :deep(p), .plugin-card__body :deep(li) { font-size: inherit; line-height: 1.8; }
.plugin-card__body :deep(ol), .plugin-card__body :deep(ul) { padding-left: 20px; }
.plugin-card__sr { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media (max-width: 767px) {
  :global(.plugin-grid) { grid-template-columns: minmax(0, 1fr); gap: 14px; }
  .plugin-card { padding: 20px; }
}
</style>
