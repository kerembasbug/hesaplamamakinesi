#!/usr/bin/env node
/**
 * Tek seferlik codemod: sayfaları ortak SEO altyapısına bağlar.
 *
 *  1. `export const metadata: Metadata = {...}` → `buildMetadata({..., path})`
 *     (canonical + OG + Twitter tek yerden gelir)
 *  2. Kopyalanmış breadcrumb <nav> bloğu → <Breadcrumb items={...} />
 *     (görsel + BreadcrumbList JSON-LD)
 *  3. Araç sayfalarına WebApplication, kategori sayfalarına CollectionPage JSON-LD
 *  4. Kullanılmayan hale gelen import'ları temizler
 *
 * Kullanım:  node scripts/codemod-seo.mjs [--dry]
 */

import { readFileSync, writeFileSync, globSync } from "node:fs"
import { relative } from "node:path"

const DRY = process.argv.includes("--dry")

const CATEGORY_SLUGS = [
    "finans",
    "vergi-muhasebe",
    "saglik-spor",
    "matematik-egitim",
    "zaman-takvim",
    "donusturuculer",
    "seyahat",
    "astroloji",
]

const APP_CATEGORY = {
    finans: "FinanceApplication",
    "vergi-muhasebe": "FinanceApplication",
    "saglik-spor": "HealthApplication",
    "matematik-egitim": "EducationalApplication",
    "zaman-takvim": "UtilitiesApplication",
    donusturuculer: "UtilitiesApplication",
    seyahat: "TravelApplication",
    astroloji: "LifestyleApplication",
}

/** `export const metadata: Metadata = { ... }` bloğunu dengeli parantezle bulur. */
function findMetadataBlock(src) {
    const start = src.match(/export const metadata\s*:\s*Metadata\s*=\s*\{/)
    if (!start) return null
    const openIdx = start.index + start[0].length
    let depth = 1
    let i = openIdx
    while (i < src.length && depth > 0) {
        const ch = src[i]
        if (ch === "{") depth++
        else if (ch === "}") depth--
        i++
    }
    return { from: start.index, to: i, body: src.slice(openIdx, i - 1) }
}

/** Metadata gövdesinden üst seviye bir anahtarın ham değerini çeker. */
function extractKey(body, key) {
    const re = new RegExp(`^\\s{4}${key}\\s*:\\s*`, "m")
    const m = body.match(re)
    if (!m) return null
    let i = m.index + m[0].length
    let depth = 0
    let inStr = null
    const start = i
    while (i < body.length) {
        const ch = body[i]
        if (inStr) {
            if (ch === "\\") i++
            else if (ch === inStr) inStr = null
        } else if (ch === '"' || ch === "'" || ch === "`") {
            inStr = ch
        } else if (ch === "[" || ch === "{" || ch === "(") {
            depth++
        } else if (ch === "]" || ch === "}" || ch === ")") {
            if (depth === 0) break
            depth--
        } else if (ch === "," && depth === 0) {
            break
        }
        i++
    }
    return body.slice(start, i).trim()
}

/** Breadcrumb <nav> bloğunu bulur ve kırıntıları çıkarır. */
function findBreadcrumb(src) {
    const navStart = src.indexOf("<nav")
    if (navStart === -1) return null
    const navEnd = src.indexOf("</nav>", navStart)
    if (navEnd === -1) return null
    const block = src.slice(navStart, navEnd + "</nav>".length)
    if (!block.includes("Ana Sayfa")) return null

    const items = []
    const linkRe = /<Link\s+href="(\/[^"]*)"[^>]*>([\s\S]*?)<\/Link>/g
    let m
    while ((m = linkRe.exec(block))) {
        const path = m[1]
        const label = m[2].replace(/<[^>]+>/g, "").replace(/\{[^}]*\}/g, "").trim()
        if (path === "/" || !label) continue
        items.push({ name: label, path })
    }
    const spanMatches = [...block.matchAll(/<span[^>]*>([\s\S]*?)<\/span>/g)]
    const last = spanMatches.at(-1)
    if (last) {
        const label = last[1].replace(/<[^>]+>/g, "").trim()
        if (label) items.push({ name: label })
    }
    if (items.length === 0) return null
    return { from: navStart, to: navEnd + "</nav>".length, items }
}

function itemsLiteral(items) {
    const inner = items
        .map((it) =>
            it.path
                ? `                { name: ${JSON.stringify(it.name)}, path: ${JSON.stringify(it.path)} },`
                : `                { name: ${JSON.stringify(it.name)} },`
        )
        .join("\n")
    return `[\n${inner}\n            ]`
}

/** "KDV Hesaplama - KDV Dahil/Hariç Hesaplayıcı" → "KDV Hesaplama" */
function toolNameFromTitle(rawTitle) {
    return rawTitle.replace(/^["'`]|["'`]$/g, "").split(/\s+[-–|]\s+/)[0].trim()
}

/** Sadece kesin olarak kullanılmayan hale gelen import'ları temizler. */
function cleanupImports(src) {
    let out = src

    if (!/:\s*Metadata\b/.test(out)) {
        out = out.replace(/import\s+(?:type\s+)?\{\s*Metadata\s*\}\s*from\s*"next"\r?\n/, "")
    }

    out = out.replace(/import\s*\{([^}]*)\}\s*from\s*"lucide-react"\r?\n/, (full, names) => {
        const rest = out.replace(full, "")
        const kept = names
            .split(",")
            .map((n) => n.trim())
            .filter(Boolean)
            .filter((n) => new RegExp(`<${n}[\\s/>]`).test(rest))
        return kept.length ? `import { ${kept.join(", ")} } from "lucide-react"\n` : ""
    })

    const withoutLinkImport = out.replace(/import\s+Link\s+from\s*"next\/link"\r?\n/, "")
    if (!/<Link[\s/>]/.test(withoutLinkImport)) out = withoutLinkImport

    return out
}

function addImports(src, imports) {
    const missing = imports.filter((imp) => !src.includes(imp))
    if (missing.length === 0) return src
    const lines = src.split("\n")
    let lastImport = -1
    for (let i = 0; i < lines.length; i++) if (/^import\s/.test(lines[i])) lastImport = i
    if (lastImport === -1) return `${missing.join("\n")}\n${src}`
    lines.splice(lastImport + 1, 0, ...missing)
    return lines.join("\n")
}

function routePathFor(file) {
    const p = relative("app", file).replace(/\/page\.tsx$/, "")
    return p === "page.tsx" ? "/" : `/${p}`
}

const files = globSync("app/**/page.tsx").sort()
const report = []

for (const file of files) {
    const routePath = routePathFor(file)
    if (routePath === "/") continue // ana sayfa elle ele alınıyor

    let src = readFileSync(file, "utf8")
    const original = src

    const segments = routePath.split("/").filter(Boolean)
    const categorySlug = CATEGORY_SLUGS.includes(segments[0]) ? segments[0] : null
    const isCategoryPage = categorySlug !== null && segments.length === 1
    const isToolPage = categorySlug !== null && segments.length === 2

    const meta = findMetadataBlock(src)
    if (!meta) {
        report.push([file, "SKIP: metadata bloğu yok"])
        continue
    }
    const title = extractKey(meta.body, "title")
    const description = extractKey(meta.body, "description")
    const keywords = extractKey(meta.body, "keywords")
    if (!title || !description) {
        report.push([file, "SKIP: title/description okunamadı"])
        continue
    }

    const toolName = toolNameFromTitle(title)
    const metaCall = [
        "export const metadata = buildMetadata({",
        `    title: ${title},`,
        `    description: ${description},`,
        ...(keywords ? [`    keywords: ${keywords},`] : []),
        `    path: ${JSON.stringify(routePath)},`,
        `    ogImageAlt: ${JSON.stringify(`${toolName} - ücretsiz online hesaplama aracı`)},`,
        "})",
    ].join("\n")

    src = src.slice(0, meta.from) + metaCall + src.slice(meta.to)

    const crumb = findBreadcrumb(src)
    if (crumb) {
        src =
            src.slice(0, crumb.from) +
            `<Breadcrumb items={${itemsLiteral(crumb.items)}} />` +
            src.slice(crumb.to)
    }

    const newImports = ['import { buildMetadata } from "@/lib/seo"']
    if (crumb) newImports.push('import { Breadcrumb } from "@/components/layout/breadcrumb"')

    if ((isToolPage || isCategoryPage) && crumb) {
        newImports.push('import { JsonLd } from "@/components/seo/json-ld"')

        let jsonLdJsx
        if (isToolPage) {
            newImports.push('import { calculatorSchema } from "@/lib/schema"')
            jsonLdJsx = [
                "<JsonLd",
                "                data={calculatorSchema({",
                `                    name: ${JSON.stringify(toolName)},`,
                `                    description: ${description},`,
                `                    path: ${JSON.stringify(routePath)},`,
                `                    applicationCategory: ${JSON.stringify(APP_CATEGORY[categorySlug])},`,
                "                })}",
                "            />",
                "            ",
            ].join("\n")
        } else {
            newImports.push('import { collectionPageSchema } from "@/lib/schema"')
            newImports.push('import { categories } from "@/config/site-data"')
            jsonLdJsx = [
                "<JsonLd",
                "                data={collectionPageSchema(",
                `                    ${JSON.stringify(toolName)},`,
                `                    ${description},`,
                `                    ${JSON.stringify(routePath)},`,
                `                    (categories.find((c) => c.slug === ${JSON.stringify(categorySlug)})?.tools ?? [])`,
                "                        .filter((t) => !t.externalUrl)",
                `                        .map((t) => ({ name: t.name, path: \`${routePath}/\${t.slug}\`, description: t.description }))`,
                "                )}",
                "            />",
                "            ",
            ].join("\n")
        }

        src = src.replace("<Breadcrumb items={", jsonLdJsx + "<Breadcrumb items={")
    }

    src = addImports(src, newImports)
    src = cleanupImports(src)

    if (src !== original) {
        if (!DRY) writeFileSync(file, src, "utf8")
        report.push([file, `OK   ${isToolPage ? "tool " : isCategoryPage ? "cat  " : "stat "} crumbs=${crumb ? crumb.items.length : 0}`])
    }
}

for (const [f, msg] of report) console.log(msg.startsWith("OK") ? `  ${msg}  ${f}` : `! ${msg}  ${f}`)
console.log(`\n${report.filter(([, m]) => m.startsWith("OK")).length}/${files.length} dosya güncellendi${DRY ? " (dry-run)" : ""}`)
