import { VatCalculator } from "@/components/calculators/finance/vat-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import { GuncellemeNotu, KdvOranlariTablosu } from "@/components/content/vergi-tablolari"

export const metadata = buildMetadata({
    title: "KDV Hesaplama - KDV Dahil/Hariç Hesaplayıcı",
    description: "Online KDV hesaplama aracı. KDV dahil veya hariç tutarları %1, %10, %20 oranlarıyla kolayca hesaplayın. Ücretsiz ve anlık sonuçlar.",
    keywords: ["kdv hesaplama", "kdv hesapla", "kdv dahil hariç", "katma değer vergisi", "kdv oranları"],
    path: "/vergi-muhasebe/kdv-hesaplama",
})

export default function KdvHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <JsonLd
                data={calculatorSchema({
                    name: "KDV Hesaplama",
                    description: "Online KDV hesaplama aracı. KDV dahil veya hariç tutarları %1, %10, %20 oranlarıyla kolayca hesaplayın. Ücretsiz ve anlık sonuçlar.",
                    path: "/vergi-muhasebe/kdv-hesaplama",
                    applicationCategory: "FinanceApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Vergi & Muhasebe", path: "/vergi-muhasebe" },
                { name: "KDV Hesaplama" },
            ]} />

            {/* Page Title */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    KDV Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    KDV dahil veya hariç tutarları %1, %10 ve %20 oranlarıyla kolayca hesaplayın.
                </p>
            </div>

            {/* Calculator */}
            <VatCalculator />

            {/* SEO Content */}
            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Katma Değer Vergisi (KDV) Nedir ve Nasıl Hesaplanır?</h2>
                <p>
                    <strong>KDV (Katma Değer Vergisi)</strong>, mal ve hizmetlerin her üretim veya dağıtım aşamasında eklenen değer üzerinden
                    alınan dolaylı bir vergidir. Türkiye&apos;de 1985 yılından bu yana uygulanan KDV, devletin en önemli gelir kaynaklarından biridir.
                    Tüketiciler olarak alışverişte ödediğimiz fiyatların içinde büyük bir paya sahiptir.
                </p>
                <p>
                    KDV&apos;nin en önemli özelliği, her aşamada ödenen verginin bir sonraki aşamada mahsup edilebilmesidir. Yani işletmeler
                    ödedikleri KDV&apos;yi (indirilecek KDV) sattıkları ürünlerdeki KDV&apos;den (hesaplanan KDV) düşer ve sadece aradaki farkı devlete öder.
                </p>

                <h2>Türkiye&apos;de Güncel KDV Oranları (2026)</h2>
                <KdvOranlariTablosu />

                <h2>KDV Hesaplama Formülleri</h2>
                <p>
                    İki temel hesaplama yöntemi vardır:
                </p>
                <ul>
                    <li><strong>KDV Hariç Fiyattan → Dahil Fiyata:</strong> Toplam = Net Fiyat × (1 + KDV Oranı)</li>
                    <li><strong>KDV Dahil Fiyattan → Hariç Fiyata:</strong> Net Fiyat = Toplam Fiyat ÷ (1 + KDV Oranı)</li>
                </ul>
                <p>
                    <strong>Örnek:</strong> 1.000 TL + %20 KDV = 1.000 × 1.20 = 1.200 TL (KDV Dahil)
                </p>
                <p>
                    <strong>Tersi:</strong> 1.200 TL KDV dahil fiyattan net = 1.200 ÷ 1.20 = 1.000 TL
                </p>

                <h2>KDV İndirimi Nedir?</h2>
                <p>
                    İşletmeler, mal veya hizmet alırken ödedikleri KDV&apos;yi &quot;indirilecek KDV&quot; olarak kaydeder. Sattıkları ürünlerdeki
                    &quot;hesaplanan KDV&quot;den bu tutarı düşerek sadece farkı vergi dairesine öder. Bu sistem, çifte vergilendirmeyi önler.
                </p>

                <h2>Sıkça Sorulan Sorular (SSS)</h2>

                <h3>KDV dahil fiyattan KDV nasıl çıkarılır?</h3>
                <p>
                    KDV dahil fiyatı (1 + KDV oranı) değerine bölerek net fiyatı bulabilirsiniz. Örneğin, %20 KDV dahil 120 TL&apos;lik bir ürünün
                    net fiyatı: 120 ÷ 1.20 = 100 TL&apos;dir. KDV tutarı ise 20 TL olur.
                </p>

                <h3>KDV beyannamesi ne zaman verilir?</h3>
                <p>
                    Aylık KDV beyannameleri, izleyen ayın 26&apos;sına kadar verilmelidir. 28&apos;ine kadar da ödeme yapılması gerekmektedir.
                    Örneğin Ocak ayı KDV&apos;si en geç 26 Şubat&apos;ta beyan, 28 Şubat&apos;ta ödenir.
                </p>

                <h3>Hangi ürünler KDV&apos;den muaftır?</h3>
                <p>
                    İhracat (%0 KDV), diplomatik muafiyetler, küçük esnaf muafiyeti (belirli ciro altında), eğitim ve sağlık hizmetlerinin
                    bir kısmı KDV&apos;den muaftır veya istisnadır.
                </p>

                <h3>E-faturada KDV nasıl gösterilir?</h3>
                <p>
                    E-faturada her kalem için KDV oranı ve tutarı ayrı ayrı gösterilir. Fatura toplamında ise KDV hariç tutar, KDV tutarı
                    ve genel toplam (KDV dahil) açıkça belirtilmelidir.
                </p>

                <h2>İşletmeler İçin KDV Yönetimi İpuçları</h2>
                <ul>
                    <li>Her faturada KDV oranını doğru seçin; yanlış oran cezaya yol açabilir.</li>
                    <li>İndirilecek KDV&apos;leri düzenli takip edin, nakit akışınızı etkiler.</li>
                    <li>KDV iade süreçlerini (ihracat KDV iadesi) iyi planlayın.</li>
                    <li>Elektronik defter (e-Defter) tutma zorunluluğunu takip edin.</li>
                    <li>Vergi takvimini asla kaçırmayın; gecikme cezaları yüksektir.</li>
                </ul>
                <GuncellemeNotu kaynakAdi="Gelir İdaresi Başkanlığı" kaynakUrl="https://www.gib.gov.tr/" />
            </article>
        </div>
    )
}
