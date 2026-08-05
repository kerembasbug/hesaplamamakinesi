import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategoryBySlug } from "@/config/site-data"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { collectionPageSchema } from "@/lib/schema"
import { categories } from "@/config/site-data"

export const metadata = buildMetadata({
    title: "Matematik ve Eğitim Hesaplayıcıları",
    description: "Ücretsiz matematik ve eğitim hesaplama araçları: yüzde, karekök, ortalama, oran orantı, GPA, TYT-AYT net, LGS ve DGS puan hesaplama araçları.",
    keywords: ["matematik hesaplama", "yüzde hesaplama", "karekök hesaplama", "ortalama hesaplama", "not hesaplama"],
    path: "/matematik-egitim",
})

export default function MatematikPage() {
    const category = getCategoryBySlug("matematik-egitim")
    if (!category) return <div>Kategori bulunamadı</div>

    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={collectionPageSchema(
                    "Matematik Hesaplayıcıları",
                    "Ücretsiz matematik ve eğitim hesaplama araçları. Yüzde hesaplama, karekök, ortalama hesaplama, not hesaplama ve denklem çözücü.",
                    "/matematik-egitim",
                    (categories.find((c) => c.slug === "matematik-egitim")?.tools ?? [])
                        .filter((t) => !t.externalUrl)
                        .map((t) => ({ name: t.name, path: `/matematik-egitim/${t.slug}`, description: t.description }))
                )}
            />
            <Breadcrumb items={[
                { name: category.name },
            ]} />

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

                <h2>Popüler Matematik Hesaplayıcıları</h2>

                <h2>Yüzde Hesaplama</h2>
                <p>
                    Bir sayının yüzdesini bulma, yüzde artış/azalış hesaplama ve iki sayı arasındaki yüzdelik
                    farkı hesaplayın. Alışverişten iş dünyasına kadar en sık ihtiyaç duyulan hesaplama.
                </p>

                <h2>Karekök Hesaplama</h2>
                <p>
                    Herhangi bir sayının karekökünü anında hesaplayın. Negatif sayılar için sanal karekök
                    sonuçları da gösterilir.
                </p>

                <h2>TYT ve AYT Net Hesaplama</h2>
                <p>
                    YKS sınavları için TYT ve AYT net hesaplama araçlarımız ile doğru ve yanlış sayılarınızı
                    girerek net puanınızı hesaplayın. Her 4 yanlış 1 doğruyu götürür kuralı uygulanır.
                </p>

                <h2>LGS Puan Hesaplama 2026</h2>
                <p>
                    Liselere Geçiş Sistemi (LGS) için güncel puan hesaplama. Sözel ve sayısal puanlarınızı
                    girerek yerleştirme puanınızı öğrenin.
                </p>

                <h2>GPA Hesaplama</h2>
                <p>
                    Üniversite not ortalaması (GPA) hesaplama. 4&apos;lük veya 100&apos;lük sisteme göre genel not
                    ortalamanızı hesaplayın.
                </p>

                <h2>Eğitim Hesaplayıcıları Hakkında</h2>
                <p>
                    Eğitim hesaplayıcılarımız MEB ve ÖSYM&apos;nin güncel puan hesaplama sistemlerine uygun
                    olarak hazırlanmıştır. Ancak resmi sonuçlar için ilgili kurumların açıklamalarını takip edin.
                </p>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Yüzde nasıl hesaplanır?</h3>
                <p>
                    Bir sayının yüzdesi = (Sayı × Yüzde) / 100 formülü ile hesaplanır. Örneğin, 200&apos;ün
                    %15&apos;i = (200 × 15) / 100 = 30&apos;dur.
                </p>

                <h3>TYT&apos;de net nasıl hesaplanır?</h3>
                <p>
                    TYT Net = Doğru Sayısı - (Yanlış Sayısı / 4) formülü ile hesaplanır. Boş bırakılan
                    sorular net hesaplamasına dahil edilmez.
                </p>

                <h3>GPA 4&apos;lük sisteme nasıl çevrilir?</h3>
                <p>
                    100&apos;lük sistemdeki notlar genellikle şu şekilde çevrilir: 90-100 = 4.0, 85-89 = 3.5,
                    80-84 = 3.0, 75-79 = 2.5 gibi. Her üniversitenin kendi dönüşüm tablosu olabilir.
                </p>
            </article>
        </div>
    )
}
