import { HypCalculator } from "@/components/calculators/travel/hyp-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"

export const metadata = buildMetadata({
    title: "HYP Hesaplama - Hız, Yakıt ve Para",
    description: "Hız yapmanın zaman kazancıyla yakıt maliyeti arasındaki dengeyi hesaplayın. Ne kadar zaman kazanıp ne kadar ekstra yakıt harcadığınızı görün.",
    keywords: ["hyp hesaplama", "hız yakıt para hesaplama", "yakıt tasarrufu hesaplama", "hız zaman kazancı hesaplama", "yol maliyeti hesaplama"],
    path: "/seyahat/hyp-hesaplama",
})

export default function HypPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "HYP Hesaplama",
                    description: "Hız yapmanın zaman kazancı ile yakıt maliyeti arasındaki dengeyi hesaplayın. Ne kadar zaman kazanıp ne kadar ekstra yakıt harcayacağınızı bulun.",
                    path: "/seyahat/hyp-hesaplama",
                    applicationCategory: "TravelApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Seyahat", path: "/seyahat" },
                { name: "HYP Hesaplama" },
            ]} />

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

                <h2>Hız Arttıkça Yakıt Tüketimi Neden Yükselir?</h2>
                <p>
                    Hava direnci hızın <strong>karesiyle</strong> artar. Yani hızınızı iki katına çıkardığınızda
                    aşmanız gereken direnç dört katına çıkar. Çoğu binek otomobil 80–90 km/s bandında en verimli
                    tüketime ulaşır; 120 km/s&apos;te tüketim bu bandın yaklaşık %30-40 üzerine çıkar.
                </p>
                <p>
                    Buna karşılık zaman kazancı doğrusal değildir ve giderek azalır. 100 km&apos;lik bir yolda
                    90 km/s yerine 120 km/s gitmek yaklaşık 17 dakika kazandırır; 120 yerine 140 km/s gitmek
                    ise yalnızca 7 dakika daha ekler — ama yakıt maliyetini belirgin artırır.
                </p>

                <h2>Zaman Kazancının Parasal Karşılığı</h2>
                <p>
                    HYP hesabının özü şudur: kazandığınız dakikaların size değeri, harcadığınız ekstra yakıttan
                    fazla mı? Saatlik kazancınızı biliyorsanız bu karşılaştırmayı somutlaştırabilirsiniz.
                    Çoğu şehirlerarası yolculukta 90-110 km/s bandı, zaman ile maliyet arasındaki en dengeli
                    noktadır.
                </p>

                <h2>Güvenlik Boyutu</h2>
                <ul>
                    <li>Hız arttıkça fren mesafesi de hızın karesiyle uzar; 120 km/s&apos;te fren mesafesi 90 km/s&apos;e göre yaklaşık %78 daha uzundur.</li>
                    <li>Kaza şiddeti ve yaralanma riski hızla birlikte orantısız şekilde artar.</li>
                    <li>Hız cezaları, kazanılan zamanın parasal değerini çoğu zaman fazlasıyla siler.</li>
                    <li>Yorgunluk yüksek hızda daha hızlı birikir; mola aralıklarını kısaltmanız gerekir.</li>
                </ul>
            </article>
        </div>
    )
}
