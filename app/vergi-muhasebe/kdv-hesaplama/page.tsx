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
                <h2>KDV Nedir?</h2>
                <p>
                    Katma Değer Vergisi (KDV), mal ve hizmetlerin satışı üzerinden alınan dolaylı bir vergidir.
                    Türkiye&apos;de üç farklı KDV oranı uygulanmaktadır: %1, %10 ve %20.
                </p>

                <h2>KDV Oranları</h2>
                <ul>
                    <li><strong>%1 KDV:</strong> Temel gıda maddeleri (ekmek, un, pirinç, süt, yumurta vb.)</li>
                    <li><strong>%10 KDV:</strong> Gıda ürünleri, tekstil, konaklama ve eğlence hizmetleri</li>
                    <li><strong>%20 KDV:</strong> Genel oran - çoğu mal ve hizmet için uygulanan standart oran</li>
                </ul>

                <h2>KDV Nasıl Hesaplanır?</h2>
                <p>
                    <strong>KDV Hariç Fiyattan Dahil Fiyata:</strong><br />
                    Toplam = Net Fiyat + (Net Fiyat × KDV Oranı)
                </p>
                <p>
                    <strong>KDV Dahil Fiyattan Hariç Fiyata:</strong><br />
                    Net Fiyat = Toplam Fiyat ÷ (1 + KDV Oranı)
                </p>

                <h2>Sıkça Sorulan Sorular</h2>
                <h3>KDV dahil fiyattan KDV nasıl çıkarılır?</h3>
                <p>
                    KDV dahil fiyatı (1 + KDV oranı) değerine bölerek net fiyatı bulabilirsiniz.
                    Örneğin, %20 KDV dahil 120 TL&apos;lik bir ürünün net fiyatı: 120 ÷ 1.20 = 100 TL&apos;dir.
                </p>

                <h3>KDV beyannamesi ne zaman verilir?</h3>
                <p>
                    Aylık KDV beyannameleri, izleyen ayın 26&apos;sına kadar verilmelidir.
                    28&apos;ine kadar da ödeme yapılması gerekmektedir.
                </p>
            </article>
        </div>
    )
}
