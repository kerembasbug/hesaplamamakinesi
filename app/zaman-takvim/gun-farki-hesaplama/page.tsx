import { DateDifferenceCalculator } from "@/components/calculators/time/date-difference-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"

export const metadata = buildMetadata({
    title: "Gün Farkı Hesaplama - Tarih Arası Gün",
    description: "İki tarih arasındaki gün, hafta, ay, yıl ve iş günü sayısını hesaplayın. Geçmiş ve gelecek tarihler için çalışan ücretsiz gün farkı hesaplayıcı.",
    keywords: ["gün farkı hesaplama", "tarih farkı", "iki tarih arası gün", "kaç gün kaldı", "tarih hesaplama"],
    path: "/zaman-takvim/gun-farki-hesaplama",
})

export default function GunFarkiHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Gün Farkı Hesaplama",
                    description: "Online gün farkı hesaplama aracı. İki tarih arasındaki gün, hafta, ay, yıl ve iş günü sayısını hesaplayın.",
                    path: "/zaman-takvim/gun-farki-hesaplama",
                    applicationCategory: "UtilitiesApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Zaman &amp; Takvim", path: "/zaman-takvim" },
                { name: "Gün Farkı Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Gün Farkı Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">İki tarih arasındaki gün, hafta, ay ve yıl farkını hesaplayın.</p>
            </div>

            <DateDifferenceCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Gün Farkı Hesaplama Nedir?</h2>
                <p>
                    Gün farkı hesaplama, iki tarih arasındaki süreyi gün, hafta, ay veya yıl cinsinden
                    öğrenmek için kullanılır. Tatil planlaması, proje yönetimi, yaş hesaplama gibi
                    birçok alanda işe yarar.
                </p>

                <h2>Kullanım Alanları</h2>
                <ul>
                    <li><strong>Tatil planlaması:</strong> Tatile kaç gün kaldığını öğrenin</li>
                    <li><strong>Proje yönetimi:</strong> Teslim tarihine kadar kalan süreyi hesaplayın</li>
                    <li><strong>Hamilelik takibi:</strong> Doğum tarihine kaç gün ve hafta kaldığını bilin</li>
                    <li><strong>Kira/sözleşme:</strong> Sözleşme bitimine kalan süreyi hesaplayın</li>
                    <li><strong>Yaş hesaplama:</strong> Doğum gününüze kaç gün kaldığını öğrenin</li>
                </ul>

                <h2>İş Günü vs Takvim Günü</h2>
                <p>
                    <strong>Takvim günü:</strong> Hafta sonları dahil tüm günler sayılır.
                </p>
                <p>
                    <strong>İş günü:</strong> Sadece Pazartesi-Cuma arası günler sayılır.
                    Resmi tatiller dahil edilmez (bu hesaplayıcı resmi tatilleri dikkate almaz).
                </p>

                <h2>Örnek Hesaplamalar</h2>
                <table>
                    <thead><tr><th>Durum</th><th>Örnek Hesaplama</th></tr></thead>
                    <tbody>
                        <tr><td>Yılbaşına kaç gün?</td><td>Bugünden 31 Aralık&apos;a</td></tr>
                        <tr><td>Yaz tatiline kaç hafta?</td><td>Bugünden Haziran sonuna</td></tr>
                        <tr><td>Evliliğin kaçıncı günü?</td><td>Evlilik tarihinden bugüne</td></tr>
                    </tbody>
                </table>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Artık yıllar nasıl hesaplanır?</h3>
                <p>Hesaplayıcımız artık yılları (29 Şubat) otomatik olarak dikkate alır. 4 yılda bir gelen bu ekstra gün hesaplamaya dahil edilir.</p>

                <h3>Negatif gün farkı ne anlama gelir?</h3>
                <p>Bitiş tarihi başlangıç tarihinden önceyse, bu araç mutlak değeri gösterir. Yani her iki tarih sırası için de pozitif sonuç alırsınız.</p>

                <h3>Saat farkı dahil mi?</h3>
                <p>Bu hesaplayıcı yalnızca gün bazında çalışır. Saat farkı için &quot;Saat Hesaplama&quot; aracımızı kullanabilirsiniz.</p>
            </article>
        </div>
    )
}
