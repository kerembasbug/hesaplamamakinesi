import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { PercentageCalculator } from "@/components/calculators/math/percentage-calculator"

export const metadata: Metadata = {
    title: "Yüzde Hesaplama - Online Yüzde Hesaplayıcı",
    description: "Online yüzde hesaplama aracı. Yüzde değeri, yüzde oranı, yüzde artış/azalış hesaplama. İndirim hesaplama, kar marjı hesaplama.",
    keywords: ["yüzde hesaplama", "yüzde hesapla", "indirim hesaplama", "yüzde artış", "yüzde azalış"]
}

export default function YuzdeHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/matematik-egitim" className="hover:text-indigo-600 transition-colors">Matematik & Eğitim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Yüzde Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Yüzde Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Çeşitli yüzde hesaplamalarını hızlıca yapın.</p>
            </div>

            <PercentageCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Yüzde Hesaplama Nedir?</h2>
                <p>Yüzde, bir sayının yüzde birlik dilimlerini ifade eder. 100 üzerinden oranı gösterir ve günlük hayatta indirimler, vergiler, faizler, istatistikler gibi birçok alanda kullanılır.</p>

                <h2>Yüzde Hesaplama Formülleri</h2>
                <ul>
                    <li><strong>Yüzde değeri:</strong> Sayı × (Yüzde / 100)</li>
                    <li><strong>Yüzde oranı:</strong> (Kısım / Bütün) × 100</li>
                    <li><strong>Yüzde değişimi:</strong> ((Yeni - Eski) / Eski) × 100</li>
                </ul>

                <h2>Kullanım Örnekleri</h2>
                <ul>
                    <li>%20 indirimli fiyat hesaplama</li>
                    <li>Sınav notunun yüzde olarak hesaplanması</li>
                    <li>Maaş artış oranının hesaplanması</li>
                    <li>Kar marjı ve vergi hesaplamaları</li>
                </ul>
            </article>
        </div>
    )
}
