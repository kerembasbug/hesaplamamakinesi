import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { BodyMeasurementCalculator } from "@/components/calculators/health/body-measurement-calculator"

export const metadata: Metadata = {
    title: "Bel Kalça Oranı Hesaplama - Vücut Ölçüm Hesaplayıcı",
    description: "Online bel kalça oranı hesaplama aracı. Bel ve kalça çevrenizi ölçerek sağlık riskinizi değerlendirin. Kardiyovasküler hastalık riski analizi.",
    keywords: ["bel kalça oranı", "vücut ölçümü hesaplama", "bel çevresi", "kalça ölçümü", "obezite riski"],
}

export default function VucutOlcumuPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/saglik-spor" className="hover:text-indigo-600 transition-colors">Sağlık & Spor</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Vücut Ölçümü</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Bel-Kalça Oranı Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Bel ve kalça ölçülerinizle kardiyovasküler sağlık riskinizi değerlendirin.</p>
            </div>

            <BodyMeasurementCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Bel-Kalça Oranı Neden Önemli?</h2>
                <p>
                    Bel-kalça oranı (BKO), vücut yağ dağılımını değerlendiren önemli bir sağlık göstergesidir.
                    Araştırmalar, karın bölgesinde biriken yağın (elma tipi obezite) kalp hastalıkları,
                    diyabet ve inme riskini artırdığını göstermektedir.
                </p>

                <h2>Sağlıklı Bel-Kalça Oranları</h2>
                <table>
                    <thead><tr><th>Cinsiyet</th><th>Düşük Risk</th><th>Orta Risk</th><th>Yüksek Risk</th></tr></thead>
                    <tbody>
                        <tr><td>Erkek</td><td>&lt; 0.90</td><td>0.90 - 1.0</td><td>&gt; 1.0</td></tr>
                        <tr><td>Kadın</td><td>&lt; 0.80</td><td>0.80 - 0.85</td><td>&gt; 0.85</td></tr>
                    </tbody>
                </table>

                <h2>Doğru Ölçüm Nasıl Yapılır?</h2>
                <ul>
                    <li><strong>Bel ölçümü:</strong> Göbek hizasından, nefes verdikten sonra ölçün</li>
                    <li><strong>Kalça ölçümü:</strong> Kalçanın en geniş bölgesinden ölçün</li>
                    <li>Ölçümü sabah, aç karna yapın</li>
                    <li>Dar giysiler üzerinden ölçmeyin</li>
                </ul>

                <h2>Bel Çevresi ve Sağlık</h2>
                <p>
                    Tek başına bel çevresi de önemli bir göstergedir. Dünya Sağlık Örgütü&apos;ne göre
                    erkeklerde 94 cm, kadınlarda 80 cm&apos;nin üzerindeki bel çevresi sağlık riski
                    oluşturmaya başlar.
                </p>
            </article>
        </div>
    )
}
