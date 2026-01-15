import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { DataSizeConverter } from "@/components/calculators/converter/data-size-converter"

export const metadata: Metadata = {
    title: "Veri Boyutu Dönüştürücü - Byte, KB, MB, GB, TB Çevirici",
    description: "Online veri boyutu dönüştürücü. Byte, Kilobyte, Megabyte, Gigabyte ve Terabyte arasında hızlı ve kolay çevirme. Depolama ve internet hızı hesaplamaları için.",
    keywords: ["veri boyutu dönüştürücü", "mb gb çevirici", "byte çevirme", "dosya boyutu hesaplama", "depolama birimi çevirme"]
}

export default function VeriBoyutuDonusturucuPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/donusturuculer" className="hover:text-indigo-600 transition-colors">Dönüştürücüler</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Veri Boyutu Dönüştürücü</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Veri Boyutu Dönüştürücü</h1>
                <p className="text-slate-600 dark:text-slate-400">Byte, KB, MB, GB ve TB arasında veri boyutu dönüşümü yapın.</p>
            </div>

            <DataSizeConverter />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Veri Boyutu Birimleri Nedir?</h2>
                <p>
                    Dijital verilerin boyutunu ölçmek için kullanılan birimlerdir. En küçük birim olan bit&apos;ten
                    başlayarak byte, kilobyte, megabyte, gigabyte, terabyte ve petabyte&apos;a kadar uzanır.
                </p>

                <h2>Veri Boyutu Hiyerarşisi</h2>
                <table>
                    <thead><tr><th>Birim</th><th>Kısaltma</th><th>Byte Karşılığı</th></tr></thead>
                    <tbody>
                        <tr><td>Bit</td><td>b</td><td>1/8 Byte</td></tr>
                        <tr><td>Byte</td><td>B</td><td>1 Byte</td></tr>
                        <tr><td>Kilobyte</td><td>KB</td><td>1024 Byte</td></tr>
                        <tr><td>Megabyte</td><td>MB</td><td>1.048.576 Byte</td></tr>
                        <tr><td>Gigabyte</td><td>GB</td><td>1.073.741.824 Byte</td></tr>
                        <tr><td>Terabyte</td><td>TB</td><td>1.099.511.627.776 Byte</td></tr>
                    </tbody>
                </table>

                <h2>Günlük Kullanım Örnekleri</h2>
                <table>
                    <thead><tr><th>İçerik Türü</th><th>Ortalama Boyut</th></tr></thead>
                    <tbody>
                        <tr><td>Metin belgesi</td><td>10-100 KB</td></tr>
                        <tr><td>MP3 şarkı (5 dk)</td><td>4-5 MB</td></tr>
                        <tr><td>HD fotoğraf</td><td>2-10 MB</td></tr>
                        <tr><td>HD film (2 saat)</td><td>4-8 GB</td></tr>
                        <tr><td>4K film</td><td>20-100 GB</td></tr>
                    </tbody>
                </table>

                <h2>KB vs KiB Farkı</h2>
                <p>
                    Geleneksel olarak 1 KB = 1024 Byte kabul edilir (ikili sistem). Ancak SI standardına göre
                    1 KB = 1000 Byte&apos;tır. Bu karışıklığı önlemek için KiB (Kibibyte = 1024 Byte) terimi önerilir.
                </p>

                <h2>Internet Hızı ve Veri Boyutu</h2>
                <p>
                    Internet hızları genellikle Mbps (Megabit/saniye) cinsinden ifade edilir.
                    8 Mbps = 1 MB/s demektir. Yani 100 Mbps bağlantıyla teorik olarak saniyede 12.5 MB indirebilirsiniz.
                </p>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>1 GB kaç MB?</h3>
                <p>1 GB = 1024 MB&apos;dir. Cep telefonu depolama alanı ve mobil veri paketleri genellikle GB cinsinden satılır.</p>

                <h3>1 TB kaç GB?</h3>
                <p>1 TB = 1024 GB&apos;dir. Harici diskler ve bulut depolama hizmetleri için yaygın bir kapasitedir.</p>

                <h3>Bit ve Byte farkı nedir?</h3>
                <p>1 Byte = 8 bit&apos;tir. Internet hızları bit cinsinden (Mbps), dosya boyutları ise Byte cinsinden (MB) ifade edilir. Bu nedenle 100 Mbps hız, saniyede 12.5 MB indirme kapasitesi demektir.</p>

                <h3>Neden disk boyutu reklamlarda farklı görünür?</h3>
                <p>Üreticiler ondalık sistemi (1 GB = 1 milyar byte), bilgisayarlar ise ikili sistemi (1 GB = 1.073.741.824 byte) kullanır. Bu nedenle 500 GB disk, bilgisayarda ~465 GB olarak görünür.</p>
            </article>
        </div>
    )
}
