import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { PromileCalculator } from "@/components/calculators/health/promile-calculator"

export const metadata: Metadata = {
    title: "Promil Hesaplama - Alkol Promili Hesaplayıcı",
    description: "Kandaki alkol oranını hesaplamak için promil hesaplama aracı. Tüketilen içki miktarı ve vücut ağırlığına göre tahmini promil seviyenizi bulun.",
    keywords: ["promil hesaplama", "alkol promili hesaplama", "alkol testi", "0.50 promil hesaplama", "alkol hesaplayıcı"]
}

export default function PromilHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/saglik-spor" className="hover:text-indigo-600 transition-colors">Sağlık & Spor</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Promil Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Promil Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Vücut ağırlığınız ve tükettiğiniz alkol miktarına göre kandaki alkol oranınızı tahmin edin.</p>
            </div>

            <PromileCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Promil Nasıl Hesaplanır?</h2>
                <p>Promil hesaplamada <strong>Widmark Formülü</strong> temel alınır. Bu formül; alkolün kana karışma oranını, vücuttaki su miktarını ve zamanla vücuttan atılma hızını dikkate alır.</p>

                <h2>Türkiye'de Yasal Alkol Sınırı</h2>
                <p>Türkiye'de sürücüler için yasal alkol sınırı şu şekildedir:</p>
                <ul>
                    <li><strong>Hususi Otomobiller:</strong> 0.50 Promil</li>
                    <li><strong>Ticari Araçlar ve Diğerleri:</strong> 0.20 Promil</li>
                </ul>

                <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 my-4">
                    <strong>Önemli Uyarı:</strong> Alkolün vücuda etkisi bireyden bireye (metabolizma, açlık durumu, uyku vb.) değişir. En güvenilir sonucun profesyonel alkolmetre cihazları veya kan testi ile elde edilebileceğini unutmayın.
                </div>
            </article>
        </div>
    )
}
