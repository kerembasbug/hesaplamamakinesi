import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbSchema, type BreadcrumbItem } from "@/lib/schema"

type BreadcrumbProps = {
    /**
     * "Ana Sayfa" hariç kırıntılar. Son öğe mevcut sayfadır ve `path` almaz.
     * Örn: [{ name: "Vergi & Muhasebe", path: "/vergi-muhasebe" }, { name: "KDV Hesaplama" }]
     */
    items: BreadcrumbItem[]
}

/**
 * Görsel breadcrumb + BreadcrumbList JSON-LD'sini tek yerden üretir.
 * Daha önce 79 sayfada kopyalanmış olan JSX'in yerini alır.
 */
export function Breadcrumb({ items }: BreadcrumbProps) {
    const all: BreadcrumbItem[] = [{ name: "Ana Sayfa", path: "/" }, ...items]

    return (
        <>
            <JsonLd data={breadcrumbSchema(all)} />
            <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    {all.map((item, index) => {
                        const isLast = index === all.length - 1
                        return (
                            <li key={`${item.name}-${index}`} className="flex items-center gap-2">
                                {index > 0 && <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />}
                                {isLast || !item.path ? (
                                    <span className="font-medium text-slate-900 dark:text-white" aria-current="page">
                                        {item.name}
                                    </span>
                                ) : (
                                    <Link
                                        href={item.path}
                                        className="flex items-center gap-1 transition-colors hover:text-indigo-600"
                                    >
                                        {index === 0 && <Home className="h-4 w-4 shrink-0" aria-hidden="true" />}
                                        {item.name}
                                    </Link>
                                )}
                            </li>
                        )
                    })}
                </ol>
            </nav>
        </>
    )
}
