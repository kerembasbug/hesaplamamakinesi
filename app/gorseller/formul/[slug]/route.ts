import { formulaDiagram } from "@/lib/formula-diagram"
import { allFormulaSlugs, getFormula } from "@/lib/formulas"

/** Formül kartlarını build sırasında statik SVG dosyalarına döker. */
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
    return allFormulaSlugs().map((slug) => ({ slug: `${slug}.svg` }))
}

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
    const { slug } = await context.params
    const formula = getFormula(slug.replace(/\.svg$/, ""))

    if (!formula) return new Response("Not found", { status: 404 })

    return new Response(formulaDiagram(formula), {
        headers: {
            "Content-Type": "image/svg+xml; charset=utf-8",
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    })
}
