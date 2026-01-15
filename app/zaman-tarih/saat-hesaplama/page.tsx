import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { TimeCalculator } from "@/components/calculators/time/time-calculator"

export const metadata: Metadata = {
    title: "Saat Hesaplama - İki Saat Arası Süre Hesaplayıcı",
    description: "İki zaman dilimi arasındaki farkı hesaplamak için saat hesaplama aracı. Giriş-çıkış saati girerek toplam çalışma sürenizi bulun.",
    keywords: ["saat hesaplama", "iki saat arası fark", "zaman hesaplama", "çalışma saati hesaplama", "mesai hesaplama"]
}

export default function SaatHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/zaman-tarih" className="hover:text-indigo-600 transition-colors">Zaman & Tarih</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Saat Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Saat Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Başlangıç ve bitiş saatlerini girerek toplam süreyi saat ve dakika olarak bulun.</p>
            </div>

            <TimeCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Saat Hesaplama Nerelerde Kullanılır?</h2>
                <p>Saat hesaplama aracı; personel mesai saatleri, uçuş süreleri, ders çalışma periyotları veya projeye harcanan zamanın ölçülmesi gibi birçok alanda kolaylık sağlar.</p>

                <h2>Nasıl Hesaplanır?</h2>
                <p>Bitiş saatinden başlangıç saati çıkarılır. Eğer dakika kısmı negatif çıkarsa yan taraftan 1 saat (60 dk) borç alınır. Aracımız bu karmaşık işlemleri ve gece vardiyası geçişlerini otomatik olarak yapar.</p>

                <h2>Ondalık Saat Nedir?</h2>
                <p>Maaş veya hakediş hesaplamalarında 7 saat 30 dakika, 7.5 saat olarak ifade edilir. Bu dönüşümü yaparken dakika değerini 60'a bölerek ondalık kısmı bulabilirsiniz.</p>
            </article>
        </div>
    )
}
