import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { CreditMinPaymentCalculator } from "@/components/calculators/finance/credit-card-min-payment"

export const metadata: Metadata = {
    title: "Asgari Ödeme Hesaplama - Kredi Kartı Asgari Tutarı",
    description: "Kredi kartı ekstre borcuna göre asgari ödeme tutarı hesaplama aracı. BDDK'nın belirlediği %20 ve %40 oranlarına göre hesaplayın.",
    keywords: ["asgari ödeme hesaplama", "kredi kartı asgari hesaplama", "asgari tutar hesaplama", "asgari ödeme nasıl hesaplanır"]
}

export default function AsgariOdemePage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/finans" className="hover:text-indigo-600 transition-colors">Finans</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Asgari Ödeme Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Asgari Ödeme Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Kredi kartı borcunuzun bankaya ödemeniz gereken minimum tutarını öğrenin.</p>
            </div>

            <CreditMinPaymentCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Asgari Ödeme Tutarı Nedir?</h2>
                <p>Asgari ödeme tutarı, kredi kartı borcunuzun cezai duruma düşmemesi ve kartınızın kullanıma kapanmaması için ödemeniz gereken en düşük tutardır.</p>

                <h2>Asgari Ödeme Oranları 2025</h2>
                <p>BDDK kararlarına göre asgari ödeme oranları kredi kartı limitine göre değişiklik göstermektedir:</p>
                <ul>
                    <li><strong>25.000 TL ve altı limitli kartlar:</strong> Ekstre borcunun %20'si</li>
                    <li><strong>25.000 TL ve üzeri limitli kartlar:</strong> Ekstre borcunun %40'ı</li>
                </ul>

                <h2>Asgari Ödeyip Kalanı Bırakırsam Ne Olur?</h2>
                <p>Asgari tutarı ödediğinizde kartınız kullanıma kapatılmaz ancak kalan borç tutarı üzerine bankanın belirlediği <strong>akdi faiz</strong> oranı aylık olarak işletilir. Borcun tamamının ödenmesi faiz yükünü önlemek için en sağlıklı yoldur.</p>
            </article>
        </div>
    )
}
