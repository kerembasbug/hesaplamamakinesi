import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { DateDifferenceCalculator } from "@/components/calculators/time/date-difference-calculator"

export const metadata: Metadata = {
    title: "Gün Farkı Hesaplama - İki Tarih Arası Gün Sayısı",
    description: "Online gün farkı hesaplama aracı. İki tarih arasındaki gün, hafta, ay, yıl ve iş günü sayısını hesaplayın.",
    keywords: ["gün farkı hesaplama", "tarih farkı", "iki tarih arası gün", "kaç gün kaldı", "tarih hesaplama"]
}

export default function GunFarkiHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/zaman-takvim" className="hover:text-indigo-600 transition-colors">Zaman &amp; Takvim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Gün Farkı Hesaplama</span>
            </nav>

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
