<script setup>
defineProps({
  text: {
    type: String,
    default: '推荐',
  },
  color: {
    type: String,
    default: '',
  },
  textColor: {
    type: String,
    default: '',
  },
  borderColor: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <span
    class="doc-tag ignore-header"
    :style="{
      '--doc-tag-accent': color || undefined,
      '--doc-tag-text': textColor || undefined,
      '--doc-tag-border': borderColor || undefined,
    }"
  ><slot>{{ text }}</slot></span>
</template>

<style scoped>
.doc-tag {
  --doc-tag-accent: #963b57;
  display: inline-flex;
  align-items: center;
  padding: 0.28em 0.85em;
  border: 1px solid var(--doc-tag-border, var(--doc-tag-accent));
  border-radius: 999px;
  background: color-mix(in srgb, var(--doc-tag-accent) 10%, var(--vp-c-bg-elv));
  color: var(--doc-tag-text, var(--doc-tag-accent));
  font-family: var(--vp-font-family-base);
  font-size: clamp(0.875rem, 0.8em, 1.25rem);
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0;
  white-space: nowrap;
  vertical-align: middle;
}

:global(.dark .doc-tag) {
  --doc-tag-accent: #ffd1dd;
}

:global(.vp-doc h1 .doc-tag),
:global(.vp-doc h2 .doc-tag),
:global(.vp-doc h3 .doc-tag),
:global(.vp-doc h4 .doc-tag),
:global(.vp-doc h5 .doc-tag),
:global(.vp-doc h6 .doc-tag) {
  margin-inline-start: 0.35em;
  vertical-align: 0.15em;
}
</style>
