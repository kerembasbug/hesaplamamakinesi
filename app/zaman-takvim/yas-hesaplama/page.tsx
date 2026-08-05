import { AgeCalculator } from "@/components/calculators/time/age-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"

export const metadata = buildMetadata({
    title: "Yaş Hesaplama - Doğum Tarihine Göre",
    description: "Yaş hesaplama aracı. Doğum tarihinize göre yaşınızı yıl, ay ve gün olarak hesaplayın; burcunuzu ve bir sonraki doğum gününüze kalan süreyi görün.",
    keywords: ["yaş hesaplama", "yaş hesapla", "doğum tarihi hesaplama", "kaç yaşındayım", "burç hesaplama"],
    path: "/zaman-takvim/yas-hesaplama",
})

export default function YasHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Yaş Hesaplama",
                    description: "Online yaş hesaplama aracı. Doğum tarihinize göre yaşınızı yıl, ay, gün olarak hesaplayın. Burç ve doğum günü hesaplama.",
                    path: "/zaman-takvim/yas-hesaplama",
                    applicationCategory: "UtilitiesApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Zaman & Takvim", path: "/zaman-takvim" },
                { name: "Yaş Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Yaş Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Doğum tarihinize göre yaşınızı detaylı olarak hesaplayın.</p>
            </div>

            <AgeCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Yaş Hesaplama Nedir ve Nasıl Çalışır?</h2>
                <p>
                    <strong>Yaş hesaplama</strong>, doğum tarihinizden günümüze kadar geçen süreyi yıl, ay, gün ve hatta saat/dakika
                    cinsinden hesaplayan bir araçtır. Resmi işlemlerde, sağlık takibinde ve özel kutlamalarda yaş bilgisi önem taşır.
                    Aracımız, tam yaşınızın yanı sıra toplam yaşadığınız gün sayısını, burcunuzu ve bir sonraki doğum gününüze
                    kalan süreyi de gösterir.
                </p>

                <h2>Burçlar ve Tarih Aralıkları</h2>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Burç</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Tarih Aralığı</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Element</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="p-3 border border-slate-200 dark:border-slate-700">Koç</td><td className="p-3 border border-slate-200 dark:border-slate-700">21 Mart - 19 Nisan</td><td className="p-3 border border-slate-200 dark:border-slate-700">Ateş</td></tr>
                            <tr><td className="p-3 border border-slate-200 dark:border-slate-700">Boğa</td><td className="p-3 border border-slate-200 dark:border-slate-700">20 Nisan - 20 Mayıs</td><td className="p-3 border border-slate-200 dark:border-slate-700">Toprak</td></tr>
                            <tr><td className="p-3 border border-slate-200 dark:border-slate-700">İkizler</td><td className="p-3 border border-slate-200 dark:border-slate-700">21 Mayıs - 20 Haziran</td><td className="p-3 border border-slate-200 dark:border-slate-700">Hava</td></tr>
                            <tr><td className="p-3 border border-slate-200 dark:border-slate-700">Yengeç</td><td className="p-3 border border-slate-200 dark:border-slate-700">21 Haziran - 22 Temmuz</td><td className="p-3 border border-slate-200 dark:border-slate-700">Su</td></tr>
                            <tr><td className="p-3 border border-slate-200 dark:border-slate-700">Aslan</td><td className="p-3 border border-slate-200 dark:border-slate-700">23 Temmuz - 22 Ağustos</td><td className="p-3 border border-slate-200 dark:border-slate-700">Ateş</td></tr>
                            <tr><td className="p-3 border border-slate-200 dark:border-slate-700">Başak</td><td className="p-3 border border-slate-200 dark:border-slate-700">23 Ağustos - 22 Eylül</td><td className="p-3 border border-slate-200 dark:border-slate-700">Toprak</td></tr>
                            <tr><td className="p-3 border border-slate-200 dark:border-slate-700">Terazi</td><td className="p-3 border border-slate-200 dark:border-slate-700">23 Eylül - 22 Ekim</td><td className="p-3 border border-slate-200 dark:border-slate-700">Hava</td></tr>
                            <tr><td className="p-3 border border-slate-200 dark:border-slate-700">Akrep</td><td className="p-3 border border-slate-200 dark:border-slate-700">23 Ekim - 21 Kasım</td><td className="p-3 border border-slate-200 dark:border-slate-700">Su</td></tr>
                            <tr><td className="p-3 border border-slate-200 dark:border-slate-700">Yay</td><td className="p-3 border border-slate-200 dark:border-slate-700">22 Kasım - 21 Aralık</td><td className="p-3 border border-slate-200 dark:border-slate-700">Ateş</td></tr>
                            <tr><td className="p-3 border border-slate-200 dark:border-slate-700">Oğlak</td><td className="p-3 border border-slate-200 dark:border-slate-700">22 Aralık - 19 Ocak</td><td className="p-3 border border-slate-200 dark:border-slate-700">Toprak</td></tr>
                            <tr><td className="p-3 border border-slate-200 dark:border-slate-700">Kova</td><td className="p-3 border border-slate-200 dark:border-slate-700">20 Ocak - 18 Şubat</td><td className="p-3 border border-slate-200 dark:border-slate-700">Hava</td></tr>
                            <tr><td className="p-3 border border-slate-200 dark:border-slate-700">Balık</td><td className="p-3 border border-slate-200 dark:border-slate-700">19 Şubat - 20 Mart</td><td className="p-3 border border-slate-200 dark:border-slate-700">Su</td></tr>
                        </tbody>
                    </table>
                </div>

                <h2>Yaşa Göre Önemli Kilometre Taşları</h2>
                <ul>
                    <li><strong>18 yaş:</strong> Reşit olma yaşı, oy kullanma hakkı, ehliyet alabilme</li>
                    <li><strong>25 yaş:</strong> Beyin gelişiminin tamamlanması (prefrontal korteks)</li>
                    <li><strong>30 yaş:</strong> Kemik yoğunluğunun zirve noktası</li>
                    <li><strong>40 yaş:</strong> Türkiye&apos;de &quot;yaş haddinden&quot; emeklilik hesaplamaları başlangıcı</li>
                    <li><strong>65 yaş:</strong> Yaşlılık maaşı ve sosyal yardım hakları</li>
                </ul>

                <h2>Sıkça Sorulan Sorular (SSS)</h2>

                <h3>Yaşımı ay ve gün olarak nasıl hesaplarım?</h3>
                <p>
                    Doğduğunuz tarihten bugüne kadar geçen toplam ayları ve günleri sayarsınız. Aracımız bunu otomatik olarak
                    &quot;X yıl, Y ay, Z gün&quot; formatında size sunar.
                </p>

                <h3>Artık yıllar yaş hesaplamayı etkiler mi?</h3>
                <p>
                    Evet, artık yıllar (4 yılda bir 29 Şubat) toplam gün hesaplamalarını etkiler. 29 Şubat doğumlular için bazı
                    ülkelerde yasal olarak doğum günü 28 Şubat veya 1 Mart olarak kabul edilir.
                </p>

                <h3>Çin takvimine göre yaşım farklı mı?</h3>
                <p>
                    Evet, Doğu Asya kültürlerinde &quot;sayma yaşı&quot; sistemi kullanılır. Doğduğunuzda 1 yaşında sayılırsınız ve her
                    yeni yılda (Şubat civarı) yaşınız artar. Bu nedenle Batı hesabından 1-2 yaş fazla çıkabilir.
                </p>

                <h2>İlginç Yaş İstatistikleri</h2>
                <ul>
                    <li>Ortalama bir insan ömründe yaklaşık 27.375 gün yaşar (75 yıl).</li>
                    <li>Bir yılda yaklaşık 525.600 dakika geçer.</li>
                    <li>30 yaşına geldiğinizde yaklaşık 10.950 gün yaşamış olursunuz.</li>
                    <li>Dünya&apos;da her saniye yaklaşık 4 bebek doğar.</li>
                </ul>
            </article>
        </div>
    )
}
