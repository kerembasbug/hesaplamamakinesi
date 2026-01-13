import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategoryBySlug } from "@/config/site-data"

export const metadata: Metadata = {
    title: "Zaman & Takvim Hesaplama Araçları - Tarih, Yaş, Gebelik",
    description: "Ücretsiz zaman ve takvim hesaplama araçları. Tarih farkı, yaş hesaplama, gebelik hesaplama, gün sayacı ve çalışma saati hesaplama.",
    keywords: ["tarih hesaplama", "yaş hesaplama", "gebelik hesaplama", "gün hesaplama", "takvim hesaplama"]
}

export default function ZamanTakvimPage() {
    const category = getCategoryBySlug("zaman-takvim")
    if (!category) return <div>Kategori bulunamadı</div>

    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">{category.name}</span>
            </nav>

            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
                        <category.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{category.name} Hesaplama Araçları</h1>
                        <p className="text-slate-600 dark:text-slate-400">{category.description}</p>
                    </div>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {category.tools.map((tool) => (
                    <Link key={tool.slug} href={`/${category.slug}/${tool.slug}`}>
                        <Card className="h-full border-slate-200 dark:border-slate-800 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                        <tool.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent><CardDescription>{tool.description}</CardDescription></CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <article className="prose prose-slate dark:prose-invert max-w-none">
                <h2>Zaman ve Takvim Hesaplamaları</h2>
                <p>Tarih ve zaman hesaplama araçlarımız, iki tarih arası gün sayısı, yaş hesaplama, gebelik takibi gibi hesaplamaları kolaylaştırır.</p>
            </article>
        </div>
    )
}
