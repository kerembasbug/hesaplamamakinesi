import type { JsonLdNode } from "@/lib/schema"

type JsonLdProps = {
    /** Tek düğüm ya da düğüm dizisi. Dizi tek bir @graph olarak basılır. */
    data: JsonLdNode | JsonLdNode[]
}

/**
 * JSON-LD'yi tek bir @graph içinde basar. Birden fazla ayrı <script> yerine
 * tek graph kullanmak düğümler arası @id referanslarının çözülmesini sağlar.
 */
export function JsonLd({ data }: JsonLdProps) {
    const nodes = Array.isArray(data) ? data : [data]
    if (nodes.length === 0) return null

    const graph = {
        "@context": "https://schema.org",
        "@graph": nodes,
    }

    return (
        <script
            type="application/ld+json"
            // Schema verisi kendi kodumuzdan geliyor, kullanıcı girdisi değil.
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
            }}
        />
    )
}
