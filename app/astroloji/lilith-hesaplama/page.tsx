import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { AstrologyCalculator } from "@/components/calculators/astrology/astrology-calculator"

export const metadata: Metadata = {
    title: "Lilith Burcu Hesaplama - Kara Ay Analizi",
    description: "Doğum haritasında Lilith (Kara Ay) burcu hesaplama. İçsel gücünüzü ve bilinçaltınızdaki gölge yanları keşfedin.",
    keywords: ["lilith burcu hesaplama", "kara ay hesaplama", "lilith hesaplama", "lilith nedir", "astroloji lilith"]
}

export default function LilithPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/astroloji" className="hover:text-indigo-600 transition-colors">Astroloji</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Lilith Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Lilith (Kara Ay) Burcu Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Bilinçaltınızdaki en gizli noktaları ve içgüdüsel tepkilerinizi temsil eden Lilith'i öğrenin.</p>
            </div>

            <AstrologyCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Lilith Astrolojide Neyi Temsil Eder?</h2>
                <p>Lilith, toplum tarafından baskılanmış arzuları, başkaldırı potansiyelini ve kişinin en korumasız olduğu alanlardaki savunma mekanizmalarını ifade eder.</p>
            </article>
        </div>
    )
}
