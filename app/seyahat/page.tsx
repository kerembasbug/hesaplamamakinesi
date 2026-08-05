import Link from "next/link"
import { Car, Gauge, Plane } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { collectionPageSchema } from "@/lib/schema"
import { categories } from "@/config/site-data"

export const metadata = buildMetadata({
    title: "Seyahat Hesaplayıcıları",
    description: "Seyahat ve ulaşım hesaplama araçları. Taksi ücreti ve hız-yakıt-para (HYP) hesaplayıcıları ile yol masrafınızı önceden planlayın; hepsi ücretsiz.",
    keywords: ["seyahat hesaplama", "taksi hesaplama", "hyp hesaplama", "yakıt hesaplama", "ulaşım masrafları"],
    path: "/seyahat",
})

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
            <JsonLd
                data={collectionPageSchema(
                    "Seyahat Hesaplayıcıları",
                    "Seyahat ve ulaşım hesaplayıcıları. Taksi ücreti, hız-yakıt-para (HYP) hesaplama araçları ile gezi planlamanızı kolaylaştırın.",
                    "/seyahat",
                    (categories.find((c) => c.slug === "seyahat")?.tools ?? [])
                        .filter((t) => !t.externalUrl)
                        .map((t) => ({ name: t.name, path: `/seyahat/${t.slug}`, description: t.description }))
                )}
            />
            <Breadcrumb items={[
                { name: "Seyahat" },
            ]} />

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
                                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{tool.name}</h3>
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

                <h2>Taksi Ücreti Hesaplama</h2>
                <p>
                    Türkiye&apos;nin büyük şehirlerinde geçerli güncel tarifelerle taksi ücretini önceden hesaplayın.
                    Mesafe veya süre bazlı hesaplama seçenekleri mevcuttur.
                </p>

                <h2>HYP (Hız-Yakıt-Para) Hesaplama</h2>
                <p>
                    Araç seyahatlerinizde hız, yakıt tüketimi ve maliyet arasındaki ilişkiyi analiz edin.
                    Optimum hızda seyahat ederek yakıt tasarrufu sağlayabilirsiniz.
                </p>

                <h2>Yol Masrafını Önceden Hesaplamak Neden Önemli?</h2>
                <p>
                    Bir seyahatin gerçek maliyeti yakıt fişinden ibaret değildir: köprü ve otoyol geçişleri,
                    otopark, şehir içi taksi ve mola harcamaları toplandığında bütçe beklenenin belirgin
                    üzerine çıkar. Yola çıkmadan önce bu kalemleri kabaca çıkarmak, hem araçla gitmekle toplu
                    taşımayı karşılaştırmanızı hem de nakit ihtiyacınızı doğru planlamanızı sağlar.
                </p>
                <p>
                    Özellikle şehir içi ulaşımda taksi ile toplu taşıma arasındaki fark, birkaç kişilik
                    gruplarda tersine dönebilir. Dört kişilik bir grupta taksi, kişi başına düşen maliyet
                    açısından çoğu zaman toplu taşımaya yaklaşır.
                </p>

                <h2>Araçla Seyahatte Yakıt Tasarrufu</h2>
                <ul>
                    <li>Sabit hızda seyretmek, sürekli hızlanıp yavaşlamaya göre %15&apos;e varan tasarruf sağlar.</li>
                    <li>Lastik basıncının 0,5 bar düşük olması yakıt tüketimini yaklaşık %2 artırır.</li>
                    <li>Yüksek hızda açık cam, klimadan daha fazla yakıt tüketimine yol açar.</li>
                    <li>Bagajdaki gereksiz 50 kg yük, tüketimi yaklaşık %2 yükseltir.</li>
                    <li>Tavan taşıyıcısı boşken bile aerodinamik direnci artırır; kullanılmıyorsa sökün.</li>
                </ul>

                <h2>Şehirlerarası Yolculuk Planlaması</h2>
                <p>
                    Uzun yolda her iki saatte bir mola vermek hem yasal öneri hem güvenlik gereğidir.
                    Ortalama 90 km/s hızla 500 km&apos;lik bir yolculuk molalarla birlikte yaklaşık 7 saat
                    sürer. Varış saatini hesaplarken bu mola sürelerini eklemeyi unutmayın; yalnızca mesafeyi
                    hıza bölmek gerçek süreyi her zaman olduğundan kısa gösterir.
                </p>
            </article>
        </div>
    )
}
