import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { WaterCalculator } from "@/components/calculators/health/water-calculator"

export const metadata: Metadata = {
    title: "Su İhtiyacı Hesaplama - Günlük Su Tüketimi Hesaplayıcı",
    description: "Online su ihtiyacı hesaplama aracı. Kilonuza ve aktivite seviyenize göre günlük su ihtiyacınızı hesaplayın. Sağlıklı yaşam için öneriler.",
    keywords: ["su ihtiyacı hesaplama", "günlük su tüketimi", "su hesaplama", "kaç litre su içmeli", "su ihtiyacı"],
}

export default function SuIhtiyaciHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/saglik-spor" className="hover:text-indigo-600 transition-colors">Sağlık & Spor</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Su İhtiyacı Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Günlük Su İhtiyacı Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Kilonuza ve aktivite seviyenize göre günlük su ihtiyacınızı öğrenin.</p>
            </div>

            <WaterCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Suyun Vücuttaki Önemi</h2>
                <p>
                    İnsan vücudunun yaklaşık %60&apos;ı sudan oluşur. Su; sindirim, emilim, dolaşım,
                    besin taşınması ve vücut ısısının düzenlenmesi gibi hayati fonksiyonlar için
                    vazgeçilmezdir.
                </p>

                <h2>Su İhtiyacını Etkileyen Faktörler</h2>
                <ul>
                    <li><strong>Vücut ağırlığı:</strong> Daha ağır bireyler daha fazla suya ihtiyaç duyar</li>
                    <li><strong>Fiziksel aktivite:</strong> Egzersiz su kaybını artırır</li>
                    <li><strong>İklim:</strong> Sıcak ve nemli havalarda su ihtiyacı artar</li>
                    <li><strong>Sağlık durumu:</strong> Ateş, ishal gibi durumlarda ekstra su gerekir</li>
                    <li><strong>Hamilelik ve emzirme:</strong> Bu dönemlerde su ihtiyacı artar</li>
                </ul>

                <h2>Dehidrasyon Belirtileri</h2>
                <ul>
                    <li>Koyu renkli idrar</li>
                    <li>Baş ağrısı ve halsizlik</li>
                    <li>Susuzluk hissi</li>
                    <li>Kuru cilt ve dudaklar</li>
                    <li>Konsantrasyon güçlüğü</li>
                </ul>

                <h2>Doğru Su İçme Alışkanlıkları</h2>
                <ul>
                    <li>Sabah uyandığınızda bir bardak su için</li>
                    <li>Susuzluk hissetmeden düzenli aralıklarla su için</li>
                    <li>Yemeklerden 30 dakika önce su için</li>
                    <li>Egzersiz öncesi, sırası ve sonrasında su için</li>
                    <li>Yanınızda su şişesi taşıyın</li>
                </ul>
            </article>
        </div>
    )
}
