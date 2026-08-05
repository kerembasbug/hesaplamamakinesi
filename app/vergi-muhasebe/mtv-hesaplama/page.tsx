import { MtvCalculator } from "@/components/calculators/tax/mtv-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import { TarifeUyarisi } from "@/components/content/tarife-uyarisi"

export const metadata = buildMetadata({
    title: "MTV Hesaplama 2026 - Taşıt Vergisi",
    description: "2026 MTV hesaplama aracı. Araç yaşı, motor hacmi ve araç değerine göre motorlu taşıtlar vergisini hesaplayın; Ocak ve Temmuz taksitleri gösterilir.",
    keywords: ["mtv hesaplama 2025", "motorlu taşıtlar vergisi", "mtv 2025", "araç vergisi hesaplama", "mtv taksit"],
    path: "/vergi-muhasebe/mtv-hesaplama",
})

export default function MtvHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "MTV Hesaplama 2025",
                    description: "2025 MTV hesaplama aracı. Araç yaşı ve motor hacmine göre motorlu taşıtlar vergisi tutarını hesaplayın. Taksit bilgileri.",
                    path: "/vergi-muhasebe/mtv-hesaplama",
                    applicationCategory: "FinanceApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Vergi & Muhasebe", path: "/vergi-muhasebe" },
                { name: "MTV Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">MTV Hesaplama 2025</h1>
                <p className="text-slate-600 dark:text-slate-400">Araç yaşı ve motor hacmine göre 2025 yılı motorlu taşıtlar vergisini hesaplayın.</p>
            </div>

            <MtvCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <TarifeUyarisi yil={2025} konu="MTV tarifesi" kaynakAdi="Gelir İdaresi Başkanlığı" kaynakUrl="https://www.gib.gov.tr/" />

                <h2>MTV (Motorlu Taşıtlar Vergisi) Nedir?</h2>
                <p>MTV, motorlu taşıt sahiplerinin her yıl ödemesi gereken bir vergidir. Vergi tutarı aracın motor hacmi ve yaşına göre belirlenir.</p>

                <h2>2025 MTV Ödeme Tarihleri</h2>
                <ul>
                    <li><strong>1. Taksit:</strong> Ocak ayı sonuna kadar</li>
                    <li><strong>2. Taksit:</strong> Temmuz ayı sonuna kadar</li>
                </ul>

                <h2>MTV Neye Göre Belirlenir?</h2>
                <p>MTV tutarı iki ana faktöre göre değişir: aracın motor hacmi (cc) ve model yılı. Genç araçlar daha yüksek, eski araçlar daha düşük vergi öder.</p>

                <h2>MTV Ödenmezse Ne Olur?</h2>
                <p>MTV ödenmezse gecikme zammı uygulanır. Ayrıca araç muayenesi yaptırılamaz ve satış işlemi gerçekleştirilemez.</p>
            </article>
        </div>
    )
}
