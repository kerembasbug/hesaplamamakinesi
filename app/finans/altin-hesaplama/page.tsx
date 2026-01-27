import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { GoldCalculator } from "@/components/calculators/finance/gold-calculator"

export const metadata: Metadata = {
    title: "Altın Hesaplama - Gram Altın Çevirici 2025",
    description: "Online altın hesaplama aracı. Gram altın, çeyrek altın, yarım altın ve tam altın fiyatlarını TL'ye çevirin. Güncel altın fiyatları ile hesaplama.",
    keywords: ["altın hesaplama", "gram altın hesaplama", "altın fiyatı", "çeyrek altın fiyatı", "altın çevirici", "altın hesapla"],
    openGraph: {
        title: "Altın Hesaplama - Gram Altın Çevirici",
        description: "Altın fiyatlarını TL cinsinden hesaplayın.",
        type: "website",
    }
}

export default function AltinHesaplamaPage() {
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
                <span className="text-slate-900 dark:text-white font-medium">Altın Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Altın Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Gram altın, çeyrek, yarım ve tam altın değerlerini TL cinsinden hesaplayın.
                </p>
            </div>

            <GoldCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Altın Türleri ve Ağırlıkları</h2>
                <p>
                    Türkiye&apos;de yatırım amaçlı farklı altın türleri bulunmaktadır. Her birinin gram ağırlığı
                    ve işçilik değeri farklıdır:
                </p>

                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Altın Türü</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Ağırlık (gr)</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Ayar</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Özellik</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Gram Altın</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">1 gram</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">24 ayar (995)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Saf altın, düşük işçilik</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Çeyrek Altın</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">1.75 gram</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">22 ayar (916)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Yüksek işçilik maliyeti</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Yarım Altın</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">3.5 gram</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">22 ayar (916)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Orta işçilik maliyeti</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Tam Altın</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">7 gram</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">22 ayar (916)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Düşük işçilik oranı</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Cumhuriyet Altını</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">7.2 gram</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">22 ayar (916)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Koleksiyon değeri var</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Ata Altın</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">7.2 gram</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">22 ayar (916)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Atatürk portresi taşır</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>Gram Altın vs Ziynet Altın</h3>
                <p>
                    <strong>Gram altın</strong> yatırım için idealdir çünkü saf altın içerir ve işçilik maliyeti düşüktür.
                    <strong>Ziynet altınlar</strong> (çeyrek, yarım, tam) ise hediye amaçlı tercih edilir ve işçilik
                    maliyeti nedeniyle gram bazında daha pahalıdır.
                </p>

                <h3>Altın Yatırımı İpuçları</h3>
                <ul>
                    <li><strong>Uzun vadeli düşünün:</strong> Altın kısa vadeli dalgalanmalara açıktır.</li>
                    <li><strong>Güvenilir yerden alın:</strong> Darphane sertifikalı ürünleri tercih edin.</li>
                    <li><strong>Alış-satış farkına dikkat:</strong> Kuyumcu spreadleri yüksek olabilir.</li>
                    <li><strong>Gram altın tercih edin:</strong> Yatırım için işçilik maliyeti düşüktür.</li>
                    <li><strong>Dijital altın:</strong> Banka altın hesapları fiziki saklama derdi olmadan yatırım imkanı sunar.</li>
                </ul>

                <h3>Sıkça Sorulan Sorular (SSS)</h3>

                <h4>Altın alırken vergi ödenir mi?</h4>
                <p>
                    Altın alım satımında KDV yoktur. Ancak kuyumcularda alış ve satış fiyatı arasındaki fark
                    (spread) önemli bir maliyet unsuru olabilir.
                </p>

                <h4>En karlı altın yatırımı hangisi?</h4>
                <p>
                    Yatırım amaçlı gram altın veya banka altın hesabı daha avantajlıdır. Ziynet altınlarda
                    işçilik maliyeti satışta geri alınamaz.
                </p>

                <h4>Altın fiyatları neye göre değişir?</h4>
                <p>
                    Uluslararası ons altın fiyatı (USD cinsinden), dolar/TL kuru, yurtiçi arz-talep dengesi
                    ve jeopolitik gelişmeler altın fiyatlarını etkileyen başlıca faktörlerdir.
                </p>

                <h3>Altın Saklama Yöntemleri</h3>
                <ul>
                    <li><strong>Evde kasada:</strong> Sigorta yaptırmanız önerilir.</li>
                    <li><strong>Banka kasası:</strong> Güvenli ama kira maliyeti var.</li>
                    <li><strong>Altın hesabı:</strong> Fiziki altın olmadan yatırım, düşük maliyet.</li>
                    <li><strong>Altın fonu:</strong> Borsa üzerinden altına yatırım imkanı.</li>
                </ul>
            </article>
        </div>
    )
}
