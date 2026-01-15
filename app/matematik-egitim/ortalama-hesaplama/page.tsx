import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { AverageCalculator } from "@/components/calculators/math/average-calculator"

export const metadata: Metadata = {
    title: "Ortalama Hesaplama - Aritmetik Ortalama, Medyan, Mod Hesaplayıcı",
    description: "Online ortalama hesaplama aracı. Aritmetik ortalama, medyan (ortanca) ve mod (tepe değer) hesaplayın. İstatistik hesaplamalar için pratik araç.",
    keywords: ["ortalama hesaplama", "aritmetik ortalama", "medyan hesaplama", "mod hesaplama", "ortalama nedir", "ortanca değer"]
}

export default function OrtalamaHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/matematik-egitim" className="hover:text-indigo-600 transition-colors">Matematik &amp; Eğitim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Ortalama Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Ortalama Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Aritmetik ortalama, medyan ve mod değerlerini hesaplayın.</p>
            </div>

            <AverageCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Ortalama Türleri Nelerdir?</h2>
                <p>
                    İstatistikte &quot;ortalama&quot; dendiğinde genellikle aritmetik ortalama kastedilir,
                    ancak veri setlerini özetlemek için farklı ortalama türleri kullanılır.
                </p>

                <h2>Aritmetik Ortalama</h2>
                <p><strong>Formül:</strong> Toplam / Eleman Sayısı</p>
                <p>
                    Tüm değerlerin toplanıp eleman sayısına bölünmesiyle bulunur.
                    Örneğin: 2, 4, 6, 8 sayılarının ortalaması = (2+4+6+8)/4 = 5
                </p>

                <h2>Medyan (Ortanca)</h2>
                <p>
                    Değerler küçükten büyüğe sıralandığında tam ortadaki değerdir.
                    Eleman sayısı çiftse, ortadaki iki değerin ortalaması alınır.
                </p>
                <p>Örnek: 1, 3, 5, 7, 9 → Medyan = 5</p>
                <p>Örnek: 1, 3, 5, 7 → Medyan = (3+5)/2 = 4</p>

                <h2>Mod (Tepe Değer)</h2>
                <p>
                    Veri setinde en çok tekrar eden değerdir.
                    Birden fazla mod olabilir veya hiç mod olmayabilir.
                </p>
                <p>Örnek: 1, 2, 2, 3, 4 → Mod = 2</p>
                <p>Örnek: 1, 2, 3, 4, 5 → Mod yok (tüm değerler eşit sıklıkta)</p>

                <h2>Hangi Ortalama Ne Zaman Kullanılır?</h2>
                <table>
                    <thead><tr><th>Ortalama Türü</th><th>Kullanım Alanı</th></tr></thead>
                    <tbody>
                        <tr><td>Aritmetik Ortalama</td><td>Sınav notları, maaş ortalaması, genel istatistikler</td></tr>
                        <tr><td>Medyan</td><td>Gelir dağılımı, ev fiyatları (aşırı değerlerden etkilenmez)</td></tr>
                        <tr><td>Mod</td><td>En popüler ürün, en çok satılan beden</td></tr>
                    </tbody>
                </table>

                <h2>Örnek: Sınıf Not Analizi</h2>
                <p>Bir sınıfın sınav notları: 40, 55, 60, 70, 70, 75, 80, 85, 90</p>
                <ul>
                    <li><strong>Aritmetik Ortalama:</strong> (40+55+60+70+70+75+80+85+90)/9 = 69.44</li>
                    <li><strong>Medyan:</strong> 70 (ortadaki değer)</li>
                    <li><strong>Mod:</strong> 70 (en çok tekrar eden)</li>
                </ul>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Aritmetik ortalama neden yanıltıcı olabilir?</h3>
                <p>Aşırı yüksek veya düşük değerler (outlier) aritmetik ortalamayı önemli ölçüde etkiler. Örneğin, bir şirkette 9 çalışan 5.000 TL, 1 yönetici 100.000 TL alıyorsa, ortalama maaş 14.500 TL olur, ancak bu gerçeği yansıtmaz. Bu durumda medyan (5.000 TL) daha anlamlıdır.</p>

                <h3>Ağırlıklı ortalama nasıl hesaplanır?</h3>
                <p>Her değerin önem derecesi (ağırlık) farklıysa kullanılır. Formül: Σ(Değer × Ağırlık) / Σ(Ağırlık). Örneğin, vize %40, final %60 ağırlıklı bir derste: Ağırlıklı Ortalama = (Vize × 0.40) + (Final × 0.60)</p>

                <h3>Geometrik ve harmonik ortalama nedir?</h3>
                <p>
                    <strong>Geometrik ortalama:</strong> Büyüme oranları için kullanılır (yıllar arası getiri vb.).
                    <strong>Harmonik ortalama:</strong> Hız hesaplamalarında kullanılır (gidiş-dönüş hızları vb.).
                </p>
            </article>
        </div>
    )
}
