import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { TimeDifferenceCalculator } from "@/components/calculators/time/time-difference-calculator"

export const metadata: Metadata = {
    title: "Saat Hesaplama - İki Saat Arası Fark Hesaplayıcı",
    description: "Online saat farkı hesaplama aracı. İki saat arasındaki farkı dakika, saat ve ondalık saat olarak hesaplayın. Mesai ve çalışma süresi hesaplama.",
    keywords: ["saat hesaplama", "saat farkı", "çalışma süresi hesaplama", "mesai hesaplama", "saat arasındaki fark"]
}

export default function SaatHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/zaman-takvim" className="hover:text-indigo-600 transition-colors">Zaman &amp; Takvim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Saat Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Saat Farkı Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">İki saat arasındaki farkı hesaplayın.</p>
            </div>

            <TimeDifferenceCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Saat Farkı Hesaplama Nedir?</h2>
                <p>
                    İki saat arasındaki süreyi hesaplamak için kullanılır.
                    Mesai süresi, toplantı uzunluğu veya herhangi bir zaman aralığını
                    dakika veya saat olarak öğrenebilirsiniz.
                </p>

                <h2>Ondalık Saat Nedir?</h2>
                <p>
                    Ondalık saat, süreyi kesirli saat olarak ifade eder:
                </p>
                <ul>
                    <li>30 dakika = 0.5 saat</li>
                    <li>45 dakika = 0.75 saat</li>
                    <li>1 saat 15 dakika = 1.25 saat</li>
                </ul>
                <p>
                    Bu format özellikle maaş ve ücret hesaplamalarında kullanılır.
                </p>

                <h2>Kullanım Alanları</h2>
                <ul>
                    <li><strong>Mesai hesaplama:</strong> Günlük çalışma sürenizi hesaplayın</li>
                    <li><strong>Fazla mesai:</strong> Standart mesayin üzerinde kaç saat çalıştığınızı bilin</li>
                    <li><strong>Toplantı süresi:</strong> Toplantının ne kadar sürdüğünü ölçün</li>
                    <li><strong>Yolculuk:</strong> Başlangıç ve varış saati arasındaki süre</li>
                    <li><strong>Uyku takibi:</strong> Kaç saat uyuduğunuzu hesaplayın</li>
                </ul>

                <h2>Gece Yarısını Geçen Hesaplamalar</h2>
                <p>
                    Bu hesaplayıcı gece yarısını geçen süreleri de doğru hesaplar.
                    Örneğin, 22:00 ile 06:00 arasındaki süre 8 saat olarak hesaplanır.
                </p>

                <h2>Örnek Hesaplamalar</h2>
                <table>
                    <thead><tr><th>Başlangıç</th><th>Bitiş</th><th>Süre</th><th>Ondalık</th></tr></thead>
                    <tbody>
                        <tr><td>09:00</td><td>17:30</td><td>8 saat 30 dk</td><td>8.5 saat</td></tr>
                        <tr><td>08:30</td><td>12:45</td><td>4 saat 15 dk</td><td>4.25 saat</td></tr>
                        <tr><td>22:00</td><td>06:00</td><td>8 saat 0 dk</td><td>8.0 saat</td></tr>
                    </tbody>
                </table>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Öğle arası nasıl düşülür?</h3>
                <p>Öğle arası için ayrı bir hesaplama yapın veya giriş-çıkış saatlerinden öğle arası süresini manuel olarak çıkarın.</p>

                <h3>Günlük mesai kaç saattir?</h3>
                <p>Türkiye&apos;de yasal haftalık çalışma süresi 45 saattir. Günlük ortalama 9 saat (6 gün) veya 9 saat (5 gün + Cumartesi yarım) olarak uygulanır.</p>

                <h3>Fazla mesai nasıl hesaplanır?</h3>
                <p>45 saati aşan çalışma süreleri fazla mesaidir. İlk 45 saati aşan kısım için %50, sonrakiler için %100 zamlı ücret ödenir.</p>
            </article>
        </div>
    )
}
