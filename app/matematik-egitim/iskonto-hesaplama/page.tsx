import { DiscountCalculator } from "@/components/calculators/math/discount-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import Link from "next/link"
import { FormulGorseli } from "@/components/content/formul-gorseli"
import { SSS } from "@/components/content/sss"

export const metadata = buildMetadata({
    title: "İskonto Hesaplama - İndirimli Fiyat",
    description: "İskonto (indirim) hesaplama aracı. Yüzde indirim oranını girerek yeni fiyatı, indirim tutarını ve zincirleme iskontoları anında ücretsiz hesaplayın.",
    keywords: ["iskonto hesaplama", "indirim hesaplama", "iskonto nasıl hesaplanır", "fiyat indirimi", "yüzde indirim hesaplama"],
    path: "/matematik-egitim/iskonto-hesaplama",
})

export default function IskontoHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "İskonto Hesaplama",
                    description: "Fiyat üzerinden iskonto (indirim) hesaplama aracı. Yüzde indirim oranını girerek yeni fiyatı ve toplam indirim tutarını anında bulun.",
                    path: "/matematik-egitim/iskonto-hesaplama",
                    applicationCategory: "EducationalApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Matematik", path: "/matematik-egitim" },
                { name: "İskonto Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">İskonto (İndirim) Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Ürün fiyatı ve indirim oranını girerek net fiyatı hesaplayın.</p>
            </div>

            <DiscountCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>İskonto Hesaplama Nedir?</h2>
                <p>
                    <strong>İskonto hesaplama</strong>, bir liste fiyatına uygulanan indirim sonrası ödenecek
                    tutarı bulma işlemidir. Ticarette iskonto, perakendedeki &quot;indirim&quot; kelimesinin
                    karşılığıdır; fatura üzerinde ayrı bir satır olarak gösterilir ve KDV matrahı iskonto
                    düşüldükten sonraki tutar üzerinden hesaplanır.
                </p>
                <p>
                    Yukarıdaki hesaplayıcıya liste fiyatını ve indirim oranını girdiğinizde hem yeni fiyatı hem
                    de kazandığınız tutarı anında görürsünüz.
                </p>

                <h2>İskonto Hesaplama Formülü</h2>
                <FormulGorseli
                    slug="iskonto"
                    alt="İskonto hesaplama formülü: indirimli fiyat = liste fiyatı çarpı bir eksi iskonto oranı"
                />

                <h2>Adım Adım Örnek İskonto Hesabı</h2>
                <ol>
                    <li>Liste fiyatı: <strong>2.500 TL</strong></li>
                    <li>İskonto oranı: %15 → ondalık karşılığı <strong>0,15</strong></li>
                    <li>İndirim tutarı: 2.500 × 0,15 = <strong>375 TL</strong></li>
                    <li>İndirimli fiyat: 2.500 − 375 = <strong>2.125 TL</strong></li>
                    <li>Kısa yol: 2.500 × 0,85 = <strong>2.125 TL</strong></li>
                </ol>

                <h2>Zincirleme İskonto: %20 + %10, %30 Etmez</h2>
                <p>
                    Ticarette en sık yapılan hata, ardışık iskontoları toplamaktır. İkinci iskonto, ilkinden
                    sonra kalan tutara uygulanır:
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr><th>Uygulama</th><th>1.000 TL için sonuç</th><th>Efektif oran</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Tek seferde %30</td><td>700 TL</td><td>%30,0</td></tr>
                            <tr><td>%20 sonra %10</td><td>720 TL</td><td>%28,0</td></tr>
                            <tr><td>%10 sonra %20</td><td>720 TL</td><td>%28,0</td></tr>
                            <tr><td>%20 + %10 + %5</td><td>684 TL</td><td>%31,6</td></tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    Görüldüğü gibi sıralamanın önemi yoktur ama toplama yapmak sizi yanıltır. Efektif oranı
                    bulmak için katsayıları çarpın: 0,80 × 0,90 = 0,72, yani toplam indirim %28&apos;dir.
                </p>

                <h2>İskontodan Liste Fiyatını Geri Bulma</h2>
                <p>
                    Elinizde yalnızca indirimli fiyat varsa liste fiyatını bulmak için bölme yaparsınız:
                    <strong> Liste Fiyatı = İndirimli Fiyat ÷ (1 − Oran)</strong>. Örneğin %25 iskontolu
                    fiyat 1.500 TL ise liste fiyatı 1.500 ÷ 0,75 = <strong>2.000 TL</strong>&apos;dir.
                    Bu hesap, satıcının gerçekten indirim yapıp yapmadığını kontrol etmenin en hızlı yoludur.
                </p>

                <h2>İskonto ve KDV İlişkisi</h2>
                <p>
                    Faturada KDV, iskonto düşüldükten sonraki tutar üzerinden hesaplanır. 10.000 TL liste
                    fiyatlı bir mal %20 iskontoyla satılıyorsa KDV matrahı 8.000 TL olur; %20 KDV ile fatura
                    toplamı 9.600 TL&apos;dir. İskontoyu KDV&apos;li tutar üzerinden hesaplamak matrahı yanlış
                    gösterir ve vergi hatasına yol açar.
                </p>
                <p>
                    Kampanya ve ciro primi gibi sonradan yapılan iskontolarda ise iade faturası düzenlenmesi
                    gerekir; bu durumda KDV de düzeltilir.
                </p>

                <h2>Vadeli Satışta İskonto</h2>
                <p>
                    Peşin ödemeye uygulanan iskonto aslında bir finansman indirimidir. 30 gün vadeli 100.000 TL
                    tutarındaki bir alışta peşin ödemede %3 iskonto teklif ediliyorsa, aylık %3 kazanç yıllık
                    yaklaşık %42,6 bileşik getiriye denk gelir. Nakit imkânınız varsa bu iskonto çoğu mevduat
                    faizinden daha avantajlıdır.
                </p>

                <h2>İskonto Hesaplarken Sık Yapılan Hatalar</h2>
                <ul>
                    <li>Ardışık iskonto oranlarını toplamak (%20 + %10 = %30 sanmak).</li>
                    <li>İskontoyu KDV dahil tutar üzerinden hesaplayıp matrahı yanlış bildirmek.</li>
                    <li>&quot;%50&apos;ye varan&quot; ifadesini tüm ürünlere uygulanan oran sanmak.</li>
                    <li>Zam sonrası indirimi gerçek indirim gibi değerlendirmek; referans fiyatı kontrol edin.</li>
                    <li>Vade farkıyla iskontoyu karşılaştırmadan peşin ödeme kararı vermek.</li>
                </ul>

                <SSS
                    baslik="İskonto Hesaplama Hakkında Sıkça Sorulan Sorular"
                    sorular={[
                        {
                            question: "İskonto hesaplama formülü nedir?",
                            answer:
                                "İndirimli Fiyat = Liste Fiyatı × (1 − İskonto Oranı). 2.500 TL'lik ürüne %15 iskonto uygulanırsa 2.500 × 0,85 = 2.125 TL ödenir.",
                        },
                        {
                            question: "%20 ve %10 iskonto üst üste uygulanırsa toplam indirim ne olur?",
                            answer:
                                "Toplam indirim %30 değil %28'dir. Katsayılar çarpılır: 0,80 × 0,90 = 0,72, yani fiyatın %72'si ödenir.",
                        },
                        {
                            question: "İskontolu fiyattan liste fiyatı nasıl bulunur?",
                            answer:
                                "Liste Fiyatı = İndirimli Fiyat ÷ (1 − Oran). %25 iskontolu fiyat 1.500 TL ise liste fiyatı 1.500 ÷ 0,75 = 2.000 TL'dir.",
                        },
                        {
                            question: "KDV iskontodan önce mi sonra mı hesaplanır?",
                            answer:
                                "KDV, iskonto düşüldükten sonraki tutar üzerinden hesaplanır. 10.000 TL'ye %20 iskonto uygulanırsa KDV matrahı 8.000 TL olur.",
                        },
                        {
                            question: "İskonto ile indirim arasında fark var mı?",
                            answer:
                                "Hesaplama açısından fark yoktur. İskonto ticari ve fatura diline ait terimdir; indirim ise perakende kullanımıdır.",
                        },
                    ]}
                />

                <h2>İlgili Hesaplama Araçları</h2>
                <ul>
                    <li><Link href="/matematik-egitim/yuzde-hesaplama">Yüzde hesaplama</Link></li>
                    <li><Link href="/vergi-muhasebe/kdv-hesaplama">KDV hesaplama</Link> — iskonto sonrası matrah için</li>
                    <li><Link href="/vergi-muhasebe/maliyet-hesaplama">Maliyet ve kâr marjı hesaplama</Link></li>
                    <li><Link href="/matematik-egitim">Tüm matematik ve eğitim hesaplayıcıları</Link></li>
                </ul>

                <p className="text-sm">
                    <strong>Kaynak:</strong>{" "}
                    <a href="https://www.gib.gov.tr/" target="_blank" rel="noopener">
                        Gelir İdaresi Başkanlığı
                    </a>
                    . Fatura üzerindeki iskonto ve KDV matrahı uygulaması KDV Kanunu&apos;na göre belirlenir.
                </p>
            </article>
        </div>
    )
}
