import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { PregnancyCalculator } from "@/components/calculators/time/pregnancy-calculator"

export const metadata: Metadata = {
    title: "Gebelik Hesaplama - Doğum Tarihi ve Hafta Hesaplayıcı",
    description: "Online gebelik hesaplama aracı. Son adet tarihine göre tahmini doğum tarihi, gebelik haftası ve trimester hesaplama.",
    keywords: ["gebelik hesaplama", "doğum tarihi hesaplama", "hamilelik haftası", "gebelik haftası hesaplama", "bebek bekleme"]
}

export default function GebelikHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/zaman-takvim" className="hover:text-indigo-600 transition-colors">Zaman & Takvim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Gebelik Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Gebelik Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Tahmini doğum tarihinizi ve gebelik haftanızı hesaplayın.</p>
            </div>

            <PregnancyCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Gebelik Süresi Hesaplama</h2>
                <p>Gebelik hesaplama, son adet tarihinizden (SAT) itibaren 280 gün (40 hafta) eklenerek tahmini doğum tarihi hesaplar. Bu hesaplama yöntemi Naegele kuralı olarak bilinir.</p>

                <h2>Trimesterler</h2>
                <ul>
                    <li><strong>1. Trimester:</strong> 0-12 hafta</li>
                    <li><strong>2. Trimester:</strong> 13-26 hafta</li>
                    <li><strong>3. Trimester:</strong> 27-40 hafta</li>
                </ul>

                <h2>Önemli Not</h2>
                <p>Bu hesaplama tahmini bir değerdir. Kesin doğum tarihi için ultrason muayenesi ve doktor takibi önerilir.</p>
            </article>
        </div>
    )
}
