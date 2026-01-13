import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { RoiCalculator } from "@/components/calculators/finance/roi-calculator"

export const metadata: Metadata = {
    title: "Yatırım Getirisi (ROI) Hesaplama - Karlılık Hesaplayıcı",
    description: "Online ROI hesaplama aracı. Yatırımınızın getirisini yüzde olarak hesaplayın. Kar-zarar analizi, yatırım performansı ölçümü için ücretsiz hesaplayıcı.",
    keywords: ["roi hesaplama", "yatırım getirisi", "karlılık hesaplama", "return on investment", "yatırım kar hesaplama", "yatırım performansı"],
    openGraph: {
        title: "Yatırım Getirisi (ROI) Hesaplama - Karlılık Hesaplayıcı",
        description: "Yatırımınızın getirisini yüzde olarak hesaplayın.",
        type: "website",
    }
}

export default function YatirimGetirisiPage() {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                    <Home className="h-4 w-4" />
                    Ana Sayfa
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/finans" className="hover:text-indigo-600 transition-colors">
                    Finans
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Yatırım Getirisi (ROI)</span>
            </nav>

            {/* Page Title */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Yatırım Getirisi (ROI) Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Yatırımlarınızın performansını ölçün ve kar-zarar analizinizi yapın.
                </p>
            </div>

            {/* Calculator */}
            <RoiCalculator />

            {/* SEO Content */}
            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>ROI (Yatırım Getirisi) Nedir?</h2>
                <p>
                    ROI (Return on Investment - Yatırım Getirisi), bir yatırımın karlılığını
                    ölçen temel finansal metriktir. Yatırımdan elde edilen kar veya zararın,
                    yatırım maliyetine oranını yüzde olarak ifade eder. Bu oran, farklı
                    yatırım alternatiflerini karşılaştırmak ve yatırım kararları almak için
                    kritik öneme sahiptir.
                </p>
                <p>
                    ROI, hem bireysel yatırımcılar hem de şirketler tarafından yaygın olarak
                    kullanılır. Hisse senedi, gayrimenkul, işletme yatırımları, pazarlama
                    kampanyaları ve eğitim yatırımları gibi geniş bir yelpazede uygulanabilir.
                </p>

                <h2>ROI Nasıl Hesaplanır?</h2>
                <p>
                    ROI hesaplama formülü oldukça basittir:
                </p>
                <p>
                    <strong>ROI = [(Son Değer - Yatırım Maliyeti) / Yatırım Maliyeti] × 100</strong>
                </p>
                <p>
                    Veya kısaca:
                </p>
                <p>
                    <strong>ROI = (Net Kar / Yatırım Maliyeti) × 100</strong>
                </p>
                <p>
                    Örnek: 50.000 TL&apos;ye aldığınız bir hisse senedi 75.000 TL değerine ulaştı.
                </p>
                <ul>
                    <li>Net Kar = 75.000 - 50.000 = 25.000 TL</li>
                    <li>ROI = (25.000 / 50.000) × 100 = %50</li>
                </ul>
                <p>
                    Bu, yatırımınızın %50 getiri sağladığı anlamına gelir.
                </p>

                <h2>ROI Yorumlama</h2>
                <p>
                    ROI değerleri şu şekilde yorumlanabilir:
                </p>
                <ul>
                    <li><strong>Pozitif ROI (&gt;0%):</strong> Yatırım kar elde etmiştir</li>
                    <li><strong>Negatif ROI (&lt;0%):</strong> Yatırım zarar etmiştir</li>
                    <li><strong>%0 ROI:</strong> Ne kar ne zarar (başabaş noktası)</li>
                </ul>
                <p>
                    Genel kural olarak, ROI ne kadar yüksekse yatırım o kadar başarılıdır.
                    Ancak yüksek ROI genellikle yüksek risk de içerir.
                </p>

                <h2>ROI Kullanım Alanları</h2>
                <ul>
                    <li>
                        <strong>Hisse Senedi Yatırımları:</strong> Portföy performansını
                        değerlendirmek için
                    </li>
                    <li>
                        <strong>Gayrimenkul:</strong> Ev, arsa veya ticari mülk yatırımlarının
                        karlılığını ölçmek için
                    </li>
                    <li>
                        <strong>İşletme Yatırımları:</strong> Yeni ekipman, yazılım veya
                        genişleme projelerinin değerini hesaplamak için
                    </li>
                    <li>
                        <strong>Pazarlama:</strong> Reklam kampanyalarının etkinliğini
                        ölçmek için
                    </li>
                    <li>
                        <strong>Eğitim:</strong> Eğitim ve sertifikalara yapılan yatırımın
                        kariyer açısından getirisini değerlendirmek için
                    </li>
                </ul>

                <h2>ROI&apos;nin Sınırlamaları</h2>
                <p>
                    ROI kullanışlı olsa da bazı sınırlamaları vardır:
                </p>
                <ul>
                    <li>
                        <strong>Zaman Faktörü:</strong> Standart ROI zaman dilimini dikkate
                        almaz. %20 getiri 1 yılda mı yoksa 5 yılda mı elde edildi? Bu önemlidir.
                    </li>
                    <li>
                        <strong>Risk Değerlendirmesi:</strong> İki yatırımın aynı ROI&apos;si
                        olsa bile risk profilleri farklı olabilir.
                    </li>
                    <li>
                        <strong>Nakit Akışı:</strong> ROI toplam getiriyi gösterir, ancak
                        ara dönemlerdeki nakit akışlarını görmezden gelir.
                    </li>
                    <li>
                        <strong>Enflasyon:</strong> Nominal ROI, enflasyonu hesaba katmaz.
                        Reel getiri için enflasyon düzeltmesi gerekir.
                    </li>
                </ul>

                <h2>Yıllık ROI (Annualized ROI)</h2>
                <p>
                    Farklı sürelerdeki yatırımları karşılaştırmak için yıllık ROI kullanılır:
                </p>
                <p>
                    <strong>Yıllık ROI = [(1 + ROI)^(1/n) - 1] × 100</strong>
                </p>
                <p>
                    Burada &quot;n&quot; yatırım süresini (yıl olarak) ifade eder.
                </p>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>İyi bir ROI oranı nedir?</h3>
                <p>
                    &quot;İyi&quot; ROI sektöre ve risk profiline göre değişir. Hisse senetlerinde
                    yıllık %10-12, gayrimenkulde %8-12, agresif yatırımlarda %20+ kabul
                    edilebilir. Önemli olan risksiz getiri oranının (devlet tahvili) üzerinde
                    olmak ve enflasyonu yenmektir.
                </p>

                <h3>ROI negatif olursa ne anlama gelir?</h3>
                <p>
                    Negatif ROI, yatırımınızın zarar ettiğini gösterir. Örneğin %-20 ROI,
                    yatırdığınız her 100 TL için 20 TL kaybettiğiniz anlamına gelir.
                </p>

                <h3>ROI ile IRR arasındaki fark nedir?</h3>
                <p>
                    IRR (Internal Rate of Return - İç Verim Oranı), zaman değerini ve
                    nakit akışlarını dikkate alır. Daha karmaşık yatırımlar için daha
                    doğru sonuç verir ancak hesaplaması daha zordur.
                </p>

                <h3>ROI vergi etkisini hesaba katar mı?</h3>
                <p>
                    Standart ROI formülü vergiyi hesaba katmaz. Vergi sonrası ROI
                    hesaplamak için net kardan önce vergi tutarını düşmeniz gerekir.
                </p>

                <h2>ROI Kullanırken Dikkat Edilmesi Gerekenler</h2>
                <ul>
                    <li>Tüm maliyetleri dahil edin (komisyon, vergi, işlem ücreti vs.)</li>
                    <li>Aynı zaman dilimindeki yatırımları karşılaştırın</li>
                    <li>Risk-getiri dengesini unutmayın</li>
                    <li>Enflasyonu hesaba katarak reel getiriyi hesaplayın</li>
                    <li>Tek başına ROI&apos;ye değil, birden fazla metriğe bakın</li>
                </ul>
            </article>
        </div>
    )
}
