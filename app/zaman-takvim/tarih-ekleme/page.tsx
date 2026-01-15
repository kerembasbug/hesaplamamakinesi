import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { DateAddCalculator } from "@/components/calculators/time/date-add-calculator"

export const metadata: Metadata = {
    title: "Tarih Ekleme/Çıkarma - Tarihe Gün, Ay, Yıl Ekleme",
    description: "Online tarih ekleme ve çıkarma hesaplayıcısı. Bir tarihe gün, ay veya yıl ekleyin veya çıkarın. Sonuç tarihini anında öğrenin.",
    keywords: ["tarih ekleme", "tarihe gün ekleme", "tarih hesaplama", "kaç gün sonra hangi tarih", "tarihten çıkarma"]
}

export default function TarihEklemePage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/zaman-takvim" className="hover:text-indigo-600 transition-colors">Zaman &amp; Takvim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Tarih Ekleme/Çıkarma</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Tarih Ekleme ve Çıkarma</h1>
                <p className="text-slate-600 dark:text-slate-400">Bir tarihe gün, ay veya yıl ekleyin ya da çıkarın.</p>
            </div>

            <DateAddCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Tarih Ekleme/Çıkarma Nedir?</h2>
                <p>
                    Bu araç, belirli bir tarihten itibaren gelecek veya geçmiş bir tarihi hesaplamanıza
                    yardımcı olur. Örneğin, bugünden 90 gün sonrasını veya 6 ay öncesini kolayca bulabilirsiniz.
                </p>

                <h2>Kullanım Alanları</h2>
                <ul>
                    <li><strong>Sözleşme süreleri:</strong> 1 yıllık sözleşme ne zaman bitiyor?</li>
                    <li><strong>Taksit tarihleri:</strong> 12 ay sonraki son taksit tarihi</li>
                    <li><strong>İzin planlaması:</strong> 14 gün izin sonrası dönüş tarihi</li>
                    <li><strong>Garanti süreleri:</strong> 2 yıl garanti ne zaman bitiyor?</li>
                    <li><strong>Yasal süreler:</strong> 30 günlük itiraz süresi dolum tarihi</li>
                </ul>

                <h2>Ay Ekleme Mantığı</h2>
                <p>
                    Ay eklerken, her ayın farklı gün sayısına sahip olduğu dikkate alınır:
                </p>
                <ul>
                    <li>31 Ocak + 1 ay = 28 veya 29 Şubat (ayın son günü)</li>
                    <li>30 Nisan + 1 ay = 30 Mayıs</li>
                    <li>15 Mart + 1 ay = 15 Nisan</li>
                </ul>

                <h2>Örnek Hesaplamalar</h2>
                <table>
                    <thead><tr><th>Başlangıç</th><th>İşlem</th><th>Sonuç</th></tr></thead>
                    <tbody>
                        <tr><td>1 Ocak 2025</td><td>+ 90 gün</td><td>1 Nisan 2025</td></tr>
                        <tr><td>15 Haziran 2025</td><td>+ 6 ay</td><td>15 Aralık 2025</td></tr>
                        <tr><td>1 Mart 2025</td><td>- 1 yıl</td><td>1 Mart 2024</td></tr>
                        <tr><td>28 Şubat 2024</td><td>+ 1 yıl</td><td>28 Şubat 2025</td></tr>
                    </tbody>
                </table>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Artık yıl Şubat ayını etkiler mi?</h3>
                <p>Evet. 29 Şubat tarihi yalnızca artık yıllarda geçerlidir. Artık olmayan bir yılda bu tarih 28 Şubat&apos;a düşer.</p>

                <h3>Negatif sonuç olabilir mi?</h3>
                <p>Hayır. Tarih çıkarma işlemi sonucunda geçmiş bir tarih elde edersiniz, negatif bir değer değil.</p>

                <h3>Gün, ay ve yıl aynı anda eklenebilir mi?</h3>
                <p>Evet! Bu hesaplayıcı önce yılları, sonra ayları, en son günleri ekler veya çıkarır.</p>
            </article>
        </div>
    )
}
