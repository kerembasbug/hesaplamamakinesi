import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { RayicBedelCalculator } from "@/components/calculators/finance/rayic-bedel-calculator"

export const metadata: Metadata = {
    title: "Rayiç Bedel Hesaplama - Gayrimenkul Rayiç Değeri Sorgulama",
    description: "Ev, arsa ve konut için rayiç bedel hesaplama aracı. Piyasa değerine göre tahmini belediye rayiç bedelini ve emsal kira bedelini bulun.",
    keywords: ["rayiç bedel hesaplama", "rayiç bedeli hesaplama", "ev rayiç bedel sorgulama", "belediye rayiç bedel", "konut rayiç bedeli"]
}

export default function RayicBedelPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/finans" className="hover:text-indigo-600 transition-colors">Finans</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Rayiç Bedel Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Rayiç Bedel Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Piyasa satış fiyatına göre gayrimenkulünüzün tahmini resmi bedelini hesaplayın.</p>
            </div>

            <RayicBedelCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Rayiç Bedel Nedir?</h2>
                <p>Rayiç bedel, bir gayrimenkulün (ev, arsa, dükkan vb.) piyasa şartlarındaki güncel alım-satım değeridir. Ancak uygulamada "Belediye Rayiç Bedeli" ve "Piyasa Rayiç Bedeli" olarak ikiye ayrılır.</p>

                <h2>Belediye Rayiç Bedeli Neyi Belirler?</h2>
                <p>Belediye tarafından belirlenen bu bedel şu işlemler için temel alınır:</p>
                <ul>
                    <li>Emlak Vergisi ödemeleri</li>
                    <li>Tapu Harcı hesaplaması</li>
                    <li>Veraset ve İntikal işlemleri</li>
                </ul>

                <h2>Emsal Kira Bedeli Nasıl Hesaplanır?</h2>
                <p>Gelir Vergisi Kanunu'na göre emsal kira bedeli, gayrimenkulün emlak vergisi değerinin (rayiç bedelinin) %5'idir. Bu değerin altında kira beyan edilmesi durumunda vergi incelemesi yapılabilir.</p>
            </article>
        </div>
    )
}
