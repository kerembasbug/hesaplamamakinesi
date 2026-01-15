import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { PromileCalculator } from "@/components/calculators/health/promile-calculator"

export const metadata: Metadata = {
    title: "Alkol Promil Hesaplama - Promil Testi ve Sınırı 2025",
    description: "Kandaki alkol oranını (promil) hesaplamak için güncel araç. Tüketilen içecek ve vücut ağırlığına göre yasal alkol sınırı kontrolü.",
    keywords: ["promil hesaplama", "alkol promil hesaplama", "alkol sınırı 2025", "yasal alkol sınırı", "promil nasıl hesaplanır"]
}

export default function AlkolPromilPage() {
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
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Alkol Promil Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Kandaki tahmini alkol oranınızı yasal sınırlar dahilinde kontrol edin.</p>
            </div>

            <PromileCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Promil Seviyeleri ve Etkileri</h2>
                <table>
                    <thead><tr><th>Promil</th><th>Etkisi</th></tr></thead>
                    <tbody>
                        <tr><td>0.20 - 0.50</td><td>Hafif gevşeme, dikkati toplama güçlüğü</td></tr>
                        <tr><td>0.50 - 1.00</td><td>Reflekslerde yavaşlama, kontrol kaybı başlangıcı</td></tr>
                        <tr><td>1.00 ve üzeri</td><td>Konuşma bozukluğu, denge kaybı, tehlikeli seviye</td></tr>
                    </tbody>
                </table>

                <h2>Alkol Vücuttan Ne Kadar Sürede Atılır?</h2>
                <p>Ortalama olarak sağlıklı bir vücut her saatte 0.15 promil alkolü yakar. Bu süre alkolün türüne, miktarına ve bireyin karaciğer sağlığına göre değişebilir.</p>

                <p className="text-red-600 font-bold">⚠️ UNUTMAYIN: Alkollü araç kullanmak trafik kazalarına ve can kayıplarına neden olur. Kesinlikle direksiyon başına geçmeyiniz.</p>
            </article>
        </div>
    )
}
