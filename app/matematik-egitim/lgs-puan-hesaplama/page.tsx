import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { LgsCalculator } from "@/components/calculators/education/lgs-calculator"

export const metadata: Metadata = {
    title: "LGS Puan Hesaplama 2026 - Liselere Geçiş Sistemi Hesaplayıcı",
    description: "2026 LGS puan hesaplama aracı. Türkçe, Matematik, Fen, Sosyal, Din Kültürü ve Yabancı Dil netlerinize göre LGS puanınızı hesaplayın. Yüzdelik dilim tahmini.",
    keywords: ["lgs puan hesaplama 2026", "lgs hesaplama", "lgs net hesaplama", "lgs puan hesaplayıcı", "liselere geçiş sistemi", "lgs 2026"],
    openGraph: {
        title: "LGS Puan Hesaplama 2026 - Liselere Geçiş Sistemi",
        description: "2026 LGS sınavı için puan ve yüzdelik dilim hesaplayıcı.",
        type: "website",
    }
}

export default function LgsHesaplamaPage() {
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
                <span className="text-slate-900 dark:text-white font-medium">LGS Puan Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    LGS Puan Hesaplama 2026
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Doğru ve yanlış sayılarınızı girerek 2026 LGS puanınızı ve tahmini yüzdelik diliminizi hesaplayın.
                </p>
            </div>

            <LgsCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>LGS (Liselere Geçiş Sistemi) Nedir?</h2>
                <p>
                    LGS, Türkiye&apos;de ortaokul 8. sınıf öğrencilerinin liselere yerleştirilmesi için uygulanan
                    merkezi sınav sistemidir. Milli Eğitim Bakanlığı (MEB) tarafından her yıl Haziran ayında
                    düzenlenen bu sınav, öğrencilerin Fen Lisesi, Anadolu Lisesi, Sosyal Bilimler Lisesi
                    gibi nitelikli liselere yerleşmesini belirler.
                </p>

                <h2>2026 LGS Sınav Formatı</h2>
                <p>
                    LGS sınavında toplam 90 soru sorulmaktadır. Sınav süresi 135 dakikadır (2 saat 15 dakika).
                    Soru dağılımı şu şekildedir:
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Ders</th>
                            <th>Soru Sayısı</th>
                            <th>Ağırlık Katsayısı</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Türkçe</td><td>20</td><td>4</td></tr>
                        <tr><td>Matematik</td><td>20</td><td>4</td></tr>
                        <tr><td>Fen Bilimleri</td><td>20</td><td>4</td></tr>
                        <tr><td>T.C. İnkılap Tarihi ve Atatürkçülük</td><td>10</td><td>2</td></tr>
                        <tr><td>Din Kültürü ve Ahlak Bilgisi</td><td>10</td><td>2</td></tr>
                        <tr><td>Yabancı Dil (İngilizce)</td><td>10</td><td>2</td></tr>
                    </tbody>
                </table>

                <h2>LGS Puan Hesaplama Formülü</h2>
                <p>
                    LGS puanı hesaplanırken önce her ders için net sayısı bulunur. Net hesaplama formülü:
                </p>
                <p>
                    <strong>Net = Doğru Sayısı - (Yanlış Sayısı × 0.25)</strong>
                </p>
                <p>
                    Yani 4 yanlış cevap, 1 doğru cevabı götürür. Boş bırakılan sorular net hesaplamasına dahil edilmez.
                </p>
                <p>
                    Ardından her dersin neti, ağırlık katsayısı ile çarpılarak ağırlıklı net bulunur.
                    Toplam ağırlıklı net, ham puana dönüştürülür.
                </p>

                <h2>Yüzdelik Dilim Nedir?</h2>
                <p>
                    Yüzdelik dilim, bir öğrencinin sınavda diğer öğrencilere göre nerede konumlandığını gösterir.
                    Örneğin, %1&apos;lik dilimde olan bir öğrenci, sınava giren öğrencilerin %99&apos;undan daha başarılıdır.
                </p>
                <ul>
                    <li><strong>Fen Liseleri:</strong> Genellikle ilk %1-3 dilimindeki öğrencileri alır</li>
                    <li><strong>Anadolu Liseleri (İyi):</strong> %5-10 dilimi</li>
                    <li><strong>Anadolu Liseleri (Orta):</strong> %10-25 dilimi</li>
                </ul>

                <h2>LGS 2026 İçin Hazırlık Tavsiyeleri</h2>
                <ul>
                    <li>Düzenli olarak deneme sınavları çözün ve eksiklerinizi belirleyin</li>
                    <li>Matematik ve Fen derslerine ayrı önem verin (yüksek ağırlık katsayısı)</li>
                    <li>Paragraf okuma ve yorumlama becerilerinizi geliştirin</li>
                    <li>Zaman yönetimini pratik yaparak öğrenin</li>
                    <li>Stres yönetimi için düzenli mola verin</li>
                    <li>Yanlış yaptığınız soruları tekrar çözün</li>
                </ul>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>LGS&apos;de boş bırakmak mı yanlış yapmak mı daha iyi?</h3>
                <p>
                    4 yanlış 1 doğruyu götürdüğü için, emin olmadığınız sorularda boş bırakmak genellikle
                    daha mantıklıdır. Ancak 4 şıktan 2&apos;sini elediyseniz, tahmin yapmanız avantajlı olabilir.
                </p>

                <h3>LGS puanı liseden liseye değişir mi?</h3>
                <p>
                    Hayır, LGS puanı sabittir. Ancak her lisenin taban puanı farklıdır ve bu taban puanlar
                    her yıl o liseye başvuran öğrencilerin puanlarına göre değişir.
                </p>

                <h3>LGS 2026 ne zaman yapılacak?</h3>
                <p>
                    LGS 2026 sınavının Haziran 2026&apos;da yapılması beklenmektedir. Kesin tarih MEB tarafından
                    sınav takvimiyle birlikte açıklanacaktır.
                </p>
            </article>
        </div>
    )
}
