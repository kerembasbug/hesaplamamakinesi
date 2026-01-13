import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategoryBySlug } from "@/config/site-data"

export const metadata: Metadata = {
    title: "Birim Dönüştürücü Araçları - Uzunluk, Ağırlık, Alan, Hacim",
    description: "Ücretsiz birim dönüştürücü araçları. Uzunluk, ağırlık, alan, hacim, sıcaklık ve veri birimi dönüştürme.",
    keywords: ["birim dönüştürücü", "uzunluk dönüştürme", "ağırlık dönüştürme", "alan dönüştürme", "hacim dönüştürme"]
}

export default function DonusturuculerPage() {
    const category = getCategoryBySlug("donusturuculer")
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
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-900/30">
                        <category.icon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{category.name}</h1>
                        <p className="text-slate-600 dark:text-slate-400">{category.description}</p>
                    </div>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {category.tools.map((tool) => (
                    <Link key={tool.slug} href={`/${category.slug}/${tool.slug}`}>
                        <Card className="h-full border-slate-200 dark:border-slate-800 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900/30">
                                        <tool.icon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
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
                <h2>Birim Dönüştürme Araçları</h2>
                <p>Birim dönüştürücülerimiz metre-feet, kilogram-pound, litre-galon gibi birim dönüşümlerini kolaylaştırır.</p>

                <h2>Desteklenen Birim Türleri</h2>
                <ul>
                    <li><strong>Uzunluk:</strong> Metre, kilometre, mil, feet, inç</li>
                    <li><strong>Ağırlık:</strong> Kilogram, gram, pound, ons</li>
                    <li><strong>Alan:</strong> Metrekare, hektar, dönüm, feet kare</li>
                    <li><strong>Hacim:</strong> Litre, mililitre, galon, barel</li>
                </ul>
            </article>
        </div>
    )
}
