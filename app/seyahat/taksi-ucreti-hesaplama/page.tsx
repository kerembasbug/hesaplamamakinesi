import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { TaxiCalculator } from "@/components/calculators/travel/taxi-calculator"

export const metadata: Metadata = {
    title: "Taksi Ücreti Hesaplama 2025 - İstanbul & Ankara Taksi Ücreti",
    description: "İstanbul ve Ankara için güncel 2025 taksi ücreti hesaplama aracı. Açılış ücreti, km maliyeti ve indi-bindi ücretleri ile tahmini taksi masrafınızı bulun.",
    keywords: ["istanbul taksi hesaplama", "ankara taksi hesaplama", "taksi ücreti hesaplama 2025", "istanbul taksi ücreti", "ankara taksi ücreti"]
}

export default function TaksiHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Taksi Ücreti Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">İstanbul & Ankara Taksi Ücreti Hesaplama 2025</h1>
                <p className="text-slate-600 dark:text-slate-400">Gideceğiniz mesafeyi girerek tahmini taksi ücretinizi güncel tarifelerle hemen öğrenin.</p>
            </div>

            <TaxiCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>İstanbul Taksi Ücretleri 2025</h2>
                <p>İstanbul'da taksi ücretleri UKOME kararı ile güncellenmektedir. 2025 yılı itibarıyla geçerli olan sarı taksi tarifesi şu şekildedir:</p>
                <ul>
                    <li><strong>Açılış Ücreti:</strong> 24.55 TL</li>
                    <li><strong>KM Başı Ücret:</strong> 17.62 TL</li>
                    <li><strong>İndi-Bindi Ücreti:</strong> 90 TL</li>
                </ul>

                <h2>Ankara Taksi Ücretleri 2025</h2>
                <p>Ankara'da geçerli olan güncel taksi tarifesi Ankara Esnaf ve Sanatkarlar Odası tarafından belirlenir:</p>
                <ul>
                    <li><strong>Açılış Ücreti:</strong> 25 TL</li>
                    <li><strong>KM Başı Ücret:</strong> 20 TL</li>
                    <li><strong>İndi-Bindi Ücreti:</strong> 75 TL</li>
                </ul>

                <h2>Taksi Ücreti Nasıl Hesaplanır?</h2>
                <p>Taksi ücreti şu formül ile hesaplanır: <code>Açılış Ücreti + (Mesafe x KM Ücreti)</code>. Eğer hesaplanan toplam tutar "İndi-Bindi" ücretinin altındaysa, yolcu indi-bindi ücretini öder. Ayrıca trafik yoğunluğuna bağlı olarak bekleme süreleri de ücrete yansıtılabilir.</p>
            </article>
        </div>
    )
}
