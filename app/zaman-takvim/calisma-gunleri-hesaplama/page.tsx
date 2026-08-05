import { WorkdaysCalculator } from "@/components/calculators/time/workdays-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import { TarifeUyarisi } from "@/components/content/tarife-uyarisi"

export const metadata = buildMetadata({
    title: "Çalışma Günleri Hesaplama - İş Günü",
    description: "İki tarih arasındaki iş günü sayısını hesaplayın. Hafta sonlarını ve resmî tatilleri dahil etme veya hariç tutma seçenekleriyle ücretsiz araç.",
    keywords: ["çalışma günleri hesaplama", "iş günü hesaplama", "hafta içi gün sayısı", "iş günü sayacı", "mesai günü hesaplama"],
    path: "/zaman-takvim/calisma-gunleri-hesaplama",
})

export default function CalismaGunleriHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Çalışma Günleri Hesaplama",
                    description: "Online çalışma günleri hesaplama aracı. İki tarih arasındaki iş günü sayısını hesaplayın. Hafta sonlarını dahil etme veya hariç tutma seçeneği.",
                    path: "/zaman-takvim/calisma-gunleri-hesaplama",
                    applicationCategory: "UtilitiesApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Zaman &amp; Takvim", path: "/zaman-takvim" },
                { name: "Çalışma Günleri Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Çalışma Günleri Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">İki tarih arasındaki iş günü sayısını hesaplayın.</p>
            </div>

            <WorkdaysCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <TarifeUyarisi yil={2025} konu="resmî tatil listesi" kaynakAdi="Resmî Gazete" kaynakUrl="https://www.resmigazete.gov.tr/" />

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
