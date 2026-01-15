import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { WorkdaysCalculator } from "@/components/calculators/time/workdays-calculator"

export const metadata: Metadata = {
    title: "Çalışma Günleri Hesaplama - İş Günü Sayısı Hesaplayıcı",
    description: "Online çalışma günleri hesaplama aracı. İki tarih arasındaki iş günü sayısını hesaplayın. Hafta sonlarını dahil etme veya hariç tutma seçeneği.",
    keywords: ["çalışma günleri hesaplama", "iş günü hesaplama", "hafta içi gün sayısı", "iş günü sayacı", "mesai günü hesaplama"]
}

export default function CalismaGunleriHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/zaman-takvim" className="hover:text-indigo-600 transition-colors">Zaman &amp; Takvim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Çalışma Günleri Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Çalışma Günleri Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">İki tarih arasındaki iş günü sayısını hesaplayın.</p>
            </div>

            <WorkdaysCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Çalışma Günü Nedir?</h2>
                <p>
                    Çalışma günü (iş günü), genellikle Pazartesi&apos;den Cuma&apos;ya kadar olan günlerdir.
                    Hafta sonları (Cumartesi ve Pazar) tatil günleri olarak kabul edilir.
                    Bazı sektörlerde Cumartesi çalışma günü olabilir.
                </p>

                <h2>Kullanım Alanları</h2>
                <ul>
                    <li><strong>Proje yönetimi:</strong> Projenin kaç iş günü süreceğini hesaplayın</li>
                    <li><strong>İnsan kaynakları:</strong> Yıllık izin günlerini planlayın</li>
                    <li><strong>Yasal süreler:</strong> &quot;10 iş günü içinde&quot; gibi süreleri hesaplayın</li>
                    <li><strong>Maaş hesaplama:</strong> Günlük ücret üzerinden toplam maaş hesaplayın</li>
                    <li><strong>Teslim tarihi:</strong> &quot;5 iş günü sonra&quot; tarihini bulun</li>
                </ul>

                <h2>Türkiye&apos;de Çalışma Günleri</h2>
                <p>
                    Türkiye&apos;de standart çalışma haftası Pazartesi-Cuma arasıdır.
                    Yıllık toplam iş günü sayısı yaklaşık 261 gündür (resmi tatiller hariç).
                </p>
                <p>
                    <strong>Not:</strong> Bu hesaplayıcı resmi tatilleri otomatik olarak hesaba katmaz.
                    Resmi tatilleri dahil etmek için sonuçtan manuel olarak çıkarmanız gerekir.
                </p>

                <h2>Türkiye Resmi Tatilleri (2025)</h2>
                <table>
                    <thead><tr><th>Tatil</th><th>Tarih</th><th>Süre</th></tr></thead>
                    <tbody>
                        <tr><td>Yılbaşı</td><td>1 Ocak</td><td>1 gün</td></tr>
                        <tr><td>Ulusal Egemenlik ve Çocuk Bayramı</td><td>23 Nisan</td><td>1 gün</td></tr>
                        <tr><td>Emek ve Dayanışma Günü</td><td>1 Mayıs</td><td>1 gün</td></tr>
                        <tr><td>Atatürk&apos;ü Anma ve Gençlik Bayramı</td><td>19 Mayıs</td><td>1 gün</td></tr>
                        <tr><td>Demokrasi ve Milli Birlik Günü</td><td>15 Temmuz</td><td>1 gün</td></tr>
                        <tr><td>Zafer Bayramı</td><td>30 Ağustos</td><td>1 gün</td></tr>
                        <tr><td>Cumhuriyet Bayramı</td><td>29 Ekim</td><td>1 gün</td></tr>
                        <tr><td>Ramazan Bayramı</td><td>Değişken</td><td>3.5 gün</td></tr>
                        <tr><td>Kurban Bayramı</td><td>Değişken</td><td>4.5 gün</td></tr>
                    </tbody>
                </table>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Cumartesi iş günü mü?</h3>
                <p>Standart olarak hayır. Ancak perakende, hizmet sektörü gibi alanlarda Cumartesi çalışma günü olabilir. Hesaplayıcıda bu seçeneği ayarlayabilirsiniz.</p>

                <h3>Yarım gün tatiller nasıl hesaplanır?</h3>
                <p>Bu hesaplayıcı tam günleri sayar. Yarım gün tatiller (örn. arefe günleri) tüm gün olarak sayılır.</p>
            </article>
        </div>
    )
}
