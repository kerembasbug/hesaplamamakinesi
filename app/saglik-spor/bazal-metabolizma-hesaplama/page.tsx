import { BmrCalculator } from "@/components/calculators/health/bmr-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import Link from "next/link"
import { FormulGorseli } from "@/components/content/formul-gorseli"
import { SSS } from "@/components/content/sss"

export const metadata = buildMetadata({
    title: "Bazal Metabolizma Hesaplama - BMR",
    description: "Bazal metabolizma hızı (BMR) hesaplama aracı. Harris-Benedict formülüyle vücudunuzun dinlenme halindeki günlük kalori ihtiyacını ücretsiz bulun.",
    keywords: ["bazal metabolizma hesaplama", "bmr hesaplama", "günlük kalori ihtiyacı", "bazal metabolizma hızı", "kalori hesaplayıcı"],
    path: "/saglik-spor/bazal-metabolizma-hesaplama",
})

export default function BazalMetabolizmaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Bazal Metabolizma Hızı Hesaplama 2026",
                    description: "Günlük bazal metabolizma hızı (BMR) hesaplama aracı. Harris-Benedict formülü ile vücudunuzun dinlenme halindeki kalori ihtiyacını bulun.",
                    path: "/saglik-spor/bazal-metabolizma-hesaplama",
                    applicationCategory: "HealthApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Sağlık & Spor", path: "/saglik-spor" },
                { name: "Bazal Metabolizma" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Bazal Metabolizma Hızı (BMR) Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Vücudunuzun hiçbir aktivite yapmadan hayati fonksiyonlarını sürdürmesi için gereken enerji miktarını hesaplayın.</p>
            </div>

            <BmrCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Bazal Metabolizma Hızı (BMR) Nedir?</h2>
                <p>
                    <strong>Bazal metabolizma hızı</strong>, vücudunuzun tamamen dinlenme hâlindeyken —
                    yatarken, hiç hareket etmeden — yalnızca hayatta kalmak için harcadığı enerjidir. Kalbin
                    atması, nefes alıp verme, vücut sıcaklığının korunması ve hücre yenilenmesi bu enerjiyle
                    finanse edilir.
                </p>
                <p>
                    BMR, günlük toplam kalori harcamanızın <strong>%60 – %70&apos;ini</strong> oluşturur. Yani
                    hiç spor yapmasanız bile enerjinizin büyük kısmı zaten burada tüketilir. Kilo verme veya
                    alma planının başlangıç noktası bu sayıdır.
                </p>

                <h2>BMR Hesaplama Formülü</h2>
                <FormulGorseli
                    slug="bmr"
                    alt="Bazal metabolizma hızı BMR hesaplama formülü: Mifflin-St Jeor denklemi ve örnek hesap"
                />
                <p>
                    Hesaplayıcı Mifflin-St Jeor denklemini kullanır. Bu denklem, 1919 tarihli Harris-Benedict
                    formülüne göre modern popülasyonlarda daha isabetli sonuç verdiği için beslenme
                    literatüründe standart kabul edilir.
                </p>

                <h2>BMR ile TDEE Arasındaki Fark</h2>
                <p>
                    BMR yalnızca dinlenme hâlindeki tüketimdir. Gerçekte hareket eder, çalışır, sindirim
                    yaparsınız. Bunların hepsini kapsayan değere <strong>TDEE</strong> (Total Daily Energy
                    Expenditure — günlük toplam enerji harcaması) denir ve BMR&apos;yi aktivite katsayısıyla
                    çarparak bulunur.
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr><th>Aktivite Düzeyi</th><th>Katsayı</th><th>Tanım</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Hareketsiz</td><td>1,20</td><td>Masa başı iş, spor yok</td></tr>
                            <tr><td>Hafif aktif</td><td>1,375</td><td>Haftada 1-3 gün hafif egzersiz</td></tr>
                            <tr><td>Orta aktif</td><td>1,55</td><td>Haftada 3-5 gün egzersiz</td></tr>
                            <tr><td>Çok aktif</td><td>1,725</td><td>Haftada 6-7 gün egzersiz</td></tr>
                            <tr><td>Ekstra aktif</td><td>1,90</td><td>Ağır fiziksel iş veya günde iki antrenman</td></tr>
                        </tbody>
                    </table>
                </div>

                <h2>Adım Adım Örnek BMR Hesabı</h2>
                <ol>
                    <li>30 yaşında, 75 kg, 178 cm boyunda bir erkek.</li>
                    <li>10 × 75 = <strong>750</strong></li>
                    <li>6,25 × 178 = <strong>1.112,5</strong></li>
                    <li>5 × 30 = <strong>150</strong> (çıkarılır)</li>
                    <li>Erkek düzeltmesi: <strong>+5</strong></li>
                    <li>BMR = 750 + 1.112,5 − 150 + 5 = <strong>1.717,5 kcal/gün</strong></li>
                    <li>Orta aktif (×1,55) → TDEE ≈ <strong>2.662 kcal/gün</strong></li>
                </ol>

                <h2>BMR&apos;yi Etkileyen Faktörler</h2>
                <ul>
                    <li><strong>Kas kütlesi:</strong> Kas, yağ dokusundan yaklaşık üç kat fazla enerji tüketir. BMR&apos;yi kalıcı olarak yükseltmenin en etkili yolu kas kazanmaktır.</li>
                    <li><strong>Yaş:</strong> 20&apos;li yaşlardan sonra her on yılda %1-2 düşer; bunun ana nedeni kas kaybıdır.</li>
                    <li><strong>Cinsiyet:</strong> Erkeklerin ortalama kas oranı daha yüksek olduğu için aynı kilo ve boyda BMR&apos;leri daha yüksektir.</li>
                    <li><strong>Tiroid fonksiyonu:</strong> Hipotiroidi BMR&apos;yi düşürür, hipertiroidi yükseltir.</li>
                    <li><strong>Uzun süreli kısıtlı beslenme:</strong> Vücut enerji tasarrufuna geçerek BMR&apos;yi %10-15 düşürebilir.</li>
                </ul>

                <h2>Kilo Verme ve Alma Hedefi</h2>
                <p>
                    Haftada 0,5 kg yağ kaybı için günde yaklaşık <strong>500 kcal</strong> açık gerekir
                    (1 kg yağ ≈ 7.700 kcal). TDEE&apos;si 2.662 kcal olan bir kişi günde 2.162 kcal alarak bu
                    hedefe ulaşır.
                </p>
                <p>
                    Kalori alımını BMR&apos;nin altına indirmek önerilmez: vücut temel işlevlerini
                    finanse edemez, kas kaybı hızlanır ve metabolizma yavaşlar. Kilo alma hedefinde ise
                    TDEE üzerine günde 300-500 kcal eklemek, yağlanmayı sınırlayarak kas kazanmayı sağlar.
                </p>

                <SSS
                    baslik="Bazal Metabolizma Hesaplama Hakkında Sıkça Sorulan Sorular"
                    sorular={[
                        {
                            question: "Bazal metabolizma nasıl hesaplanır?",
                            answer:
                                "Mifflin-St Jeor formülüyle: BMR = 10×kilo(kg) + 6,25×boy(cm) − 5×yaş + s. Erkeklerde s = +5, kadınlarda s = −161'dir.",
                        },
                        {
                            question: "BMR ile TDEE arasındaki fark nedir?",
                            answer:
                                "BMR dinlenme hâlindeki enerji tüketimidir. TDEE ise BMR'nin aktivite katsayısıyla çarpılmasıyla bulunan günlük toplam harcamadır ve gerçek kalori ihtiyacınızı gösterir.",
                        },
                        {
                            question: "Kalori alımım BMR'nin altına düşmeli mi?",
                            answer:
                                "Hayır. BMR'nin altında beslenmek kas kaybını hızlandırır ve metabolizmayı yavaşlatır. Kilo vermek için BMR'nin değil TDEE'nin altında kalmak gerekir.",
                        },
                        {
                            question: "Metabolizmam neden yavaşladı?",
                            answer:
                                "En yaygın nedenler yaşla birlikte kas kaybı, uzun süreli düşük kalorili beslenme ve hareketsizliktir. Direnç antrenmanı ve yeterli protein alımı bu düşüşü büyük ölçüde durdurur.",
                        },
                        {
                            question: "Mifflin-St Jeor mu Harris-Benedict mi daha doğru?",
                            answer:
                                "Mifflin-St Jeor denklemi güncel popülasyonlarda daha isabetli sonuç verdiği için tercih edilir. Harris-Benedict 1919 verilerine dayanır ve genellikle BMR'yi bir miktar yüksek tahmin eder.",
                        },
                    ]}
                />

                <h2>İlgili Hesaplama Araçları</h2>
                <ul>
                    <li><Link href="/saglik-spor/kalori-hesaplama">Günlük kalori ihtiyacı (TDEE) hesaplama</Link></li>
                    <li><Link href="/saglik-spor/makro-hesaplama">Makro besin hesaplama</Link></li>
                    <li><Link href="/saglik-spor/vki-hesaplama">VKİ hesaplama</Link></li>
                    <li><Link href="/saglik-spor/ideal-kilo-hesaplama">İdeal kilo hesaplama</Link></li>
                    <li><Link href="/saglik-spor">Tüm sağlık ve spor hesaplayıcıları</Link></li>
                </ul>

                <p className="text-sm">
                    <strong>Kaynak:</strong>{" "}
                    <a href="https://www.who.int/health-topics/nutrition" target="_blank" rel="noopener">
                        Dünya Sağlık Örgütü — Beslenme
                    </a>
                    . Bu araç tıbbi tavsiye yerine geçmez; beslenme programınızı bir diyetisyenle planlayın.
                </p>
            </article>
        </div>
    )
}
