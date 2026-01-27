import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { SpeedConverter } from "@/components/calculators/converter/speed-converter"

export const metadata: Metadata = {
    title: "Hız Dönüştürücü - km/h, mph, m/s, Knot Çevirici",
    description: "Online hız birim dönüştürücü. Kilometre/saat, mil/saat, metre/saniye, knot ve mach arasında hızlı çevirme.",
    keywords: ["hız dönüştürücü", "km/h mph çevirici", "hız birimi çevirme", "knot çevirici", "mach hesaplama"]
}

export default function HizDonusturucuPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/donusturuculer" className="hover:text-indigo-600 transition-colors">Dönüştürücüler</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Hız Dönüştürücü</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Hız Dönüştürücü</h1>
                <p className="text-slate-600 dark:text-slate-400">km/h, mph, m/s ve diğer hız birimleri arasında dönüşüm yapın.</p>
            </div>

            <SpeedConverter />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Hız Dönüştürücü: Km/s, Mil/saat, Knot ve Mach Arasındaki İlişki</h2>
                <p>
                    Hız, bir nesnenin birim zamanda kat ettiği mesafeyi ifade eder. Ancak bu mesafeyi ve zamanı hangi birimle ölçtüğümüz,
                    sonucu tamamen değiştirir. Bir araçta giderken kilometreyi, denizde seyrederken knotu, havacılıkta ise Mach değerini
                    kullanırız. <strong>Hız dönüştürücü</strong> aracımız, tüm bu farklı dünyalar arasındaki hız limitlerini sizin için eşitler.
                </p>

                <h3>Ulaşım Türlerine Göre Hız Birimleri</h3>
                <p>
                    Farklı sektörlerin ve coğrafyaların kendine has hız standartları vardır. İşte en yaygın olanları:
                </p>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Birim</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Kullanım Alanı</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Örnek</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Kilometre/Saat (km/h)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Kara Yolu ve Günlük Hayat</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Türkiye&apos;de otoban hız sınırı: 120 km/h</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Mil/Saat (mph)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">ABD ve İngiltere Trafiği</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Şehir içi sınır genellikle 30 mph</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Knot (Deniz Mili/Sa)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Denizcilik ve Havacılık</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Bir geminin seyir hızı: ~20 knot</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Mach</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Süpersonik Havacılık</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Ses hızını geçmek (Mach 1+)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>Temel Hız Dönüşüm Katsayıları</h3>
                <ul>
                    <li><strong>1 mph:</strong> Yaklaşık 1.609 km/saat eder.</li>
                    <li><strong>1 knot:</strong> Tam olarak 1.852 km/saat veya yaklaşık 1.15 mph eder.</li>
                    <li><strong>1 m/s:</strong> 3.6 km/saat hızına eşittir (Fizik problemlerinde sık kullanılır).</li>
                    <li><strong>Mach 1:</strong> Deniz seviyesinde ve 20°C sıcaklıkta yaklaşık 1.225 km/saat hızındadır.</li>
                </ul>

                <table>
                    <thead><tr><th>Durum</th><th>km/h</th><th>mph</th></tr></thead>
                    <tbody>
                        <tr><td>Yürüyüş hızı</td><td>5 km/h</td><td>3.1 mph</td></tr>
                        <tr><td>Şehir içi hız limiti</td><td>50 km/h</td><td>31 mph</td></tr>
                        <tr><td>Otoyol hız limiti</td><td>120 km/h</td><td>75 mph</td></tr>
                        <tr><td>Yolcu uçağı</td><td>900 km/h</td><td>559 mph</td></tr>
                        <tr><td>Ses hızı</td><td>1235 km/h</td><td>767 mph</td></tr>
                    </tbody>
                </table>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>100 km/h kaç mph?</h3>
                <p>100 km/h = 62.14 mph&apos;dir. ABD&apos;de araç kullanırken bu dönüşümü bilmek faydalıdır.</p>

                <h3>Knot neden farklı bir birim?</h3>
                <p>Knot, deniz mili/saat demektir. Denizcilik ve havacılıkta navigasyon hesaplamalarına uygun olduğu için tercih edilir.</p>

                <h3>Mach sayısı nasıl hesaplanır?</h3>
                <p>Mach sayısı, hızın ses hızına oranıdır. Ses hızı deniz seviyesinde yaklaşık 1235 km/h&apos;dir. Mach 2 = 2470 km/h demektir.</p>
            </article>
        </div>
    )
}
