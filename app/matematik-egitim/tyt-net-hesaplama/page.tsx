import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { YksCalculator } from "@/components/calculators/education/yks-calculator"

export const metadata: Metadata = {
    title: "TYT Net Hesaplama 2025 - YKS Temel Yeterlilik Testi",
    description: "2025 TYT net hesaplama aracı. Türkçe, Matematik, Fen ve Sosyal doğru yanlış sayınıza göre TYT netinizi hesaplayın.",
    keywords: ["tyt net hesaplama", "yks net hesaplama", "tyt hesaplama 2025", "tyt puan hesaplama", "temel yeterlilik testi"]
}

export default function TytHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/matematik-egitim" className="hover:text-indigo-600 transition-colors">Matematik & Eğitim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">TYT Net Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">TYT Net Hesaplama 2025</h1>
                <p className="text-slate-600 dark:text-slate-400">Doğru ve yanlış sayılarınızı girerek TYT netinizi hesaplayın.</p>
            </div>

            <YksCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>TYT (Temel Yeterlilik Testi) Nedir?</h2>
                <p>TYT, YKS&apos;nin ilk oturumudur. Tüm adayların girmesi zorunlu olan bu sınavda 120 soru 135 dakikada çözülür.</p>

                <h2>TYT Soru Dağılımı</h2>
                <table>
                    <thead><tr><th>Test</th><th>Soru Sayısı</th></tr></thead>
                    <tbody>
                        <tr><td>Türkçe</td><td>40</td></tr>
                        <tr><td>Sosyal Bilimler</td><td>20</td></tr>
                        <tr><td>Temel Matematik</td><td>40</td></tr>
                        <tr><td>Fen Bilimleri</td><td>20</td></tr>
                    </tbody>
                </table>

                <h2>Net Hesaplama Formülü</h2>
                <p><strong>Net = Doğru - (Yanlış × 0.25)</strong></p>
                <p>Her 4 yanlış, 1 doğruyu götürür. Boş bırakılan sorular neti etkilemez.</p>
            </article>
        </div>
    )
}
