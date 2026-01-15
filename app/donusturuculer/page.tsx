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
                <p>
                    Birim dönüştürücülerimiz metre-feet, kilogram-pound, litre-galon gibi birim dönüşümlerini
                    kolaylaştırır. Metrik ve emperyal sistemler arasında hızlı çeviri yapın.
                </p>

                <h3>Desteklenen Birim Türleri</h3>

                <h4>Uzunluk Dönüştürücü</h4>
                <p>
                    Metre, kilometre, santimetre, milimetre, mil, yard, feet ve inç arasında dönüşüm yapın.
                    İnşaat, spor ve günlük hayatta sıkça kullanılan ölçü birimleri.
                </p>

                <h4>Ağırlık Dönüştürücü</h4>
                <p>
                    Kilogram, gram, miligram, ton, pound, ons ve karat arasında çeviri. Gıda, kuyumculuk
                    ve lojistik sektörleri için önemli dönüşümler.
                </p>

                <h4>Sıcaklık Dönüştürücü</h4>
                <p>
                    Celsius, Fahrenheit ve Kelvin arasında dönüşüm. Hava durumu, yemek tarifleri ve
                    bilimsel çalışmalar için sıcaklık çevirisi.
                </p>

                <h4>Alan Dönüştürücü</h4>
                <p>
                    Metrekare, hektar, dönüm, ar ve feet kare arasında dönüşüm. Türkiye&apos;de yaygın
                    kullanılan dönüm birimi de dahil.
                </p>

                <h4>Hız Dönüştürücü</h4>
                <p>
                    km/saat, mil/saat (mph), m/saniye ve knot arasında dönüşüm. Trafik, havacılık
                    ve denizcilik için önemli hız birimleri.
                </p>

                <h4>Veri Boyutu Dönüştürücü</h4>
                <p>
                    Byte, KB, MB, GB, TB ve PB arasında çeviri. Bilgisayar ve internet kullanıcıları
                    için veri depolama birimleri dönüşümü.
                </p>

                <h3>Metrik ve Emperyal Sistem</h3>
                <p>
                    Dünyada iki ana ölçü sistemi kullanılır: Metrik sistem (SI) çoğu ülkede standarttır
                    ve 10&apos;luk tabana dayanır. Emperyal sistem ise ABD, İngiltere ve birkaç ülkede
                    kullanılır. Türkiye metrik sistemi resmi olarak kullanmaktadır.
                </p>

                <h3>Sıkça Sorulan Sorular</h3>

                <h4>1 mil kaç kilometre?</h4>
                <p>
                    1 mil = 1.60934 kilometre. Tersine, 1 kilometre = 0.621371 mil.
                </p>

                <h4>1 pound kaç kilogram?</h4>
                <p>
                    1 pound (lb) = 0.453592 kilogram. Tersine, 1 kilogram = 2.20462 pound.
                </p>

                <h4>Fahrenheit&apos;ı Celsius&apos;a nasıl çevirim?</h4>
                <p>
                    Formül: °C = (°F - 32) × 5/9. Örneğin, 77°F = (77-32) × 5/9 = 25°C.
                </p>

                <h4>1 dönüm kaç metrekare?</h4>
                <p>
                    Türkiye&apos;de 1 dönüm = 1000 metrekare olarak kabul edilir. Bazı bölgelerde
                    eski (yerel) dönüm ölçüleri farklı olabilir.
                </p>
            </article>
        </div>
    )
}
