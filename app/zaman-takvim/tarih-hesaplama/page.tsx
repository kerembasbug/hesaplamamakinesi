import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { DateCalculator } from "@/components/calculators/time/date-calculator"

export const metadata: Metadata = {
    title: "Tarih Hesaplama - İki Tarih Arası Gün Hesaplayıcı",
    description: "Online tarih hesaplama aracı. İki tarih arasındaki gün, hafta, ay ve yıl farkını hesaplayın. Tarih farkı hesaplama.",
    keywords: ["tarih hesaplama", "gün hesaplama", "tarih farkı", "kaç gün kaldı", "iki tarih arası"]
}

export default function TarihHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/zaman-takvim" className="hover:text-indigo-600 transition-colors">Zaman & Takvim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Tarih Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Tarih Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">İki tarih arasındaki farkı yıl, ay, gün olarak hesaplayın.</p>
            </div>

            <DateCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Tarih Hesaplama Nedir?</h2>
                <p>Tarih hesaplama, iki tarih arasındaki süreyi hesaplamak için kullanılır. Tatil planlaması, proje süreleri, önemli günlere kalan süre gibi hesaplamalar için idealdir.</p>

                <h2>Kullanım Alanları</h2>
                <ul>
                    <li>Tatile kaç gün kaldığını hesaplama</li>
                    <li>İş sözleşmesi süresini hesaplama</li>
                    <li>Proje teslim tarihine kalan süre</li>
                    <li>Önemli etkinliklere geri sayım</li>
                </ul>
            </article>
        </div>
    )
}
