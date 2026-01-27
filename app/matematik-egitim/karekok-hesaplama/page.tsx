import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { SquareRootCalculator } from "@/components/calculators/math/square-root-calculator"

export const metadata: Metadata = {
    title: "Karekök Hesaplama - Online Kök Hesaplayıcı",
    description: "Online karekök hesaplama aracı. Sayıların karekökünü ve n'inci kökünü hesaplayın. Küpkök, 4. kök ve daha fazlası.",
    keywords: ["karekök hesaplama", "karekök hesapla", "kök hesaplama", "küpkök hesaplama", "radikal hesaplama"]
}

export default function KarekokhesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/matematik-egitim" className="hover:text-indigo-600 transition-colors">Matematik & Eğitim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Karekök Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Karekök Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Sayıların karekökünü ve n&apos;inci kökünü hesaplayın.</p>
            </div>

            <SquareRootCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Karekök Nedir ve Nasıl Hesaplanır?</h2>
                <p>
                    <strong>Karekök</strong>, bir sayının kendisiyle çarpıldığında o sayıyı veren değerdir. Matematiksel olarak, √a = b demek,
                    b × b = a anlamına gelir. Örneğin √16 = 4&apos;tür çünkü 4 × 4 = 16. Karekök sembolü (√) &quot;radikal&quot; olarak adlandırılır ve
                    16. yüzyıldan bu yana kullanılmaktadır.
                </p>
                <p>
                    Karekök işlemi, üs alma işleminin tersidir. a² = b ise √b = a&apos;dır. Bu ilişki cebir, geometri, fizik ve
                    mühendislikte sayısız uygulamaya sahiptir.
                </p>

                <h3>Kök Türleri ve Formülleri</h3>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Kök Türü</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Sembol</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Örnek</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Açıklama</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Karekök (2. kök)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">√x veya x^(1/2)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">√25 = 5</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">5 × 5 = 25</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Küpkök (3. kök)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">∛x veya x^(1/3)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">∛27 = 3</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">3 × 3 × 3 = 27</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">4. kök</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">∜x veya x^(1/4)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">∜81 = 3</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">3 × 3 × 3 × 3 = 81</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">n. kök</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">ⁿ√x veya x^(1/n)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">⁵√32 = 2</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">2⁵ = 32</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>Karekök Özellikleri</h3>
                <ul>
                    <li><strong>√(a × b) = √a × √b:</strong> Çarpımın karekökü = kareköklerinin çarpımı</li>
                    <li><strong>√(a / b) = √a / √b:</strong> Bölümün karekökü = kareköklerinin bölümü</li>
                    <li><strong>√a² = |a|:</strong> Sonuç her zaman pozitiftir (mutlak değer)</li>
                    <li><strong>(√a)² = a:</strong> Karekök ve kare birbirini götürür</li>
                    <li><strong>√0 = 0:</strong> Sıfırın karekökü sıfırdır</li>
                </ul>

                <h3>Tam Kare Sayılar (1-225)</h3>
                <p>
                    Karekökü tam sayı olan sayılara &quot;tam kare&quot; denir. İşte ilk 15 tam kare:
                    <strong>1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225</strong>
                </p>

                <h3>Önemli İrrasyonel Karekökler</h3>
                <ul>
                    <li><strong>√2 ≈ 1.414:</strong> Diyagonali 1 olan karenin köşegeni</li>
                    <li><strong>√3 ≈ 1.732:</strong> Eşkenar üçgen hesaplamalarında</li>
                    <li><strong>√5 ≈ 2.236:</strong> Altın oran formülünde</li>
                </ul>

                <h3>Sıkça Sorulan Sorular (SSS)</h3>

                <h4>Negatif sayının karekökü var mı?</h4>
                <p>
                    Gerçek sayılarda negatif sayıların karekökü tanımlı değildir. Ancak karmaşık (kompleks) sayılarda tanımlanır.
                    Örneğin √(-1) = i (hayali birim) olarak ifade edilir.
                </p>

                <h4>Karekök ile kare arasındaki ilişki nedir?</h4>
                <p>
                    Karekök, kare alma işleminin tersidir. Bir sayının karekökünü alıp sonucu karesine alırsanız başlangıç sayısına dönersiniz: (√9)² = 9
                </p>

                <h4>Pisagor teoreminde karekök nasıl kullanılır?</h4>
                <p>
                    Dik üçgende hipotenüs = √(a² + b²). Örneğin dik kenarları 3 ve 4 olan üçgenin hipotenüsü = √(9+16) = √25 = 5
                </p>

                <h3>Günlük Hayatta Karekök Kullanımı</h3>
                <ul>
                    <li><strong>Mesafe hesaplama:</strong> İki nokta arası uzaklık formülü karekök içerir</li>
                    <li><strong>İnşaat:</strong> Köşegen, diyagonal, çatı açısı hesaplamaları</li>
                    <li><strong>Finans:</strong> Standart sapma ve volatilite hesaplamaları</li>
                    <li><strong>Fizik:</strong> Hız, ivme ve enerji formüllerinde</li>
                </ul>
            </article>
        </div>
    )
}
