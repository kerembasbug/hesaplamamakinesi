import { BodyMeasurementCalculator } from "@/components/calculators/health/body-measurement-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"

export const metadata = buildMetadata({
    title: "Bel Kalça Oranı Hesaplama - WHR",
    description: "Bel kalça oranı (WHR) hesaplama aracı. Bel ve kalça çevrenizi girerek sağlık riski sınıfınızı ve kardiyovasküler risk değerlendirmenizi görün.",
    keywords: ["bel kalça oranı", "vücut ölçümü hesaplama", "bel çevresi", "kalça ölçümü", "obezite riski"],
    path: "/saglik-spor/vucut-olcumu-hesaplama",
})

export default function VucutOlcumuPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Bel Kalça Oranı Hesaplama",
                    description: "Online bel kalça oranı hesaplama aracı. Bel ve kalça çevrenizi ölçerek sağlık riskinizi değerlendirin. Kardiyovasküler hastalık riski analizi.",
                    path: "/saglik-spor/vucut-olcumu-hesaplama",
                    applicationCategory: "HealthApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Sağlık & Spor", path: "/saglik-spor" },
                { name: "Vücut Ölçümü" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Bel-Kalça Oranı Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Bel ve kalça ölçülerinizle kardiyovasküler sağlık riskinizi değerlendirin.</p>
            </div>

            <BodyMeasurementCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Bel-Kalça Oranı (BKO) Nedir ve Neden Önemlidir?</h2>
                <p>
                    <strong>Bel-Kalça Oranı (BKO)</strong>, vücuttaki yağ dağılımını değerlendiren önemli bir sağlık göstergesidir. Bu oran,
                    basitçe bel çevrenizin kalça çevrenize bölünmesiyle hesaplanır. Dünya Sağlık Örgütü (WHO) ve Amerikan Kalp Derneği,
                    BKO&apos;yu kardiyovasküler hastalık riskini öngörmede VKİ&apos;den daha güvenilir bir ölçüt olarak kabul etmektedir.
                </p>
                <p>
                    Bilimsel araştırmalar, karın bölgesinde biriken yağın (elma tipi obezite) kalp hastalıkları, tip 2 diyabet, hipertansiyon
                    ve inme riskini önemli ölçüde artırdığını göstermektedir. Kalça ve uylukta biriken yağ (armut tipi) ise metabolik açıdan
                    daha az zararlıdır.
                </p>

                <h2>Sağlıklı Bel-Kalça Oranı Değerleri</h2>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Cinsiyet</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Düşük Risk</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Orta Risk</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Yüksek Risk</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Erkek</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">&lt; 0.90</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">0.90 - 1.00</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">&gt; 1.00</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Kadın</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">&lt; 0.80</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">0.80 - 0.85</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">&gt; 0.85</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>Bel Çevresi Tek Başına Ne Anlama Gelir?</h2>
                <p>
                    Dünya Sağlık Örgütü&apos;ne göre tek başına bel çevresi de kritik bir sağlık göstergesidir:
                </p>
                <ul>
                    <li><strong>Erkeklerde:</strong> 94 cm üzeri artmış risk, 102 cm üzeri yüksek risk</li>
                    <li><strong>Kadınlarda:</strong> 80 cm üzeri artmış risk, 88 cm üzeri yüksek risk</li>
                </ul>

                <h2>Doğru Ölçüm Nasıl Yapılır?</h2>
                <ul>
                    <li><strong>Bel ölçümü:</strong> Kaburgaların alt kenarı ile kalça kemiğinin üst noktası arasındaki en dar bölgeden, nefes verdikten sonra ölçün.</li>
                    <li><strong>Kalça ölçümü:</strong> Kalçanın en geniş bölgesinden, ayaklar bitişik durumda ölçün.</li>
                    <li>Ölçümü sabah, aç karna ve dar giysiler olmadan yapın.</li>
                    <li>Şeridi sıkı veya gevşek değil, cilde paralel tutun.</li>
                </ul>

                <h2>Sıkça Sorulan Sorular (SSS)</h2>

                <h3>BKO mu VKİ mi daha güvenilir?</h3>
                <p>
                    Her iki ölçüm de farklı bilgiler verir. VKİ genel vücut kütlesini, BKO ise yağın nerede toplandığını gösterir.
                    Karın yağlanması metabolik hastalıklar için daha kritik olduğundan, BKO kardiyovasküler risk için daha güvenilirdir.
                </p>

                <h3>Göbek yağını nasıl eritebilirim?</h3>
                <p>
                    Lokal yağ yakımı mümkün değildir; genel vücut yağı azaldıkça karın yağı da azalır. Kalori açığı, kardiyovasküler egzersiz
                    ve direnç antrenmanı kombinasyonu en etkili yöntemdir.
                </p>

                <h3>Hamileyken bu ölçümler geçerli mi?</h3>
                <p>
                    Hayır, gebelik döneminde karın çevresi doğal olarak arttığı için bu ölçümler anlamsızdır. Gebelik sonrası ölçüme başlanabilir.
                </p>

                <h2>Karın Yağını Azaltmak İçin 5 Etkili Strateji</h2>
                <ul>
                    <li><strong>Rafine karbonhidratları azaltın:</strong> Beyaz ekmek, şeker ve işlenmiş gıdalar yerine tam tahıl tercih edin.</li>
                    <li><strong>Protein alımını artırın:</strong> Protein tokluk sağlar ve kas kütlesini korur.</li>
                    <li><strong>Düzenli egzersiz:</strong> Haftada en az 150 dakika orta yoğunlukta aktivite hedefleyin.</li>
                    <li><strong>Uyku kalitenizi artırın:</strong> Yetersiz uyku kortizol seviyesini yükselterek karın yağlanmasını artırır.</li>
                    <li><strong>Stresi yönetin:</strong> Kronik stres hormonal dengeyi bozarak karın bölgesinde yağ birikimine neden olur.</li>
                </ul>
            </article>
        </div>
    )
}
