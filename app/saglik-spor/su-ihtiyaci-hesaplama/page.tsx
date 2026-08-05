import { WaterCalculator } from "@/components/calculators/health/water-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import Link from "next/link"
import { SSS } from "@/components/content/sss"

export const metadata = buildMetadata({
    title: "Su İhtiyacı Hesaplama - Günlük Su",
    description: "Günlük su ihtiyacı hesaplama aracı. Kilonuza, aktivite seviyenize ve hava sıcaklığına göre içmeniz gereken su miktarını litre cinsinden hesaplayın.",
    keywords: ["su ihtiyacı hesaplama", "günlük su tüketimi", "su hesaplama", "kaç litre su içmeli", "su ihtiyacı"],
    path: "/saglik-spor/su-ihtiyaci-hesaplama",
})

export default function SuIhtiyaciHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Su İhtiyacı Hesaplama",
                    description: "Online su ihtiyacı hesaplama aracı. Kilonuza ve aktivite seviyenize göre günlük su ihtiyacınızı hesaplayın. Sağlıklı yaşam için öneriler.",
                    path: "/saglik-spor/su-ihtiyaci-hesaplama",
                    applicationCategory: "HealthApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Sağlık & Spor", path: "/saglik-spor" },
                { name: "Su İhtiyacı Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Günlük Su İhtiyacı Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Kilonuza ve aktivite seviyenize göre günlük su ihtiyacınızı öğrenin.</p>
            </div>

            <WaterCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Günlük Su İhtiyacı Hesaplama Nasıl Yapılır?</h2>
                <p>
                    <strong>Su ihtiyacı hesaplama</strong>, vücut ağırlığınıza ve aktivite düzeyinize göre
                    günde içmeniz gereken su miktarını bulur. En yaygın kabul gören yaklaşım, kilogram başına
                    <strong> 30-35 ml</strong> su almaktır. 70 kg bir yetişkin için bu günde yaklaşık
                    2,1 – 2,4 litreye karşılık gelir.
                </p>
                <p>
                    &quot;Günde 8 bardak&quot; kuralı pratik bir hatırlatmadır ama kişiselleştirilmemiştir:
                    50 kg bir kişiyle 95 kg bir kişinin ihtiyacı aynı olamaz. Kilo bazlı hesap daha isabetlidir.
                </p>

                <h2>Su İhtiyacını Artıran Durumlar</h2>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr><th>Durum</th><th>Ek İhtiyaç</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Orta yoğunlukta 1 saat egzersiz</td><td>+400 – 800 ml</td></tr>
                            <tr><td>30 °C üzeri sıcak hava</td><td>+500 ml</td></tr>
                            <tr><td>Gebelik</td><td>+300 ml</td></tr>
                            <tr><td>Emzirme</td><td>+700 ml</td></tr>
                            <tr><td>Ateş, ishal veya kusma</td><td>Belirgin artış — hekime danışın</td></tr>
                            <tr><td>Yüksek rakım (2.500 m üzeri)</td><td>+500 ml</td></tr>
                        </tbody>
                    </table>
                </div>

                <h2>Adım Adım Örnek Su İhtiyacı Hesabı</h2>
                <ol>
                    <li>Vücut ağırlığı: <strong>75 kg</strong></li>
                    <li>Temel ihtiyaç: 75 × 33 ml = <strong>2.475 ml ≈ 2,5 litre</strong></li>
                    <li>Haftada 4 gün 1 saat antrenman: <strong>+600 ml</strong></li>
                    <li>Antrenman günü toplam: <strong>≈ 3,1 litre</strong></li>
                    <li>Dinlenme günü toplam: <strong>≈ 2,5 litre</strong></li>
                </ol>

                <h2>Yediğiniz Besinler de Sayılır</h2>
                <p>
                    Günlük sıvı alımının yaklaşık <strong>%20&apos;si</strong> besinlerden gelir. Salatalık,
                    karpuz, domates, çorba ve yoğurt yüksek su içeriğine sahiptir. Çay ve kahve de sıvı
                    alımına katkı sağlar; kafeinin idrar söktürücü etkisi alışkın kişilerde net kaybı
                    oluşturacak düzeyde değildir.
                </p>

                <h2>Yeterli Su İçip İçmediğinizi Nasıl Anlarsınız?</h2>
                <p>
                    En pratik gösterge idrar rengidir. Açık sarı ve berrak renk yeterli sıvı alımını, koyu
                    sarı veya amber rengi ise sıvı açığını işaret eder. Gün içinde 4-7 kez idrara çıkmak
                    normal kabul edilir.
                </p>
                <ul>
                    <li><strong>Susuzluk hissi:</strong> Zaten hafif dehidratasyonun başladığını gösterir; beklemeden için.</li>
                    <li><strong>Baş ağrısı ve yorgunluk:</strong> Sıvı açığının en sık görülen ilk belirtileridir.</li>
                    <li><strong>Cilt esnekliğinin azalması:</strong> İleri dehidratasyon işaretidir.</li>
                    <li><strong>Konsantrasyon düşüşü:</strong> Vücut ağırlığının %2&apos;si kadar sıvı kaybı bile bilişsel performansı düşürür.</li>
                </ul>

                <h2>Aşırı Su İçmek de Riskli mi?</h2>
                <p>
                    Evet. Kısa sürede çok fazla su içmek kandaki sodyum yoğunluğunu tehlikeli seviyede
                    düşürebilir (hiponatremi). Bu durum özellikle maraton gibi uzun süreli dayanıklılık
                    sporlarında görülür. Suyu güne yayarak içmek, tek seferde büyük miktar tüketmekten
                    her zaman daha güvenlidir. Böbrek veya kalp yetmezliği olanlar sıvı alımını hekim
                    kontrolünde planlamalıdır.
                </p>

                <h2>Su İçme Alışkanlığı Kazanma İpuçları</h2>
                <ul>
                    <li>Uyanır uyanmaz bir bardak su için; gece boyunca kaybedilen sıvıyı telafi eder.</li>
                    <li>Masanızda görünür bir şişe bulundurun; görünürlük tüketimi belirgin artırır.</li>
                    <li>Her öğün öncesi bir bardak su, hem sıvı alımını hem tokluk hissini destekler.</li>
                    <li>Şişenizi litrelik seçip günde kaç şişe bitireceğinizi baştan belirleyin.</li>
                    <li>Antrenman öncesi 500 ml, sırasında her 15-20 dakikada 150-250 ml için.</li>
                </ul>

                <SSS
                    baslik="Su İhtiyacı Hesaplama Hakkında Sıkça Sorulan Sorular"
                    sorular={[
                        {
                            question: "Günde kaç litre su içmeliyim?",
                            answer:
                                "Vücut ağırlığınızın her kilogramı için 30-35 ml su hedefleyin. 70 kg bir yetişkin için bu günde yaklaşık 2,1-2,4 litredir. Egzersiz ve sıcak hava bu miktarı artırır.",
                        },
                        {
                            question: "Çay ve kahve su ihtiyacını karşılar mı?",
                            answer:
                                "Evet, sıvı alımına katkı sağlarlar. Kafeinin idrar söktürücü etkisi düzenli tüketen kişilerde net sıvı kaybı yaratacak düzeyde değildir.",
                        },
                        {
                            question: "Yeterli su içtiğimi nasıl anlarım?",
                            answer:
                                "İdrar renginiz açık sarı ve berraksa sıvı alımınız yeterlidir. Koyu sarı renk sıvı açığını gösterir. Gün içinde 4-7 kez idrara çıkmak normaldir.",
                        },
                        {
                            question: "Çok fazla su içmek zararlı mı?",
                            answer:
                                "Kısa sürede aşırı miktarda su içmek kandaki sodyumu tehlikeli düzeyde seyreltebilir (hiponatremi). Suyu güne yaymak en güvenli yaklaşımdır.",
                        },
                        {
                            question: "Egzersizde ne kadar su içmeliyim?",
                            answer:
                                "Antrenmandan 2 saat önce yaklaşık 500 ml, antrenman sırasında her 15-20 dakikada 150-250 ml içmek önerilir. Bir saatlik orta yoğunluklu egzersiz için toplam 400-800 ml ek gerekir.",
                        },
                    ]}
                />

                <h2>İlgili Hesaplama Araçları</h2>
                <ul>
                    <li><Link href="/saglik-spor/kalori-hesaplama">Günlük kalori ihtiyacı hesaplama</Link></li>
                    <li><Link href="/saglik-spor/vki-hesaplama">VKİ hesaplama</Link></li>
                    <li><Link href="/saglik-spor/bazal-metabolizma-hesaplama">Bazal metabolizma hesaplama</Link></li>
                    <li><Link href="/saglik-spor/makro-hesaplama">Makro besin hesaplama</Link></li>
                    <li><Link href="/saglik-spor">Tüm sağlık ve spor hesaplayıcıları</Link></li>
                </ul>

                <p className="text-sm">
                    <strong>Kaynak:</strong>{" "}
                    <a href="https://www.who.int/health-topics/drinking-water" target="_blank" rel="noopener">
                        Dünya Sağlık Örgütü — İçme Suyu
                    </a>
                    . Bu araç tıbbi tavsiye yerine geçmez; böbrek veya kalp rahatsızlığınız varsa hekiminize danışın.
                </p>
            </article>
        </div>
    )
}
