<script setup>
import { onMounted, ref } from 'vue'
import {
  COUNTER_HOST,
  createCounterUrl,
  isLocalPreview,
  shouldTrackVisit,
} from './site-counter'

const counterSrc = ref('')
const statusText = ref('正在加载全站访问量…')

onMounted(() => {
  if (shouldTrackVisit()) {
    counterSrc.value = createCounterUrl()
    return
  }

  statusText.value = isLocalPreview()
    ? '本地预览不计入访问量'
    : `访问量仅统计 ${COUNTER_HOST}`
})

function handleCounterError() {
  counterSrc.value = ''
  statusText.value = '访问量服务暂时不可用，请稍后再试'
}
</script>

<template>
  <figure class="site-counter" aria-label="全站累计访问量">
    <img
      v-if="counterSrc"
      :src="counterSrc"
      class="site-counter__image no-zoom"
      alt="清蒸云鸭文档全站累计访问量"
      decoding="async"
      referrerpolicy="no-referrer"
      @error="handleCounterError"
    />
    <div v-else class="site-counter__preview">{{ statusText }}</div>
    <figcaption>
      <strong>全站累计访问量</strong>
      <span>{{ COUNTER_HOST }}</span>
    </figcaption>
  </figure>
</template>
