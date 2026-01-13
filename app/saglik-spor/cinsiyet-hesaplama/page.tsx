import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { GenderCalculator } from "@/components/calculators/health/gender-calculator"

export const metadata: Metadata = {
    title: "Cinsiyet Hesaplama 2025 - Çin Takvimi Bebek Cinsiyeti",
    description: "Çin takvimi ile bebek cinsiyeti hesaplama. Rus takvimi cinsiyet tahmini. Anne yaşı ve gebe kalma ayına göre cinsiyet tahmini.",
    keywords: ["cinsiyet hesaplama 2025", "rus takvimi cinsiyet hesaplama", "çin takvimi bebek cinsiyeti", "bebek cinsiyeti tahmini", "cinsiyet tahmini"]
}

export default function CinsiyetHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/saglik-spor" className="hover:text-indigo-600 transition-colors">Sağlık & Spor</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Cinsiyet Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Cinsiyet Hesaplama 2025</h1>
                <p className="text-slate-600 dark:text-slate-400">Çin takvimi ile bebek cinsiyeti tahmini yapın.</p>
            </div>

            <GenderCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Çin Takvimi Cinsiyet Hesaplama Nedir?</h2>
                <p>Çin Cinsiyet Takvimi, yaklaşık 700 yıllık bir geleneksel yöntemdir. Annenin yaşı ve gebe kalma ayına göre bebeğin cinsiyetini tahmin etmeye çalışır.</p>

                <h2>Nasıl Hesaplanır?</h2>
                <ul>
                    <li>Annenin Çin takvimine göre ay yaşı kullanılır (doğum yaşı + 1)</li>
                    <li>Gebe kalınan ay (ay takvimine göre) seçilir</li>
                    <li>Tablo kesişimine göre tahmin yapılır</li>
                </ul>

                <h2>Rus Takvimi</h2>
                <p>Rus takvimi de Çin takvimine benzer mantıkla çalışır. Anne yaşı ve gebe kalma ayına göre cinsiyet tahmini yapar.</p>

                <h2>Önemli Uyarı</h2>
                <p>Bu hesaplama bilimsel değildir ve %50 şans oranına dayanır. Kesin cinsiyet tespiti için ultrason ve tıbbi yöntemler kullanılmalıdır. Bu araç sadece eğlence amaçlıdır.</p>
            </article>
        </div>
    )
}
