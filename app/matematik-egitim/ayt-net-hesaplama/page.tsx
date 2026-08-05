import { YksCalculator } from "@/components/calculators/education/yks-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import Link from "next/link"
import { FormulGorseli } from "@/components/content/formul-gorseli"
import { SSS } from "@/components/content/sss"

export const metadata = buildMetadata({
    title: "AYT Net Hesaplama 2026 - YKS Neti",
    description: "2026 AYT net hesaplama aracı. Sayısal, Sözel, Eşit Ağırlık ve Dil testlerinde doğru-yanlış sayınıza göre AYT netinizi anında ücretsiz hesaplayın.",
    keywords: ["ayt net hesaplama", "ayt hesaplama 2026", "ayt sayısal net", "ayt sözel net", "alan yeterlilik testi"],
    path: "/matematik-egitim/ayt-net-hesaplama",
})

export default function AytHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "AYT Net Hesaplama 2026",
                    description: "2026 AYT net hesaplama aracı. Sayısal, Sözel ve Eşit Ağırlık alan testleri için net hesaplayın.",
                    path: "/matematik-egitim/ayt-net-hesaplama",
                    applicationCategory: "EducationalApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Matematik & Eğitim", path: "/matematik-egitim" },
                { name: "AYT Net Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">AYT Net Hesaplama 2026</h1>
                <p className="text-slate-600 dark:text-slate-400">Alan testlerinde doğru ve yanlış sayılarınıza göre AYT netinizi hesaplayın.</p>
            </div>

            <YksCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>AYT Net Hesaplama Nasıl Yapılır?</h2>
                <p>
                    <strong>AYT net hesaplama</strong>, TYT ile aynı mantığa dayanır: doğru sayısından yanlışların
                    dörtte biri düşülür. Farkı, AYT&apos;nin alan bazlı olmasıdır. Sayısal, Eşit Ağırlık, Sözel ve
                    Dil adaylarının hangi testleri cevaplayacağı ve bu testlerin yerleştirme puanına katkısı farklıdır.
                </p>
                <p>
                    Bu yüzden AYT&apos;de &quot;toplam net&quot; tek başına anlam taşımaz; hedeflediğiniz alanın
                    testlerindeki netiniz belirleyicidir. Sayısal adayının Edebiyat neti, Sözel adayının Fizik neti
                    yerleştirme puanına girmez.
                </p>

                <h2>AYT Net Hesaplama Formülü</h2>
                <FormulGorseli
                    slug="ayt-net"
                    alt="AYT net hesaplama formülü: net = doğru eksi yanlış bölü dört, alan testleri örnekleriyle"
                />

                <h2>AYT Soru Dağılımı</h2>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr><th>Test</th><th>Soru Sayısı</th><th>Hangi alanlar cevaplar?</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Türk Dili ve Edebiyatı – Sosyal Bilimler 1</td><td>40</td><td>EA, SÖZ</td></tr>
                            <tr><td>Sosyal Bilimler 2</td><td>40</td><td>SÖZ</td></tr>
                            <tr><td>Matematik</td><td>40</td><td>SAY, EA</td></tr>
                            <tr><td>Fen Bilimleri</td><td>40</td><td>SAY</td></tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    AYT&apos;de toplam 160 soru vardır ve süre 180 dakikadır. Adaylar yalnızca kendi alanlarının
                    testlerini cevaplar; diğer testleri boş bırakmak puanı düşürmez.
                </p>

                <h2>Alanlara Göre Katsayılar</h2>
                <p>
                    Yerleştirme puanı hesaplanırken TYT ve AYT netleri farklı ağırlıklarla toplanır. Kabaca
                    yerleştirme puanının <strong>%40&apos;ı TYT&apos;den, %60&apos;ı AYT&apos;den</strong> gelir.
                    Bu oran, AYT netinin bir birim artışının puanınıza TYT netinden daha fazla katkı yaptığı
                    anlamına gelir.
                </p>
                <ul>
                    <li><strong>Sayısal (SAY):</strong> AYT Matematik + Fen Bilimleri</li>
                    <li><strong>Eşit Ağırlık (EA):</strong> AYT Matematik + Edebiyat-Sosyal 1</li>
                    <li><strong>Sözel (SÖZ):</strong> Edebiyat-Sosyal 1 + Sosyal Bilimler 2</li>
                    <li><strong>Dil (DİL):</strong> Yabancı Dil Testi (ayrı oturum)</li>
                </ul>

                <h2>Adım Adım Örnek AYT Net Hesabı (Sayısal)</h2>
                <ol>
                    <li><strong>AYT Matematik:</strong> 30 doğru, 8 yanlış → 30 − 2 = <strong>28 net</strong></li>
                    <li><strong>Fizik:</strong> 9 doğru, 4 yanlış → 9 − 1 = <strong>8 net</strong></li>
                    <li><strong>Kimya:</strong> 8 doğru, 4 yanlış → 8 − 1 = <strong>7 net</strong></li>
                    <li><strong>Biyoloji:</strong> 10 doğru, 4 yanlış → 10 − 1 = <strong>9 net</strong></li>
                    <li><strong>Sayısal AYT toplamı:</strong> 28 + 24 = <strong>52 net</strong></li>
                </ol>

                <h2>AYT&apos;de Baraj ve Sıralama</h2>
                <p>
                    AYT puan türlerinde bir bölüme yerleşebilmek için hem 180 puan barajını geçmek hem de
                    bölümün taban sıralamasının üzerinde olmak gerekir. Tıp, hukuk, mühendislik gibi bölümlerde
                    sıralama şartı puandan daha belirleyicidir; bu yüzden net hedefinizi geçen yılın taban
                    sıralamasına göre kurmalısınız.
                </p>

                <h2>Net Artırmanın En Verimli Yolu</h2>
                <ul>
                    <li>En çok soru gelen konulardan başlayın: AYT Matematik&apos;te türev-integral, Fen&apos;de mekanik.</li>
                    <li>Yanlışlarınızın konusunu değil <em>sebebini</em> etiketleyin: bilgi eksiği mi, işlem hatası mı?</li>
                    <li>Alan dışı testlere zaman ayırmayın; yerleştirme puanınıza girmez.</li>
                    <li>Deneme sonrası tüm yanlışları aynı gün çözün; ertesi güne bırakılan analiz etkisini kaybeder.</li>
                    <li>Net grafiğini alan bazında tutun; toplam net trendini takip etmek yanıltır.</li>
                </ul>

                <SSS
                    baslik="AYT Net Hesaplama Hakkında Sıkça Sorulan Sorular"
                    sorular={[
                        {
                            question: "AYT net hesaplama formülü nedir?",
                            answer:
                                "Net = Doğru − (Yanlış ÷ 4). TYT ile aynı formüldür. 30 doğru ve 8 yanlış yaptıysanız netiniz 30 − 2 = 28 olur.",
                        },
                        {
                            question: "AYT'de kaç soru var?",
                            answer:
                                "AYT'de toplam 160 soru bulunur: 40 Türk Dili ve Edebiyatı-Sosyal Bilimler 1, 40 Sosyal Bilimler 2, 40 Matematik, 40 Fen Bilimleri. Süre 180 dakikadır.",
                        },
                        {
                            question: "Alan dışı testleri cevaplamalı mıyım?",
                            answer:
                                "Hayır. Alan dışı testlerdeki netler yerleştirme puanınıza girmez. O süreyi kendi alan testlerinizde kontrol için kullanmak daha verimlidir.",
                        },
                        {
                            question: "AYT neti mi TYT neti mi daha önemli?",
                            answer:
                                "Yerleştirme puanının yaklaşık %60'ı AYT'den geldiği için AYT netinin etkisi daha yüksektir. Ancak TYT barajını geçmeden AYT puanınız değerlendirilmez.",
                        },
                        {
                            question: "AYT barajı kaç puan?",
                            answer:
                                "AYT puan türleriyle bir bölüme yerleşebilmek için ilgili puan türünde en az 180 puan almanız gerekir. Özel yetenek ve bazı bölümlerde farklı şartlar geçerlidir.",
                        },
                    ]}
                />

                <h2>İlgili Hesaplama Araçları</h2>
                <ul>
                    <li><Link href="/matematik-egitim/tyt-net-hesaplama">TYT net hesaplama</Link></li>
                    <li><Link href="/matematik-egitim/ortalama-hesaplama">Ortalama hesaplama</Link></li>
                    <li><Link href="/matematik-egitim/dgs-puan-hesaplama">DGS puan hesaplama</Link></li>
                    <li><Link href="/matematik-egitim">Tüm matematik ve eğitim hesaplayıcıları</Link></li>
                </ul>

                <p className="text-sm">
                    <strong>Kaynak:</strong>{" "}
                    <a href="https://www.osym.gov.tr/" target="_blank" rel="noopener">
                        ÖSYM — Ölçme, Seçme ve Yerleştirme Merkezi
                    </a>
                    . Test içerikleri ve ağırlıklar her yıl YKS kılavuzunda yayımlanır.
                </p>
            </article>
        </div>
    )
}
