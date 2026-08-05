/**
 * Dönüşüm sayfaları için programatik SVG üretimi.
 *
 * Görseller build sırasında `app/gorseller/birim/[slug]/route.ts` tarafından
 * statik dosyaya dökülüyor ve sayfalarda gerçek `<img alt="...">` olarak
 * gömülüyor. Inline SVG yerine dosya kullanmanın sebebi: alt metni gerçekten
 * var olsun, genişlik/yükseklik verilebilsin (CLS yok) ve görsel Google
 * Görseller'de indekslenebilsin.
 *
 * Renkler SVG'nin kendi `prefers-color-scheme` medya sorgusuyla açık/koyu
 * temaya uyum sağlar.
 */

import { convert, unitSymbol, type Unit, type UnitCategory } from "@/lib/units/registry"
import { formatShort } from "@/lib/units/format"

const WIDTH = 880
const HEIGHT = 340
const PAD_X = 64
const AXIS_Y = 196

function esc(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
}

const STYLE = `
  <style>
    .bg { fill: #ffffff; }
    .title { fill: #0f172a; font: 700 26px ui-sans-serif, system-ui, sans-serif; }
    .subtitle { fill: #475569; font: 400 15px ui-sans-serif, system-ui, sans-serif; }
    .axis { stroke: #cbd5e1; stroke-width: 2; }
    .tick { stroke: #cbd5e1; stroke-width: 2; }
    .tick-label { fill: #64748b; font: 400 13px ui-sans-serif, system-ui, sans-serif; }
    .tick-label-alt { fill: #94a3b8; font: 400 12px ui-sans-serif, system-ui, sans-serif; }
    .unit-label { fill: #475569; font: 600 13px ui-sans-serif, system-ui, sans-serif; }
    .marker { fill: #4f46e5; }
    .marker-line { stroke: #4f46e5; stroke-width: 2.5; }
    .marker-label { fill: #4f46e5; font: 700 15px ui-sans-serif, system-ui, sans-serif; }
    .marker-label-alt { fill: #0891b2; font: 700 15px ui-sans-serif, system-ui, sans-serif; }
    .chip { fill: #eef2ff; }
    .chip-text { fill: #3730a3; font: 600 14px ui-sans-serif, system-ui, sans-serif; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #020617; }
      .title { fill: #f1f5f9; }
      .subtitle { fill: #cbd5e1; }
      .axis, .tick { stroke: #334155; }
      .tick-label { fill: #94a3b8; }
      .tick-label-alt { fill: #64748b; }
      .unit-label { fill: #cbd5e1; }
      .marker, .marker-line { fill: #818cf8; stroke: #818cf8; }
      .marker-label { fill: #a5b4fc; }
      .marker-label-alt { fill: #67e8f9; }
      .chip { fill: #1e1b4b; }
      .chip-text { fill: #c7d2fe; }
    }
  </style>`

export type ScaleDiagramInput = {
    category: UnitCategory
    from: Unit
    to: Unit
    /** Ekseni oluşturan küratörlü değerler. */
    values: number[]
    /** Vurgulanacak değer. */
    current: number
}

/**
 * Küratörlü değerlerden bir dönüşüm skalası çizer: üst etiketler kaynak birim,
 * alt etiketler hedef birim, mevcut değer vurgulu. Her sayfa için farklı bir
 * grafik üretir çünkü vurgulanan nokta değişir.
 */
export function scaleDiagram({ category, from, to, values, current }: ScaleDiagramInput): string {
    const sorted = [...new Set([...values, current])].sort((a, b) => a - b)
    const min = sorted[0]
    const max = sorted[sorted.length - 1]
    const span = max - min || 1
    const innerWidth = WIDTH - PAD_X * 2

    const x = (value: number) => PAD_X + ((value - min) / span) * innerWidth

    const currentResult = convert(category, from, to, current)
    const title = `${formatShort(current)} ${unitSymbol(from)} = ${formatShort(currentResult)} ${unitSymbol(to)}`

    const ticks = sorted
        .map((value) => {
            const cx = x(value)
            const isCurrent = value === current
            if (isCurrent) return ""
            const result = convert(category, from, to, value)
            return [
                `<line class="tick" x1="${cx.toFixed(1)}" y1="${AXIS_Y - 8}" x2="${cx.toFixed(1)}" y2="${AXIS_Y + 8}" />`,
                `<text class="tick-label" x="${cx.toFixed(1)}" y="${AXIS_Y - 18}" text-anchor="middle">${esc(formatShort(value))}</text>`,
                `<text class="tick-label-alt" x="${cx.toFixed(1)}" y="${AXIS_Y + 26}" text-anchor="middle">${esc(formatShort(result))}</text>`,
            ].join("\n    ")
        })
        .join("\n    ")

    const cx = x(current)
    const marker = [
        `<line class="marker-line" x1="${cx.toFixed(1)}" y1="${AXIS_Y - 46}" x2="${cx.toFixed(1)}" y2="${AXIS_Y + 46}" />`,
        `<circle class="marker" cx="${cx.toFixed(1)}" cy="${AXIS_Y}" r="7" />`,
        `<text class="marker-label" x="${cx.toFixed(1)}" y="${AXIS_Y - 56}" text-anchor="middle">${esc(`${formatShort(current)} ${unitSymbol(from)}`)}</text>`,
        `<text class="marker-label-alt" x="${cx.toFixed(1)}" y="${AXIS_Y + 70}" text-anchor="middle">${esc(`${formatShort(currentResult)} ${unitSymbol(to)}`)}</text>`,
    ].join("\n    ")

    const oneUnit = convert(category, from, to, 1)
    const formulaText =
        category.slug === "sicaklik"
            ? `${from.ad} → ${to.ad} dönüşümü sabit çarpanla değil, kaydırmalı formülle yapılır`
            : `1 ${unitSymbol(from)} = ${formatShort(oneUnit)} ${unitSymbol(to)}`

    const accessibleTitle = `${formatShort(current)} ${from.kisaltma} kaç ${to.kisaltma} — dönüşüm skalası`
    const accessibleDesc = `${formatShort(current)} ${from.ad} birimi ${formatShort(currentResult)} ${to.ad} birimine eşittir. Grafik, ${formatShort(min)} ile ${formatShort(max)} ${unitSymbol(from)} aralığındaki dönüşüm değerlerini gösterir.`

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}" role="img" aria-labelledby="t d">
  <title id="t">${esc(accessibleTitle)}</title>
  <desc id="d">${esc(accessibleDesc)}</desc>
  ${STYLE}
  <rect class="bg" width="${WIDTH}" height="${HEIGHT}" rx="16" />
  <text class="title" x="${PAD_X}" y="52">${esc(title)}</text>
  <text class="subtitle" x="${PAD_X}" y="80">${esc(formulaText)}</text>

  <text class="unit-label" x="${PAD_X}" y="${AXIS_Y - 18}" text-anchor="end" dx="-14">${esc(unitSymbol(from))}</text>
  <text class="unit-label" x="${PAD_X}" y="${AXIS_Y + 26}" text-anchor="end" dx="-14">${esc(unitSymbol(to))}</text>

  <line class="axis" x1="${PAD_X}" y1="${AXIS_Y}" x2="${WIDTH - PAD_X}" y2="${AXIS_Y}" />
  ${ticks}
  ${marker}

  <rect class="chip" x="${PAD_X}" y="${HEIGHT - 52}" width="${innerWidth}" height="34" rx="10" />
  <text class="chip-text" x="${PAD_X + 16}" y="${HEIGHT - 29}">${esc(`hesaplamamakinesi.com · ${category.ad} dönüşümü`)}</text>
</svg>
`
}

/** Çift merkezi (hub) sayfası için: vurgusuz, tüm aralığı gösteren skala. */
export function hubDiagram(input: Omit<ScaleDiagramInput, "current">): string {
    const middle = input.values[Math.floor(input.values.length / 2)]
    return scaleDiagram({ ...input, current: middle })
}

export const DIAGRAM_WIDTH = WIDTH
export const DIAGRAM_HEIGHT = HEIGHT
