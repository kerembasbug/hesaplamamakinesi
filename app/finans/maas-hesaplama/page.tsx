import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { SalaryCalculator } from "@/components/calculators/finance/salary-calculator"

export const metadata: Metadata = {
    title: "Maaş Hesaplama - Net Brüt Maaş Hesaplayıcı 2025",
    description: "Online maaş hesaplama aracı. Brüt maaştan net maaş veya net maaştan brüt maaş hesaplayın. SGK, gelir vergisi, damga vergisi kesintileri dahil.",
    keywords: ["maaş hesaplama", "brüt maaş hesaplama", "net maaş hesaplama", "maaş hesaplayıcı", "brüt net çevirici", "maaş kesintileri"],
    openGraph: {
        title: "Maaş Hesaplama - Net Brüt Maaş Hesaplayıcı",
        description: "Brüt ve net maaş arasında dönüşüm yapın.",
        type: "website",
    }
}

export default function MaasHesaplamaPage() {
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
                <span className="text-slate-900 dark:text-white font-medium">Maaş Hesaplama</span>
            </nav>

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

                <h3>Maaştan Yapılan Kesintiler</h3>
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
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Binde 7.59</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>2025 Gelir Vergisi Dilimleri</h3>
                <ul>
                    <li>0 - 110.000 TL: %15</li>
                    <li>110.000 - 230.000 TL: %20</li>
                    <li>230.000 - 580.000 TL: %27</li>
                    <li>580.000 - 3.000.000 TL: %35</li>
                    <li>3.000.000 TL üzeri: %40</li>
                </ul>

                <h3>Asgari Ücret İstisnası</h3>
                <p>
                    2025 yılı itibarıyla, asgari ücrete kadar olan maaş kısmı gelir vergisinden muaftır.
                    Bu istisna, düşük gelirli çalışanların vergi yükünü azaltmak için uygulanmaktadır.
                    Hesaplayıcımız bu istisnayı otomatik olarak dikkate alır.
                </p>

                <h3>Sıkça Sorulan Sorular (SSS)</h3>

                <h4>İşveren maliyeti nasıl hesaplanır?</h4>
                <p>
                    İşveren maliyeti = Brüt Maaş + SGK İşveren Payı (%20.5) + İşsizlik İşveren Payı (%2).
                    Yaklaşık olarak brüt maaşın %22.5&apos;u kadar ekstra maliyet oluşturur.
                </p>

                <h4>Gelir vergisi neden aydan aya değişir?</h4>
                <p>
                    Gelir vergisi kümülatif olarak hesaplanır. Yılın başında düşük dilimden başlarken,
                    gelir arttıkça üst dilimlere geçilir. Bu nedenle yılın sonlarına doğru kesinti artar.
                </p>

                <h4>Asgari ücret 2025 ne kadar?</h4>
                <p>
                    2025 yılı brüt asgari ücret 22.104 TL&apos;dir. SGK ve vergi kesintileri sonrasında
                    net asgari ücret yaklaşık 17.000-18.000 TL civarındadır.
                </p>

                <h3>Maaş Bordrosu Okuma Rehberi</h3>
                <ul>
                    <li><strong>Brüt Ücret:</strong> Tüm kesintilerden önceki tutar</li>
                    <li><strong>SGK Matrahı:</strong> SGK kesintisinin hesaplandığı tutar (tavan sınırlı)</li>
                    <li><strong>Kümülatif Vergi Matrahı:</strong> Yıl başından bu aya kadar toplam vergi matrahı</li>
                    <li><strong>Net Ücret:</strong> Tüm kesintilerden sonra ele geçen tutar</li>
                </ul>
            </article>
        </div>
    )
}
