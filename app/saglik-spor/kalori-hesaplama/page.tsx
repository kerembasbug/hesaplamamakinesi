import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { CalorieCalculator } from "@/components/calculators/health/calorie-calculator"

export const metadata: Metadata = {
    title: "Kalori İhtiyacı Hesaplama - Günlük Kalori Hesaplayıcı",
    description: "Online kalori ihtiyacı hesaplama aracı. Yaş, kilo, boy ve aktivite seviyenize göre günlük kalori ihtiyacınızı hesaplayın. BMR ve TDEE hesaplama.",
    keywords: ["kalori hesaplama", "günlük kalori", "kalori ihtiyacı", "bmr hesaplama", "tdee hesaplama", "metabolizma hızı"],
}

export default function KaloriHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                    <Home className="h-4 w-4" />
                    Ana Sayfa
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/saglik-spor" className="hover:text-indigo-600 transition-colors">Sağlık & Spor</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Kalori Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Kalori İhtiyacı Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Günlük kalori ihtiyacınızı ve metabolizma hızınızı hesaplayın.</p>
            </div>

            <CalorieCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Kalori Nedir ve Neden Önemlidir?</h2>
                <p>
                    Kalori, besinlerdeki enerji miktarının ölçü birimidir. Vücudumuz günlük faaliyetlerini
                    sürdürmek için besinlerden aldığı kaloriyi yakıtına dönüştürür. Doğru miktarda kalori
                    almak, sağlıklı kilo kontrolü için temel önkoşuldur.
                </p>

                <h2>BMR (Bazal Metabolizma Hızı) Nedir?</h2>
                <p>
                    BMR, vücudunuzun tamamen dinlenme halindeyken (uyku sırasında bile) temel yaşamsal
                    fonksiyonlarını sürdürmek için harcadığı minimum kalori miktarıdır. Bu fonksiyonlar
                    arasında solunum, kan dolaşımı, hücre üretimi ve onarımı yer alır.
                </p>

                <h2>TDEE (Günlük Toplam Enerji Harcaması) Nedir?</h2>
                <p>
                    TDEE, BMR&apos;nin aktivite seviyenize göre çarpılmasıyla elde edilen günlük toplam
                    kalori ihtiyacınızdır. Fiziksel olarak ne kadar aktif olursanız, o kadar fazla
                    kaloriye ihtiyaç duyarsınız.
                </p>

                <h2>Kilo Yönetimi</h2>
                <ul>
                    <li><strong>Kilo Vermek:</strong> TDEE&apos;den 500 kalori eksiği = haftada ~0.5 kg kayıp</li>
                    <li><strong>Kilo Korumak:</strong> TDEE kadar kalori almak</li>
                    <li><strong>Kilo Almak:</strong> TDEE&apos;den 300-500 kalori fazlası = haftada ~0.3-0.5 kg artış</li>
                </ul>

                <h2>Aktivite Seviyeleri</h2>
                <table>
                    <thead><tr><th>Seviye</th><th>Açıklama</th><th>Çarpan</th></tr></thead>
                    <tbody>
                        <tr><td>Hareketsiz</td><td>Masa başı iş, az veya hiç egzersiz</td><td>×1.2</td></tr>
                        <tr><td>Az Hareketli</td><td>Haftada 1-3 gün hafif egzersiz</td><td>×1.375</td></tr>
                        <tr><td>Orta Aktif</td><td>Haftada 3-5 gün orta düzey egzersiz</td><td>×1.55</td></tr>
                        <tr><td>Aktif</td><td>Haftada 6-7 gün yoğun egzersiz</td><td>×1.725</td></tr>
                        <tr><td>Çok Aktif</td><td>Profesyonel sporcu veya ağır fiziksel iş</td><td>×1.9</td></tr>
                    </tbody>
                </table>

                <h2>Sağlıklı Kalori Tüketimi İpuçları</h2>
                <ul>
                    <li>Öğünlerinizi atlamamaya çalışın</li>
                    <li>İşlenmiş gıdalar yerine doğal besinleri tercih edin</li>
                    <li>Protein, karbonhidrat ve yağ dengesine dikkat edin</li>
                    <li>Porsiyonları kontrol altında tutun</li>
                    <li>Bol su için, sıvı kalorilerden kaçının</li>
                </ul>
            </article>
        </div>
    )
}
