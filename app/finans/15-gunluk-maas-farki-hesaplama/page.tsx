import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { WageDifferenceCalculator } from "@/components/calculators/finance/wage-difference-calculator"

export const metadata: Metadata = {
    title: "15 Günlük Maaş Farkı Hesaplama 2025 - Memur Zam Farkı",
    description: "Memur ve kamu çalışanları için 15 günlük maaş farkı hesaplama aracı. Ocak ve Temmuz maaş zammı farklarını anında hesaplayın.",
    keywords: ["15 günlük maaş farkı hesaplama", "maaş farkı hesaplama", "memur zam farkı", "14 günlük maaş farkı", "maaş farkı ne kadar"]
}

export default function MaasFarkiPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/finans" className="hover:text-indigo-600 transition-colors">Finans</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">15 Günlük Maaş Farkı</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">15 Günlük Maaş Farkı Hesaplama 2025</h1>
                <p className="text-slate-600 dark:text-slate-400">Kamu çalışanlarına özel maaş katsayısı ve zam farkı hesaplayıcı.</p>
            </div>

            <WageDifferenceCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>15 Günlük Maaş Farkı Nedir?</h2>
                <p>Memurlar maaşlarını her ayın 15'inde peşin olarak alırlar. Maaş zamları ayın 1'inden itibaren geçerli olduğu için, 1-15 tarihleri arasındaki zamlı maaşın farkı bir sonraki ödemeye yansıtılır.</p>

                <h2>Kimler Yararlanabilir?</h2>
                <ul>
                    <li>657 Sayılı Kanuna tabi devlet memurları</li>
                    <li>Sözleşmeli personel</li>
                    <li>Kadro karşılığı sözleşmeli personel</li>
                </ul>

                <h2>Maaş Farkı Ne Zaman Yatar?</h2>
                <p>Genellikle Ocak ve Temmuz aylarının son haftası veya Şubat/Ağustos maaşları ile birlikte ödenir.</p>
            </article>
        </div>
    )
}
