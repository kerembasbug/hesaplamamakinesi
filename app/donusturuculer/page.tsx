import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategoryBySlug } from "@/config/site-data"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { collectionPageSchema } from "@/lib/schema"
import { categories } from "@/config/site-data"
import { BirimCeviriciLinkleri } from "@/components/content/birim-cevirici-linkleri"

export const metadata = buildMetadata({
    title: "Birim Dönüştürücü Araçları",
    description: "Ücretsiz birim dönüştürücü araçları: uzunluk, ağırlık, alan, hacim, sıcaklık, hız ve veri boyutu dönüşümü. Hazır dönüşüm tablolarıyla anında sonuç.",
    keywords: ["birim dönüştürücü", "uzunluk dönüştürme", "ağırlık dönüştürme", "alan dönüştürme", "hacim dönüştürme"],
    path: "/donusturuculer",
})

export default function DonusturuculerPage() {
    const category = getCategoryBySlug("donusturuculer")
    if (!category) return <div>Kategori bulunamadı</div>

    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={collectionPageSchema(
                    "Birim Dönüştürücü",
                    "Ücretsiz birim dönüştürücü araçları. Uzunluk, ağırlık, alan, hacim, sıcaklık ve veri birimi dönüştürme.",
                    "/donusturuculer",
                    (categories.find((c) => c.slug === "donusturuculer")?.tools ?? [])
                        .filter((t) => !t.externalUrl)
                        .map((t) => ({ name: t.name, path: `/donusturuculer/${t.slug}`, description: t.description }))
                )}
            />
            <Breadcrumb items={[
                { name: category.name },
            ]} />

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

                <h2>Desteklenen Birim Türleri</h2>

                <h2>Uzunluk Dönüştürücü</h2>
                <p>
                    Metre, kilometre, santimetre, milimetre, mil, yard, feet ve inç arasında dönüşüm yapın.
                    İnşaat, spor ve günlük hayatta sıkça kullanılan ölçü birimleri.
                </p>

                <h2>Ağırlık Dönüştürücü</h2>
                <p>
                    Kilogram, gram, miligram, ton, pound, ons ve karat arasında çeviri. Gıda, kuyumculuk
                    ve lojistik sektörleri için önemli dönüşümler.
                </p>

                <h2>Sıcaklık Dönüştürücü</h2>
                <p>
                    Celsius, Fahrenheit ve Kelvin arasında dönüşüm. Hava durumu, yemek tarifleri ve
                    bilimsel çalışmalar için sıcaklık çevirisi.
                </p>

                <h2>Alan Dönüştürücü</h2>
                <p>
                    Metrekare, hektar, dönüm, ar ve feet kare arasında dönüşüm. Türkiye&apos;de yaygın
                    kullanılan dönüm birimi de dahil.
                </p>

                <h2>Hız Dönüştürücü</h2>
                <p>
                    km/saat, mil/saat (mph), m/saniye ve knot arasında dönüşüm. Trafik, havacılık
                    ve denizcilik için önemli hız birimleri.
                </p>

                <h2>Veri Boyutu Dönüştürücü</h2>
                <p>
                    Byte, KB, MB, GB, TB ve PB arasında çeviri. Bilgisayar ve internet kullanıcıları
                    için veri depolama birimleri dönüşümü.
                </p>

                <h2>Metrik ve Emperyal Sistem</h2>
                <p>
                    Dünyada iki ana ölçü sistemi kullanılır: Metrik sistem (SI) çoğu ülkede standarttır
                    ve 10&apos;luk tabana dayanır. Emperyal sistem ise ABD, İngiltere ve birkaç ülkede
                    kullanılır. Türkiye metrik sistemi resmi olarak kullanmaktadır.
                </p>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>1 mil kaç kilometre?</h3>
                <p>
                    1 mil = 1.60934 kilometre. Tersine, 1 kilometre = 0.621371 mil.
                </p>

                <h3>1 pound kaç kilogram?</h3>
                <p>
                    1 pound (lb) = 0.453592 kilogram. Tersine, 1 kilogram = 2.20462 pound.
                </p>

                <h3>Fahrenheit&apos;ı Celsius&apos;a nasıl çevirim?</h3>
                <p>
                    Formül: °C = (°F - 32) × 5/9. Örneğin, 77°F = (77-32) × 5/9 = 25°C.
                </p>

                <h3>1 dönüm kaç metrekare?</h3>
                <p>
                    Türkiye&apos;de 1 dönüm = 1000 metrekare olarak kabul edilir. Bazı bölgelerde
                    eski (yerel) dönüm ölçüleri farklı olabilir.
                </p>
                <h2>Hazır Dönüşüm Tabloları</h2>
                <p>
                    Sık aranan dönüşümler için hesaplanmış sayfalarımız var: cm–feet, kg–pound, santigrat–Fahrenheit
                    ve daha fazlası. Hepsini <Link href="/birim">birim çevirici</Link> sayfasında bulabilirsiniz.
                </p>
                <BirimCeviriciLinkleri ornekSayisi={4} />
            </article>
        </div>
    )
}
