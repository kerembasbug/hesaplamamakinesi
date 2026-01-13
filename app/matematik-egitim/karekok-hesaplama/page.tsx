import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { SquareRootCalculator } from "@/components/calculators/math/square-root-calculator"

export const metadata: Metadata = {
    title: "Karekök Hesaplama - Online Kök Hesaplayıcı",
    description: "Online karekök hesaplama aracı. Sayıların karekökünü ve n'inci kökünü hesaplayın. Küpkök, 4. kök ve daha fazlası.",
    keywords: ["karekök hesaplama", "karekök hesapla", "kök hesaplama", "küpkök hesaplama", "radikal hesaplama"]
}

export default function KarekokhesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/matematik-egitim" className="hover:text-indigo-600 transition-colors">Matematik & Eğitim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Karekök Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Karekök Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Sayıların karekökünü ve n&apos;inci kökünü hesaplayın.</p>
            </div>

            <SquareRootCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Karekök Nedir?</h2>
                <p>Karekök, bir sayının kendisiyle çarpıldığında o sayıyı veren değerdir. Örneğin, 4&apos;ün karekökü 2&apos;dir çünkü 2 × 2 = 4.</p>

                <h2>Karekök Özellikleri</h2>
                <ul>
                    <li>Pozitif sayıların karekökü pozitiftir</li>
                    <li>0&apos;ın karekökü 0&apos;dır</li>
                    <li>Negatif sayıların gerçek karekökü yoktur (sanal sayılar)</li>
                    <li>√(a × b) = √a × √b</li>
                </ul>

                <h2>Tam Kare Sayılar</h2>
                <p>Tam kare sayılar, karekökü tam sayı olan sayılardır: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100...</p>
            </article>
        </div>
    )
}
