import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { UnitConverter } from "@/components/calculators/converter/unit-converter"

export const metadata: Metadata = {
    title: "Birim Dönüştürücü - Uzunluk, Ağırlık, Alan, Hacim Çevirici",
    description: "Online birim dönüştürücü aracı. Metre-feet, kilogram-pound, litre-galon dönüşümleri. Uzunluk, ağırlık, alan ve hacim birimleri.",
    keywords: ["birim dönüştürücü", "metre feet", "kilogram pound", "litre galon", "birim çevirici"]
}

export default function BirimDonusturucuPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/donusturuculer" className="hover:text-indigo-600 transition-colors">Dönüştürücüler</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Birim Dönüştürücü</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Birim Dönüştürücü</h1>
                <p className="text-slate-600 dark:text-slate-400">Uzunluk, ağırlık, alan ve hacim birimlerini dönüştürün.</p>
            </div>

            <UnitConverter />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Birim Dönüştürme</h2>
                <p>Birim dönüştürücümüz ile metrik ve imperial sistem arasında kolayca dönüşüm yapabilirsiniz.</p>

                <h2>Sık Kullanılan Dönüşümler</h2>
                <table>
                    <thead><tr><th>Dönüşüm</th><th>Çarpan</th></tr></thead>
                    <tbody>
                        <tr><td>1 mil = ? km</td><td>1.60934</td></tr>
                        <tr><td>1 feet = ? m</td><td>0.3048</td></tr>
                        <tr><td>1 inç = ? cm</td><td>2.54</td></tr>
                        <tr><td>1 pound = ? kg</td><td>0.453592</td></tr>
                        <tr><td>1 galon = ? litre</td><td>3.78541</td></tr>
                    </tbody>
                </table>
            </article>
        </div>
    )
}
