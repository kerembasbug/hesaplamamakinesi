import { MacroCalculator } from "@/components/calculators/health/macro-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"

export const metadata = buildMetadata({
    title: "Makro Hesaplama - Protein, Karb, Yağ",
    description: "Makro besin hesaplama aracı. Fitness hedefinize göre günlük protein, karbonhidrat ve yağ ihtiyacınızı gram cinsinden hesaplayın; kas ve kilo planları.",
    keywords: ["makro hesaplama", "protein hesaplama", "karbonhidrat hesaplama", "yağ hesaplama", "makro besin", "fitness diyet"],
    path: "/saglik-spor/makro-hesaplama",
})

export default function MakroHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Makro Besin Hesaplama",
                    description: "Online makro besin hesaplama aracı. Fitness hedefinize göre günlük protein, karbonhidrat ve yağ ihtiyacınızı hesaplayın. Kas yapma ve yağ yakma programları.",
                    path: "/saglik-spor/makro-hesaplama",
                    applicationCategory: "HealthApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Sağlık & Spor", path: "/saglik-spor" },
                { name: "Makro Besin Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Makro Besin Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Fitness hedefinize göre protein, karbonhidrat ve yağ ihtiyacınızı hesaplayın.</p>
            </div>

            <MacroCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Makro Besinler Nedir ve Neden Önemlidir?</h2>
                <p>
                    <strong>Makro besinler</strong> (makrolar), vücudun enerji üretmek ve işlevlerini sürdürmek için büyük miktarlarda ihtiyaç
                    duyduğu temel besin öğeleridir. Üç ana makro besin grubu vardır: <strong>protein, karbonhidrat ve yağ</strong>.
                    Her birinin vücutta benzersiz rolleri vardır ve fitness hedeflerinize ulaşmak için doğru dengede tüketilmeleri gerekir.
                </p>
                <p>
                    Makro takibi (makro sayma), sadece kalori değil aynı zamanda bu kalorilerin nereden geldiğini de kontrol etmenizi sağlar.
                    Bu yaklaşım, kilo verme, kas yapma veya performans artırma hedeflerinde geleneksel diyet yöntemlerinden daha etkilidir.
                </p>

                <h2>Makro Besinlerin Görevleri ve Kalori Değerleri</h2>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Makro Besin</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Kalori/gram</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Temel Görevleri</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Protein</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">4 kcal</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Kas yapımı/onarımı, enzim üretimi, bağışıklık, tokluk</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Karbonhidrat</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">4 kcal</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Ana enerji kaynağı, beyin fonksiyonları, glikojen depoları</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Yağ</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">9 kcal</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Hormon üretimi, vitamin emilimi (A,D,E,K), hücre zarı</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>Hedefe Göre Önerilen Makro Dağılımları</h2>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Hedef</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Protein</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Karbonhidrat</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Yağ</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Protein/kg</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Kilo Koruma</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">%25</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">%45</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">%30</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">1.2-1.6 g/kg</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Yağ Yakma</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">%30-35</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">%35-40</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">%25-30</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">1.6-2.2 g/kg</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Kas Yapma (Bulk)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">%25-30</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">%45-55</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">%20-25</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">1.6-2.0 g/kg</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>Kaliteli Besin Kaynakları</h2>
                <ul>
                    <li><strong>Protein:</strong> Tavuk göğsü, hindi, yumurta, balık, süzme peynir, yoğurt, baklagiller, tofu</li>
                    <li><strong>Kompleks Karbonhidrat:</strong> Yulaf, esmer pirinç, tam buğday, tatlı patates, kinoa, bulgur</li>
                    <li><strong>Sağlıklı Yağ:</strong> Zeytinyağı, avokado, ceviz, badem, chia tohumu, somon, sardalya</li>
                </ul>

                <h2>Sıkça Sorulan Sorular (SSS)</h2>

                <h3>Günde kaç gram protein almalıyım?</h3>
                <p>
                    Genel kural: Sedanter bireyler için 0.8 g/kg, aktif bireyler için 1.2-1.6 g/kg, kas yapma hedefi olanlar için 1.6-2.2 g/kg.
                    70 kg aktif bir kişi için bu 84-112 gram protein demektir.
                </p>

                <h3>Karbonhidratları kesmeli miyim?</h3>
                <p>
                    Hayır. Karbonhidratlar beyin ve kaslar için birincil enerji kaynağıdır. Önemli olan rafine şekerler yerine kompleks
                    karbonhidratları tercih etmek ve miktarı hedefinize göre ayarlamaktır.
                </p>

                <h3>Antrenman öncesi ve sonrası ne yemeliyim?</h3>
                <p>
                    <strong>Öncesi (1-2 saat):</strong> Kolay sindirilen karbonhidrat + orta protein. <br />
                    <strong>Sonrası (30-60 dk):</strong> Hızlı emilen protein + karbonhidrat (kas onarımı ve glikojen yenileme için).
                </p>

                <h2>Makro Takibi İçin Pratik İpuçları</h2>
                <ul>
                    <li>Besin takip uygulaması kullanın (MyFitnessPal, Fatsecret gibi).</li>
                    <li>Haftalık meal prep yaparak öğünlerinizi önceden hazırlayın.</li>
                    <li>Porsiyonları mutfak terazisiyle ölçerek başlayın, zamanla göz alışır.</li>
                    <li>%80-90 uyum yeterlidir; mükemmeliyetçilik yerine tutarlılığı hedefleyin.</li>
                    <li>Her 4-6 haftada bir ağırlık ve beden ölçümlerinize göre makrolarınızı güncelleyin.</li>
                </ul>
            </article>
        </div>
    )
}
