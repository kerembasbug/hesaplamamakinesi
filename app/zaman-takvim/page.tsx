import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategoryBySlug } from "@/config/site-data"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { collectionPageSchema } from "@/lib/schema"
import { categories } from "@/config/site-data"

export const metadata = buildMetadata({
    title: "Zaman ve Takvim Hesaplama Araçları",
    description: "Ücretsiz zaman ve takvim araçları: tarih farkı, yaş hesaplama, gebelik takibi, iş günü sayısı, saat farkı, zaman dilimi çevirici ve kronometre.",
    keywords: ["tarih hesaplama", "yaş hesaplama", "gebelik hesaplama", "gün hesaplama", "takvim hesaplama"],
    path: "/zaman-takvim",
})

export default function ZamanTakvimPage() {
    const category = getCategoryBySlug("zaman-takvim")
    if (!category) return <div>Kategori bulunamadı</div>

    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={collectionPageSchema(
                    "Zaman & Takvim Hesaplama Araçları",
                    "Ücretsiz zaman ve takvim hesaplama araçları. Tarih farkı, yaş hesaplama, gebelik hesaplama, gün sayacı ve çalışma saati hesaplama.",
                    "/zaman-takvim",
                    (categories.find((c) => c.slug === "zaman-takvim")?.tools ?? [])
                        .filter((t) => !t.externalUrl)
                        .map((t) => ({ name: t.name, path: `/zaman-takvim/${t.slug}`, description: t.description }))
                )}
            />
            <Breadcrumb items={[
                { name: category.name },
            ]} />

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
                <p>
                    Tarih ve zaman hesaplama araçlarımız, iki tarih arası gün sayısı, yaş hesaplama,
                    gebelik takibi, çalışma günleri hesaplama gibi hesaplamaları kolaylaştırır.
                </p>

                <h2>Popüler Zaman Hesaplayıcıları</h2>

                <h3>Yaş Hesaplama</h3>
                <p>
                    Doğum tarihinizi girerek yaşınızı yıl, ay ve gün olarak öğrenin. Bir sonraki
                    doğum gününüze kaç gün kaldığını da görebilirsiniz.
                </p>

                <h3>Tarih Farkı (Gün Farkı) Hesaplama</h3>
                <p>
                    İki tarih arasındaki farkı gün, hafta, ay veya yıl olarak hesaplayın. Proje
                    planlaması, kira süresi veya önemli günler için kullanışlıdır.
                </p>

                <h3>Gebelik Hesaplama</h3>
                <p>
                    Son adet tarihinize göre gebelik haftanızı, tahmini doğum tarihinizi (DKT) ve
                    bebeğin gelişim aşamasını öğrenin.
                </p>

                <h3>Çalışma Günleri Hesaplama</h3>
                <p>
                    İki tarih arasındaki iş günü sayısını hesaplayın. Hafta sonları ve resmi tatiller
                    hariç tutularak hesaplama yapılır.
                </p>

                <h3>Zaman Dilimi Çevirici</h3>
                <p>
                    Farklı ülkelerdeki saat dilimlerini karşılaştırın. Uluslararası toplantılar veya
                    seyahat planlaması için idealdir.
                </p>

                <h3>Kronometre</h3>
                <p>
                    Online kronometre ile süre ölçün. Tur kaydetme ve detaylı zaman tutma özellikleri mevcuttur.
                </p>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Artık yıl nasıl hesaplanır?</h3>
                <p>
                    Bir yıl 4&apos;e tam bölünüyorsa artık yıldır. Ancak 100&apos;e bölünüyorsa artık yıl değildir,
                    400&apos;e de bölünüyorsa yeniden artık yıldır. 2028 artık yıldır (366 gün); 2026 ise değildir.
                </p>

                <h3>Gebelik kaç hafta sürer?</h3>
                <p>
                    Normal gebelik süresi son adet tarihinden itibaren 40 hafta (280 gün) olarak kabul edilir.
                    Doğum genellikle 37-42 hafta arasında gerçekleşir.
                </p>

                <h3>Türkiye hangi zaman diliminde?</h3>
                <p>
                    Türkiye, 2016&apos;dan beri kalıcı olarak UTC+3 (TRT - Türkiye Saati) zaman dilimini
                    kullanmaktadır. Yaz/kış saati uygulaması yapılmamaktadır.
                </p>
            </article>
        </div>
    )
}
