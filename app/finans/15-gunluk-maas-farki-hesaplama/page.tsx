import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { WageDifferenceCalculator } from "@/components/calculators/finance/wage-difference-calculator"

export const metadata: Metadata = {
    title: "15 Günlük Maaş Farkı Hesaplama 2025 - Memur Zam Farkı",
    description: "Memur ve kamu çalışanları için 15 günlük maaş farkı hesaplama aracı. Ocak ve Temmuz maaş zammı farklarını anında hesaplayın.",
    keywords: ["15 günlük maaş farkı hesaplama", "maaş farkı hesaplama", "memur zam farkı", "14 günlük maaş farkı", "maaş farkı ne kadar"]
}

export default function MaasFarkiPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/finans" className="hover:text-indigo-600 transition-colors">Finans</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">15 Günlük Maaş Farkı</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">15 Günlük Maaş Farkı Hesaplama 2025</h1>
                <p className="text-slate-600 dark:text-slate-400">Kamu çalışanlarına özel maaş katsayısı ve zam farkı hesaplayıcı.</p>
            </div>

            <WageDifferenceCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>15 Günlük Maaş Farkı Nedir?</h2>
                <p>
                    Memurlar maaşlarını her ayın 15'inde peşin olarak alırlar. Maaş zamları ayın 1&apos;inden
                    itibaren geçerli olduğu için, 1-15 tarihleri arasındaki zamlı maaşın farkı bir sonraki
                    ödemeye yansıtılır. Bu fark genellikle &quot;15 günlük&quot; veya &quot;14 günlük&quot; maaş farkı
                    olarak adlandırılır.
                </p>
                <p>
                    Türkiye&apos;de memur maaşları her yıl Ocak ve Temmuz aylarında olmak üzere yılda iki kez
                    zamlanır. Bu zamlar ayın 1&apos;inden itibaren geçerli olsa da, memurlar 15&apos;inde maaş
                    aldıkları için ilk yarısının farkı hesaplanarak ödenir.
                </p>

                <h2>15 Günlük Maaş Farkı Nasıl Hesaplanır?</h2>
                <p>Maaş farkı hesaplaması şu şekilde yapılır:</p>
                <ol>
                    <li>Yeni maaş tutarından eski maaş tutarı çıkarılır</li>
                    <li>Bulunan fark 30&apos;a bölünerek günlük fark bulunur</li>
                    <li>Günlük fark 15 (veya 14) ile çarpılarak maaş farkı hesaplanır</li>
                </ol>
                <p>
                    <strong>Formül:</strong> Maaş Farkı = (Yeni Brüt Maaş - Eski Brüt Maaş) × (15/30)
                </p>

                <h2>Kimler 15 Günlük Maaş Farkından Yararlanabilir?</h2>
                <ul>
                    <li><strong>657 Sayılı Kanuna tabi devlet memurları:</strong> Tüm kadrolu memurlar</li>
                    <li><strong>Sözleşmeli personel (4/B):</strong> Kamu kurumlarındaki sözleşmeli çalışanlar</li>
                    <li><strong>Kadro karşılığı sözleşmeli personel:</strong> 399 sayılı KHK kapsamındakiler</li>
                    <li><strong>Öğretmenler:</strong> MEB bünyesindeki tüm öğretmenler</li>
                    <li><strong>Akademisyenler:</strong> Üniversite öğretim üyeleri ve elemanları</li>
                    <li><strong>Sağlık personeli:</strong> Kamuda çalışan sağlık çalışanları</li>
                </ul>

                <h2>Maaş Farkı Ne Zaman Ödenir?</h2>
                <p>
                    Maaş farkı ödemelerinin zamanlaması şu şekildedir:
                </p>
                <ul>
                    <li><strong>Ocak zammı farkı:</strong> Genellikle Ocak ayı sonu veya Şubat ayı maaşıyla birlikte</li>
                    <li><strong>Temmuz zammı farkı:</strong> Genellikle Temmuz ayı sonu veya Ağustos ayı maaşıyla birlikte</li>
                </ul>
                <p>
                    Ödeme tarihleri kurumdan kuruma farklılık gösterebilir. Bazı kurumlar farkı aynı ay
                    içinde, bazıları ise takip eden ayda öder.
                </p>

                <h2>2025 Yılı Memur Maaş Zam Oranları</h2>
                <p>
                    2025 yılı için memur maaş zam oranları toplu sözleşme görüşmeleri sonucunda belirlenir.
                    Ocak ve Temmuz zamları ayrı ayrı açıklanır ve enflasyon farkı da eklenebilir.
                </p>

                <h3>Sıkça Sorulan Sorular</h3>

                <h4>Maaş farkı net mi brüt mü hesaplanır?</h4>
                <p>
                    Maaş farkı brüt tutar üzerinden hesaplanır ancak net olarak ödenir. Yani hesaplanan
                    farktan SGK primi, gelir vergisi ve damga vergisi kesintileri yapılır.
                </p>

                <h4>Emekli maaşlarına da fark ödenir mi?</h4>
                <p>
                    Evet, emekli maaşları da Ocak ve Temmuz aylarında zamlanır ve emeklilere de
                    maaş farkı ödenir. SGK emeklileri için de benzer hesaplama yapılır.
                </p>

                <h4>Maaş farkı bir kerelik mi ödenir?</h4>
                <p>
                    Evet, maaş farkı o dönemin geçmiş günleri için bir kerelik ödenir. Sonraki aylarda
                    zaten yeni maaş geçerli olduğu için fark söz konusu olmaz.
                </p>
            </article>
        </div>
    )
}
