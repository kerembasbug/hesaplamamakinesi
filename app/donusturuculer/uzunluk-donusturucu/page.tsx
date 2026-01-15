import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { LengthConverter } from "@/components/calculators/converter/length-converter"

export const metadata: Metadata = {
    title: "Uzunluk Dönüştürücü - Metre, Feet, İnç, Mil Çevirici",
    description: "Online uzunluk birim dönüştürücü. Metre, kilometre, santimetre, milimetre, feet, inç, mil ve yarda arasında hızlı ve kolay çevirme.",
    keywords: ["uzunluk dönüştürücü", "metre feet çevirici", "inç cm çevirici", "mil km çevirme", "uzunluk birimi çevirme"]
}

export default function UzunlukDonusturucuPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/donusturuculer" className="hover:text-indigo-600 transition-colors">Dönüştürücüler</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Uzunluk Dönüştürücü</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Uzunluk Dönüştürücü</h1>
                <p className="text-slate-600 dark:text-slate-400">Metre, feet, inç ve diğer uzunluk birimleri arasında dönüşüm yapın.</p>
            </div>

            <LengthConverter />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Uzunluk Birimleri Nedir?</h2>
                <p>
                    Uzunluk, bir nesnenin bir ucundan diğer ucuna olan mesafeyi ölçen fiziksel bir büyüklüktür.
                    Günlük hayatta ve bilimsel çalışmalarda farklı uzunluk birimleri kullanılır.
                </p>

                <h2>Metrik ve Imperial Sistem</h2>
                <p>
                    Dünyada iki ana ölçü sistemi kullanılır: Metrik sistem (metre tabanlı) ve Imperial sistem (feet/inç tabanlı).
                    Türkiye dahil çoğu ülke metrik sistemi kullanırken, ABD ve İngiltere&apos;de imperial sistem yaygındır.
                </p>

                <h2>Yaygın Uzunluk Dönüşümleri</h2>
                <table>
                    <thead><tr><th>Dönüşüm</th><th>Değer</th></tr></thead>
                    <tbody>
                        <tr><td>1 metre</td><td>3.28084 feet</td></tr>
                        <tr><td>1 feet</td><td>30.48 cm</td></tr>
                        <tr><td>1 inç</td><td>2.54 cm</td></tr>
                        <tr><td>1 mil</td><td>1.60934 km</td></tr>
                        <tr><td>1 yarda</td><td>0.9144 m</td></tr>
                        <tr><td>1 deniz mili</td><td>1.852 km</td></tr>
                    </tbody>
                </table>

                <h2>Uzunluk Ölçülerinin Kullanım Alanları</h2>
                <ul>
                    <li><strong>İnşaat:</strong> Bina yükseklikleri, oda boyutları</li>
                    <li><strong>Tekstil:</strong> Kumaş uzunlukları, beden ölçüleri</li>
                    <li><strong>Ulaşım:</strong> Yol mesafeleri, araç boyutları</li>
                    <li><strong>Bilim:</strong> Mikro ve nano ölçekli ölçümler</li>
                </ul>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>1 feet kaç cm?</h3>
                <p>1 feet = 30.48 santimetredir. Boy ölçümlerinde sıkça kullanılan bu dönüşüm, özellikle giysi ve ayakkabı alışverişlerinde önemlidir.</p>

                <h3>1 inç kaç mm?</h3>
                <p>1 inç = 25.4 milimetredir. Elektronik cihaz ekran boyutları genellikle inç cinsinden ifade edilir.</p>

                <h3>Deniz mili neden farklıdır?</h3>
                <p>Deniz mili, dünya&apos;nın çevresine dayanan özel bir uzunluk birimidir. 1 deniz mili = 1.852 km&apos;dir ve havacılık ile denizcilikte kullanılır.</p>
            </article>
        </div>
    )
}
