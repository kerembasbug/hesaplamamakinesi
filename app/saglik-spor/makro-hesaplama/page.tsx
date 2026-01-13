import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { MacroCalculator } from "@/components/calculators/health/macro-calculator"

export const metadata: Metadata = {
    title: "Makro Besin Hesaplama - Protein Karbonhidrat Yağ Hesaplayıcı",
    description: "Online makro besin hesaplama aracı. Fitness hedefinize göre günlük protein, karbonhidrat ve yağ ihtiyacınızı hesaplayın. Kas yapma ve yağ yakma programları.",
    keywords: ["makro hesaplama", "protein hesaplama", "karbonhidrat hesaplama", "yağ hesaplama", "makro besin", "fitness diyet"],
}

export default function MakroHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/saglik-spor" className="hover:text-indigo-600 transition-colors">Sağlık & Spor</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Makro Besin Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Makro Besin Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Fitness hedefinize göre protein, karbonhidrat ve yağ ihtiyacınızı hesaplayın.</p>
            </div>

            <MacroCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Makro Besinler Nedir?</h2>
                <p>
                    Makro besinler (makrolar), vücudun büyük miktarlarda ihtiyaç duyduğu besin öğeleridir.
                    Üç ana makro besin grubu vardır: protein, karbonhidrat ve yağ. Her birinin vücutta
                    farklı işlevleri vardır.
                </p>

                <h2>Makro Besinlerin Görevleri</h2>
                <ul>
                    <li><strong>Protein (4 kcal/g):</strong> Kas yapımı ve onarımı, enzim ve hormon üretimi</li>
                    <li><strong>Karbonhidrat (4 kcal/g):</strong> Ana enerji kaynağı, beyin fonksiyonları</li>
                    <li><strong>Yağ (9 kcal/g):</strong> Hormon üretimi, vitamin emilimi, hücre yapısı</li>
                </ul>

                <h2>Hedeflere Göre Makro Dağılımı</h2>
                <table>
                    <thead><tr><th>Hedef</th><th>Protein</th><th>Karbonhidrat</th><th>Yağ</th></tr></thead>
                    <tbody>
                        <tr><td>Kilo Koruma</td><td>%25</td><td>%45</td><td>%30</td></tr>
                        <tr><td>Yağ Yakma</td><td>%30</td><td>%40</td><td>%30</td></tr>
                        <tr><td>Kas Yapma</td><td>%25</td><td>%50</td><td>%25</td></tr>
                    </tbody>
                </table>

                <h2>Makro Takibi İpuçları</h2>
                <ul>
                    <li>Besin takip uygulaması kullanın</li>
                    <li>Yemeklerinizi önceden planlayın</li>
                    <li>Porsiyonları ölçerek hazırlayın</li>
                    <li>Esnek olun, %90 uyum yeterlidir</li>
                    <li>İhtiyaçlarınızı dönemsel olarak güncelleyin</li>
                </ul>

                <h2>Kaliteli Besin Kaynakları</h2>
                <ul>
                    <li><strong>Protein:</strong> Tavuk, balık, yumurta, süt ürünleri, baklagiller</li>
                    <li><strong>Karbonhidrat:</strong> Tam tahıllar, sebzeler, meyveler, yulaf</li>
                    <li><strong>Yağ:</strong> Zeytinyağı, avokado, kuruyemişler, balık yağı</li>
                </ul>
            </article>
        </div>
    )
}
