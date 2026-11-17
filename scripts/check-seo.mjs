import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const sourceRoot = 'docs'
const outDir = 'docs/.vitepress/dist'
const origin = 'https://docs.meowyun.cn'
const excluded = new Set(['/info/contact', '/mcs/fabric_server', '/mcs/forge_server'])
const redirects = {
  '/qqbot/maibot/conf': '/qqbot/maibot/config/conf',
  '/qqbot/maibot/plugins': '/qqbot/maibot/usage/plugins',
  '/qqbot/maibot/plugins_index': '/qqbot/maibot/usage/plugins_index',
  '/qqbot/maibot/use': '/qqbot/maibot/usage/use',
}

async function markdownFiles(directory, prefix = '') {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || ['public', 'resources'].includes(entry.name)) continue
    const relative = `${prefix}${entry.name}`
    if (entry.isDirectory()) files.push(...await markdownFiles(join(directory, entry.name), `${relative}/`))
    else if (entry.name.endsWith('.md')) files.push(relative)
  }
  return files
}

function meta(html, attribute, key) {
  const matches = [...html.matchAll(/<meta\s+([^>]+)>/g)]
    .filter((match) => match[1].includes(`${attribute}="${key}"`))
  assert.equal(matches.length, 1, `Expected exactly one ${key} tag`)
  return matches[0][1].match(/content="([^"]*)"/)?.[1]
}

const files = await markdownFiles(sourceRoot)
const titles = new Set()
const descriptions = new Set()
const expectedUrls = []
for (const file of files) {
  const route = `/${file.replace(/\.md$/, '')}`.replace(/\/index$/, '/')
  const url = `${origin}${route}`
  const html = await readFile(join(outDir, file.replace(/\.md$/, '.html')), 'utf8')
  const title = html.match(/<title>(.*?)<\/title>/)?.[1]
  if (route === '/') assert.equal(title, '清蒸云鸭の文档', 'Homepage must use only the site name')
  else assert.ok(title && title !== '清蒸云鸭の文档', `Missing page title: ${file}`)
  assert.ok(!titles.has(title), `Duplicate title: ${title}`)
  titles.add(title)
  const description = meta(html, 'name', 'description')
  assert.ok(description && description.length >= 20, `Missing or short description: ${file}`)
  assert.ok(!descriptions.has(description), `Duplicate description: ${file}`)
  descriptions.add(description)
  const canonical = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)]
  assert.deepEqual(canonical.map((match) => match[1]), [url], `Canonical mismatch: ${file}`)
  assert.equal(meta(html, 'property', 'og:url'), url)
  assert.equal(meta(html, 'property', 'og:title'), title)
  assert.equal(meta(html, 'property', 'og:description'), description)
  assert.equal(meta(html, 'name', 'twitter:card'), 'summary')
  const structuredData = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
  assert.ok(structuredData, `Missing structured data: ${file}`)
  const graph = JSON.parse(structuredData[1])['@graph']
  assert.equal(graph.find((item) => item['@type'] === 'WebPage')?.url, url)
  if (excluded.has(route)) assert.equal(meta(html, 'name', 'robots'), 'noindex, follow')
  else {
    assert.ok(!/name="robots" content="[^"]*noindex/.test(html), `Unexpected noindex: ${file}`)
    expectedUrls.push(url)
  }
  if (route !== '/') {
    const directoryHtml = await readFile(join(outDir, route.slice(1), 'index.html'), 'utf8')
    assert.equal(directoryHtml, html, `Directory entry differs: ${route}`)
  }
}

const sitemap = await readFile(join(outDir, 'sitemap.xml'), 'utf8')
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
assert.deepEqual(urls.sort(), expectedUrls.sort(), 'Sitemap must contain only indexable canonical URLs')
const robots = await readFile(join(outDir, 'robots.txt'), 'utf8')
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`))
assert.ok(!/Disallow:\s*\/\s*$/m.test(robots), 'Site must not block all crawlers')
const notFound = await readFile(join(outDir, '404.html'), 'utf8')
assert.equal(meta(notFound, 'name', 'robots'), 'noindex, follow')
const rules = await readFile(join(outDir, '_redirects'), 'utf8')
for (const [oldPath, newPath] of Object.entries(redirects)) {
  for (const suffix of ['', '/', '.html']) assert.ok(rules.includes(`${oldPath}${suffix} ${newPath} 301`))
  const target = await readFile(join(outDir, `${newPath.slice(1)}.html`), 'utf8')
  assert.ok(!target.includes('http-equiv="refresh"'), `Redirect chain: ${oldPath}`)
  const fallback = await readFile(join(outDir, `${oldPath.slice(1)}.html`), 'utf8')
  assert.ok(fallback.includes(`content="0;url=${newPath}"`), `Missing fallback: ${oldPath}`)
  assert.ok(fallback.includes(`rel="canonical" href="${origin}${newPath}"`))
  assert.equal(await readFile(join(outDir, oldPath.slice(1), 'index.html'), 'utf8'), fallback)
}
console.log(`SEO checks passed: ${files.length} pages, ${urls.length} sitemap URLs, ${Object.keys(redirects).length} legacy redirects`)
