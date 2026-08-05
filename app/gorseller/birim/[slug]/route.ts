import { hubDiagram, scaleDiagram } from "@/lib/units/diagram"
import { allUnitSlugs, resolveSlug } from "@/lib/units/routes"

/**
 * Dönüşüm skalası görsellerini build sırasında statik SVG dosyalarına döker.
 * `force-static` + `generateStaticParams` sayesinde çalışma anında sunucu
 * yükü oluşturmaz; sayfalar bunları `<img src="/gorseller/birim/....svg">`
 * olarak kullanır.
 */
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
    return allUnitSlugs().map((slug) => ({ slug: `${slug}.svg` }))
}

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
    const { slug } = await context.params
    const resolved = resolveSlug(slug.replace(/\.svg$/, ""))

    if (!resolved) {
        return new Response("Not found", { status: 404 })
    }

    const { category, from, to, pair } = resolved
    const svg =
        resolved.type === "value"
            ? scaleDiagram({ category, from, to, values: pair.degerler, current: resolved.value })
            : hubDiagram({ category, from, to, values: pair.degerler })

    return new Response(svg, {
        headers: {
            "Content-Type": "image/svg+xml; charset=utf-8",
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    })
}
