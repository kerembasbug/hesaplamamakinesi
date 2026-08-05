/**
 * Hesaplayıcı sayfaları için formül kartı SVG'si.
 *
 * Formülü, değişken açıklamalarını ve gerçek sayılarla bir örnek hesabı tek
 * görselde toplar. Açık/koyu temaya SVG'nin kendi medya sorgusuyla uyum sağlar.
 */

import type { Formula } from "@/lib/formulas"

const WIDTH = 880
const HEIGHT = 460

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
    .panel { fill: #f8fafc; }
    .formula-box { fill: #eef2ff; }
    .title { fill: #0f172a; font: 700 26px ui-sans-serif, system-ui, sans-serif; }
    .formula { fill: #3730a3; font: 700 30px ui-monospace, SFMono-Regular, Menlo, monospace; }
    .label { fill: #4f46e5; font: 600 15px ui-sans-serif, system-ui, sans-serif; }
    .sym { fill: #0f172a; font: 600 16px ui-monospace, SFMono-Regular, Menlo, monospace; }
    .text { fill: #475569; font: 400 16px ui-sans-serif, system-ui, sans-serif; }
    .muted { fill: #64748b; font: 400 14px ui-sans-serif, system-ui, sans-serif; }
    .rule { stroke: #e2e8f0; stroke-width: 1.5; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #020617; }
      .panel { fill: #0f172a; }
      .formula-box { fill: #1e1b4b; }
      .title { fill: #f1f5f9; }
      .formula { fill: #c7d2fe; }
      .label { fill: #a5b4fc; }
      .sym { fill: #e2e8f0; }
      .text { fill: #cbd5e1; }
      .muted { fill: #94a3b8; }
      .rule { stroke: #1e293b; }
    }
  </style>`

export function formulaDiagram(formula: Formula): string {
    const varsY = 190
    const varRows = formula.degiskenler
        .slice(0, 3)
        .map((v, i) => {
            const y = varsY + i * 30
            return [
                `<text class="sym" x="64" y="${y}">${esc(v.sembol)}</text>`,
                `<text class="text" x="230" y="${y}">${esc(v.aciklama)}</text>`,
            ].join("\n  ")
        })
        .join("\n  ")

    const exampleY = 330
    const exampleRows = formula.ornek
        .slice(0, 3)
        .map((o, i) => {
            const y = exampleY + i * 30
            return [
                `<text class="text" x="64" y="${y}">${esc(o.adim)}</text>`,
                `<text class="sym" x="600" y="${y}">${esc(o.sonuc)}</text>`,
            ].join("\n  ")
        })
        .join("\n  ")

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}" role="img" aria-labelledby="ft fd">
  <title id="ft">${esc(formula.baslik)}</title>
  <desc id="fd">${esc(`${formula.formul}. ${formula.degiskenler.map((v) => `${v.sembol}: ${v.aciklama}`).join(". ")}`)}</desc>
  ${STYLE}
  <rect class="bg" width="${WIDTH}" height="${HEIGHT}" rx="16" />
  <text class="title" x="64" y="58">${esc(formula.baslik)}</text>

  <rect class="formula-box" x="48" y="80" width="${WIDTH - 96}" height="62" rx="12" />
  <text class="formula" x="72" y="121">${esc(formula.formul)}</text>

  <text class="label" x="64" y="${varsY - 26}">Değişkenler</text>
  ${varRows}

  <line class="rule" x1="48" y1="${exampleY - 56}" x2="${WIDTH - 48}" y2="${exampleY - 56}" />
  <text class="label" x="64" y="${exampleY - 26}">Örnek hesap</text>
  ${exampleRows}

  ${formula.not ? `<text class="muted" x="64" y="${HEIGHT - 30}">${esc(formula.not)}</text>` : ""}
  <text class="muted" x="${WIDTH - 64}" y="${HEIGHT - 30}" text-anchor="end">hesaplamamakinesi.com</text>
</svg>
`
}

export const FORMULA_WIDTH = WIDTH
export const FORMULA_HEIGHT = HEIGHT
