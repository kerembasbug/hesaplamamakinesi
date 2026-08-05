import { TaxiCalculator } from "@/components/calculators/travel/taxi-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import { TarifeUyarisi } from "@/components/content/tarife-uyarisi"

export const metadata = buildMetadata({
    title: "Taksi Ücreti Hesaplama 2026",
    description: "İstanbul ve Ankara için 2026 taksi ücreti hesaplama aracı. Açılış ücreti, kilometre tarifesi ve indi-bindi ile tahmini taksi masrafınızı bulun.",
    keywords: ["istanbul taksi hesaplama", "ankara taksi hesaplama", "taksi ücreti hesaplama 2025", "istanbul taksi ücreti", "ankara taksi ücreti"],
    path: "/seyahat/taksi-ucreti-hesaplama",
})

export default function TaksiHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Taksi Ücreti Hesaplama 2025",
                    description: "İstanbul ve Ankara için güncel 2025 taksi ücreti hesaplama aracı. Açılış ücreti, km maliyeti ve indi-bindi ücretleri ile tahmini taksi masrafınızı bulun.",
                    path: "/seyahat/taksi-ucreti-hesaplama",
                    applicationCategory: "TravelApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Taksi Ücreti Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">İstanbul & Ankara Taksi Ücreti Hesaplama 2025</h1>
                <p className="text-slate-600 dark:text-slate-400">Gideceğiniz mesafeyi girerek tahmini taksi ücretinizi güncel tarifelerle hemen öğrenin.</p>
            </div>

            <TaxiCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <TarifeUyarisi yil={2025} konu="taksi tarifesi" kaynakAdi="ilgili büyükşehir belediyesi UKOME kararları" kaynakUrl="https://www.ibb.istanbul/" />

                <h2>İstanbul Taksi Ücretleri 2025</h2>
                <p>İstanbul'da taksi ücretleri UKOME kararı ile güncellenmektedir. 2025 yılı itibarıyla geçerli olan sarı taksi tarifesi şu şekildedir:</p>
                <ul>
                    <li><strong>Açılış Ücreti:</strong> 24.55 TL</li>
                    <li><strong>KM Başı Ücret:</strong> 17.62 TL</li>
                    <li><strong>İndi-Bindi Ücreti:</strong> 90 TL</li>
                </ul>

                <h2>Ankara Taksi Ücretleri 2025</h2>
                <p>Ankara'da geçerli olan güncel taksi tarifesi Ankara Esnaf ve Sanatkarlar Odası tarafından belirlenir:</p>
                <ul>
                    <li><strong>Açılış Ücreti:</strong> 25 TL</li>
                    <li><strong>KM Başı Ücret:</strong> 20 TL</li>
                    <li><strong>İndi-Bindi Ücreti:</strong> 75 TL</li>
                </ul>

                <h2>Taksi Ücreti Nasıl Hesaplanır?</h2>
                <p>Taksi ücreti şu formül ile hesaplanır: <code>Açılış Ücreti + (Mesafe x KM Ücreti)</code>. Eğer hesaplanan toplam tutar "İndi-Bindi" ücretinin altındaysa, yolcu indi-bindi ücretini öder. Ayrıca trafik yoğunluğuna bağlı olarak bekleme süreleri de ücrete yansıtılabilir.</p>

                <h2>Taksi Ücreti Nasıl Oluşur?</h2>
                <p>
                    Taksimetre ücreti üç bileşenden oluşur: <strong>açılış (indi-bindi) ücreti</strong>,
                    <strong> kilometre başına ücret</strong> ve <strong>bekleme ücreti</strong>. Araç hareket
                    hâlindeyken kilometre tarifesi, trafikte durduğunda ise dakika bazlı bekleme tarifesi işler.
                    Yoğun trafikte aynı mesafenin farklı tutarlar çıkarmasının nedeni budur.
                </p>
                <p>
                    Çoğu büyükşehirde bir de <strong>minimum ücret</strong> uygulanır: kısa mesafelerde
                    taksimetre bu tutarın altında kalsa bile minimum ücret ödenir.
                </p>

                <h2>Taksiye Binerken Dikkat Edilecekler</h2>
                <ul>
                    <li>Taksimetrenin yolculuk başında sıfırlandığından ve açık olduğundan emin olun.</li>
                    <li>Köprü, otoyol ve tünel geçiş ücretleri tarifeye dâhil değildir; ayrıca yolcuya aittir.</li>
                    <li>Şehir dışına çıkan yolculuklarda dönüş ücreti konusunda önceden anlaşın.</li>
                    <li>Taksimetre açılmadan &quot;pazarlıklı&quot; ücret teklifi mevzuata aykırıdır.</li>
                    <li>Plaka numarasını not alın; sorun yaşarsanız belediye çağrı merkezine bildirin.</li>
                </ul>

                <h2>Taksi mi Toplu Taşıma mı?</h2>
                <p>
                    Tek kişilik kısa mesafelerde toplu taşıma neredeyse her zaman ekonomiktir. Üç-dört kişilik
                    bir grupta ise taksinin kişi başı maliyeti toplu taşımaya yaklaşır ve süre avantajı devreye
                    girer. Bagajlı yolculuk, geç saat ve yağmurlu havada taksi lehine denge daha da değişir.
                </p>
            </article>
        </div>
    )
}
