import { LoanCalculator } from "@/components/calculators/finance/loan-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"

export const metadata = buildMetadata({
    title: "Kredi Hesaplama - Aylık Taksit Aracı",
    description: "Konut, ihtiyaç ve taşıt kredisi için aylık taksit tutarını, toplam geri ödemeyi ve faiz maliyetini hesaplayın. Ücretsiz ve anlık sonuç veren araç.",
    keywords: ["kredi hesaplama", "kredi hesapla", "aylık taksit hesaplama", "konut kredisi hesaplama", "ihtiyaç kredisi hesaplama", "taşıt kredisi hesaplama", "kredi faiz hesaplama"],
    path: "/finans/kredi-hesaplama",
})

export default function KrediHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <JsonLd
                data={calculatorSchema({
                    name: "Kredi Hesaplama",
                    description: "Online kredi hesaplama aracı. Konut kredisi, ihtiyaç kredisi, taşıt kredisi için aylık taksit tutarı, toplam geri ödeme ve faiz tutarını hesaplayın. Ücretsiz ve anlık sonuçlar.",
                    path: "/finans/kredi-hesaplama",
                    applicationCategory: "FinanceApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Finans", path: "/finans" },
                { name: "Kredi Hesaplama" },
            ]} />

            {/* Page Title */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Kredi Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Konut kredisi, ihtiyaç kredisi veya taşıt kredisi için aylık taksit tutarınızı hesaplayın.
                </p>
            </div>

            {/* Calculator */}
            <LoanCalculator />

            {/* SEO Content */}
            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Kredi Hesaplama Nedir?</h2>
                <p>
                    Kredi hesaplama, bankadan çekmek istediğiniz kredi için aylık ödeyeceğiniz taksit tutarını,
                    toplam geri ödeme miktarını ve ödeyeceğiniz toplam faiz tutarını önceden görmenizi sağlayan
                    önemli bir finansal planlama aracıdır. Bu hesaplama, kredi almadan önce bütçenizi doğru
                    planlamanıza ve mali yükümlülüklerinizi anlamanıza yardımcı olur.
                </p>
                <p>
                    Türkiye&apos;de bankalar konut kredisi, ihtiyaç kredisi ve taşıt kredisi gibi farklı kredi
                    türleri sunmaktadır. Her kredi türü farklı faiz oranları, vadeler ve ödeme koşulları
                    içerebilir. Kredi hesaplama aracımız, tüm bu kredi türleri için geçerli olan standart
                    anuitet (eşit taksit) yöntemini kullanarak hesaplama yapmaktadır.
                </p>

                <h2>Kredi Taksiti Nasıl Hesaplanır?</h2>
                <p>
                    Banka kredilerinde en yaygın kullanılan yöntem anuitet (eşit taksit) sistemidir. Bu sistemde
                    her ay aynı tutarda taksit ödersiniz, ancak taksitlerin içeriği değişir: İlk aylarda faiz
                    oranı yüksekken, vade sonuna doğru anapara ödemesi artar.
                </p>
                <p>
                    <strong>Formül:</strong> Aylık Taksit = Anapara × [Aylık Faiz × (1 + Aylık Faiz)^Vade] / [(1 + Aylık Faiz)^Vade - 1]
                </p>
                <p>
                    Bu karmaşık formülü manuel olarak hesaplamak yerine, kredi hesaplama aracımız saniyeler
                    içinde doğru sonucu verir. Ayrıca ödeme planınızı detaylı olarak görebilir, her ay ne
                    kadar anapara ve faiz ödeyeceğinizi takip edebilirsiniz.
                </p>

                <h2>Kredi Türleri ve Faiz Oranları</h2>
                <p>
                    Türkiye&apos;de en yaygın kredi türleri ve güncel faiz aralıkları şunlardır:
                </p>
                <ul>
                    <li>
                        <strong>Konut Kredisi:</strong> Ev satın almak veya inşa etmek için kullanılır.
                        Genellikle en düşük faiz oranlarına sahiptir (%1.89 - %2.79 aylık). Vadeler 120 aya
                        kadar uzayabilir.
                    </li>
                    <li>
                        <strong>İhtiyaç Kredisi:</strong> Eğitim, sağlık, düğün, tatil gibi kişisel
                        ihtiyaçlar için kullanılır. Faiz oranları konut kredisine göre daha yüksektir
                        (%2.49 - %4.99 aylık). Vadeler genellikle 36-60 ay arasındadır.
                    </li>
                    <li>
                        <strong>Taşıt Kredisi:</strong> Araç satın almak için kullanılır. Araç teminat
                        olarak gösterildiğinden faiz oranları ihtiyaç kredisinden biraz düşük olabilir
                        (%2.29 - %3.49 aylık).
                    </li>
                </ul>

                <h2>Kredi Çekmeden Önce Nelere Dikkat Etmeli?</h2>
                <p>
                    Kredi başvurusu yapmadan önce şu konuları mutlaka değerlendirin:
                </p>
                <ul>
                    <li>
                        <strong>Ödeme Kapasitesi:</strong> Aylık gelirinizin en fazla %40&apos;ını kredi
                        taksitlerine ayırmanız önerilir. Bu oran aşıldığında mali sıkıntı yaşama riskiniz artar.
                    </li>
                    <li>
                        <strong>Toplam Maliyet:</strong> Sadece aylık taksite değil, toplam geri ödeme
                        tutarına da bakın. Uzun vadeli kredilerde toplam faiz yükü çok yüksek olabilir.
                    </li>
                    <li>
                        <strong>Erken Ödeme:</strong> Kredinizi erken kapatma imkanınız var mı? Erken
                        kapama halinde komisyon uygulanıyor mu? Bu soruların cevabını öğrenin.
                    </li>
                    <li>
                        <strong>Sigorta ve Ek Masraflar:</strong> Krediye bağlı hayat sigortası, dosya
                        masrafı, ipotek masrafı gibi ek maliyetleri hesaba katın.
                    </li>
                </ul>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Kredi faiz oranı nasıl belirlenir?</h3>
                <p>
                    Bankalar kredi faiz oranını belirlerken TCMB politika faizi, piyasa koşulları,
                    müşterinin kredi notu, gelir durumu ve teminat gibi faktörleri değerlendirir.
                    Yüksek kredi notuna sahip müşteriler genellikle daha düşük faiz oranından
                    yararlanabilir.
                </p>

                <h3>En uygun kredi nasıl bulunur?</h3>
                <p>
                    Birden fazla bankadan teklif alın ve toplam maliyetleri karşılaştırın. Sadece
                    faiz oranına değil, dosya masrafı, sigorta bedeli ve diğer ücretlere de dikkat
                    edin. Efektif faiz oranı (tüm masraflar dahil) karşılaştırma için en güvenilir
                    ölçüttür.
                </p>

                <h3>Kredi başvurusu için hangi belgeler gerekli?</h3>
                <p>
                    Standart olarak kimlik belgesi, gelir belgesi (maaş bordrosu veya vergi levhası),
                    ikametgah belgesi istenir. Konut kredisi için tapu, taşıt kredisi için proforma
                    fatura da gerekebilir.
                </p>

                <h3>Kredi notu neden önemlidir?</h3>
                <p>
                    Kredi notu (Findeks skoru), ödeme geçmişinizi ve mali güvenilirliğinizi gösteren
                    bir puandır. Yüksek skor, düşük faiz oranı ve daha iyi kredi koşulları anlamına
                    gelir. Düzenli ödemeler yaparak kredinizi yükseltebilirsiniz.
                </p>

                <h2>Kredi Hesaplama İpuçları</h2>
                <p>
                    Kredi hesaplarken şu ipuçlarını göz önünde bulundurun:
                </p>
                <ul>
                    <li>Kısa vadeli krediler daha az faiz ödersiniz ancak taksit yükü artar</li>
                    <li>Mümkünse peşinat vererek çekeceğiniz kredi miktarını azaltın</li>
                    <li>Faiz oranlarının yüksek olduğu dönemlerde kredi çekmekten kaçının</li>
                    <li>Kampanyalı dönemlerde (bayram, yılbaşı) daha uygun koşullar bulabilirsiniz</li>
                </ul>
            </article>
        </div>
    )
}
