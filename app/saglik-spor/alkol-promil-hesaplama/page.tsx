import { PromileCalculator } from "@/components/calculators/health/promile-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import Link from "next/link"
import { FormulGorseli } from "@/components/content/formul-gorseli"
import { SSS } from "@/components/content/sss"

export const metadata = buildMetadata({
    title: "Alkol Promil Hesaplama - Yasal Sınır",
    description: "Kandaki alkol oranını (promil) hesaplama aracı. Tüketilen içki, cinsiyet ve vücut ağırlığına göre tahmini promil ve yasal sınır kontrolü yapın.",
    keywords: ["promil hesaplama", "alkol promil hesaplama", "alkol sınırı 2026", "yasal alkol sınırı", "promil nasıl hesaplanır"],
    path: "/saglik-spor/alkol-promil-hesaplama",
})

export default function AlkolPromilPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Alkol Promil Hesaplama",
                    description: "Kandaki alkol oranını (promil) hesaplamak için güncel araç. Tüketilen içecek ve vücut ağırlığına göre yasal alkol sınırı kontrolü.",
                    path: "/saglik-spor/alkol-promil-hesaplama",
                    applicationCategory: "HealthApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Sağlık & Spor", path: "/saglik-spor" },
                { name: "Promil Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Alkol Promil Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Kandaki tahmini alkol oranınızı yasal sınırlar dahilinde kontrol edin.</p>
            </div>

            <PromileCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Alkol Promil Hesaplama Nedir?</h2>
                <p>
                    <strong>Alkol promil hesaplama</strong>, kandaki alkol yoğunluğunu binde cinsinden tahmin
                    eder. 0,50 promil, her bir litre kanda 0,5 gram saf alkol bulunması demektir. Türkiye&apos;de
                    trafik denetimlerinde kullanılan ölçüt budur.
                </p>
                <p>
                    Bu sayfadaki hesaplayıcı Widmark formülünü kullanır ve <strong>tahmini</strong> bir değer
                    verir. Gerçek promil; mide doluluğu, ilaç kullanımı, karaciğer fonksiyonu ve genetik
                    farklılıklara göre önemli ölçüde değişir. Hiçbir hesaplama aracı alkollü araç kullanmayı
                    güvenli hale getirmez.
                </p>

                <h2>Promil Hesaplama Formülü (Widmark)</h2>
                <FormulGorseli
                    slug="promil"
                    alt="Alkol promil hesaplama formülü: Widmark denklemi, dağılım katsayısı ve saatlik eliminasyon"
                />
                <p>
                    Formüldeki <strong>r</strong> dağılım katsayısıdır ve vücuttaki su oranını temsil eder:
                    erkeklerde yaklaşık 0,68, kadınlarda 0,55. Aynı miktarda alkol alan iki kişiden vücut su
                    oranı düşük olanın promili daha yüksek çıkar.
                </p>

                <h2>İçeceklerdeki Saf Alkol Miktarı</h2>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr><th>İçecek</th><th>Hacim</th><th>Alkol Derecesi</th><th>Saf Alkol</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Bira</td><td>330 ml</td><td>%5</td><td>≈ 13 g</td></tr>
                            <tr><td>Şarap</td><td>150 ml</td><td>%12</td><td>≈ 14 g</td></tr>
                            <tr><td>Rakı / votka</td><td>50 ml</td><td>%45</td><td>≈ 18 g</td></tr>
                            <tr><td>Viski</td><td>50 ml</td><td>%40</td><td>≈ 16 g</td></tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    Saf alkol miktarı şöyle bulunur: hacim (ml) × derece (ondalık) × 0,789. Buradaki 0,789
                    etil alkolün yoğunluğudur (g/ml).
                </p>

                <h2>Adım Adım Örnek Promil Hesabı</h2>
                <ol>
                    <li>80 kg ağırlığında bir erkek, iki kadeh şarap içti (≈ 28 g saf alkol).</li>
                    <li>Dağılım hacmi: 80 × 0,68 = <strong>54,4</strong></li>
                    <li>Tepe promil: 28 ÷ 54,4 = <strong>0,51 promil</strong></li>
                    <li>2 saat sonra eliminasyon: 2 × 0,15 = 0,30 düşer</li>
                    <li>Tahmini güncel promil: 0,51 − 0,30 = <strong>0,21 promil</strong></li>
                </ol>

                <h2>Türkiye&apos;de Yasal Alkol Sınırları</h2>
                <p>
                    Karayolları Trafik Kanunu&apos;na göre sınırlar sürücü ve araç türüne göre değişir:
                </p>
                <ul>
                    <li><strong>Özel otomobil (hususi araç):</strong> 0,50 promil</li>
                    <li><strong>Ticari araç, otobüs, kamyon, taksi:</strong> 0,20 promil</li>
                    <li><strong>Römork/karavan çeken araçlar:</strong> 0,20 promil</li>
                    <li><strong>Motosiklet ve motorlu bisiklet:</strong> 0,20 promil</li>
                </ul>
                <p>
                    Sınırın aşılması hâlinde sürücü belgesine el konulur, idari para cezası uygulanır ve
                    tekrarında ceza süresi artar. Alkollü araç kullanımı kaynaklı bir kazada sigorta rücu
                    hakkını kullanabilir; yani maddi zarardan siz sorumlu olursunuz.
                </p>

                <h2>Alkol Vücuttan Ne Kadar Sürede Atılır?</h2>
                <p>
                    Karaciğer saatte ortalama <strong>0,10 – 0,15 promil</strong> alkol temizler ve bu hız
                    kişiden kişiye çok az değişir. Kahve, soğuk duş, egzersiz veya bol su içmek bu hızı
                    <em> artırmaz</em>; sadece kendinizi daha uyanık hissettirir ki bu daha tehlikelidir.
                </p>
                <p>
                    0,80 promile ulaşan biri için kanın tamamen temizlenmesi yaklaşık 6 saat sürer. Gece geç
                    saatte içilen alkolün ertesi sabah hâlâ ölçülebilir düzeyde olması bu yüzden sık görülür.
                </p>

                <h2>Promil Seviyelerinin Etkileri</h2>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr><th>Promil</th><th>Tipik Etki</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>0,20 – 0,50</td><td>Refleks yavaşlaması, özgüven artışı, mesafe algısında bozulma</td></tr>
                            <tr><td>0,50 – 1,00</td><td>Denge ve koordinasyon kaybı, tepki süresinde belirgin artış</td></tr>
                            <tr><td>1,00 – 2,00</td><td>Konuşma bozukluğu, çift görme, ciddi muhakeme kaybı</td></tr>
                            <tr><td>2,00 üzeri</td><td>Bilinç bulanıklığı; 3,00 üzeri hayati risk</td></tr>
                        </tbody>
                    </table>
                </div>

                <SSS
                    baslik="Alkol Promil Hesaplama Hakkında Sıkça Sorulan Sorular"
                    sorular={[
                        {
                            question: "Alkol promil hesaplama formülü nedir?",
                            answer:
                                "Widmark formülü kullanılır: Promil = Alkol (gram) ÷ (Vücut ağırlığı × r) − (0,15 × geçen saat). r katsayısı erkeklerde 0,68, kadınlarda 0,55'tir.",
                        },
                        {
                            question: "Türkiye'de yasal alkol sınırı kaç promil?",
                            answer:
                                "Özel otomobil sürücüleri için 0,50 promil, ticari araç ve motosiklet sürücüleri için 0,20 promildir. Sınırın aşılması sürücü belgesine el konulmasıyla sonuçlanır.",
                        },
                        {
                            question: "1 bira kaç promil yapar?",
                            answer:
                                "80 kg bir erkekte 330 ml %5'lik bir bira yaklaşık 0,24 promile denk gelir. Aynı bira 60 kg bir kadında yaklaşık 0,39 promil oluşturur.",
                        },
                        {
                            question: "Alkol vücuttan ne kadar sürede atılır?",
                            answer:
                                "Karaciğer saatte ortalama 0,10-0,15 promil alkol temizler. 0,80 promilin sıfırlanması yaklaşık 6 saat sürer. Kahve, duş veya spor bu süreyi kısaltmaz.",
                        },
                        {
                            question: "Bu hesaplama hukuki delil olarak kullanılabilir mi?",
                            answer:
                                "Hayır. Bu araç yalnızca bilgilendirme amaçlı bir tahmin verir. Resmî ölçüm, kalibre edilmiş alkolmetre veya kan testiyle yapılır.",
                        },
                    ]}
                />

                <h2>İlgili Hesaplama Araçları</h2>
                <ul>
                    <li><Link href="/saglik-spor/vki-hesaplama">VKİ hesaplama</Link></li>
                    <li><Link href="/saglik-spor/su-ihtiyaci-hesaplama">Günlük su ihtiyacı hesaplama</Link></li>
                    <li><Link href="/saglik-spor/bazal-metabolizma-hesaplama">Bazal metabolizma hesaplama</Link></li>
                    <li><Link href="/saglik-spor">Tüm sağlık ve spor hesaplayıcıları</Link></li>
                </ul>

                <p className="text-sm">
                    <strong>Kaynak:</strong>{" "}
                    <a href="https://www.who.int/health-topics/alcohol" target="_blank" rel="noopener">
                        Dünya Sağlık Örgütü — Alkol
                    </a>
                    . Yasal sınırlar 2918 sayılı Karayolları Trafik Kanunu&apos;nda düzenlenmiştir.
                    <strong> Alkol aldıysanız araç kullanmayın.</strong>
                </p>
            </article>
        </div>
    )
}
