import { YksCalculator } from "@/components/calculators/education/yks-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import Link from "next/link"
import { FormulGorseli } from "@/components/content/formul-gorseli"
import { SSS } from "@/components/content/sss"

export const metadata = buildMetadata({
    title: "TYT Net Hesaplama 2026 - YKS Neti",
    description: "2026 TYT net hesaplama aracı. Türkçe, Matematik, Fen ve Sosyal derslerindeki doğru-yanlış sayınıza göre TYT netinizi anında ücretsiz hesaplayın.",
    keywords: ["tyt net hesaplama", "yks net hesaplama", "tyt hesaplama 2026", "tyt puan hesaplama", "temel yeterlilik testi"],
    path: "/matematik-egitim/tyt-net-hesaplama",
})

export default function TytHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "TYT Net Hesaplama 2026",
                    description: "2026 TYT net hesaplama aracı. Türkçe, Matematik, Fen ve Sosyal doğru yanlış sayınıza göre TYT netinizi hesaplayın.",
                    path: "/matematik-egitim/tyt-net-hesaplama",
                    applicationCategory: "EducationalApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Matematik & Eğitim", path: "/matematik-egitim" },
                { name: "TYT Net Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">TYT Net Hesaplama 2026</h1>
                <p className="text-slate-600 dark:text-slate-400">Doğru ve yanlış sayılarınızı girerek TYT netinizi hesaplayın.</p>
            </div>

            <YksCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>TYT Net Hesaplama Nasıl Yapılır?</h2>
                <p>
                    <strong>TYT net hesaplama</strong>, doğru cevap sayınızdan yanlışların dörtte birini
                    çıkarmaya dayanır. YKS&apos;de her dört yanlış bir doğruyu götürür; boş bıraktığınız sorular
                    ise netinizi hiç etkilemez. Bu yüzden emin olmadığınız sorularda iki seçeneği eleyebiliyorsanız
                    işaretlemek matematiksel olarak avantajlıdır, hiçbir fikriniz yoksa boş bırakmak daha güvenlidir.
                </p>
                <p>
                    Yukarıdaki hesaplayıcıya her testin doğru ve yanlış sayısını girdiğinizde hem test bazında
                    hem de toplam TYT netiniz anında hesaplanır. Deneme sınavı sonrası netlerinizi takip etmek,
                    hangi derste gerçekten kayıp yaşadığınızı görmenin en hızlı yoludur.
                </p>

                <h2>TYT Net Hesaplama Formülü</h2>
                <p>
                    Formül tüm testler için aynıdır ve ÖSYM tarafından her yıl kılavuzda tekrar edilir:
                </p>
                <FormulGorseli
                    slug="tyt-net"
                    alt="TYT net hesaplama formülü: net = doğru eksi yanlış bölü dört, örnek hesaplarla"
                />

                <h2>TYT Soru Dağılımı ve Süre</h2>
                <p>
                    TYT, YKS&apos;nin ilk oturumudur ve tüm adaylar için zorunludur. Toplam 120 soru 165 dakikada
                    çözülür; yani soru başına ortalama 82 saniyeniz vardır.
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>Test</th>
                                <th>Soru Sayısı</th>
                                <th>Ağırlık</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Türkçe</td><td>40</td><td>%33</td></tr>
                            <tr><td>Temel Matematik</td><td>40</td><td>%33</td></tr>
                            <tr><td>Sosyal Bilimler</td><td>20</td><td>%17</td></tr>
                            <tr><td>Fen Bilimleri</td><td>20</td><td>%17</td></tr>
                            <tr><td><strong>Toplam</strong></td><td><strong>120</strong></td><td><strong>%100</strong></td></tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    Türkçe ve Temel Matematik birlikte soruların üçte ikisini oluşturur. Bu iki testte net
                    kaybetmek, TYT puanınızı Sosyal veya Fen&apos;deki kayıptan çok daha fazla düşürür.
                </p>

                <h2>Adım Adım Örnek TYT Net Hesabı</h2>
                <ol>
                    <li><strong>Türkçe:</strong> 34 doğru, 4 yanlış → 34 − (4÷4) = <strong>33 net</strong></li>
                    <li><strong>Temel Matematik:</strong> 26 doğru, 8 yanlış → 26 − 2 = <strong>24 net</strong></li>
                    <li><strong>Sosyal Bilimler:</strong> 16 doğru, 4 yanlış → 16 − 1 = <strong>15 net</strong></li>
                    <li><strong>Fen Bilimleri:</strong> 11 doğru, 4 yanlış → 11 − 1 = <strong>10 net</strong></li>
                    <li><strong>TYT toplam:</strong> 33 + 24 + 15 + 10 = <strong>82 net</strong></li>
                </ol>

                <h2>TYT Neti Puana Nasıl Dönüşür?</h2>
                <p>
                    Net, doğrudan puan değildir. ÖSYM her testin netini standart puana çevirir, ardından
                    ağırlıklandırıp 100 taban puan ekler. TYT ham puanına okul başarı puanı (OBP) de eklenir.
                    Kabaca bir yönlendirme olarak 80 net civarı sıralamada ilk 100 binler bandına, 100 net
                    civarı ise ilk 30 binler bandına denk gelir; ancak bu bant her yıl sınavın zorluğuna
                    göre kayar.
                </p>
                <p>
                    Bu yüzden hedefinizi &quot;kaç puan&quot; değil <strong>&quot;kaç net&quot;</strong> üzerinden
                    kurmak daha sağlıklıdır: net, sınavın zorluğundan bağımsız olarak sizin performansınızı ölçer.
                </p>

                <h2>Yanlış Yapmanın Maliyeti</h2>
                <p>
                    Dört yanlış bir doğruyu götürdüğü için her yanlış size 0,25 net kaybettirir. 12 yanlışınız
                    varsa 3 net, yani ortalama bir denemede yaklaşık 6-8 puan kaybediyorsunuz demektir.
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr><th>Yanlış Sayısı</th><th>Net Kaybı</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>4 yanlış</td><td>1,00 net</td></tr>
                            <tr><td>8 yanlış</td><td>2,00 net</td></tr>
                            <tr><td>16 yanlış</td><td>4,00 net</td></tr>
                            <tr><td>24 yanlış</td><td>6,00 net</td></tr>
                        </tbody>
                    </table>
                </div>

                <h2>Deneme Sonrası Net Takibi Nasıl Yapılmalı?</h2>
                <ul>
                    <li>Her denemede test bazında neti ayrı kaydedin; toplam net tek başına yanıltıcıdır.</li>
                    <li>Yanlışlarınızı &quot;bilgi eksiği&quot; ve &quot;dikkat hatası&quot; diye ikiye ayırın.</li>
                    <li>Aynı konudan üst üste yanlış geliyorsa konu tekrarına, dağınık geliyorsa soru hızına odaklanın.</li>
                    <li>Boş sayınız yüksekse zaman yönetimi, yanlış sayınız yüksekse acelecilik sorunudur.</li>
                    <li>Net grafiğinizi haftalık değil aylık değerlendirin; tek denemenin sapması yüksektir.</li>
                </ul>

                <SSS
                    baslik="TYT Net Hesaplama Hakkında Sıkça Sorulan Sorular"
                    sorular={[
                        {
                            question: "TYT net hesaplama formülü nedir?",
                            answer:
                                "Net = Doğru − (Yanlış ÷ 4). Örneğin 34 doğru ve 4 yanlışınız varsa netiniz 34 − 1 = 33 olur. Boş bırakılan sorular hesaba katılmaz.",
                        },
                        {
                            question: "TYT'de kaç soru var ve süre ne kadar?",
                            answer:
                                "TYT'de 120 soru vardır: 40 Türkçe, 40 Temel Matematik, 20 Sosyal Bilimler, 20 Fen Bilimleri. Sınav süresi 165 dakikadır.",
                        },
                        {
                            question: "Boş bırakmak mı yanlış yapmak mı daha iyi?",
                            answer:
                                "Hiçbir fikriniz yoksa boş bırakmak daha güvenlidir çünkü yanlış 0,25 net götürür. En az iki seçeneği eleyebiliyorsanız işaretlemek istatistiksel olarak avantajlıdır.",
                        },
                        {
                            question: "TYT netim kaç olursa üniversiteye girerim?",
                            answer:
                                "TYT'de 150 puan barajını geçmek için genellikle 15-20 net yeterlidir, ancak dört yıllık bir bölüm için 60 netin üzeri hedeflenmelidir. Kesin sınır her yıl değişir.",
                        },
                        {
                            question: "TYT neti AYT'yi etkiler mi?",
                            answer:
                                "Doğrudan etkilemez ama yerleştirme puanınızın %40'ı TYT'den gelir. Yüksek TYT neti, AYT'deki eksiklerinizi bir ölçüde telafi eder.",
                        },
                    ]}
                />

                <h2>İlgili Hesaplama Araçları</h2>
                <ul>
                    <li>
                        <Link href="/matematik-egitim/ayt-net-hesaplama">AYT net hesaplama</Link> — alan
                        testleriniz için net hesabı
                    </li>
                    <li>
                        <Link href="/matematik-egitim/ortalama-hesaplama">Ortalama hesaplama</Link> — deneme
                        netlerinizin ortalamasını alın
                    </li>
                    <li>
                        <Link href="/matematik-egitim/yuzde-hesaplama">Yüzde hesaplama</Link> — başarı yüzdenizi
                        çıkarın
                    </li>
                    <li>
                        <Link href="/matematik-egitim">Tüm matematik ve eğitim hesaplayıcıları</Link>
                    </li>
                </ul>

                <p className="text-sm">
                    <strong>Kaynak:</strong>{" "}
                    <a href="https://www.osym.gov.tr/" target="_blank" rel="noopener">
                        ÖSYM — Ölçme, Seçme ve Yerleştirme Merkezi
                    </a>
                    . Soru sayıları ve süreler her yıl yayımlanan YKS kılavuzuyla kesinleşir.
                </p>
            </article>
        </div>
    )
}
