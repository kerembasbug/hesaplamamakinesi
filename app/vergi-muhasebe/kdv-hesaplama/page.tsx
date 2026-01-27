import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { VatCalculator } from "@/components/calculators/finance/vat-calculator"

export const metadata: Metadata = {
    title: "KDV Hesaplama - KDV Dahil/Hariç Hesaplayıcı",
    description: "Online KDV hesaplama aracı. KDV dahil veya hariç tutarları %1, %10, %20 oranlarıyla kolayca hesaplayın. Ücretsiz ve anlık sonuçlar.",
    keywords: ["kdv hesaplama", "kdv hesapla", "kdv dahil hariç", "katma değer vergisi", "kdv oranları"],
    openGraph: {
        title: "KDV Hesaplama - KDV Dahil/Hariç Hesaplayıcı",
        description: "Online KDV hesaplama aracı. KDV dahil veya hariç tutarları kolayca hesaplayın.",
        type: "website",
    }
}

export default function KdvHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link
                    href="/"
                    className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                >
                    <Home className="h-4 w-4" />
                    Ana Sayfa
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link
                    href="/vergi-muhasebe"
                    className="hover:text-indigo-600 transition-colors"
                >
                    Vergi & Muhasebe
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">KDV Hesaplama</span>
            </nav>

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

                <h3>Türkiye&apos;de Güncel KDV Oranları (2025)</h3>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">KDV Oranı</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Uygulama Alanları</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">%1</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Temel gıda (ekmek, un, pirinç, süt, yumurta), gazete, dergi</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">%10</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Gıda ürünleri, tekstil, konaklama, sağlık hizmetleri, tarım ürünleri</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">%20</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Genel oran - elektronik, otomobil, mobilya, profesyonel hizmetler</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>KDV Hesaplama Formülleri</h3>
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

                <h3>KDV İndirimi Nedir?</h3>
                <p>
                    İşletmeler, mal veya hizmet alırken ödedikleri KDV&apos;yi &quot;indirilecek KDV&quot; olarak kaydeder. Sattıkları ürünlerdeki
                    &quot;hesaplanan KDV&quot;den bu tutarı düşerek sadece farkı vergi dairesine öder. Bu sistem, çifte vergilendirmeyi önler.
                </p>

                <h3>Sıkça Sorulan Sorular (SSS)</h3>

                <h4>KDV dahil fiyattan KDV nasıl çıkarılır?</h4>
                <p>
                    KDV dahil fiyatı (1 + KDV oranı) değerine bölerek net fiyatı bulabilirsiniz. Örneğin, %20 KDV dahil 120 TL&apos;lik bir ürünün
                    net fiyatı: 120 ÷ 1.20 = 100 TL&apos;dir. KDV tutarı ise 20 TL olur.
                </p>

                <h4>KDV beyannamesi ne zaman verilir?</h4>
                <p>
                    Aylık KDV beyannameleri, izleyen ayın 26&apos;sına kadar verilmelidir. 28&apos;ine kadar da ödeme yapılması gerekmektedir.
                    Örneğin Ocak ayı KDV&apos;si en geç 26 Şubat&apos;ta beyan, 28 Şubat&apos;ta ödenir.
                </p>

                <h4>Hangi ürünler KDV&apos;den muaftır?</h4>
                <p>
                    İhracat (%0 KDV), diplomatik muafiyetler, küçük esnaf muafiyeti (belirli ciro altında), eğitim ve sağlık hizmetlerinin
                    bir kısmı KDV&apos;den muaftır veya istisnadır.
                </p>

                <h4>E-faturada KDV nasıl gösterilir?</h4>
                <p>
                    E-faturada her kalem için KDV oranı ve tutarı ayrı ayrı gösterilir. Fatura toplamında ise KDV hariç tutar, KDV tutarı
                    ve genel toplam (KDV dahil) açıkça belirtilmelidir.
                </p>

                <h3>İşletmeler İçin KDV Yönetimi İpuçları</h3>
                <ul>
                    <li>Her faturada KDV oranını doğru seçin; yanlış oran cezaya yol açabilir.</li>
                    <li>İndirilecek KDV&apos;leri düzenli takip edin, nakit akışınızı etkiler.</li>
                    <li>KDV iade süreçlerini (ihracat KDV iadesi) iyi planlayın.</li>
                    <li>Elektronik defter (e-Defter) tutma zorunluluğunu takip edin.</li>
                    <li>Vergi takvimini asla kaçırmayın; gecikme cezaları yüksektir.</li>
                </ul>
            </article>
        </div>
    )
}
