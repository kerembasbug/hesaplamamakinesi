import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { WeightConverter } from "@/components/calculators/converter/weight-converter"

export const metadata: Metadata = {
    title: "Ağırlık Dönüştürücü - Kilogram, Pound, Ons Çevirici",
    description: "Online ağırlık birim dönüştürücü. Kilogram, gram, pound, ons, ton ve stone arasında hızlı ve kolay çevirme.",
    keywords: ["ağırlık dönüştürücü", "kilogram pound çevirici", "kg lbs çevirme", "gram ons çevirici", "ağırlık birimi çevirme"]
}

export default function AgirlikDonusturucuPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/donusturuculer" className="hover:text-indigo-600 transition-colors">Dönüştürücüler</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Ağırlık Dönüştürücü</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Ağırlık Dönüştürücü</h1>
                <p className="text-slate-600 dark:text-slate-400">Kilogram, pound, ons ve diğer ağırlık birimleri arasında dönüşüm yapın.</p>
            </div>

            <WeightConverter />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Ağırlık Birimleri Nedir?</h2>
                <p>
                    Ağırlık (kütle), bir nesnenin madde miktarını ölçen fiziksel bir büyüklüktür.
                    Günlük hayatta kilogram, ticarette ton, kuyumculukta gram ve karat gibi farklı birimler kullanılır.
                </p>

                <h2>Metrik ve Imperial Ağırlık Birimleri</h2>
                <p>
                    Metrik sistemde kilogram temel birimken, Imperial sistemde pound (lb) ve ons (oz) kullanılır.
                    Uluslararası ticaret ve bilimde genellikle metrik sistem tercih edilir.
                </p>

                <h2>Yaygın Ağırlık Dönüşümleri</h2>
                <table>
                    <thead><tr><th>Dönüşüm</th><th>Değer</th></tr></thead>
                    <tbody>
                        <tr><td>1 kilogram</td><td>2.20462 pound</td></tr>
                        <tr><td>1 pound</td><td>453.592 gram</td></tr>
                        <tr><td>1 ons</td><td>28.3495 gram</td></tr>
                        <tr><td>1 ton</td><td>1000 kilogram</td></tr>
                        <tr><td>1 stone</td><td>6.35029 kilogram</td></tr>
                        <tr><td>1 karat</td><td>0.2 gram</td></tr>
                    </tbody>
                </table>

                <h2>Ağırlık Ölçülerinin Kullanım Alanları</h2>
                <ul>
                    <li><strong>Gıda:</strong> Yiyecek ve içecek ağırlıkları (gram, kilogram)</li>
                    <li><strong>Sağlık:</strong> Vücut ağırlığı ölçümü</li>
                    <li><strong>Kuyumculuk:</strong> Altın ve değerli taş ölçümü (gram, karat)</li>
                    <li><strong>Lojistik:</strong> Kargo ve taşıma ağırlıkları (ton)</li>
                </ul>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>1 pound kaç kilogram?</h3>
                <p>1 pound = 0.453592 kilogramdır. ABD&apos;den sipariş verirken veya yabancı sporcuların ağırlıklarını anlamak için bu dönüşüm önemlidir.</p>

                <h3>1 ons kaç gram?</h3>
                <p>1 ons = 28.3495 gramdır. Özellikle mutfak tariflerinde ve kuyumculukta sıkça kullanılır.</p>

                <h3>Stone nedir?</h3>
                <p>Stone, İngiltere&apos;de yaygın olarak kullanılan bir ağırlık birimidir. 1 stone = 6.35029 kg = 14 pound&apos;dur.</p>

                <h3>Karat vs gram farkı nedir?</h3>
                <p>Karat, değerli taşların ölçümünde kullanılan özel bir birimdir. 1 karat = 0.2 gram = 200 miligramdır.</p>
            </article>
        </div>
    )
}
