import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategoryBySlug } from "@/config/site-data"

export const metadata: Metadata = {
    title: "Matematik Hesaplayıcıları - Yüzde, Karekök, Ortalama",
    description: "Ücretsiz matematik ve eğitim hesaplama araçları. Yüzde hesaplama, karekök, ortalama hesaplama, not hesaplama ve denklem çözücü.",
    keywords: ["matematik hesaplama", "yüzde hesaplama", "karekök hesaplama", "ortalama hesaplama", "not hesaplama"]
}

export default function MatematikPage() {
    const category = getCategoryBySlug("matematik-egitim")
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
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                        <category.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
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
                        <Card className="h-full border-slate-200 dark:border-slate-800 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                                        <tool.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
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
                <h2>Matematik Hesaplama Araçları</h2>
                <p>
                    Matematik hesaplama araçlarımız eğitim, iş ve günlük hayatta karşılaşılan hesaplamaları
                    kolaylaştırır. Yüzde hesaplamadan karekök almaya, ortalama hesaplamadan not hesaplamaya
                    kadar çeşitli araçlar mevcuttur.
                </p>

                <h3>Popüler Matematik Hesaplayıcıları</h3>

                <h4>Yüzde Hesaplama</h4>
                <p>
                    Bir sayının yüzdesini bulma, yüzde artış/azalış hesaplama ve iki sayı arasındaki yüzdelik
                    farkı hesaplayın. Alışverişten iş dünyasına kadar en sık ihtiyaç duyulan hesaplama.
                </p>

                <h4>Karekök Hesaplama</h4>
                <p>
                    Herhangi bir sayının karekökünü anında hesaplayın. Negatif sayılar için sanal karekök
                    sonuçları da gösterilir.
                </p>

                <h4>TYT ve AYT Net Hesaplama</h4>
                <p>
                    YKS sınavları için TYT ve AYT net hesaplama araçlarımız ile doğru ve yanlış sayılarınızı
                    girerek net puanınızı hesaplayın. Her 4 yanlış 1 doğruyu götürür kuralı uygulanır.
                </p>

                <h4>LGS Puan Hesaplama 2026</h4>
                <p>
                    Liselere Geçiş Sistemi (LGS) için güncel puan hesaplama. Sözel ve sayısal puanlarınızı
                    girerek yerleştirme puanınızı öğrenin.
                </p>

                <h4>GPA Hesaplama</h4>
                <p>
                    Üniversite not ortalaması (GPA) hesaplama. 4&apos;lük veya 100&apos;lük sisteme göre genel not
                    ortalamanızı hesaplayın.
                </p>

                <h3>Eğitim Hesaplayıcıları Hakkında</h3>
                <p>
                    Eğitim hesaplayıcılarımız MEB ve ÖSYM&apos;nin güncel puan hesaplama sistemlerine uygun
                    olarak hazırlanmıştır. Ancak resmi sonuçlar için ilgili kurumların açıklamalarını takip edin.
                </p>

                <h3>Sıkça Sorulan Sorular</h3>

                <h4>Yüzde nasıl hesaplanır?</h4>
                <p>
                    Bir sayının yüzdesi = (Sayı × Yüzde) / 100 formülü ile hesaplanır. Örneğin, 200&apos;ün
                    %15&apos;i = (200 × 15) / 100 = 30&apos;dur.
                </p>

                <h4>TYT&apos;de net nasıl hesaplanır?</h4>
                <p>
                    TYT Net = Doğru Sayısı - (Yanlış Sayısı / 4) formülü ile hesaplanır. Boş bırakılan
                    sorular net hesaplamasına dahil edilmez.
                </p>

                <h4>GPA 4&apos;lük sisteme nasıl çevrilir?</h4>
                <p>
                    100&apos;lük sistemdeki notlar genellikle şu şekilde çevrilir: 90-100 = 4.0, 85-89 = 3.5,
                    80-84 = 3.0, 75-79 = 2.5 gibi. Her üniversitenin kendi dönüşüm tablosu olabilir.
                </p>
            </article>
        </div>
    )
}
