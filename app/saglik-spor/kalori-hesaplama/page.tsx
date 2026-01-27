import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { CalorieCalculator } from "@/components/calculators/health/calorie-calculator"

export const metadata: Metadata = {
    title: "Kalori İhtiyacı Hesaplama - Günlük Kalori Hesaplayıcı",
    description: "Online kalori ihtiyacı hesaplama aracı. Yaş, kilo, boy ve aktivite seviyenize göre günlük kalori ihtiyacınızı hesaplayın. BMR ve TDEE hesaplama.",
    keywords: ["kalori hesaplama", "günlük kalori", "kalori ihtiyacı", "bmr hesaplama", "tdee hesaplama", "metabolizma hızı"],
}

export default function KaloriHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                    <Home className="h-4 w-4" />
                    Ana Sayfa
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/saglik-spor" className="hover:text-indigo-600 transition-colors">Sağlık & Spor</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Kalori Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Kalori İhtiyacı Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Günlük kalori ihtiyacınızı ve metabolizma hızınızı hesaplayın.</p>
            </div>

            <CalorieCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Kalori Nedir ve Günlük Kalori İhtiyacı Nasıl Belirlenir?</h2>
                <p>
                    <strong>Kalori</strong>, besinlerdeki enerji miktarının ölçü birimidir. Vücudumuz nefes almak, kan dolaşımı, hücre yenilenmesi gibi temel
                    yaşamsal fonksiyonlardan yürüme, koşma, düşünme gibi günlük aktivitelere kadar her şey için kalori harcar. Aldığımız kalori ile
                    harcadığımız kalori arasındaki denge, kilo kontrolünün temel mekanizmasıdır.
                </p>
                <p>
                    Günlük kalori ihtiyacınız; yaşınıza, cinsiyetinize, boyunuza, kilonuza ve fiziksel aktivite düzeyinize göre değişir.
                    Aracımız, bilimsel olarak kabul görmüş <strong>Harris-Benedict</strong> ve <strong>Mifflin-St Jeor</strong> formüllerini kullanarak
                    size kişiselleştirilmiş bir sonuç sunar.
                </p>

                <h3>BMR (Bazal Metabolizma Hızı) Nedir?</h3>
                <p>
                    BMR, vücudunuzun tamamen dinlenme halindeyken (uyku sırasında bile) temel yaşamsal fonksiyonları sürdürmek için harcadığı
                    minimum kalori miktarıdır. Solunum, kalp atışı, sindirim, hücre onarımı gibi faaliyetler BMR&apos;ye dahildir.
                </p>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Formül</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Erkek</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Kadın</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Harris-Benedict</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">66 + (13.7 × kg) + (5 × cm) - (6.8 × yaş)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">655 + (9.6 × kg) + (1.8 × cm) - (4.7 × yaş)</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Mifflin-St Jeor</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">(10 × kg) + (6.25 × cm) - (5 × yaş) + 5</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">(10 × kg) + (6.25 × cm) - (5 × yaş) - 161</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>TDEE (Günlük Toplam Enerji Harcaması) Nedir?</h3>
                <p>
                    TDEE, BMR değerinizin aktivite seviyenize göre çarpılmasıyla elde edilen, gün boyunca toplam harcadığınız kalori miktarıdır.
                    Kilo vermek için TDEE&apos;nin altında, kilo almak için TDEE&apos;nin üstünde kalori almanız gerekir.
                </p>
                <ul>
                    <li><strong>Hareketsiz (×1.2):</strong> Masa başı iş, hiç veya çok az egzersiz.</li>
                    <li><strong>Az Aktif (×1.375):</strong> Haftada 1-3 gün hafif egzersiz veya spor.</li>
                    <li><strong>Orta Aktif (×1.55):</strong> Haftada 3-5 gün orta yoğunlukta egzersiz.</li>
                    <li><strong>Aktif (×1.725):</strong> Haftada 6-7 gün yoğun egzersiz.</li>
                    <li><strong>Çok Aktif (×1.9):</strong> Profesyonel sporcu veya ağır fiziksel iş.</li>
                </ul>

                <h3>Makro Besin Öğeleri ve Kalori Değerleri</h3>
                <p>
                    Besinlerin kalorisi üç ana makro besin öğesinden gelir:
                </p>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Makro Besin</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">1 gram = ? kalori</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Önerilen Günlük Oran</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Karbonhidrat</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">4 kcal</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">%45-65</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Protein</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">4 kcal</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">%10-35</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Yağ</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">9 kcal</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">%20-35</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>Kilo Yönetimi: Kalori Açığı ve Fazlası</h3>
                <ul>
                    <li><strong>Kilo Vermek:</strong> TDEE&apos;den günlük 500 kcal eksiği yaratmak, haftada yaklaşık 0.5 kg kayıp sağlar.</li>
                    <li><strong>Kilo Korumak:</strong> TDEE kadar kalori almak kilonuzu sabit tutar.</li>
                    <li><strong>Kilo Almak:</strong> TDEE&apos;den günlük 300-500 kcal fazlası, sağlıklı kilo artışı sağlar.</li>
                </ul>

                <h3>Sıkça Sorulan Sorular (SSS)</h3>

                <h4>Günde kaç kalori almalıyım?</h4>
                <p>
                    Bu tamamen yaşınıza, cinsiyetinize, kilonuza, boyunuza ve aktivite seviyenize bağlıdır. Ortalama olarak yetişkin bir kadın
                    1800-2200 kcal, yetişkin bir erkek 2200-2800 kcal arasında ihtiyaç duyar. Aracımız size kişisel değerinizi hesaplar.
                </p>

                <h4>Egzersiz yapmadan kalori açığı yaratsam kilo verir miyim?</h4>
                <p>
                    Evet, kilo kaybı temel olarak kalori açığına bağlıdır. Ancak egzersiz hem kalori harcamanızı artırır hem de kas kütlenizi
                    koruyarak metabolizmanızın yavaşlamasını önler.
                </p>

                <h3>Sağlıklı Kalori Tüketimi İçin 7 Altın Kural</h3>
                <ul>
                    <li>Öğün atlamayın; özellikle kahvaltı metabolizmayı harekete geçirir.</li>
                    <li>İşlenmiş gıdalar yerine tam tahıllar, taze meyve ve sebzeyi tercih edin.</li>
                    <li>Şekerli içeceklerden kaçının; bunlar &quot;boş kalori&quot; kaynaklarıdır.</li>
                    <li>Porsiyon kontrolü uygulayın; küçük tabaklar psikolojik doygunluk sağlar.</li>
                    <li>Bol su için; bazen açlık hissi aslında susuzluktur.</li>
                    <li>Yavaş yiyin; tokluk sinyali beyine ulaşmak için 20 dakika gerektirir.</li>
                    <li>Kalori saymayı bir saplantı haline getirmeyin; sağlıklı alışkanlıklar uzun vadede daha önemlidir.</li>
                </ul>
            </article>
        </div>
    )
}
