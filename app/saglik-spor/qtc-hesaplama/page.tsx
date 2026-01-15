import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { QtcCalculator } from "@/components/calculators/health/qtc-calculator"

export const metadata: Metadata = {
    title: "QTc Hesaplama - Düzeltilmiş QT Aralığı Hesaplayıcı",
    description: "Bazett ve Fridericia formülleri ile QTc (Düzeltilmiş QT) hesaplama aracı. EKG analizi için nabız ve QT aralığına göre QTc değerini bulun.",
    keywords: ["qtc hesaplama", "düzeltilmiş qt hesaplama", "bazett formülü qtc", "ekg qt hesaplama", "fridericia formülü qtc"]
}

export default function QtcPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/saglik-spor" className="hover:text-indigo-600 transition-colors">Sağlık & Spor</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">QTc Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">QTc (Düzeltilmiş QT) Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">EKG'den elde edilen QT aralığı ve nabız değerinizi girerek düzeltilmiş sonucu öğrenin.</p>
            </div>

            <QtcCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>QTc Nedir?</h2>
                <p>QTc (Düzeltilmiş QT), kalp döngüsündeki ventriküler depolarizasyon ve repolarizasyonun toplam süresidir. Kalp hızı arttıkça QT mesafesi doğal olarak kısalır; QTc hesaplaması bu değişkenliği ortadan kaldırarak standardize bir değer sunar.</p>

                <h2>Bazett vs. Fridericia Yöntemi</h2>
                <p>Kardiyolojide en yaygın kullanılan iki yöntem şunlardır:</p>
                <ul>
                    <li><strong>Bazett Formülü:</strong> En yaygın kullanılanıdır (QT / √RR). Ancak yüksek kalp hızlarında (nabız &gt; 100) hata payı artabilir.</li>
                    <li><strong>Fridericia Formülü:</strong> Kalp hızı aşırı uçlarda olduğunda (çok düşük veya çok yüksek) daha güvenilir sonuçlar verdiği kabul edilir.</li>
                </ul>

                <h2>Normal Değerler</h2>
                <p>Yetişkin bir erkek için normal QTc &lt; 440 ms, kadın için &lt; 460 ms olarak kabul edilir. Bu değerlerin üzerindeki sonuçlar uzman görüşü gerektirir.</p>
            </article>
        </div>
    )
}
