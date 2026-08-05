import { UnemploymentCalculator } from "@/components/calculators/finance/unemployment-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import { TarifeUyarisi } from "@/components/content/tarife-uyarisi"

export const metadata = buildMetadata({
    title: "İşsizlik Maaşı Hesaplama 2026",
    description: "2026 işsizlik maaşı hesaplama aracı. Brüt maaşınıza ve çalışma sürenize göre işsizlik ödeneği tutarınızı, süresini ve tavan sınırını hesaplayın.",
    keywords: ["işsizlik maaşı hesaplama 2025", "işsizlik ödeneği", "işsizlik maaşı", "işkur işsizlik maaşı", "2025 işsizlik"],
    path: "/finans/issizlik-maasi-hesaplama",
})

export default function IssizlikMaasiPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "İşsizlik Maaşı Hesaplama 2026",
                    description: "2026 işsizlik maaşı hesaplama aracı. Brüt maaşınıza ve çalışma sürenize göre işsizlik ödeneği tutarınızı, süresini ve tavan sınırını hesaplayın.",
                    path: "/finans/issizlik-maasi-hesaplama",
                    applicationCategory: "FinanceApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Finans", path: "/finans" },
                { name: "İşsizlik Maaşı Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">İşsizlik Maaşı Hesaplama 2025</h1>
                <p className="text-slate-600 dark:text-slate-400">Brüt maaşınıza ve prim gününüze göre işsizlik ödeneği tutarınızı hesaplayın.</p>
            </div>

            <UnemploymentCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <TarifeUyarisi yil={2025} konu="işsizlik ödeneği tutarları" kaynakAdi="İŞKUR" kaynakUrl="https://www.iskur.gov.tr/" />

                <h2>İşsizlik Maaşı Nedir?</h2>
                <p>İşsizlik maaşı, işini kaybeden sigortalı çalışanlara İŞKUR tarafından ödenen maddi destektir. 4447 sayılı İşsizlik Sigortası Kanunu kapsamında, belirli koşulları sağlayan işsizlere ödeme yapılır.</p>

                <h2>2025 İşsizlik Maaşı Şartları</h2>
                <ul>
                    <li>Son 120 gün hizmet akdine tabi çalışmış olmak</li>
                    <li>Son 3 yılda en az 600 gün işsizlik sigortası primi ödemiş olmak</li>
                    <li>Kendi istek ve kusuru dışında işsiz kalmak</li>
                    <li>30 gün içinde İŞKUR&apos;a başvurmak</li>
                </ul>

                <h2>İşsizlik Maaşı Nasıl Hesaplanır?</h2>
                <p>İşsizlik ödeneği, son 4 aylık brüt maaş ortalamasının %40&apos;ı olarak hesaplanır. Ancak asgari ücretin %80&apos;ini geçemez.</p>

                <h2>Ödeme Süreleri</h2>
                <table>
                    <thead><tr><th>Prim Günü</th><th>Ödeme Süresi</th></tr></thead>
                    <tbody>
                        <tr><td>600-899 gün</td><td>180 gün (6 ay)</td></tr>
                        <tr><td>900-1079 gün</td><td>240 gün (8 ay)</td></tr>
                        <tr><td>1080+ gün</td><td>300 gün (10 ay)</td></tr>
                    </tbody>
                </table>
            </article>
        </div>
    )
}
