import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { RatioCalculator } from "@/components/calculators/math/ratio-calculator"

export const metadata: Metadata = {
    title: "Oran Orantı Hesaplama - Online Orantı Hesaplayıcı",
    description: "Online oran orantı hesaplama aracı. A/B = C/D orantı problemlerini kolayca çözün. Matematiksel orantı formülleri ve örnekler.",
    keywords: ["oran orantı hesaplama", "orantı hesaplama", "oran hesaplama", "orantı çözücü", "matematik oran"]
}

export default function OranOrantiHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/matematik-egitim" className="hover:text-indigo-600 transition-colors">Matematik &amp; Eğitim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Oran Orantı Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Oran Orantı Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">A/B = C/D orantı problemlerini çözün ve bilinmeyen değeri bulun.</p>
            </div>

            <RatioCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Oran ve Orantı Nedir?</h2>
                <p>
                    <strong>Oran</strong>, iki sayının bölümüdür ve aralarındaki ilişkiyi gösterir.
                    Örneğin, 3:2 veya 3/2 şeklinde yazılır.
                </p>
                <p>
                    <strong>Orantı</strong>, iki oranın eşitliğidir. A/B = C/D şeklinde ifade edilir.
                    Bu eşitlikte A×D = B×C bağıntısı her zaman geçerlidir (çapraz çarpım).
                </p>

                <h2>Orantı Türleri</h2>

                <h3>Doğru Orantı</h3>
                <p>
                    Bir büyüklük artarken diğeri de aynı oranda artıyorsa, doğru orantılıdır.
                    Örnek: Daha çok çalışırsanız, daha çok para kazanırsınız.
                </p>

                <h3>Ters Orantı</h3>
                <p>
                    Bir büyüklük artarken diğeri aynı oranda azalıyorsa, ters orantılıdır.
                    Örnek: Daha hızlı giderseniz, yolculuk süresi azalır.
                </p>

                <h2>Orantı Hesaplama Yöntemi</h2>
                <p>A/B = C/D orantısında bilinmeyen değeri bulmak için çapraz çarpım kullanılır:</p>
                <ul>
                    <li><strong>A bilinmiyorsa:</strong> A = (B × C) / D</li>
                    <li><strong>B bilinmiyorsa:</strong> B = (A × D) / C</li>
                    <li><strong>C bilinmiyorsa:</strong> C = (A × D) / B</li>
                    <li><strong>D bilinmiyorsa:</strong> D = (B × C) / A</li>
                </ul>

                <h2>Örnek Problemler</h2>

                <h3>Örnek 1: Tarif Oranı</h3>
                <p>
                    Bir tarif 4 kişilik ve 200 gram un gerektiriyor. 6 kişi için kaç gram un gerekir?
                </p>
                <p>4/200 = 6/x → x = (200 × 6) / 4 = 300 gram</p>

                <h3>Örnek 2: Harita Ölçeği</h3>
                <p>
                    Bir haritada ölçek 1:50.000&apos;dir. Haritada 3 cm olan mesafe gerçekte kaç km&apos;dir?
                </p>
                <p>1/50.000 = 3/x → x = 3 × 50.000 = 150.000 cm = 1.5 km</p>

                <h3>Örnek 3: Yüzde Hesaplama</h3>
                <p>
                    500 liranın %15&apos;i kaç liradır?
                </p>
                <p>100/500 = 15/x → x = (500 × 15) / 100 = 75 lira</p>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Oran ile kesir aynı şey midir?</h3>
                <p>Matematiksel olarak oran bir kesir gibi yazılabilir, ancak kavramsal olarak farklıdır. Oran iki büyüklük arasındaki ilişkiyi, kesir ise bir bütünün parçasını ifade eder.</p>

                <h3>Orantı problemlerini nasıl kurarım?</h3>
                <p>Aynı türden büyüklükleri alt alta yazın. Örneğin, fiyat-miktar orantısında fiyatlar bir sütunda, miktarlar diğer sütunda olmalıdır.</p>

                <h3>Çapraz çarpım neden işe yarar?</h3>
                <p>A/B = C/D eşitliğinde her iki tarafı BD ile çarparsanız A×D = B×C elde edersiniz. Bu matematiksel özdeşlik, bilinmeyen değeri bulmak için kullanılır.</p>
            </article>
        </div>
    )
}
