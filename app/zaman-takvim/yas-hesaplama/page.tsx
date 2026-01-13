import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { AgeCalculator } from "@/components/calculators/time/age-calculator"

export const metadata: Metadata = {
    title: "Yaş Hesaplama - Doğum Tarihine Göre Yaş Hesaplayıcı",
    description: "Online yaş hesaplama aracı. Doğum tarihinize göre yaşınızı yıl, ay, gün olarak hesaplayın. Burç ve doğum günü hesaplama.",
    keywords: ["yaş hesaplama", "yaş hesapla", "doğum tarihi hesaplama", "kaç yaşındayım", "burç hesaplama"]
}

export default function YasHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/zaman-takvim" className="hover:text-indigo-600 transition-colors">Zaman & Takvim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Yaş Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Yaş Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Doğum tarihinize göre yaşınızı detaylı olarak hesaplayın.</p>
            </div>

            <AgeCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Yaş Hesaplama</h2>
                <p>Yaş hesaplama aracı, doğum tarihinize göre yaşınızı yıl, ay ve gün cinsinden hesaplar. Ayrıca toplam yaşadığınız gün sayısını, burcunuzu ve bir sonraki doğum gününüze kalan süreyi gösterir.</p>

                <h2>Özellikler</h2>
                <ul>
                    <li>Detaylı yaş hesabı (yıl, ay, gün)</li>
                    <li>Toplam gün ve saat hesabı</li>
                    <li>Burç bilgisi</li>
                    <li>Doğum günü geri sayımı</li>
                </ul>
            </article>
        </div>
    )
}
