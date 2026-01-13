import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { MtvCalculator } from "@/components/calculators/tax/mtv-calculator"

export const metadata: Metadata = {
    title: "MTV Hesaplama 2025 - Motorlu Taşıtlar Vergisi Hesaplayıcı",
    description: "2025 MTV hesaplama aracı. Araç yaşı ve motor hacmine göre motorlu taşıtlar vergisi tutarını hesaplayın. Taksit bilgileri.",
    keywords: ["mtv hesaplama 2025", "motorlu taşıtlar vergisi", "mtv 2025", "araç vergisi hesaplama", "mtv taksit"]
}

export default function MtvHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/vergi-muhasebe" className="hover:text-indigo-600 transition-colors">Vergi & Muhasebe</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">MTV Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">MTV Hesaplama 2025</h1>
                <p className="text-slate-600 dark:text-slate-400">Araç yaşı ve motor hacmine göre 2025 yılı motorlu taşıtlar vergisini hesaplayın.</p>
            </div>

            <MtvCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>MTV (Motorlu Taşıtlar Vergisi) Nedir?</h2>
                <p>MTV, motorlu taşıt sahiplerinin her yıl ödemesi gereken bir vergidir. Vergi tutarı aracın motor hacmi ve yaşına göre belirlenir.</p>

                <h2>2025 MTV Ödeme Tarihleri</h2>
                <ul>
                    <li><strong>1. Taksit:</strong> Ocak ayı sonuna kadar</li>
                    <li><strong>2. Taksit:</strong> Temmuz ayı sonuna kadar</li>
                </ul>

                <h2>MTV Neye Göre Belirlenir?</h2>
                <p>MTV tutarı iki ana faktöre göre değişir: aracın motor hacmi (cc) ve model yılı. Genç araçlar daha yüksek, eski araçlar daha düşük vergi öder.</p>

                <h2>MTV Ödenmezse Ne Olur?</h2>
                <p>MTV ödenmezse gecikme zammı uygulanır. Ayrıca araç muayenesi yaptırılamaz ve satış işlemi gerçekleştirilemez.</p>
            </article>
        </div>
    )
}
