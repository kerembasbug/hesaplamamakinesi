import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { DgsScoreCalculator } from "@/components/calculators/education/dgs-score-calculator"

export const metadata: Metadata = {
    title: "DGS Puan Hesaplama 2025 - Dikey Geçiş Sınavı",
    description: "Online DGS puan hesaplama aracı. Türkçe ve matematik netleriyle sayısal, sözel ve eşit ağırlık puanlarınızı hesaplayın. 2025 DGS puan hesaplayıcı.",
    keywords: ["dgs puan hesaplama", "dgs hesaplama", "dikey geçiş sınavı", "dgs net hesaplama", "dgs 2025", "dgs puan hesapla"],
    openGraph: {
        title: "DGS Puan Hesaplama 2025",
        description: "DGS netlerinize göre tahmini puanınızı hesaplayın.",
        type: "website",
    }
}

export default function DgsPuanHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                    <Home className="h-4 w-4" />
                    Ana Sayfa
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/matematik-egitim" className="hover:text-indigo-600 transition-colors">
                    Matematik & Eğitim
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">DGS Puan Hesaplama</span>
            </nav>

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

                <h3>DGS 2025 Sınav Formatı</h3>
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

                <h3>DGS Puan Türleri</h3>
                <ul>
                    <li><strong>Sayısal (SAY):</strong> Matematik ağırlıklı, mühendislik ve fen bilimleri için</li>
                    <li><strong>Sözel (SÖZ):</strong> Türkçe ağırlıklı, sosyal bilimler ve hukuk için</li>
                    <li><strong>Eşit Ağırlık (EA):</strong> Her iki test eşit ağırlıklı, işletme ve iktisat için</li>
                </ul>

                <h3>Net Hesaplama</h3>
                <p>
                    DGS&apos;de her 4 yanlış cevap 1 doğru cevabı götürür. Net hesaplama formülü:
                </p>
                <p>
                    <strong>Net = Doğru Sayısı - (Yanlış Sayısı / 4)</strong>
                </p>
                <p>
                    Boş bırakılan sorular net hesaplamasına dahil edilmez.
                </p>

                <h3>DGS ile Geçiş Yapılabilecek Bölümler</h3>
                <ul>
                    <li>Ön lisans programınızla ilgili veya yakın alanlardaki lisans programları</li>
                    <li>Bazı bölümler için ek puan avantajı sağlanır (meslek yüksekokulu katsayısı)</li>
                    <li>Her bölümün kendine özel taban puanı ve kontenjanı vardır</li>
                </ul>

                <h3>Sıkça Sorulan Sorular (SSS)</h3>

                <h4>DGS ile kaç puan almam gerekiyor?</h4>
                <p>
                    Hedeflediğiniz bölüme göre değişir. Popüler bölümler için 300+ puan gerekebilirken,
                    daha az tercih edilen bölümler için 200 civarı puan yeterli olabilir.
                </p>

                <h4>DGS puanı kaç yıl geçerli?</h4>
                <p>
                    DGS puanı sadece ilgili yılın tercih dönemi için geçerlidir. Ertesi yıl tekrar
                    sınava girmeniz gerekir.
                </p>

                <h4>Açık öğretim mezunları DGS&apos;ye girebilir mi?</h4>
                <p>
                    Evet, açık öğretim ön lisans mezunları da DGS&apos;ye başvurabilir ve lisans programlarına
                    geçiş yapabilir.
                </p>

                <h3>DGS Hazırlık Önerileri</h3>
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
