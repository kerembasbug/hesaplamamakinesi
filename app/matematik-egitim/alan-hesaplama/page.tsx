import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { AreaCalculator } from "@/components/calculators/math/area-calculator"

export const metadata: Metadata = {
    title: "Alan Hesaplama - Dikdörtgen, Daire, Üçgen Alan Hesaplayıcı",
    description: "Online geometrik alan hesaplama aracı. Dikdörtgen, daire, üçgen ve yamuk alanını kolayca hesaplayın. Formüller ve örneklerle detaylı rehber.",
    keywords: ["alan hesaplama", "dikdörtgen alan", "daire alan", "üçgen alan", "geometri hesaplama", "yamuk alan"]
}

export default function AlanHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/matematik-egitim" className="hover:text-indigo-600 transition-colors">Matematik &amp; Eğitim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Alan Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Alan Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Geometrik şekillerin alanını hesaplayın: dikdörtgen, daire, üçgen, yamuk.</p>
            </div>

            <AreaCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Alan Nedir?</h2>
                <p>
                    Alan, iki boyutlu bir şeklin kapladığı yüzey miktarıdır. Metrekare (m²), santimetrekare (cm²)
                    veya milimetrekare (mm²) gibi kareli birimlerle ölçülür. Geometride alan hesaplama,
                    matematik, mühendislik ve günlük yaşamda temel bir kavramdır.
                </p>

                <h2>Alan Hesaplama Formülleri</h2>

                <h3>Dikdörtgen Alan</h3>
                <p><strong>Alan = Genişlik × Yükseklik</strong></p>
                <p>Örnek: 5 m genişliğinde ve 3 m yüksekliğinde bir dikdörtgenin alanı = 5 × 3 = 15 m²</p>

                <h3>Kare Alan</h3>
                <p><strong>Alan = Kenar × Kenar = Kenar²</strong></p>
                <p>Örnek: 4 m kenarlı bir karenin alanı = 4² = 16 m²</p>

                <h3>Daire Alan</h3>
                <p><strong>Alan = π × Yarıçap²</strong></p>
                <p>Örnek: 3 m yarıçaplı bir dairenin alanı = π × 3² = 28.27 m²</p>

                <h3>Üçgen Alan</h3>
                <p><strong>Alan = (Taban × Yükseklik) / 2</strong></p>
                <p>Örnek: 6 m taban ve 4 m yüksekliğinde bir üçgenin alanı = (6 × 4) / 2 = 12 m²</p>

                <h3>Yamuk Alan</h3>
                <p><strong>Alan = ((Üst Taban + Alt Taban) × Yükseklik) / 2</strong></p>
                <p>Örnek: Üst tabanı 3 m, alt tabanı 5 m ve yüksekliği 4 m olan yamuğun alanı = ((3 + 5) × 4) / 2 = 16 m²</p>

                <h2>Günlük Hayatta Alan Hesaplama</h2>
                <ul>
                    <li><strong>Ev boyama:</strong> Duvar alanı hesaplayarak ne kadar boya gerektiğini belirleyin</li>
                    <li><strong>Halı/zemin kaplama:</strong> Oda alanını ölçerek malzeme miktarını hesaplayın</li>
                    <li><strong>Bahçe düzenleme:</strong> Çim tohumu veya gübre miktarını belirleyin</li>
                    <li><strong>İnşaat:</strong> Beton dökümü veya kaplama hesaplamalarında kullanılır</li>
                </ul>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Çevre ile alan arasındaki fark nedir?</h3>
                <p>Çevre, bir şeklin dış sınırının toplam uzunluğudur (metre cinsinden). Alan ise şeklin kapladığı yüzeydir (metrekare cinsinden). Aynı çevreye sahip farklı şekillerin alanları farklı olabilir.</p>

                <h3>Düzensiz şekillerin alanı nasıl hesaplanır?</h3>
                <p>Düzensiz şekilleri basit geometrik şekillere bölerek (dikdörtgen, üçgen vb.) her birinin alanını ayrı hesaplayıp toplayabilirsiniz.</p>

                <h3>1 dönüm kaç metrekare?</h3>
                <p>Türkiye&apos;de 1 dönüm = 1000 m² olarak kabul edilir. Arazi ölçümlerinde sıkça kullanılır.</p>
            </article>
        </div>
    )
}
