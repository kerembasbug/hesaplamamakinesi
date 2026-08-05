import { CalpolDoseCalculator } from "@/components/calculators/health/calpol-dose-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"

export const metadata = buildMetadata({
    title: "Calpol Doz Hesaplama - Çocuk Dozu",
    description: "Çocuklar ve bebekler için kilo bazlı Calpol doz hesaplama aracı. 120 mg ve 250 mg şurup ölçeğini bulun; dozaj için mutlaka hekiminize danışın.",
    keywords: ["calpol doz hesaplama", "çocuk ateş düşürücü doz hesaplama", "kiloya göre calpol dozu", "bebek parasetamol hesaplama", "calpol 120 mg doz"],
    path: "/saglik-spor/calpol-doz-hesaplama",
})

export default function CalpolDozPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Calpol Doz Hesaplama",
                    description: "Çocuklar ve bebekler için kg bazlı Calpol doz hesaplama aracı. Çocuğunuzun kilosuna göre 120mg ve 250mg Calpol ölçeğini güvenle bulun.",
                    path: "/saglik-spor/calpol-doz-hesaplama",
                    applicationCategory: "HealthApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Sağlık & Spor", path: "/saglik-spor" },
                { name: "Calpol Doz Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Calpol (Parasetamol) Dozu Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Çocuğunuzun güncel ağırlığını girerek doktor onaylı dozaj rehberiyle uyumlu miktarı öğrenin.</p>
            </div>

            <CalpolDoseCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Çocuklarda Doz Nasıl Hesaplanır?</h2>
                <p>Çocuklarda ilaç dozajı yaşa göre değil, <strong>vücut ağırlığına (kiloya)</strong> göre hesaplanmalıdır. Parasetamol için standart olarak her dozda 10-15 mg/kg kullanılması önerilir.</p>

                <h2>Calpol 120 mg ve Calpol 250 mg Arasındaki Fark Nedir?</h2>
                <ul>
                    <li><strong>Calpol 120 mg/5 ml:</strong> Genellikle 6 yaş altı çocuklar ve bebekler için kullanılır. 1 ml'sinde 24 mg ilaç bulunur.</li>
                    <li><strong>Calpol 6 Plus (250 mg/5 ml):</strong> Genellikle 6 yaş üzeri çocuklar için tercih edilir. Daha konsantredir; 1 ml'sinde 50 mg ilaç bulunur.</li>
                </ul>

                <div className="p-4 bg-orange-50 border-l-4 border-orange-500 text-orange-800 my-6">
                    <strong>Dikkat:</strong> Günlük toplam doz miktarını asla aşmayınız. İki doz arasında en az 4 saat (tercihen 6 saat) bekleyiniz. 24 saat içinde 4 dozdan fazla vermeyiniz.
                </div>

                <p className="text-sm italic">Uyarı: Bu sayfa bilgi amaçlıdır. Çocuğunuzun tedavisi için mutlaka pediatri uzmanına danışınız.</p>
            </article>
        </div>
    )
}
