import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { BmrCalculator } from "@/components/calculators/health/bmr-calculator"

export const metadata: Metadata = {
    title: "Bazal Metabolizma Hızı Hesaplama 2025 - BMR Hesaplayıcı",
    description: "Günlük bazal metabolizma hızı (BMR) hesaplama aracı. Harris-Benedict formülü ile vücudunuzun dinlenme halindeki kalori ihtiyacını bulun.",
    keywords: ["bazal metabolizma hesaplama", "bmr hesaplama", "günlük kalori ihtiyacı", "bazal metabolizma hızı", "kalori hesaplayıcı"]
}

export default function BazalMetabolizmaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/saglik-spor" className="hover:text-indigo-600 transition-colors">Sağlık & Spor</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Bazal Metabolizma</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Bazal Metabolizma Hızı (BMR) Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Vücudunuzun hiçbir aktivite yapmadan hayati fonksiyonlarını sürdürmesi için gereken enerji miktarını hesaplayın.</p>
            </div>

            <BmrCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Bazal Metabolizma (BMR) Nedir?</h2>
                <p>Bazal Metabolizma Hızı (BMR), vücudunuzun dinlenme halinde, yani uyurken veya koltukta otururken nefes alma, dolaşım ve hücre üretimi gibi temel hayati fonksiyonlarını sürdürmek için harcadığı kalori miktarıdır.</p>

                <h2>Harris-Benedict Formülü</h2>
                <p>En popüler BMR hesaplama yöntemi Harris-Benedict denklemidir. Bu denklem cinsiyet, ağırlık, boy ve yaş değişkenlerini kullanarak tahmini bir değer sunar.</p>

                <h2>BMR Neden Önemlidir?</h2>
                <p>Kilo vermek, almak veya kilonuzu korumak istiyorsanız, günlük almanız gereken kalori miktarının temelini BMR oluşturur. Günlük kalori ihtiyacınız = BMR x Aktivite Seviyesi formülüyle bulunur.</p>
            </article>
        </div>
    )
}
