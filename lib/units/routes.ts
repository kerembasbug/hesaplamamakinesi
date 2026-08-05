/**
 * `/birim/[slug]` rotasının slug sözlüğü ve çözümleyicisi.
 *
 * İki şablon tek dinamik segmentte yaşıyor:
 *   değer sayfası :  /birim/180-cm-kac-feet      → "180 cm kaç feet"
 *   çift merkezi  :  /birim/cm-feet-cevirici     → "cm feet çevirici"
 *
 * Birim slug'ları tire içermediği için iki kalıp çakışmaz. `generateStaticParams`
 * yalnızca burada üretilen slug'ları döndürür ve rota `dynamicParams = false`
 * kullanır; yani listede olmayan hiçbir URL var olmaz.
 */

import { pairs, type Pair } from "@/lib/units/pairs"
import { getUnit, getUnitCategory, type Unit, type UnitCategory } from "@/lib/units/registry"

export const UNIT_ROUTE_PREFIX = "/birim"

export function valueSlug(pair: Pick<Pair, "from" | "to">, value: number): string {
    return `${value}-${pair.from}-kac-${pair.to}`
}

export function hubSlug(pair: Pick<Pair, "from" | "to">): string {
    return `${pair.from}-${pair.to}-cevirici`
}

export function valuePath(pair: Pick<Pair, "from" | "to">, value: number): string {
    return `${UNIT_ROUTE_PREFIX}/${valueSlug(pair, value)}`
}

export function hubPath(pair: Pick<Pair, "from" | "to">): string {
    return `${UNIT_ROUTE_PREFIX}/${hubSlug(pair)}`
}

export type ResolvedHub = {
    type: "hub"
    pair: Pair
    category: UnitCategory
    from: Unit
    to: Unit
}

export type ResolvedValue = {
    type: "value"
    pair: Pair
    category: UnitCategory
    from: Unit
    to: Unit
    value: number
}

export type Resolved = ResolvedHub | ResolvedValue

const VALUE_RE = /^(\d+)-([a-z]+)-kac-([a-z]+)$/
const HUB_RE = /^([a-z]+)-([a-z]+)-cevirici$/

function hydrate(pair: Pair) {
    const category = getUnitCategory(pair.kategori)
    const from = getUnit(pair.kategori, pair.from)
    const to = getUnit(pair.kategori, pair.to)
    if (!category || !from || !to) return null
    return { category, from, to }
}

export function resolveSlug(slug: string): Resolved | null {
    const valueMatch = slug.match(VALUE_RE)
    if (valueMatch) {
        const [, rawValue, from, to] = valueMatch
        const value = Number(rawValue)
        const pair = pairs.find((p) => p.from === from && p.to === to)
        if (!pair || !pair.degerler.includes(value)) return null
        const parts = hydrate(pair)
        if (!parts) return null
        return { type: "value", pair, value, ...parts }
    }

    const hubMatch = slug.match(HUB_RE)
    if (hubMatch) {
        const [, from, to] = hubMatch
        const pair = pairs.find((p) => p.from === from && p.to === to)
        if (!pair) return null
        const parts = hydrate(pair)
        if (!parts) return null
        return { type: "hub", pair, ...parts }
    }

    return null
}

/** Sitemap ve generateStaticParams için tüm slug'lar. */
export function allUnitSlugs(): string[] {
    const slugs: string[] = []
    for (const pair of pairs) {
        slugs.push(hubSlug(pair))
        for (const value of pair.degerler) slugs.push(valueSlug(pair, value))
    }
    return slugs
}

export function allUnitPaths(): string[] {
    return allUnitSlugs().map((slug) => `${UNIT_ROUTE_PREFIX}/${slug}`)
}

/** Bir değerin listedeki komşuları — "civarı değerler" tablosu ve iç link için. */
export function neighbourValues(pair: Pair, value: number, span = 3): number[] {
    const index = pair.degerler.indexOf(value)
    if (index === -1) return pair.degerler.slice(0, span * 2)
    const start = Math.max(0, index - span)
    return pair.degerler.slice(start, start + span * 2 + 1).filter((v) => v !== value)
}
