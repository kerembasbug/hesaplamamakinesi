import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og"
import { formatResult, trNumber } from "@/lib/units/format"
import { convert } from "@/lib/units/registry"
import { allUnitSlugs, resolveSlug } from "@/lib/units/routes"

export const alt = "Birim dönüşümü"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
    return allUnitSlugs().map((slug) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const resolved = resolveSlug(slug)

    if (!resolved) {
        return renderOgCard({ title: "Birim Çevirici", plate: "birim" })
    }

    const { category, from, to } = resolved

    if (resolved.type === "value") {
        const result = convert(category, from, to, resolved.value)
        return renderOgCard({
            eyebrow: `${category.ad} dönüşümü`,
            title: `${trNumber(resolved.value)} ${from.kisaltma} = ${formatResult(result)} ${to.kisaltma}`,
            subtitle: `${trNumber(resolved.value)} ${from.kisaltma} kaç ${to.kisaltma} eder?`,
            plate: "birim",
        })
    }

    const factor = convert(category, from, to, 1)
    return renderOgCard({
        eyebrow: `${category.ad} dönüşümü`,
        title: `${from.ad} ${to.ad} Çevirici`,
        subtitle:
            category.slug === "sicaklik"
                ? `${from.ad} ve ${to.ad} arasında anında dönüşüm`
                : `1 ${from.kisaltma} = ${formatResult(factor)} ${to.kisaltma}`,
        plate: "birim",
    })
}
