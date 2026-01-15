import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { AreaConverter } from "@/components/calculators/converter/area-converter"

export const metadata: Metadata = {
    title: "Alan Dönüştürücü - Metrekare, Dönüm, Hektar Çevirici",
    description: "Online alan birim dönüştürücü. Metrekare, dönüm, hektar, acre ve feet kare arasında hızlı ve kolay çevirme. Arazi ve emlak hesaplamaları için.",
    keywords: ["alan dönüştürücü", "metrekare dönüm çevirici", "hektar çevirme", "arazi ölçümü", "alan birimi çevirme"]
}

export default function AlanDonusturucuPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/donusturuculer" className="hover:text-indigo-600 transition-colors">Dönüştürücüler</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Alan Dönüştürücü</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Alan Dönüştürücü</h1>
                <p className="text-slate-600 dark:text-slate-400">Metrekare, dönüm, hektar ve diğer alan birimleri arasında dönüşüm yapın.</p>
            </div>

            <AreaConverter />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Alan Birimleri Nedir?</h2>
                <p>
                    Alan, iki boyutlu bir yüzeyin büyüklüğünü ölçen birimdir. Emlak, tarım ve inşaat
                    sektörlerinde farklı alan birimleri kullanılır. Türkiye&apos;de özellikle dönüm birimi
                    arazi alım-satımlarında yaygındır.
                </p>

                <h2>Yaygın Alan Dönüşümleri</h2>
                <table>
                    <thead><tr><th>Dönüşüm</th><th>Değer</th></tr></thead>
                    <tbody>
                        <tr><td>1 dönüm</td><td>1000 m²</td></tr>
                        <tr><td>1 hektar</td><td>10.000 m² (10 dönüm)</td></tr>
                        <tr><td>1 acre</td><td>4046.86 m²</td></tr>
                        <tr><td>1 km²</td><td>1.000.000 m² (1000 dönüm)</td></tr>
                        <tr><td>1 ft²</td><td>0.0929 m²</td></tr>
                    </tbody>
                </table>

                <h2>Türkiye&apos;de Kullanılan Alan Birimleri</h2>
                <ul>
                    <li><strong>Metrekare (m²):</strong> Daire ve iş yeri ölçümlerinde temel birim</li>
                    <li><strong>Dönüm:</strong> Tarla ve arazi alım-satımında yaygın (1000 m²)</li>
                    <li><strong>Hektar:</strong> Büyük tarım arazilerinde kullanılır (10 dönüm)</li>
                </ul>

                <h2>Alan Hesaplama Örnekleri</h2>
                <table>
                    <thead><tr><th>Alan Türü</th><th>Ortalama Boyut</th></tr></thead>
                    <tbody>
                        <tr><td>Bir oda</td><td>15-20 m²</td></tr>
                        <tr><td>2+1 daire</td><td>80-100 m²</td></tr>
                        <tr><td>Futbol sahası</td><td>7140 m² (≈7 dönüm)</td></tr>
                        <tr><td>Küçük tarla</td><td>5-10 dönüm</td></tr>
                        <tr><td>Büyük çiftlik</td><td>100+ hektar</td></tr>
                    </tbody>
                </table>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>1 dönüm kaç metrekare?</h3>
                <p>1 dönüm = 1000 metrekaredir. Türkiye&apos;de arazi ve tarla ölçümlerinde en yaygın kullanılan birimdir.</p>

                <h3>1 hektar kaç dönüm?</h3>
                <p>1 hektar = 10 dönüm = 10.000 metrekaredir. Büyük tarım arazileri genellikle hektar cinsinden ifade edilir.</p>

                <h3>Acre ile dönüm arasındaki fark nedir?</h3>
                <p>Acre, Anglo-Amerikan sisteminde kullanılan birimdir. 1 acre ≈ 4.047 dönüm ≈ 4047 m²&apos;dir.</p>

                <h3>Brüt ve net alan farkı nedir?</h3>
                <p>Net alan yaşam alanını, brüt alan ise duvarlar ve ortak alanlar dahil toplam alanı ifade eder. Tipik olarak brüt alan, net alandan %15-25 daha büyüktür.</p>
            </article>
        </div>
    )
}
