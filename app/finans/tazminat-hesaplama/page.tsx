import { SeveranceCalculator } from "@/components/calculators/finance/severance-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import { GuncellemeNotu } from "@/components/content/vergi-tablolari"

export const metadata = buildMetadata({
    title: "Tazminat Hesaplama - Kıdem ve İhbar",
    description: "Kıdem ve ihbar tazminatı hesaplama aracı. Brüt maaş ve çalışma sürenize göre alacağınız tazminatı 2026 kıdem tavanıyla güncel olarak hesaplayın.",
    keywords: ["tazminat hesaplama", "kıdem tazminatı hesaplama", "ihbar tazminatı hesaplama", "işten ayrılma tazminatı", "kıdem tazminatı 2025", "işçi hakları"],
    path: "/finans/tazminat-hesaplama",
})

export default function TazminatHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Tazminat Hesaplama",
                    description: "Kıdem ve ihbar tazminatı hesaplama aracı. Brüt maaş ve çalışma sürenize göre alacağınız tazminatı 2026 kıdem tavanıyla hesaplayın.",
                    path: "/finans/tazminat-hesaplama",
                    applicationCategory: "FinanceApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Finans", path: "/finans" },
                { name: "Tazminat Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Kıdem ve İhbar Tazminatı Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    İşten ayrılırken alacağınız kıdem ve ihbar tazminatı tutarlarını hesaplayın.
                </p>
            </div>

            <SeveranceCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Kıdem Tazminatı Nedir?</h2>
                <p>
                    <strong>Kıdem tazminatı</strong>, en az 1 yıl çalışmış işçilere işten ayrılırken ödenen tazminattır.
                    Her tam çalışma yılı için bir aylık brüt maaş tutarında hesaplanır. Ancak tazminat tutarı,
                    devlet tarafından belirlenen tavan sınırını aşamaz.
                </p>

                <h2>Kıdem Tazminatı Şartları</h2>
                <ul>
                    <li>En az 1 yıl aynı işyerinde çalışmış olmak</li>
                    <li>İşveren tarafından haksız yere işten çıkarılmak</li>
                    <li>Emeklilik, askerlik veya evlilik nedeniyle istifa</li>
                    <li>Sağlık nedeniyle işi bırakmak zorunda kalmak</li>
                    <li>İş sözleşmesinin işveren tarafından feshi (haklı fesih hariç)</li>
                </ul>

                <h2>2025 Kıdem Tazminatı Tavanı</h2>
                <p>
                    Kıdem tazminatı tavanı, devlet memurlarına ödenen en yüksek emekli ikramiyesine göre belirlenir.
                    2026 yılının ikinci yarısı (1 Temmuz – 31 Aralık) için tavan tutarı <strong>73.729,87 TL</strong>, ilk yarısı için <strong>64.948,77 TL</strong>&apos;dir. Brüt maaşınız bu tutarın
                    üzerindeyse, hesaplama tavan üzerinden yapılır.
                </p>

                <h2>İhbar Tazminatı Nedir?</h2>
                <p>
                    <strong>İhbar tazminatı</strong>, iş sözleşmesi feshedilirken önceden haber verme süresine
                    uyulmaması durumunda ödenen tazminattır. Çalışma süresine göre ihbar süresi değişir:
                </p>

                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Çalışma Süresi</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">İhbar Süresi</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Gün</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">0-6 ay</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">2 hafta</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">14 gün</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">6-18 ay</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">4 hafta</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">28 gün</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">18-36 ay</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">6 hafta</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">42 gün</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">36+ ay</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">8 hafta</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">56 gün</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>Sıkça Sorulan Sorular (SSS)</h2>

                <h3>Kıdem tazminatından vergi kesilir mi?</h3>
                <p>
                    Kıdem tazminatından gelir vergisi ve damga vergisi kesilmez. Ancak ihbar tazminatından
                    gelir vergisi ve damga vergisi kesintisi yapılır.
                </p>

                <h3>İstifa edersem tazminat alabilir miyim?</h3>
                <p>
                    Normal istifa durumunda kıdem tazminatı alamazsınız. Ancak evlilik nedeniyle istifa
                    (kadın çalışanlar için evlenmeden itibaren 1 yıl içinde), askerlik, emeklilik veya
                    haklı nedenle fesih durumlarında kıdem tazminatı alabilirsiniz.
                </p>

                <h3>Tazminat ne zaman ödenir?</h3>
                <p>
                    Kıdem tazminatı, iş akdinin feshi tarihinde derhal ödenmesi gereken bir alacaktır.
                    Gecikmesi halinde mevduata uygulanan en yüksek faiz uygulanır.
                </p>

                <h2>Dikkat Edilmesi Gerekenler</h2>
                <ul>
                    <li>Kıdem tazminatı hesaplamasına ikramiye, prim ve sürekli ödenen ek kazançlar dahildir.</li>
                    <li>İşveren kıdem tazminatını taksitle ödeyemez, peşin ödemesi gerekir.</li>
                    <li>Kıdem tazminatı hakkı 5 yıllık zamanaşımına tabidir.</li>
                    <li>İşe iade davasını kazanan işçi, boşta geçen süre için de tazminat talep edebilir.</li>
                </ul>
                <GuncellemeNotu kaynakAdi="Çalışma ve Sosyal Güvenlik Bakanlığı" kaynakUrl="https://www.csgb.gov.tr/" />
            </article>
        </div>
    )
}
