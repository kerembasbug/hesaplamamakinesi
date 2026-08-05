import { QtcCalculator } from "@/components/calculators/health/qtc-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import Link from "next/link"
import { FormulGorseli } from "@/components/content/formul-gorseli"
import { SSS } from "@/components/content/sss"

export const metadata = buildMetadata({
    title: "QTc Hesaplama - Düzeltilmiş QT Aralığı",
    description: "QTc hesaplama aracı. Bazett ve Fridericia formülleriyle nabız ve QT aralığına göre düzeltilmiş QT değerini bulun; EKG değerlendirmesi hekime aittir.",
    keywords: ["qtc hesaplama", "düzeltilmiş qt hesaplama", "bazett formülü qtc", "ekg qt hesaplama", "fridericia formülü qtc"],
    path: "/saglik-spor/qtc-hesaplama",
})

export default function QtcPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "QTc Hesaplama",
                    description: "Bazett ve Fridericia formülleri ile QTc (Düzeltilmiş QT) hesaplama aracı. EKG analizi için nabız ve QT aralığına göre QTc değerini bulun.",
                    path: "/saglik-spor/qtc-hesaplama",
                    applicationCategory: "HealthApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Sağlık & Spor", path: "/saglik-spor" },
                { name: "QTc Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">QTc (Düzeltilmiş QT) Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">EKG'den elde edilen QT aralığı ve nabız değerinizi girerek düzeltilmiş sonucu öğrenin.</p>
            </div>

            <QtcCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>QTc Hesaplama Nedir?</h2>
                <p>
                    <strong>QTc hesaplama</strong>, EKG&apos;de ölçülen QT aralığının kalp hızına göre
                    düzeltilmesidir. QT aralığı, kalp kaslarının kasılıp yeniden gevşemesi için geçen süreyi
                    gösterir ve kalp hızı arttıkça doğal olarak kısalır. Bu yüzden ham QT değeri tek başına
                    karşılaştırılamaz; önce hıza göre düzeltilmesi gerekir.
                </p>
                <p>
                    Düzeltilmiş değer <strong>QTc</strong> olarak yazılır ve milisaniye (ms) cinsinden ifade
                    edilir. Bu araç bir hesaplama yardımcısıdır; EKG yorumu ve tanı yalnızca hekime aittir.
                </p>

                <h2>QTc Hesaplama Formülü</h2>
                <FormulGorseli
                    slug="qtc"
                    alt="QTc hesaplama formülü: Bazett ve Fridericia denklemleriyle düzeltilmiş QT aralığı"
                />

                <h2>Bazett, Fridericia ve Diğer Formüller</h2>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr><th>Formül</th><th>Denklem</th><th>Ne zaman tercih edilir?</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Bazett</td><td>QT ÷ √RR</td><td>En yaygın; 60-100 atım/dk aralığında güvenilir</td></tr>
                            <tr><td>Fridericia</td><td>QT ÷ ∛RR</td><td>Taşikardi ve bradikardide daha isabetli</td></tr>
                            <tr><td>Framingham</td><td>QT + 0,154 × (1 − RR)</td><td>Popülasyon çalışmalarında</td></tr>
                            <tr><td>Hodges</td><td>QT + 1,75 × (nabız − 60)</td><td>Geniş hız aralığında stabil</td></tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    Bazett formülü hızlı kalp atışlarında QTc&apos;yi olduğundan yüksek, yavaş atışlarda düşük
                    gösterme eğilimindedir. Nabız 60&apos;ın altında veya 100&apos;ün üzerindeyse Fridericia
                    sonucunu da değerlendirmek yerinde olur.
                </p>

                <h2>Adım Adım Örnek QTc Hesabı</h2>
                <ol>
                    <li>EKG&apos;de ölçülen QT: <strong>0,40 saniye (400 ms)</strong></li>
                    <li>Kalp hızı: <strong>75 atım/dakika</strong></li>
                    <li>RR aralığı = 60 ÷ 75 = <strong>0,80 saniye</strong></li>
                    <li>√0,80 = <strong>0,894</strong></li>
                    <li>QTc (Bazett) = 0,40 ÷ 0,894 = <strong>0,447 s = 447 ms</strong></li>
                    <li>QTc (Fridericia) = 0,40 ÷ ∛0,80 = <strong>431 ms</strong></li>
                </ol>

                <h2>Normal QTc Değerleri</h2>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr><th>Grup</th><th>Normal</th><th>Sınırda</th><th>Uzun</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Erkek</td><td>&lt; 430 ms</td><td>430 – 450 ms</td><td>&gt; 450 ms</td></tr>
                            <tr><td>Kadın</td><td>&lt; 450 ms</td><td>450 – 470 ms</td><td>&gt; 470 ms</td></tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    500 ms ve üzeri değerler, ventriküler aritmi riskinin belirgin arttığı eşik olarak kabul
                    edilir ve acil değerlendirme gerektirir.
                </p>

                <h2>QT Uzamasına Yol Açan Nedenler</h2>
                <ul>
                    <li><strong>İlaçlar:</strong> Bazı antiaritmikler, antipsikotikler, antidepresanlar, makrolid ve kinolon grubu antibiyotikler.</li>
                    <li><strong>Elektrolit bozuklukları:</strong> Düşük potasyum, magnezyum veya kalsiyum.</li>
                    <li><strong>Konjenital uzun QT sendromu:</strong> Genetik iyon kanalı bozuklukları.</li>
                    <li><strong>Bradikardi</strong> ve ileri derecede AV blok.</li>
                    <li><strong>Hipotermi</strong>, hipotiroidi ve bazı nörolojik olaylar.</li>
                </ul>
                <p>
                    Birden fazla QT uzatıcı ilacın birlikte kullanımı riski katlar. Yeni bir ilaca başlarken
                    hekiminize mevcut ilaç listenizi eksiksiz bildirin.
                </p>

                <h2>QT Aralığı EKG&apos;de Nasıl Ölçülür?</h2>
                <p>
                    QT aralığı, QRS kompleksinin başlangıcından T dalgasının sonuna kadar ölçülür. En uzun QT
                    genellikle DII veya V5-V6 derivasyonlarında görülür. T dalgasının bitiş noktası, dalganın
                    inen kolunun izoelektrik hatla kesiştiği yerdir; U dalgası varsa ona dâhil edilmemelidir.
                    Ölçüm hatasını azaltmak için üç ardışık siklusun ortalaması alınır.
                </p>

                <SSS
                    baslik="QTc Hesaplama Hakkında Sıkça Sorulan Sorular"
                    sorular={[
                        {
                            question: "QTc nasıl hesaplanır?",
                            answer:
                                "Bazett formülüyle: QTc = QT ÷ √RR. RR aralığı 60 ÷ kalp hızı ile bulunur. QT 0,40 s ve nabız 75 ise RR 0,80 s, QTc ise 447 ms olur.",
                        },
                        {
                            question: "Normal QTc değeri kaçtır?",
                            answer:
                                "Erkeklerde 430 ms, kadınlarda 450 ms altı normal kabul edilir. Erkeklerde 450 ms, kadınlarda 470 ms üzeri uzun QT olarak değerlendirilir.",
                        },
                        {
                            question: "Bazett mi Fridericia mı kullanmalıyım?",
                            answer:
                                "Kalp hızı 60-100 arasındaysa Bazett yeterlidir. Taşikardi veya bradikardi varsa Fridericia formülü daha isabetli sonuç verir; ikisini birlikte değerlendirmek yaygın uygulamadır.",
                        },
                        {
                            question: "QTc 500 ms ne anlama gelir?",
                            answer:
                                "500 ms ve üzeri, ventriküler aritmi riskinin belirgin arttığı eşiktir ve acil tıbbi değerlendirme gerektirir. Bu bir tanı değil, uyarı sinyalidir.",
                        },
                        {
                            question: "RR aralığı nedir?",
                            answer:
                                "Ardışık iki R dalgası arasındaki süredir ve saniye cinsinden ölçülür. Kalp hızından hesaplanabilir: RR = 60 ÷ nabız.",
                        },
                    ]}
                />

                <h2>İlgili Hesaplama Araçları</h2>
                <ul>
                    <li><Link href="/saglik-spor/vki-hesaplama">VKİ hesaplama</Link></li>
                    <li><Link href="/saglik-spor/calpol-doz-hesaplama">Kiloya göre doz hesaplama</Link></li>
                    <li><Link href="/saglik-spor/vucut-olcumu-hesaplama">Bel kalça oranı hesaplama</Link></li>
                    <li><Link href="/saglik-spor">Tüm sağlık ve spor hesaplayıcıları</Link></li>
                </ul>

                <p className="text-sm">
                    <strong>Önemli:</strong> Bu araç bilgilendirme amaçlıdır ve tıbbi tanı koymaz. EKG
                    yorumunu yalnızca hekiminiz yapabilir. Ayrıntılı bilgi için{" "}
                    <a href="https://www.who.int/health-topics/cardiovascular-diseases" target="_blank" rel="noopener">
                        Dünya Sağlık Örgütü — Kardiyovasküler Hastalıklar
                    </a>{" "}
                    sayfasına bakabilirsiniz.
                </p>
            </article>
        </div>
    )
}
