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
                <h2>Hız Birimleri Nedir?</h2>
                <p>
                    Hız, birim zamanda kat edilen mesafeyi ifade eder. Farklı ülkeler ve sektörler
                    farklı hız birimleri kullanır: karayollarında km/h veya mph, havacılıkta knot,
                    bilimde m/s tercih edilir.
                </p>

                <h2>Yaygın Hız Dönüşümleri</h2>
                <table>
                    <thead><tr><th>Dönüşüm</th><th>Değer</th></tr></thead>
                    <tbody>
                        <tr><td>1 km/h</td><td>0.621371 mph</td></tr>
                        <tr><td>1 mph</td><td>1.60934 km/h</td></tr>
                        <tr><td>1 m/s</td><td>3.6 km/h</td></tr>
                        <tr><td>1 knot</td><td>1.852 km/h</td></tr>
                        <tr><td>Mach 1</td><td>1234.8 km/h (ses hızı)</td></tr>
                    </tbody>
                </table>

                <h2>Hız Birimleri Nerede Kullanılır?</h2>
                <ul>
                    <li><strong>km/h:</strong> Türkiye ve çoğu ülkede karayolu hız limitleri</li>
                    <li><strong>mph:</strong> ABD ve İngiltere&apos;de karayolu hız limitleri</li>
                    <li><strong>m/s:</strong> Fizik ve mühendislik hesaplamalarında</li>
                    <li><strong>knot:</strong> Denizcilik ve havacılıkta</li>
                    <li><strong>Mach:</strong> Süpersonik uçuşlarda (ses hızına göre)</li>
                </ul>

                <h2>Örnek Hız Değerleri</h2>
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
