import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { DiscountCalculator } from "@/components/calculators/math/discount-calculator"

export const metadata: Metadata = {
    title: "İskonto Hesaplama - İndirimli Fiyat Hesaplayıcı",
    description: "Fiyat üzerinden iskonto (indirim) hesaplama aracı. Yüzde indirim oranını girerek yeni fiyatı ve toplam indirim tutarını anında bulun.",
    keywords: ["iskonto hesaplama", "indirim hesaplama", "iskonto nasıl hesaplanır", "fiyat indirimi", "yüzde indirim hesaplama"]
}

export default function IskontoHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/matematik-egitim" className="hover:text-indigo-600 transition-colors">Matematik</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">İskonto Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">İskonto (İndirim) Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Ürün fiyatı ve indirim oranını girerek net fiyatı hesaplayın.</p>
            </div>

            <DiscountCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>İskonto Nedir?</h2>
                <p>İskonto, bir ürün veya hizmetin liste fiyatı üzerinden yapılan indirimdir. Ticari işlemlerde peşin ödemeyi teşvik etmek veya kampanya dönemlerinde satışları artırmak için kullanılır.</p>

                <h2>İskonto Nasıl Hesaplanır?</h2>
                <p>İskonto hesaplama işlemi iki aşamadan oluşur:</p>
                <ol>
                    <li><strong>İndirim Tutarı =</strong> (Fiyat x İskonto Oranı) / 100</li>
                    <li><strong>İndirimli Fiyat =</strong> Liste Fiyatı - İndirim Tutarı</li>
                </ol>

                <h2>Kademeli İskonto Nedir?</h2>
                <p>Bazı durumlarda birden fazla iskonto uygulanabilir (Örn: %10 + %5). Bu durumda ilk iskonto uygulanır, çıkan tutar üzerinden ikinci iskonto uygulanır.</p>
            </article>
        </div>
    )
}
