import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { SeveranceCalculator } from "@/components/calculators/finance/severance-calculator"

export const metadata: Metadata = {
    title: "Tazminat Hesaplama - Kıdem ve İhbar Tazminatı 2025",
    description: "Online kıdem tazminatı ve ihbar tazminatı hesaplama aracı. Brüt maaş ve çalışma süresine göre alacağınız tazminat tutarını hesaplayın. 2025 güncel kıdem tavanı.",
    keywords: ["tazminat hesaplama", "kıdem tazminatı hesaplama", "ihbar tazminatı hesaplama", "işten ayrılma tazminatı", "kıdem tazminatı 2025", "işçi hakları"],
    openGraph: {
        title: "Tazminat Hesaplama - Kıdem ve İhbar Tazminatı",
        description: "Kıdem ve ihbar tazminatı tutarlarınızı hesaplayın.",
        type: "website",
    }
}

export default function TazminatHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                    <Home className="h-4 w-4" />
                    Ana Sayfa
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/finans" className="hover:text-indigo-600 transition-colors">
                    Finans
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Tazminat Hesaplama</span>
            </nav>

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

                <h3>Kıdem Tazminatı Şartları</h3>
                <ul>
                    <li>En az 1 yıl aynı işyerinde çalışmış olmak</li>
                    <li>İşveren tarafından haksız yere işten çıkarılmak</li>
                    <li>Emeklilik, askerlik veya evlilik nedeniyle istifa</li>
                    <li>Sağlık nedeniyle işi bırakmak zorunda kalmak</li>
                    <li>İş sözleşmesinin işveren tarafından feshi (haklı fesih hariç)</li>
                </ul>

                <h3>2025 Kıdem Tazminatı Tavanı</h3>
                <p>
                    Kıdem tazminatı tavanı, devlet memurlarına ödenen en yüksek emekli ikramiyesine göre belirlenir.
                    2025 yılı için tavan tutarı yaklaşık <strong>35.058,58 TL</strong>&apos;dir. Brüt maaşınız bu tutarın
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

                <h3>Sıkça Sorulan Sorular (SSS)</h3>

                <h4>Kıdem tazminatından vergi kesilir mi?</h4>
                <p>
                    Kıdem tazminatından gelir vergisi ve damga vergisi kesilmez. Ancak ihbar tazminatından
                    gelir vergisi ve damga vergisi kesintisi yapılır.
                </p>

                <h4>İstifa edersem tazminat alabilir miyim?</h4>
                <p>
                    Normal istifa durumunda kıdem tazminatı alamazsınız. Ancak evlilik nedeniyle istifa
                    (kadın çalışanlar için evlenmeden itibaren 1 yıl içinde), askerlik, emeklilik veya
                    haklı nedenle fesih durumlarında kıdem tazminatı alabilirsiniz.
                </p>

                <h4>Tazminat ne zaman ödenir?</h4>
                <p>
                    Kıdem tazminatı, iş akdinin feshi tarihinde derhal ödenmesi gereken bir alacaktır.
                    Gecikmesi halinde mevduata uygulanan en yüksek faiz uygulanır.
                </p>

                <h3>Dikkat Edilmesi Gerekenler</h3>
                <ul>
                    <li>Kıdem tazminatı hesaplamasına ikramiye, prim ve sürekli ödenen ek kazançlar dahildir.</li>
                    <li>İşveren kıdem tazminatını taksitle ödeyemez, peşin ödemesi gerekir.</li>
                    <li>Kıdem tazminatı hakkı 5 yıllık zamanaşımına tabidir.</li>
                    <li>İşe iade davasını kazanan işçi, boşta geçen süre için de tazminat talep edebilir.</li>
                </ul>
            </article>
        </div>
    )
}
