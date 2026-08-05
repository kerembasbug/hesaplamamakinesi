#!/usr/bin/env node
/**
 * Yerelde çalışan sunucuya karşı sayfa bazlı SEO doğrulaması.
 *
 * Kontrol ettikleri (RankMath temel kriterleriyle örtüşür):
 *   - HTTP 200
 *   - tek <h1>
 *   - canonical var ve beklenen URL'e işaret ediyor
 *   - <title> 15-70 karakter
 *   - meta description 120-160 karakter
 *   - en az 1 geçerli JSON-LD bloğu
 *   - en az 3 <h2>
 *   - gövde kelime sayısı eşiği
 *   - görsellerin tamamında alt metni
 *   - en az 3 iç link
 *
 * Kullanım:
 *   node scripts/seo-check.mjs http://localhost:3412            (örneklem)
 *   node scripts/seo-check.mjs http://localhost:3412 --all      (sitemap'teki her URL)
 */

const base = process.argv[2] ?? "http://localhost:3412"
const checkAll = process.argv.includes("--all")

const MIN_WORDS = 550
const SAMPLE = [
    "/",
    "/birim",
    "/birim/180-cm-kac-feet",
    "/birim/cm-feet-cevirici",
    "/birim/70-kg-kac-pound",
    "/birim/37-santigrat-kac-fahrenheit",
    "/finans",
    "/finans/kredi-hesaplama",
    "/vergi-muhasebe/kdv-hesaplama",
    "/vergi-muhasebe/gelir-vergisi-hesaplama",
    "/saglik-spor/vki-hesaplama",
    "/donusturuculer/uzunluk-donusturucu",
]

function textOf(html) {
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&[a-z]+;/gi, " ")
        .replace(/\s+/g, " ")
        .trim()
}

async function sitemapPaths() {
    const res = await fetch(`${base}/sitemap.xml`)
    const xml = await res.text()
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
}

async function check(path) {
    const problems = []
    let res
    try {
        res = await fetch(`${base}${path}`)
    } catch (error) {
        return { path, problems: [`istek başarısız: ${error.message}`] }
    }
    if (res.status !== 200) return { path, problems: [`HTTP ${res.status}`] }

    const html = await res.text()

    const h1s = html.match(/<h1[\s>]/g) ?? []
    if (h1s.length !== 1) problems.push(`h1 sayısı ${h1s.length} (1 olmalı)`)

    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
    if (!canonical) problems.push("canonical yok")
    else if (new URL(canonical).pathname !== (path === "/" ? "/" : path))
        problems.push(`canonical yolu uyuşmuyor: ${new URL(canonical).pathname}`)

    const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? ""
    if (title.length < 15 || title.length > 70) problems.push(`title ${title.length} karakter (15-70)`)

    const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? ""
    if (description.length < 120 || description.length > 160)
        problems.push(`description ${description.length} karakter (120-160)`)

    const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    if (ldBlocks.length === 0) problems.push("JSON-LD yok")
    for (const [, raw] of ldBlocks) {
        try {
            JSON.parse(raw.replace(/\\u003c/g, "<"))
        } catch {
            problems.push("JSON-LD parse edilemedi")
        }
    }

    const h2s = html.match(/<h2[\s>]/g) ?? []
    if (h2s.length < 3) problems.push(`h2 sayısı ${h2s.length} (en az 3)`)

    const words = textOf(html).split(" ").length
    if (words < MIN_WORDS) problems.push(`gövde ${words} kelime (en az ${MIN_WORDS})`)

    const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0])
    const missingAlt = imgs.filter((img) => !/\balt="[^"]+"/.test(img))
    if (missingAlt.length) problems.push(`${missingAlt.length} görselde alt metni yok`)

    const internal = new Set([...html.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1]))
    if (internal.size < 3) problems.push(`iç link sayısı ${internal.size} (en az 3)`)

    return { path, problems, stats: { title: title.length, description: description.length, h2: h2s.length, words, ld: ldBlocks.length, img: imgs.length, links: internal.size } }
}

const paths = checkAll ? await sitemapPaths() : SAMPLE
const results = []
const CONCURRENCY = 8
for (let i = 0; i < paths.length; i += CONCURRENCY) {
    results.push(...(await Promise.all(paths.slice(i, i + CONCURRENCY).map(check))))
}

let failed = 0
for (const r of results) {
    if (r.problems.length === 0) {
        console.log(`  OK   ${r.path}  (${r.stats.words} kelime, ${r.stats.h2} h2, ${r.stats.ld} ld+json, ${r.stats.img} görsel)`)
    } else {
        failed++
        console.log(`  FAIL ${r.path}`)
        for (const p of r.problems) console.log(`         - ${p}`)
    }
}
console.log(`\n${results.length - failed}/${results.length} sayfa temiz`)
process.exit(failed > 0 ? 1 : 0)
