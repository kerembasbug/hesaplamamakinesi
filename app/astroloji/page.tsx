import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { AstrologyCalculator } from "@/components/calculators/astrology/astrology-calculator"

export const metadata: Metadata = {
    title: "Astroloji Hesaplama 2025 - Solar, Juno ve Lilith Burcu",
    description: "Doğum haritanızdaki kritik noktaları öğrenin. Güneş burcu, Juno burcu ve Lilith (Kara Ay) hesaplaması ile detaylı astrolojik analiz.",
    keywords: ["astroloji hesaplama", "juno burç hesaplama", "lilith burcu hesaplama", "solar harita hesaplama", "doğum haritası hesaplama"]
}

export default function AstrolojiPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Astroloji Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Astroloji: Solar, Juno ve Lilith Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Doğum tarihinize göre aşkın, kaderin ve karanlık noktaların burçlarını keşfedin.</p>
            </div>

            <AstrologyCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Astrolojide Juno Nedir?</h2>
                <p>Juno, doğum haritanızda ruh eşinizi, evlilik tarzınızı ve ikili ilişkilerde en çok aradığınız sadakat tipini temsil eder. "Kiminle evleneceğim?" sorusuna verilen en güçlü cevap Juno burcunuzda gizlidir.</p>

                <h2>Lilith (Kara Ay) Nedir?</h2>
                <p>Kara Ay Lilith, haritadaki en derin arzuları, bastırılmış duyguları ve içsel vahşi gücü simgeler. Kişinin sınırlarını nerede çizdiğini ve karanlık tarafıyla nasıl başa çıktığını anlatır.</p>

                <h2>Solar Harita ve Güneş Burcu</h2>
                <p>Güneş burcu, kimliğinizi ve temel karakterinizi belirlerken; Solar Harita analizi doğum gününüzden itibaren başlayan yeni bir yıllık süreci ifade eder.</p>
            </article>
        </div>
    )
}
