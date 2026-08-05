import { SalaryCalculator } from "@/components/calculators/finance/salary-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import { AsgariUcretTablosu, GuncellemeNotu, SgkParametreleri, UcretVergiDilimleri } from "@/components/content/vergi-tablolari"

export const metadata = buildMetadata({
    title: "Maaş Hesaplama - Net Brüt Maaş 2026",
    description: "2026 maaş hesaplama aracı. Brütten nete veya netten brüte hesaplayın; SGK, işsizlik, gelir vergisi ve damga vergisi kesintileri güncel oranlarla.",
    keywords: ["maaş hesaplama", "brüt maaş hesaplama", "net maaş hesaplama", "maaş hesaplayıcı", "brüt net çevirici", "maaş kesintileri"],
    path: "/finans/maas-hesaplama",
})

export default function MaasHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Maaş Hesaplama",
                    description: "Online maaş hesaplama aracı. Brüt maaştan net maaş veya net maaştan brüt maaş hesaplayın. SGK, gelir vergisi, damga vergisi kesintileri dahil.",
                    path: "/finans/maas-hesaplama",
                    applicationCategory: "FinanceApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Finans", path: "/finans" },
                { name: "Maaş Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Maaş Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Brüt maaştan net maaşa veya net maaştan brüt maaşa dönüşüm yapın.
                </p>
            </div>

            <SalaryCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Brüt ve Net Maaş Nedir?</h2>
                <p>
                    <strong>Brüt maaş</strong>, işverenin sizin için ödediği toplam tutardır. <strong>Net maaş</strong> ise
                    tüm kesintilerden sonra elinize geçen tutardır. Türkiye&apos;de brüt maaştan SGK primi, işsizlik sigortası,
                    gelir vergisi ve damga vergisi kesilir.
                </p>

                <h2>Maaştan Yapılan Kesintiler</h2>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Kesinti Türü</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">İşçi Payı</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">İşveren Payı</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">SGK Primi</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">%14</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">%15.5 + %5 teşvik</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">İşsizlik Sigortası</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">%1</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">%2</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Gelir Vergisi</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">%15-%40 (dilime göre)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">-</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Damga Vergisi</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Binde 7,59</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>2026 Gelir Vergisi Dilimleri</h2>
                <UcretVergiDilimleri />

                <h2>2026 Asgari Ücret ve SGK Parametreleri</h2>
                <AsgariUcretTablosu />
                <SgkParametreleri />

                <h2>Asgari Ücret İstisnası</h2>
                <p>
                    Ücretin asgari ücrete denk gelen kısmı gelir vergisinden ve damga vergisinden istisnadır.
                    Bu istisna sadece asgari ücretlilere değil, <strong>tüm çalışanlara</strong> uygulanır:
                    brüt maaşınız ne olursa olsun her ay asgari ücretlinin ödeyeceği kadar vergi düşülür.
                    Hesaplayıcımız bu indirimi otomatik uygular ve tutarını ayrı satırda gösterir.
                </p>

                <h2>Sıkça Sorulan Sorular (SSS)</h2>

                <h3>İşveren maliyeti nasıl hesaplanır?</h3>
                <p>
                    İşveren maliyeti = Brüt Maaş + SGK İşveren Payı (%20.5) + İşsizlik İşveren Payı (%2).
                    Yaklaşık olarak brüt maaşın %22.5&apos;u kadar ekstra maliyet oluşturur.
                </p>

                <h3>Gelir vergisi neden aydan aya değişir?</h3>
                <p>
                    Gelir vergisi kümülatif olarak hesaplanır. Yılın başında düşük dilimden başlarken,
                    gelir arttıkça üst dilimlere geçilir. Bu nedenle yılın sonlarına doğru kesinti artar.
                </p>

                <h3>Asgari ücret 2026 ne kadar?</h3>
                <p>
                    2026 yılı brüt asgari ücret <strong>33.030,00 TL</strong>, net asgari ücret ise
                    <strong> 28.075,50 TL</strong>&apos;dir. Günlük brüt 1.101,00 TL, saatlik brüt 146,80 TL olarak
                    uygulanır. Bu tutarlar 1 Ocak 2026&apos;dan itibaren geçerlidir.
                </p>

                <h2>Maaş Bordrosu Okuma Rehberi</h2>
                <ul>
                    <li><strong>Brüt Ücret:</strong> Tüm kesintilerden önceki tutar</li>
                    <li><strong>SGK Matrahı:</strong> SGK kesintisinin hesaplandığı tutar (tavan sınırlı)</li>
                    <li><strong>Kümülatif Vergi Matrahı:</strong> Yıl başından bu aya kadar toplam vergi matrahı</li>
                    <li><strong>Net Ücret:</strong> Tüm kesintilerden sonra ele geçen tutar</li>
                </ul>
                <GuncellemeNotu kaynakAdi="Çalışma ve Sosyal Güvenlik Bakanlığı" kaynakUrl="https://www.csgb.gov.tr/" />
            </article>
        </div>
    )
}
