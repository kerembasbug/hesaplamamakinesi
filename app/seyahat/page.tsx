import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home, Plane, Car, Gauge } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
    title: "Seyahat Hesaplayıcıları - Taksi, Yakıt, HYP | HesaplamaMakinesi",
    description: "Seyahat ve ulaşım hesaplayıcıları. Taksi ücreti, hız-yakıt-para (HYP) hesaplama araçları ile gezi planlamanızı kolaylaştırın.",
    keywords: ["seyahat hesaplama", "taksi hesaplama", "hyp hesaplama", "yakıt hesaplama", "ulaşım masrafları"]
}

const tools = [
    {
        name: "Taksi Ücreti Hesaplama",
        slug: "taksi-ucreti-hesaplama",
        description: "İstanbul, Ankara ve diğer şehirlerde güncel tarifelerle taksi ücretini hesaplayın",
        icon: Car
    },
    {
        name: "HYP Hesaplama",
        slug: "hyp-hesaplama",
        description: "Hız, Yakıt ve Para tasarrufu analizi yapın. Araç seyahatlerinizi optimize edin",
        icon: Gauge
    }
]

export default function SeyahatPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                    <Home className="h-4 w-4" />
                    Ana Sayfa
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Seyahat</span>
            </nav>

            <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-900/30">
                    <Plane className="h-7 w-7 text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Seyahat Hesaplayıcıları</h1>
                    <p className="text-slate-600 dark:text-slate-400">Taksi, yakıt ve ulaşım hesaplama araçları</p>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                {tools.map((tool) => (
                    <Link key={tool.slug} href={`/seyahat/${tool.slug}`}>
                        <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-slate-200 dark:border-slate-800">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-900/30">
                                        <tool.icon className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-slate-900 dark:text-white mb-1">{tool.name}</h2>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{tool.description}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Seyahat ve Ulaşım Hesaplamaları</h2>
                <p>
                    Seyahat planlaması yaparken ulaşım masraflarını önceden hesaplamak bütçenizi yönetmenize yardımcı olur.
                    Bu kategoride taksi ücretleri, yakıt maliyetleri ve seyahat süresi hesaplama araçlarını bulabilirsiniz.
                </p>

                <h3>Taksi Ücreti Hesaplama</h3>
                <p>
                    Türkiye&apos;nin büyük şehirlerinde geçerli güncel tarifelerle taksi ücretini önceden hesaplayın.
                    Mesafe veya süre bazlı hesaplama seçenekleri mevcuttur.
                </p>

                <h3>HYP (Hız-Yakıt-Para) Hesaplama</h3>
                <p>
                    Araç seyahatlerinizde hız, yakıt tüketimi ve maliyet arasındaki ilişkiyi analiz edin.
                    Optimum hızda seyahat ederek yakıt tasarrufu sağlayabilirsiniz.
                </p>
            </article>
        </div>
    )
}
