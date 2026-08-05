import { OneRmCalculator } from "@/components/calculators/health/one-rm-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import Link from "next/link"
import { FormulGorseli } from "@/components/content/formul-gorseli"
import { SSS } from "@/components/content/sss"

export const metadata = buildMetadata({
    title: "1RM Hesaplama - Tek Tekrar Maksimum",
    description: "1RM (tek tekrar maksimum) hesaplama aracı. Kaldırdığınız ağırlık ve tekrar sayısına göre maksimum yükünüzü Epley ve Brzycki formülleriyle bulun.",
    keywords: ["1rm hesaplama", "tek tekrar maksimum", "bench press max hesaplama", "deadlift max hesaplama", "fitness hesaplama"],
    path: "/saglik-spor/1rm-hesaplama",
})

export default function OneRmHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "1RM Hesaplama",
                    description: "Fitness ve vücut geliştirme için 1RM (Tek Tekrar Maksimum) hesaplama aracı. Kaldırdığınız ağırlığa göre kaldırabileceğiniz maksimum yükü bulun.",
                    path: "/saglik-spor/1rm-hesaplama",
                    applicationCategory: "HealthApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Sağlık & Spor", path: "/saglik-spor" },
                { name: "1RM Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">1RM (Tek Tekrar Maksimum) Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Kaldırdığınız ağırlık ve tekrar sayısına göre %100 gücünüzü tahmin edin.</p>
            </div>

            <OneRmCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>1RM Hesaplama Nedir?</h2>
                <p>
                    <strong>1RM hesaplama</strong> (One Repetition Maximum — tek tekrar maksimum), bir hareketi
                    tekniğinizi bozmadan yalnızca bir kez kaldırabileceğiniz en ağır yükü tahmin eder. Antrenman
                    programlarındaki &quot;%75&apos;te 5 tekrar&quot; gibi ifadeler bu değere göre hesaplanır.
                </p>
                <p>
                    Gerçek 1RM testi yaralanma riski taşıdığı ve merkezi sinir sistemini çok yorduğu için,
                    sporcuların büyük çoğunluğu daha hafif bir yükle yapılan tekrar sayısından formülle tahmin
                    yapar. Yukarıdaki hesaplayıcı bunu sizin için yapar.
                </p>

                <h2>1RM Hesaplama Formülü</h2>
                <FormulGorseli
                    slug="1rm"
                    alt="1RM hesaplama formülü: Epley ve Brzycki denklemleriyle tek tekrar maksimum tahmini"
                />
                <p>
                    En yaygın iki denklem Epley ve Brzycki&apos;dir. Düşük tekrar sayılarında ikisi birbirine
                    çok yakın sonuç verir; 10 tekrarın üzerinde ise aralarındaki fark açılır ve tahminin
                    güvenilirliği azalır.
                </p>

                <h2>Tekrar – Yüzde Tablosu</h2>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr><th>Tekrar Sayısı</th><th>1RM&apos;in Yüzdesi</th><th>Tipik Kullanım</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>1</td><td>%100</td><td>Maksimal güç testi</td></tr>
                            <tr><td>3</td><td>%93</td><td>Güç geliştirme</td></tr>
                            <tr><td>5</td><td>%87</td><td>Güç ve kütle</td></tr>
                            <tr><td>8</td><td>%80</td><td>Hipertrofi</td></tr>
                            <tr><td>10</td><td>%75</td><td>Hipertrofi</td></tr>
                            <tr><td>12</td><td>%70</td><td>Kas dayanıklılığı</td></tr>
                            <tr><td>15</td><td>%65</td><td>Dayanıklılık</td></tr>
                        </tbody>
                    </table>
                </div>

                <h2>Adım Adım Örnek 1RM Hesabı</h2>
                <ol>
                    <li>Bench press&apos;te <strong>80 kg</strong> ile <strong>8 tekrar</strong> yaptınız.</li>
                    <li>Epley: 80 × (1 + 8 ÷ 30) = 80 × 1,267 = <strong>101,3 kg</strong></li>
                    <li>Brzycki: 80 ÷ (1,0278 − 0,0278 × 8) = <strong>99,2 kg</strong></li>
                    <li>Tahmini 1RM aralığı: <strong>99 – 101 kg</strong></li>
                    <li>Hipertrofi çalışması için %75: 100 × 0,75 = <strong>75 kg</strong></li>
                </ol>

                <h2>1RM&apos;e Göre Program Kurma</h2>
                <p>
                    1RM&apos;i bilmek, ağırlığı hisse göre değil sayıya göre seçmenizi sağlar. Klasik bir güç
                    bloğunda haftalar şöyle ilerler: 1. hafta %75&apos;te 5×5, 2. hafta %80&apos;de 5×4,
                    3. hafta %85&apos;te 5×3, 4. hafta deload olarak %60&apos;ta 3×5. Blok sonunda 1RM&apos;i
                    yeniden tahmin edip yüzdeleri güncellersiniz.
                </p>

                <h2>Tahminin Güvenilirliği ve Sınırları</h2>
                <ul>
                    <li>1–5 tekrar aralığında tahmin gerçek 1RM&apos;e çok yakındır; 12+ tekrarda sapma büyür.</li>
                    <li>Formüller squat ve deadlift gibi çok eklemli hareketlerde daha isabetlidir.</li>
                    <li>Biceps curl gibi izolasyon hareketlerinde tahmin genellikle yüksek çıkar.</li>
                    <li>Uyku, beslenme ve stres günlük performansı %10&apos;a varan oranda değiştirebilir.</li>
                    <li>Set başarısızlığa kadar götürülmediyse tahmin gerçek değerin altında kalır.</li>
                </ul>

                <h2>Güvenlik Notu</h2>
                <p>
                    Maksimal yüklerde daima spotter kullanın, ısınma setlerini atlamayın ve tekniğiniz bozulmaya
                    başladığında seti sonlandırın. Sırt, omuz veya diz ağrısı varken maksimal test yapmayın.
                    Bu araç bir tahmin verir; antrenman planınızı bir uzmanla birlikte oluşturmanız önerilir.
                </p>

                <SSS
                    baslik="1RM Hesaplama Hakkında Sıkça Sorulan Sorular"
                    sorular={[
                        {
                            question: "1RM hesaplama formülü nedir?",
                            answer:
                                "En yaygın kullanılan Epley formülüdür: 1RM = Ağırlık × (1 + Tekrar ÷ 30). 80 kg ile 8 tekrar yapan biri için tahmini 1RM 101,3 kg olur.",
                        },
                        {
                            question: "1RM testini kendim yapmalı mıyım?",
                            answer:
                                "Gerçek 1RM testi yaralanma riski taşır ve deneyimli bir spotter gerektirir. Çoğu sporcu için 3-8 tekrarlık bir setten formülle tahmin yapmak hem güvenli hem yeterince isabetlidir.",
                        },
                        {
                            question: "Epley ile Brzycki arasındaki fark nedir?",
                            answer:
                                "Düşük tekrarlarda ikisi neredeyse aynı sonucu verir. 10 tekrarın üzerinde Epley daha yüksek, Brzycki daha muhafazakâr tahmin üretir. İkisinin ortalamasını almak pratik bir yaklaşımdır.",
                        },
                        {
                            question: "1RM'imi ne sıklıkla güncellemeliyim?",
                            answer:
                                "4-6 haftalık antrenman blokları sonunda güncellemek yeterlidir. Daha sık güncelleme, günlük performans dalgalanmalarını gerçek gelişme sanmanıza yol açar.",
                        },
                        {
                            question: "Hangi yüzdede çalışmalıyım?",
                            answer:
                                "Güç için 1RM'in %85-95'inde 1-5 tekrar, kas kütlesi için %70-80'inde 8-12 tekrar, dayanıklılık için %60-70'inde 15+ tekrar tercih edilir.",
                        },
                    ]}
                />

                <h2>İlgili Hesaplama Araçları</h2>
                <ul>
                    <li><Link href="/saglik-spor/makro-hesaplama">Makro besin hesaplama</Link> — antrenmanı besleyen beslenme planı</li>
                    <li><Link href="/saglik-spor/kalori-hesaplama">Kalori ihtiyacı hesaplama</Link></li>
                    <li><Link href="/saglik-spor/bazal-metabolizma-hesaplama">Bazal metabolizma (BMR) hesaplama</Link></li>
                    <li><Link href="/birim/70-kg-kac-pound">70 kg kaç pound</Link> — İngilizce programlardaki yükleri çevirin</li>
                    <li><Link href="/saglik-spor">Tüm sağlık ve spor hesaplayıcıları</Link></li>
                </ul>

                <p className="text-sm">
                    <strong>Kaynak:</strong>{" "}
                    <a href="https://www.nsca.com/" target="_blank" rel="noopener">
                        National Strength and Conditioning Association (NSCA)
                    </a>
                    . Tekrar-yüzde ilişkisi kuvvet antrenmanı literatüründeki standart tablolara dayanır.
                </p>
            </article>
        </div>
    )
}
