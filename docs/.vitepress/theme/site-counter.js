const COUNTER_ID = 'meowyun_doc'
export const COUNTER_HOST = 'docs.meowyun.cn'

const COUNTER_URL =
  `https://count.getloli.com/@${COUNTER_ID}` +
  `?name=${COUNTER_ID}&theme=miku&padding=8&offset=0&align=top` +
  '&scale=1&pixelated=1&darkmode=auto'

export function isLocalPreview() {
  if (typeof window === 'undefined') return true

  return ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname)
}

export function shouldTrackVisit() {
  if (typeof window === 'undefined') return false
  return window.location.hostname === COUNTER_HOST
}

export function createCounterUrl() {
  const url = new URL(COUNTER_URL)

  // 防止浏览器缓存同一图片请求；固定 COUNTER_ID 保证前端迁移后仍沿用原计数。
  url.searchParams.set('_t', Date.now().toString())
  return url.toString()
}
