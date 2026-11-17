import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { HeadConfig, PageData } from 'vitepress'

export const siteUrl = 'https://docs.meowyun.cn'
const siteName = '清蒸云鸭の文档'
export const siteDescription = 'QQ 机器人、Minecraft 服务器与雨云服务中文教程，涵盖 MaiBot、AstrBot、NapCat、LLBot、SnowLuma 的安装部署、配置、插件与故障排查。'

export const legacyRoutes: Record<string, string> = {
  '/qqbot/maibot/conf': '/qqbot/maibot/config/conf',
  '/qqbot/maibot/plugins': '/qqbot/maibot/usage/plugins',
  '/qqbot/maibot/plugins_index': '/qqbot/maibot/usage/plugins_index',
  '/qqbot/maibot/use': '/qqbot/maibot/usage/use',
}

export function pagePath(path: string): string {
  const cleanPath = path.replace(/\\/g, '/').replace(/^\//, '').replace(/\.(md|html)$/, '')
  return `/${cleanPath}`.replace(/\/index$/, '/')
}

const excludedRoutes = new Set(['/404'])

export function isIndexable(path: string): boolean {
  return !excludedRoutes.has(pagePath(path))
}

export function addPageSeo(pageData: PageData): void {
  const path = pagePath(pageData.relativePath)
  if (pageData.frontmatter.noindex === true) excludedRoutes.add(path)
  else if (path !== '/404') excludedRoutes.delete(path)
  const head: HeadConfig[] = []
  if (!isIndexable(path)) head.push(['meta', { name: 'robots', content: 'noindex, follow' }])
  if (path !== '/404') {
    const url = `${siteUrl}${path}`
    const title = pageData.frontmatter.titleTemplate === false
      ? pageData.title
      : `${pageData.title} | ${siteName}`
    const description = pageData.description || siteDescription
    head.push(
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:site_name', content: siteName }],
      ['meta', { property: 'og:locale', content: 'zh_CN' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:image', content: `${siteUrl}/logo.webp` }],
      ['meta', { property: 'og:image:alt', content: siteName }],
      ['meta', { name: 'twitter:card', content: 'summary' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: `${siteUrl}/logo.webp` }],
    )
    const website = { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: `${siteUrl}/`, name: siteName, inLanguage: 'zh-CN' }
    const webpage = {
      '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description,
      inLanguage: 'zh-CN', isPartOf: { '@id': website['@id'] },
      ...(pageData.lastUpdated ? { dateModified: new Date(pageData.lastUpdated).toISOString() } : {}),
    }
    head.push(['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org', '@graph': [website, webpage],
    }).replace(/</g, '\\u003c')])
  }
  const existingHead: HeadConfig[] = pageData.frontmatter.head || []
  const key = ([tag, attrs]: HeadConfig) => `${tag}:${attrs.name || attrs.property || attrs.rel || attrs.type || ''}`
  const managedKeys = new Set(head.map(key))
  pageData.frontmatter.head = [...existingHead.filter((item) => !managedKeys.has(key(item))), ...head]
}

export async function writeLegacyRedirects(outDir: string): Promise<void> {
  const rules: string[] = []
  for (const [oldPath, targetPath] of Object.entries(legacyRoutes)) {
    const canonical = `${siteUrl}${targetPath}`
    const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>文档已迁移 | ${siteName}</title><link rel="canonical" href="${canonical}"><meta http-equiv="refresh" content="0;url=${targetPath}"></head><body><p>文档已迁移至 <a href="${targetPath}">${targetPath}</a></p></body></html>`
    const directory = join(outDir, oldPath.slice(1))
    await mkdir(directory, { recursive: true })
    await Promise.all([
      writeFile(`${directory}.html`, html),
      writeFile(join(directory, 'index.html'), html),
    ])
    for (const suffix of ['', '/', '.html']) rules.push(`${oldPath}${suffix} ${targetPath} 301`)
  }
  await writeFile(join(outDir, '_redirects'), `${rules.join('\n')}\n`)
}
