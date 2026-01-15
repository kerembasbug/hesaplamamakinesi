import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { HypCalculator } from "@/components/calculators/travel/hyp-calculator"

export const metadata: Metadata = {
    title: "HYP Hesaplama - Hız, Yakıt ve Para Hesaplayıcı 2025",
    description: "Hız yapmanın zaman kazancı ile yakıt maliyeti arasındaki dengeyi hesaplayın. Ne kadar zaman kazanıp ne kadar ekstra yakıt harcayacağınızı bulun.",
    keywords: ["hyp hesaplama", "hız yakıt para hesaplama", "yakıt tasarrufu hesaplama", "hız zaman kazancı hesaplama", "yol maliyeti hesaplama"]
}

export default function HypPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/seyahat" className="hover:text-indigo-600 transition-colors">Seyahat</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">HYP Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">HYP (Hız, Yakıt, Para) Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Gideceğiniz mesafeyi ve iki farklı hız senaryosunu girerek maliyet-zaman analizini anında yapın.</p>
            </div>

            <HypCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>HYP Hesaplama Nedir?</h2>
                <p>HYP; Hız, Yakıt ve Para kelimelerinin baş harflerinden oluşur. Özellikle uzun yola çıkacak sürücülerin, daha hızlı giderek kazanacakları zamanın karşılığında ne kadar ekstra yakıt ücreti ödeyeceklerini görmelerini sağlar.</p>

                <h2>Hız Arttıkça Yakıt Tüketimi Neden Artar?</h2>
                <p>Hava direnci, hızın karesiyle doğru orantılı olarak artar. Örneğin, 90 km/s hızdan 120 km/s hıza çıkmak, sadece %33'lük bir hız artışı gibi görünse de hava direnci ve sürtünme nedeniyle yakıt tüketimini %20 ile %50 arasında artırabilir.</p>

                <h2>Zaman Kazancı vs. Maliyet</h2>
                <p>100 KM'lik bir yolda 90 km/s yerine 120 km/s ile gitmek size yaklaşık 16 dakika kazandırır. Ancak bu 16 dakika için fazladan harcayacağınız yakıtın bedeli, güncel akaryakıt fiyatlarıyla 100-150 TL'yi bulabilir. Analizimizi kullanarak bu takasın sizin için karlı olup olmadığını görebilirsiniz.</p>
            </article>
        </div>
    )
}
