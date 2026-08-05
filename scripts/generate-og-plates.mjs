#!/usr/bin/env node
/**
 * OG kartlarının arka plan plakalarını fal.ai ile bir kez üretir.
 *
 * Plakalar `public/gorseller/og/` altına kaydedilir; opengraph-image.tsx
 * dosyaları başlık metnini bu plakanın üstüne bindirir. Böylece 600+ sayfanın
 * her biri benzersiz bir OG kartı alır ama fal.ai yalnızca 10 kez çalışır.
 *
 * Kullanım:
 *   FAL_KEY=... node scripts/generate-og-plates.mjs [--force]
 *
 * Var olan dosyalar --force verilmedikçe yeniden üretilmez.
 */

import { mkdirSync, existsSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

const FAL_KEY = process.env.FAL_KEY
if (!FAL_KEY) {
    console.error("FAL_KEY tanımlı değil. Örnek: FAL_KEY=... node scripts/generate-og-plates.mjs")
    process.exit(1)
}

const FORCE = process.argv.includes("--force")
const OUT_DIR = join(process.cwd(), "public", "gorseller", "og")

const COMMON =
    "abstract background texture for a website social card, minimal, clean, professional, " +
    "subtle geometric grid, soft depth of field glow, no text, no letters, no numbers, no watermark, " +
    "left half darker and calmer so white headline text stays readable"

const PLATES = [
    { name: "default", prompt: `deep navy and indigo gradient with faint calculator keypad grid, ${COMMON}` },
    { name: "finans", prompt: `deep emerald and teal gradient with faint rising line chart and coin silhouettes, ${COMMON}` },
    { name: "vergi-muhasebe", prompt: `deep slate blue gradient with faint document and ledger grid patterns, ${COMMON}` },
    { name: "saglik-spor", prompt: `deep rose and crimson gradient with faint heartbeat ECG line and leaf shapes, ${COMMON}` },
    { name: "matematik-egitim", prompt: `deep violet gradient with faint geometry compass arcs and graph paper grid, ${COMMON}` },
    { name: "zaman-takvim", prompt: `deep amber and bronze gradient with faint clock dial arcs and calendar grid, ${COMMON}` },
    { name: "donusturuculer", prompt: `deep cyan gradient with faint ruler ticks and measuring scale marks, ${COMMON}` },
    { name: "birim", prompt: `deep cyan and indigo gradient with faint measurement scale and conversion arrows, ${COMMON}` },
    { name: "seyahat", prompt: `deep sky blue gradient with faint route line and map contour shapes, ${COMMON}` },
    { name: "astroloji", prompt: `deep midnight purple gradient with faint constellation dots and zodiac circle, ${COMMON}` },
]

mkdirSync(OUT_DIR, { recursive: true })

async function generate({ name, prompt }) {
    const file = join(OUT_DIR, `${name}.jpg`)
    if (existsSync(file) && !FORCE) {
        console.log(`  atlandı (var)  ${name}.jpg`)
        return
    }

    const res = await fetch("https://fal.run/fal-ai/flux/schnell", {
        method: "POST",
        headers: { Authorization: `Key ${FAL_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            prompt,
            image_size: { width: 1216, height: 640 },
            num_images: 1,
            num_inference_steps: 4,
            enable_safety_checker: false,
        }),
    })

    if (!res.ok) {
        console.error(`  HATA ${name}: HTTP ${res.status} ${await res.text()}`)
        return
    }

    const data = await res.json()
    const url = data?.images?.[0]?.url
    if (!url) {
        console.error(`  HATA ${name}: görsel URL'i dönmedi`)
        return
    }

    const img = await fetch(url)
    const buffer = Buffer.from(await img.arrayBuffer())
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, buffer)
    console.log(`  yazıldı        ${name}.jpg  (${Math.round(buffer.length / 1024)} KB)`)
}

for (const plate of PLATES) {
    await generate(plate)
}
console.log(`\nPlakalar: ${OUT_DIR}`)
