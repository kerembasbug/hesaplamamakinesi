import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { buildMetadata } from "@/lib/seo"
import { collectionPageSchema } from "@/lib/schema"
import { pairs } from "@/lib/units/pairs"
import { unitCategories, getUnit, convert, unitSymbol } from "@/lib/units/registry"
import { hubPath, valuePath } from "@/lib/units/routes"
import { formatShort, trNumber } from "@/lib/units/format"

export const metadata = buildMetadata({
    title: "Birim Çevirici - Tüm Dönüşüm Tabloları",
    description:
        "cm feet, kg pound, santigrat fahrenheit ve daha fazlası. Tüm birim çeviricileri, hazır dönüşüm tabloları ve en çok aranan değerlerin hesapları tek sayfada.",
    keywords: ["birim çevirici", "birim dönüştürücü", "ölçü birimi çevirme", "dönüşüm tablosu", "kaç eder"],
    path: "/birim",
})

export default function BirimIndexPage() {
    const grouped = unitCategories.map((category) => ({
        category,
        pairs: pairs.filter((p) => p.kategori === category.slug),
    }))

    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={collectionPageSchema(
                    "Birim Çevirici",
                    "Tüm birim dönüşüm çeviricileri ve dönüşüm tabloları.",
                    "/birim",
                    pairs.map((p) => {
                        const from = getUnit(p.kategori, p.from)
                        const to = getUnit(p.kategori, p.to)
                        return {
                            name: `${from?.kisaltma ?? p.from} ${to?.kisaltma ?? p.to} çevirici`,
                            path: hubPath(p),
                        }
                    })
                )}
            />

            <Breadcrumb items={[{ name: "Dönüştürücüler", path: "/donusturuculer" }, { name: "Birim Çevirici" }]} />

            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">Birim Çevirici</h1>
                <p className="text-slate-600 dark:text-slate-400">
                    En çok aranan birim dönüşümleri, hazır tablolar ve adım adım hesaplarla. Bir çevirici seçin ya
                    da doğrudan aradığınız değere gidin.
                </p>
            </div>

            <div className="space-y-10">
                {grouped.map(({ category, pairs: categoryPairs }) => (
                    <section key={category.slug}>
                        <h2 className="mb-1 text-2xl font-bold text-slate-900 dark:text-white">
                            {category.ad} Dönüşümleri
                        </h2>
                        <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">{category.aciklama}</p>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {categoryPairs.map((pair) => {
                                const from = getUnit(pair.kategori, pair.from)
                                const to = getUnit(pair.kategori, pair.to)
                                if (!from || !to) return null
                                const factor = convert(category, from, to, 1)

                                return (
                                    <Card key={`${pair.from}-${pair.to}`} className="transition-shadow hover:shadow-md">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-lg">
                                                <Link
                                                    href={hubPath(pair)}
                                                    className="text-slate-900 hover:text-indigo-600 dark:text-white"
                                                >
                                                    {from.kisaltma} {to.kisaltma} Çevirici
                                                    <ArrowRight className="ml-1 inline h-4 w-4" aria-hidden="true" />
                                                </Link>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
                                                {category.slug === "sicaklik"
                                                    ? `${from.ad} → ${to.ad} dönüşümü`
                                                    : `1 ${unitSymbol(from)} = ${formatShort(factor)} ${unitSymbol(to)}`}
                                            </p>
                                            <ul className="flex flex-wrap gap-2">
                                                {pair.degerler.slice(0, 6).map((v) => (
                                                    <li key={v}>
                                                        <Link
                                                            href={valuePath(pair, v)}
                                                            className="inline-block rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700 transition-colors hover:bg-indigo-100 hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-indigo-950 dark:hover:text-indigo-300"
                                                        >
                                                            {trNumber(v)} {from.kisaltma} kaç {to.kisaltma}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}
