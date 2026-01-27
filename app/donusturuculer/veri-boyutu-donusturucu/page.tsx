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
