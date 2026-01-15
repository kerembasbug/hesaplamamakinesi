import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { TimezoneConverter } from "@/components/calculators/time/timezone-converter"

export const metadata: Metadata = {
    title: "Zaman Dilimi Çevirici - Dünya Saatleri Hesaplayıcı",
    description: "Online zaman dilimi çevirici. İstanbul, New York, Londra, Tokyo ve diğer şehirler arasında saat farkını hesaplayın. Canlı dünya saatleri.",
    keywords: ["zaman dilimi çevirici", "saat farkı hesaplama", "dünya saatleri", "timezone converter", "şehirler arası saat farkı"]
}

export default function ZamanDilimiCeviriciPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/zaman-takvim" className="hover:text-indigo-600 transition-colors">Zaman &amp; Takvim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Zaman Dilimi Çevirici</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Zaman Dilimi Çevirici</h1>
                <p className="text-slate-600 dark:text-slate-400">Farklı şehirler ve zaman dilimleri arasında saat çevirisi yapın.</p>
            </div>

            <TimezoneConverter />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Zaman Dilimi Nedir?</h2>
                <p>
                    Dünya 24 ana zaman dilimine bölünmüştür. Her zaman dilimi, Greenwich (UTC 0)
                    referans noktasından saat farkıyla tanımlanır. Türkiye UTC+3 zaman dilimindedir.
                </p>

                <h2>Türkiye Saat Farkları</h2>
                <table>
                    <thead><tr><th>Şehir</th><th>Türkiye ile Fark</th></tr></thead>
                    <tbody>
                        <tr><td>Londra (UK)</td><td>-3 saat (kış) / -2 saat (yaz)</td></tr>
                        <tr><td>Paris, Berlin (EU)</td><td>-2 saat (kış) / -1 saat (yaz)</td></tr>
                        <tr><td>Moskova (RU)</td><td>Aynı saat</td></tr>
                        <tr><td>Dubai (AE)</td><td>+1 saat</td></tr>
                        <tr><td>New York (US)</td><td>-8 saat (kış) / -7 saat (yaz)</td></tr>
                        <tr><td>Los Angeles (US)</td><td>-11 saat (kış) / -10 saat (yaz)</td></tr>
                        <tr><td>Tokyo (JP)</td><td>+6 saat</td></tr>
                        <tr><td>Sidney (AU)</td><td>+8 saat (kış) / +7 saat (yaz)</td></tr>
                    </tbody>
                </table>

                <h2>Yaz Saati Uygulaması</h2>
                <p>
                    Türkiye 2016&apos;dan beri kalıcı olarak yaz saati (UTC+3) uygulamaktadır.
                    Bu nedenle Avrupa ile saat farkı yaz ve kış aylarında değişir.
                </p>
                <ul>
                    <li><strong>Kış:</strong> Avrupa saatlerini geri alır, Türkiye ile fark artar</li>
                    <li><strong>Yaz:</strong> Avrupa saatlerini ileri alır, Türkiye ile fark azalır</li>
                </ul>

                <h2>Kullanım Alanları</h2>
                <ul>
                    <li><strong>İş görüşmeleri:</strong> Yabancı müşterilerle toplantı saati ayarlama</li>
                    <li><strong>Seyahat:</strong> Varış saatini yerel zamanla hesaplama</li>
                    <li><strong>Canlı etkinlikler:</strong> Online konser veya maç saatini öğrenme</li>
                    <li><strong>Uzaktan çalışma:</strong> Farklı ülkelerdeki ekip üyeleriyle koordinasyon</li>
                </ul>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>UTC nedir?</h3>
                <p>UTC (Coordinated Universal Time), dünya genelinde kabul edilen referans zaman dilimidir. Greenwich Mean Time (GMT) ile pratik olarak aynıdır.</p>

                <h3>Türkiye hangi zaman diliminde?</h3>
                <p>Türkiye UTC+3 zaman dilimindedir ve yaz/kış saati uygulaması yapmamaktadır (kalıcı yaz saati).</p>

                <h3>Tarih çizgisi nereden geçer?</h3>
                <p>Uluslararası tarih çizgisi yaklaşık 180° boylamından geçer (Pasifik Okyanusu). Bu çizgiyi batıya geçerken bir gün eklenir, doğuya geçerken bir gün çıkarılır.</p>
            </article>
        </div>
    )
}
