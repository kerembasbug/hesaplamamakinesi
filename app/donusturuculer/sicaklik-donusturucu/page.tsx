import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { TemperatureConverter } from "@/components/calculators/converter/temperature-converter"

export const metadata: Metadata = {
    title: "Sıcaklık Dönüştürücü - Celsius, Fahrenheit, Kelvin Çevirici",
    description: "Online sıcaklık birim dönüştürücü. Celsius, Fahrenheit ve Kelvin arasında hızlı ve kolay çevirme. Hava durumu ve bilimsel hesaplamalar için.",
    keywords: ["sıcaklık dönüştürücü", "celsius fahrenheit çevirici", "derece çevirme", "kelvin çevirici", "sıcaklık birimi çevirme"]
}

export default function SicaklikDonusturucuPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/donusturuculer" className="hover:text-indigo-600 transition-colors">Dönüştürücüler</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Sıcaklık Dönüştürücü</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Sıcaklık Dönüştürücü</h1>
                <p className="text-slate-600 dark:text-slate-400">Celsius, Fahrenheit ve Kelvin arasında sıcaklık dönüşümü yapın.</p>
            </div>

            <TemperatureConverter />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Sıcaklık Birimleri Nedir?</h2>
                <p>
                    Sıcaklık, bir maddenin termal enerjisinin ölçüsüdür. Dünyada üç ana sıcaklık birimi kullanılır:
                    Celsius (°C), Fahrenheit (°F) ve Kelvin (K).
                </p>

                <h2>Sıcaklık Dönüşüm Formülleri</h2>
                <ul>
                    <li><strong>Celsius → Fahrenheit:</strong> °F = (°C × 9/5) + 32</li>
                    <li><strong>Fahrenheit → Celsius:</strong> °C = (°F - 32) × 5/9</li>
                    <li><strong>Celsius → Kelvin:</strong> K = °C + 273.15</li>
                    <li><strong>Kelvin → Celsius:</strong> °C = K - 273.15</li>
                </ul>

                <h2>Önemli Sıcaklık Değerleri</h2>
                <table>
                    <thead><tr><th>Durum</th><th>Celsius</th><th>Fahrenheit</th><th>Kelvin</th></tr></thead>
                    <tbody>
                        <tr><td>Suyun donma noktası</td><td>0°C</td><td>32°F</td><td>273.15 K</td></tr>
                        <tr><td>Normal vücut sıcaklığı</td><td>37°C</td><td>98.6°F</td><td>310.15 K</td></tr>
                        <tr><td>Suyun kaynama noktası</td><td>100°C</td><td>212°F</td><td>373.15 K</td></tr>
                        <tr><td>Mutlak sıfır</td><td>-273.15°C</td><td>-459.67°F</td><td>0 K</td></tr>
                    </tbody>
                </table>

                <h2>Hangi Ülkeler Hangi Birimi Kullanır?</h2>
                <ul>
                    <li><strong>Celsius:</strong> Türkiye dahil dünya genelinde yaygın</li>
                    <li><strong>Fahrenheit:</strong> ABD, Bahamalar, Cayman Adaları</li>
                    <li><strong>Kelvin:</strong> Bilimsel çalışmalarda evrensel standart</li>
                </ul>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>0 derece Fahrenheit kaç Celsius?</h3>
                <p>0°F = -17.78°C&apos;dir. Bu oldukça soğuk bir sıcaklıktır ve ABD&apos;de kışın sıkça görülür.</p>

                <h3>Kelvin neden sıfırdan başlar?</h3>
                <p>Kelvin, mutlak sıfır noktasından başlar. Mutlak sıfır (-273.15°C), atomların tamamen hareketsiz olduğu teorik en düşük sıcaklıktır.</p>

                <h3>Ateşim var mı nasıl anlarım?</h3>
                <p>Normal vücut sıcaklığı 36.1-37.2°C arasındadır. 38°C ve üzeri ateş olarak kabul edilir (100.4°F).</p>
            </article>
        </div>
    )
}
