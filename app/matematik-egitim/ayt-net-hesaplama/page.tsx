import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { YksCalculator } from "@/components/calculators/education/yks-calculator"

export const metadata: Metadata = {
    title: "AYT Net Hesaplama 2025 - YKS Alan Yeterlilik Testi",
    description: "2025 AYT net hesaplama aracı. Sayısal, Sözel ve Eşit Ağırlık alan testleri için net hesaplayın.",
    keywords: ["ayt net hesaplama", "ayt hesaplama 2025", "ayt sayısal net", "ayt sözel net", "alan yeterlilik testi"]
}

export default function AytHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/matematik-egitim" className="hover:text-indigo-600 transition-colors">Matematik & Eğitim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">AYT Net Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">AYT Net Hesaplama 2025</h1>
                <p className="text-slate-600 dark:text-slate-400">Alan testlerinde doğru ve yanlış sayılarınıza göre AYT netinizi hesaplayın.</p>
            </div>

            <YksCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>AYT (Alan Yeterlilik Testi) Nedir?</h2>
                <p>AYT, YKS&apos;nin ikinci oturumudur. Adaylar tercih ettikleri alana göre (Sayısal, Sözel, EA, Dil) bu teste girerler.</p>

                <h2>AYT Sayısal Soru Dağılımı</h2>
                <table>
                    <thead><tr><th>Test</th><th>Soru Sayısı</th></tr></thead>
                    <tbody>
                        <tr><td>Matematik</td><td>40</td></tr>
                        <tr><td>Fizik</td><td>14</td></tr>
                        <tr><td>Kimya</td><td>13</td></tr>
                        <tr><td>Biyoloji</td><td>13</td></tr>
                    </tbody>
                </table>

                <h2>AYT Puanı Nasıl Hesaplanır?</h2>
                <p>AYT puanı, TYT puanının %40&apos;ı ve AYT puanının %60&apos;ı toplanarak hesaplanır. TYT barajını geçmek zorunludur.</p>
            </article>
        </div>
    )
}
