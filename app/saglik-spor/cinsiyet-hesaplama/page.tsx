import { GenderCalculator } from "@/components/calculators/health/gender-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"

export const metadata = buildMetadata({
    title: "Cinsiyet Hesaplama - Çin Takvimi",
    description: "Çin ve Rus takvimine göre bebek cinsiyeti tahmini. Anne yaşı ve gebe kalınan aya göre hesaplayın; bu araç eğlence amaçlıdır, tıbbi tanı değildir.",
    keywords: ["cinsiyet hesaplama 2026", "rus takvimi cinsiyet hesaplama", "çin takvimi bebek cinsiyeti", "bebek cinsiyeti tahmini", "cinsiyet tahmini"],
    path: "/saglik-spor/cinsiyet-hesaplama",
})

export default function CinsiyetHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Cinsiyet Hesaplama 2026",
                    description: "Çin takvimi ile bebek cinsiyeti hesaplama. Rus takvimi cinsiyet tahmini. Anne yaşı ve gebe kalma ayına göre cinsiyet tahmini.",
                    path: "/saglik-spor/cinsiyet-hesaplama",
                    applicationCategory: "HealthApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Sağlık & Spor", path: "/saglik-spor" },
                { name: "Cinsiyet Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Cinsiyet Hesaplama 2026</h1>
                <p className="text-slate-600 dark:text-slate-400">Çin takvimi ile bebek cinsiyeti tahmini yapın.</p>
            </div>

            <GenderCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Çin Takvimi Cinsiyet Hesaplama Nedir?</h2>
                <p>Çin Cinsiyet Takvimi, yaklaşık 700 yıllık bir geleneksel yöntemdir. Annenin yaşı ve gebe kalma ayına göre bebeğin cinsiyetini tahmin etmeye çalışır.</p>

                <h2>Nasıl Hesaplanır?</h2>
                <ul>
                    <li>Annenin Çin takvimine göre ay yaşı kullanılır (doğum yaşı + 1)</li>
                    <li>Gebe kalınan ay (ay takvimine göre) seçilir</li>
                    <li>Tablo kesişimine göre tahmin yapılır</li>
                </ul>

                <h2>Rus Takvimi</h2>
                <p>Rus takvimi de Çin takvimine benzer mantıkla çalışır. Anne yaşı ve gebe kalma ayına göre cinsiyet tahmini yapar.</p>

                <h2>Önemli Uyarı</h2>
                <p>Bu hesaplama bilimsel değildir ve %50 şans oranına dayanır. Kesin cinsiyet tespiti için ultrason ve tıbbi yöntemler kullanılmalıdır. Bu araç sadece eğlence amaçlıdır.</p>
            </article>
        </div>
    )
}
