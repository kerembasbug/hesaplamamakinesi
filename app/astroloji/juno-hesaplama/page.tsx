import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { AstrologyCalculator } from "@/components/calculators/astrology/astrology-calculator"

export const metadata: Metadata = {
    title: "Juno Burç Hesaplama - Ruh Eşi ve Evlilik Analizi",
    description: "Astrolojide Juno burcu hesaplama. Doğum haritanızdaki Juno yerleşimine göre ruh eşinizi ve evlilikteki beklentilerinizi öğrenin.",
    keywords: ["juno burç hesaplama", "juno hesaplama", "evlilik burcu hesaplama", "ruh eşi hesaplama", "juno nedir"]
}

export default function JunoPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/astroloji" className="hover:text-indigo-600 transition-colors">Astroloji</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Juno Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Juno Burcu Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Astrolojide sadakat, bağlılık ve evlilik asteroidi Juno'yu keşfedin.</p>
            </div>

            <AstrologyCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Juno Burcu Neden Önemlidir?</h2>
                <p>Juno, doğum haritasındaki "karşı tarafın nasıl olması gerektiği" bilgisini taşır. Sadece aşık olacağınız değil, hayatınızı birleştirebileceğiniz kişinin karakter özelliklerini anlatır.</p>
            </article>
        </div>
    )
}
