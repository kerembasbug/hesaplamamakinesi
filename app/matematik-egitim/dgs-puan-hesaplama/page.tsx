import { DgsScoreCalculator } from "@/components/calculators/education/dgs-score-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"

export const metadata = buildMetadata({
    title: "DGS Puan Hesaplama 2026 - Dikey Geçiş",
    description: "2026 DGS puan hesaplama aracı. Türkçe ve matematik netlerinizle sayısal, sözel ve eşit ağırlık puanlarınızı katsayılarla anında hesaplayın.",
    keywords: ["dgs puan hesaplama", "dgs hesaplama", "dikey geçiş sınavı", "dgs net hesaplama", "dgs 2026", "dgs puan hesapla"],
    path: "/matematik-egitim/dgs-puan-hesaplama",
})

export default function DgsPuanHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "DGS Puan Hesaplama 2026",
                    description: "2026 DGS puan hesaplama aracı. Türkçe ve matematik netlerinizle sayısal, sözel ve eşit ağırlık puanlarınızı katsayılarla anında hesaplayın.",
                    path: "/matematik-egitim/dgs-puan-hesaplama",
                    applicationCategory: "EducationalApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Matematik & Eğitim", path: "/matematik-egitim" },
                { name: "DGS Puan Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    DGS Puan Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Dikey Geçiş Sınavı netlerinize göre tahmini puanlarınızı hesaplayın.
                </p>
            </div>

            <DgsScoreCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>DGS Nedir?</h2>
                <p>
                    <strong>DGS (Dikey Geçiş Sınavı)</strong>, ön lisans (2 yıllık) mezunlarının lisans (4 yıllık)
                    programlarına geçiş yapabilmesi için ÖSYM tarafından her yıl düzenlenen bir sınavdır. Sınav
                    Türkçe ve Matematik olmak üzere iki bölümden oluşur ve toplam 100 soru içerir.
                </p>

                <h2>DGS 2026 Sınav Formatı</h2>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Bölüm</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Soru Sayısı</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Süre</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Türkçe</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">50 Soru</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700" rowSpan={2}>150 dakika</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Matematik</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">50 Soru</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>DGS Puan Türleri</h2>
                <ul>
                    <li><strong>Sayısal (SAY):</strong> Matematik ağırlıklı, mühendislik ve fen bilimleri için</li>
                    <li><strong>Sözel (SÖZ):</strong> Türkçe ağırlıklı, sosyal bilimler ve hukuk için</li>
                    <li><strong>Eşit Ağırlık (EA):</strong> Her iki test eşit ağırlıklı, işletme ve iktisat için</li>
                </ul>

                <h2>Net Hesaplama</h2>
                <p>
                    DGS&apos;de her 4 yanlış cevap 1 doğru cevabı götürür. Net hesaplama formülü:
                </p>
                <p>
                    <strong>Net = Doğru Sayısı - (Yanlış Sayısı / 4)</strong>
                </p>
                <p>
                    Boş bırakılan sorular net hesaplamasına dahil edilmez.
                </p>

                <h2>DGS ile Geçiş Yapılabilecek Bölümler</h2>
                <ul>
                    <li>Ön lisans programınızla ilgili veya yakın alanlardaki lisans programları</li>
                    <li>Bazı bölümler için ek puan avantajı sağlanır (meslek yüksekokulu katsayısı)</li>
                    <li>Her bölümün kendine özel taban puanı ve kontenjanı vardır</li>
                </ul>

                <h2>Sıkça Sorulan Sorular (SSS)</h2>

                <h3>DGS ile kaç puan almam gerekiyor?</h3>
                <p>
                    Hedeflediğiniz bölüme göre değişir. Popüler bölümler için 300+ puan gerekebilirken,
                    daha az tercih edilen bölümler için 200 civarı puan yeterli olabilir.
                </p>

                <h3>DGS puanı kaç yıl geçerli?</h3>
                <p>
                    DGS puanı sadece ilgili yılın tercih dönemi için geçerlidir. Ertesi yıl tekrar
                    sınava girmeniz gerekir.
                </p>

                <h3>Açık öğretim mezunları DGS&apos;ye girebilir mi?</h3>
                <p>
                    Evet, açık öğretim ön lisans mezunları da DGS&apos;ye başvurabilir ve lisans programlarına
                    geçiş yapabilir.
                </p>

                <h2>DGS Hazırlık Önerileri</h2>
                <ul>
                    <li>Matematik için temel konuları (denklemler, problemler, geometri) iyi öğrenin.</li>
                    <li>Türkçe için paragraf soruları ve dil bilgisi çalışın.</li>
                    <li>Deneme sınavları çözerek süre yönetimi pratik yapın.</li>
                    <li>Son 5 yılın çıkmış sorularını mutlaka inceleyin.</li>
                </ul>
            </article>
        </div>
    )
}
