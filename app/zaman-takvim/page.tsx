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
                <p>
                    Tarih ve zaman hesaplama araçlarımız, iki tarih arası gün sayısı, yaş hesaplama,
                    gebelik takibi, çalışma günleri hesaplama gibi hesaplamaları kolaylaştırır.
                </p>

                <h3>Popüler Zaman Hesaplayıcıları</h3>

                <h4>Yaş Hesaplama</h4>
                <p>
                    Doğum tarihinizi girerek yaşınızı yıl, ay ve gün olarak öğrenin. Bir sonraki
                    doğum gününüze kaç gün kaldığını da görebilirsiniz.
                </p>

                <h4>Tarih Farkı (Gün Farkı) Hesaplama</h4>
                <p>
                    İki tarih arasındaki farkı gün, hafta, ay veya yıl olarak hesaplayın. Proje
                    planlaması, kira süresi veya önemli günler için kullanışlıdır.
                </p>

                <h4>Gebelik Hesaplama</h4>
                <p>
                    Son adet tarihinize göre gebelik haftanızı, tahmini doğum tarihinizi (DKT) ve
                    bebeğin gelişim aşamasını öğrenin.
                </p>

                <h4>Çalışma Günleri Hesaplama</h4>
                <p>
                    İki tarih arasındaki iş günü sayısını hesaplayın. Hafta sonları ve resmi tatiller
                    hariç tutularak hesaplama yapılır.
                </p>

                <h4>Zaman Dilimi Çevirici</h4>
                <p>
                    Farklı ülkelerdeki saat dilimlerini karşılaştırın. Uluslararası toplantılar veya
                    seyahat planlaması için idealdir.
                </p>

                <h4>Kronometre</h4>
                <p>
                    Online kronometre ile süre ölçün. Tur kaydetme ve detaylı zaman tutma özellikleri mevcuttur.
                </p>

                <h3>Sıkça Sorulan Sorular</h3>

                <h4>Artık yıl nasıl hesaplanır?</h4>
                <p>
                    Bir yıl 4&apos;e tam bölünüyorsa artık yıldır. Ancak 100&apos;e bölünüyorsa artık yıl değildir,
                    400&apos;e de bölünüyorsa yeniden artık yıldır. 2024 artık yıldır (366 gün).
                </p>

                <h4>Gebelik kaç hafta sürer?</h4>
                <p>
                    Normal gebelik süresi son adet tarihinden itibaren 40 hafta (280 gün) olarak kabul edilir.
                    Doğum genellikle 37-42 hafta arasında gerçekleşir.
                </p>

                <h4>Türkiye hangi zaman diliminde?</h4>
                <p>
                    Türkiye, 2016&apos;dan beri kalıcı olarak UTC+3 (TRT - Türkiye Saati) zaman dilimini
                    kullanmaktadır. Yaz/kış saati uygulaması yapılmamaktadır.
                </p>
            </article>
        </div>
    )
}
