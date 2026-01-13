import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { DisabledVehicleCalculator } from "@/components/calculators/tax/disabled-vehicle-calculator"

export const metadata: Metadata = {
    title: "Engelli Araç İndirimi Hesaplama 2025 - ÖTV Muafiyeti Hesaplayıcı",
    description: "%40 ve %90 engelli araç indirimi hesaplama. ÖTV ve KDV muafiyeti ile araç fiyatı hesaplayın. 2025 güncel oranlar.",
    keywords: ["engelli araç indirimi hesaplama", "40 engelli araç indirimi", "90 engelli araç indirimi", "engelli ötv muafiyeti", "engelli araç fiyatı"]
}

export default function EngelliAracPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/vergi-muhasebe" className="hover:text-indigo-600 transition-colors">Vergi & Muhasebe</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Engelli Araç İndirimi</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Engelli Araç İndirimi Hesaplama 2025</h1>
                <p className="text-slate-600 dark:text-slate-400">%40 ve %90 engellilik oranına göre ÖTV ve KDV muafiyeti hesaplayın.</p>
            </div>

            <DisabledVehicleCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Engelli Araç İndirimi Nedir?</h2>
                <p>Engelli bireylerin araç alımında ÖTV (Özel Tüketim Vergisi) ve bazı durumlarda KDV muafiyeti sağlayan devlet teşvikidir.</p>

                <h2>%90 ve Üzeri Engellilik Muafiyeti</h2>
                <p>%90 ve üzeri engelli raporu olan bireyler, 1600cc altı araçlarda hem ÖTV hem de KDV&apos;den muaftır. Bu muafiyet 5 yılda 1 kez kullanılabilir.</p>

                <h2>%40-89 Engellilik Muafiyeti (H Sınıfı)</h2>
                <p>%40-89 arası engelli raporu ve H sınıfı ehliyet sahibi bireyler, sadece ÖTV muafiyetinden yararlanabilir. KDV ödenmesi gerekir.</p>

                <h2>Önemli Şartlar</h2>
                <ul>
                    <li>Motor hacmi 1600cc ve altı olmalıdır</li>
                    <li>5 yılda 1 kez kullanılabilir</li>
                    <li>Araç engelli adına tescil edilmelidir</li>
                    <li>Sağlık kurulu raporu gereklidir</li>
                </ul>
            </article>
        </div>
    )
}
