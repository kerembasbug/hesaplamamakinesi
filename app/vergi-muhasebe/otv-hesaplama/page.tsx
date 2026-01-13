import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { OtvCalculator } from "@/components/calculators/tax/otv-calculator"

export const metadata: Metadata = {
    title: "ÖTV Hesaplama - Araç ÖTV Hesaplayıcı 2024",
    description: "Online ÖTV hesaplama aracı. Araç alırken ödeyeceğiniz ÖTV ve toplam satış fiyatını hesaplayın. Motor hacmi ve yakıt tipine göre güncel ÖTV oranları.",
    keywords: ["ötv hesaplama", "araç ötv", "özel tüketim vergisi", "araba vergisi hesaplama", "ötv oranları", "araç vergi hesaplama"],
    openGraph: {
        title: "ÖTV Hesaplama - Araç ÖTV Hesaplayıcı",
        description: "Araç ÖTV ve toplam satış fiyatını hesaplayın.",
        type: "website",
    }
}

export default function OtvHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                    <Home className="h-4 w-4" />
                    Ana Sayfa
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/vergi-muhasebe" className="hover:text-indigo-600 transition-colors">
                    Vergi & Muhasebe
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">ÖTV Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    ÖTV Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Araç satın alırken ödeyeceğiniz ÖTV tutarını ve toplam fiyatı hesaplayın.
                </p>
            </div>

            <OtvCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>ÖTV Nedir?</h2>
                <p>
                    ÖTV (Özel Tüketim Vergisi), belirli mal grupları üzerinden bir defaya mahsus olarak
                    alınan dolaylı bir vergidir. Türkiye&apos;de ÖTV, özellikle motorlu taşıtlar, alkol,
                    tütün, petrol ürünleri ve lüks tüketim malları üzerine uygulanmaktadır.
                </p>
                <p>
                    Araçlarda ÖTV, motor hacmi ve matrah (vergisiz fiyat) üzerinden hesaplanır.
                    ÖTV oranları oldukça yüksek olduğundan, araç fiyatlarında verginin payı önemli
                    bir yer tutmaktadır.
                </p>

                <h2>Araçlarda ÖTV Oranları (2024)</h2>
                <p>
                    Benzinli ve dizel araçlar için ÖTV oranları motor hacmine ve matrah tutarına göre değişir:
                </p>

                <h3>1600 cc ve altı motor hacmi</h3>
                <ul>
                    <li>130.000 TL&apos;ye kadar matrah: %45</li>
                    <li>130.000 - 215.000 TL arası: %50</li>
                    <li>215.000 TL üzeri: %80</li>
                </ul>

                <h3>1600 - 2000 cc arası motor hacmi</h3>
                <ul>
                    <li>130.000 TL&apos;ye kadar matrah: %45</li>
                    <li>130.000 - 215.000 TL arası: %50</li>
                    <li>215.000 TL üzeri: %80</li>
                </ul>

                <h3>2000 - 2500 cc arası motor hacmi</h3>
                <ul>
                    <li>Tüm matrah dilimlerinde: %80</li>
                </ul>

                <h3>2500 cc üzeri motor hacmi</h3>
                <ul>
                    <li>Tüm matrah dilimlerinde: %220</li>
                </ul>

                <h3>Elektrikli araçlar</h3>
                <ul>
                    <li>1.400.000 TL&apos;ye kadar matrah: %10</li>
                    <li>1.400.000 - 2.100.000 TL arası: %40</li>
                    <li>2.100.000 TL üzeri: %50</li>
                </ul>

                <h2>Araç Fiyatı Nasıl Hesaplanır?</h2>
                <p>
                    Bir aracın satış fiyatı şu şekilde hesaplanır:
                </p>
                <ol>
                    <li><strong>Matrah Fiyatı:</strong> Aracın vergisiz fabrika çıkış fiyatı</li>
                    <li><strong>ÖTV:</strong> Matrah × ÖTV Oranı</li>
                    <li><strong>ÖTV Dahil Fiyat:</strong> Matrah + ÖTV</li>
                    <li><strong>KDV:</strong> ÖTV Dahil Fiyat × %20</li>
                    <li><strong>Toplam Satış Fiyatı:</strong> ÖTV Dahil Fiyat + KDV</li>
                </ol>
                <p>
                    Örneğin, 1.4 motor, 200.000 TL matrah fiyatlı bir araç için:
                </p>
                <ul>
                    <li>ÖTV = 200.000 × %50 = 100.000 TL</li>
                    <li>ÖTV Dahil = 200.000 + 100.000 = 300.000 TL</li>
                    <li>KDV = 300.000 × %20 = 60.000 TL</li>
                    <li>Toplam = 300.000 + 60.000 = 360.000 TL</li>
                </ul>

                <h2>ÖTV İndirimi ve Muafiyetler</h2>
                <ul>
                    <li>
                        <strong>Engelli Araç İndirimi:</strong> Belirli engellilik oranına sahip vatandaşlar,
                        5 yılda bir ÖTV&apos;siz araç alabilir.
                    </li>
                    <li>
                        <strong>Şehit Yakınları:</strong> Şehit eş ve çocukları ÖTV muafiyetinden
                        yararlanabilir.
                    </li>
                    <li>
                        <strong>Diplomatik Muafiyet:</strong> Yabancı diplomatik misyonlar için ÖTV
                        muafiyeti uygulanır.
                    </li>
                </ul>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>ÖTV matrahı nedir?</h3>
                <p>
                    ÖTV matrahı, aracın vergiler hariç fabrika çıkış fiyatıdır. İthal araçlarda
                    gümrük vergisi dahil fiyat matrah olarak kabul edilir.
                </p>

                <h3>Hibrit araçlarda ÖTV oranı nedir?</h3>
                <p>
                    Hibrit araçlar için ÖTV oranları, motor hacmine göre benzinli araçlarla
                    aynı oranlarda uygulanmaktadır. Ancak bazı teşvikler söz konusu olabilir.
                </p>

                <h3>İkinci el araçta ÖTV ödenir mi?</h3>
                <p>
                    Hayır, ÖTV sadece sıfır araç satışlarında bir defaya mahsus ödenir. İkinci el
                    araç alımlarında ÖTV ödenmez, ancak noter harcı ve tapu masrafları vardır.
                </p>

                <h3>ÖTV oranları ne zaman değişir?</h3>
                <p>
                    ÖTV oranları ve matrah dilimleri Cumhurbaşkanlığı kararnamesiyle değiştirilebilir.
                    Önemli ekonomik gelişmelerde veya yıl başlarında değişiklik yapılabilir.
                </p>

                <h2>Araç Alırken Dikkat Edilecekler</h2>
                <ul>
                    <li>Motor hacmine göre ÖTV oranı önemli ölçüde değişir</li>
                    <li>Elektrikli araçlar önemli ÖTV avantajı sağlar</li>
                    <li>Matrah sınırlarını aşmamak ciddi tasarruf sağlayabilir</li>
                    <li>İkinci el piyasasında düşük ÖTV&apos;li araçlar daha değerli olabilir</li>
                    <li>Engelli indirimi şartlarını araştırın</li>
                </ul>
            </article>
        </div>
    )
}
