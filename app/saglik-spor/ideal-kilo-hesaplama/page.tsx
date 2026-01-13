import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { IdealWeightCalculator } from "@/components/calculators/health/ideal-weight-calculator"

export const metadata: Metadata = {
    title: "İdeal Kilo Hesaplama - Boy Kilo Hesaplayıcı",
    description: "Online ideal kilo hesaplama aracı. Boyunuza ve cinsiyetinize göre ideal kilonuzu hesaplayın. Devine, Robinson, Miller ve Hamwi formülleri.",
    keywords: ["ideal kilo hesaplama", "boy kilo hesaplama", "ideal kilo", "kilo hesaplama", "sağlıklı kilo"],
}

export default function IdealKiloHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/saglik-spor" className="hover:text-indigo-600 transition-colors">Sağlık & Spor</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">İdeal Kilo Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">İdeal Kilo Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Boy ve cinsiyetinize göre ideal kilonuzu hesaplayın.</p>
            </div>

            <IdealWeightCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>İdeal Kilo Nedir?</h2>
                <p>
                    İdeal kilo, boyunuza ve cinsiyetinize göre en sağlıklı kabul edilen ağırlık aralığıdır.
                    Bu değer kişiden kişiye değişebilir ve kas kütlesi, kemik yapısı gibi faktörler de
                    dikkate alınmalıdır.
                </p>

                <h2>İdeal Kilo Formülleri</h2>
                <p>
                    Hesaplama aracımız dört farklı bilimsel formül kullanır ve ortalama değeri verir:
                </p>
                <ul>
                    <li><strong>Devine Formülü (1974):</strong> En yaygın kullanılan formül</li>
                    <li><strong>Robinson Formülü (1983):</strong> Devine formülünün modifiye edilmiş hali</li>
                    <li><strong>Miller Formülü (1983):</strong> Daha geniş boy aralığı için uygun</li>
                    <li><strong>Hamwi Formülü (1964):</strong> Klinik uygulamalarda tercih edilen formül</li>
                </ul>

                <h2>İdeal Kiloya Ulaşmak</h2>
                <ul>
                    <li>Ani kilo kaybı yerine kademeli değişim hedefleyin (haftada 0.5-1 kg)</li>
                    <li>Sadece kalori değil, besin kalitesine de önem verin</li>
                    <li>Düzenli egzersiz alışkanlığı edinin</li>
                    <li>Gerçekçi hedefler koyun</li>
                    <li>Profesyonel destek almaktan çekinmeyin</li>
                </ul>

                <h2>Önemli Not</h2>
                <p>
                    İdeal kilo hesaplama araçları genel bir rehber niteliğindedir. Kişisel sağlık durumunuz,
                    genetik yapınız ve yaşam tarzınıza göre hedef kilo farklılık gösterebilir. Önemli
                    sağlık kararlarında mutlaka bir uzman doktorla görüşün.
                </p>
            </article>
        </div>
    )
}
