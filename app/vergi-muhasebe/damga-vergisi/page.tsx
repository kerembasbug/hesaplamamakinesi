import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { StampTaxCalculator } from "@/components/calculators/tax/stamp-tax-calculator"

export const metadata: Metadata = {
    title: "Damga Vergisi Hesaplama - Sözleşme Vergisi Hesaplayıcı 2024",
    description: "Online damga vergisi hesaplama aracı. Sözleşme, kira kontratı, ihale kararı ve diğer belgeler için damga vergisi hesaplayın. Güncel damga vergisi oranları.",
    keywords: ["damga vergisi hesaplama", "sözleşme damga vergisi", "kira damga vergisi", "damga vergisi oranları", "belge vergisi"],
    openGraph: {
        title: "Damga Vergisi Hesaplama - Sözleşme Vergisi Hesaplayıcı",
        description: "Sözleşme ve belgeler için damga vergisi hesaplayın.",
        type: "website",
    }
}

export default function DamgaVergisiPage() {
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
                <span className="text-slate-900 dark:text-white font-medium">Damga Vergisi</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Damga Vergisi Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Sözleşme, makbuz ve diğer belgeler için damga vergisini hesaplayın.
                </p>
            </div>

            <StampTaxCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Damga Vergisi Nedir?</h2>
                <p>
                    Damga vergisi, kağıt üzerine düzenlenen çeşitli belge, sözleşme ve evraklar
                    üzerinden alınan bir vergidir. 488 sayılı Damga Vergisi Kanunu&apos;na göre,
                    yazılıp imzalanan veya imza yerine geçen bir işaret konmak suretiyle
                    düzenlenen ve herhangi bir hususu ispat veya belli etmek için ibraz edilecek
                    kağıtlar damga vergisine tabidir.
                </p>
                <p>
                    Damga vergisi, belgenin niteliğine göre nispi (oransal) veya maktu (sabit tutar)
                    olarak alınabilir. Ticari hayatta en sık karşılaşılan damga vergisi türü,
                    sözleşmeler üzerinden alınan nispi damga vergisidir.
                </p>

                <h2>2024 Damga Vergisi Oranları</h2>
                <h3>Nispi (Oransal) Damga Vergisi</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Belge Türü</th>
                            <th>Oran (Binde)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Sözleşmeler, taahhütnameler</td>
                            <td>9.48</td>
                        </tr>
                        <tr>
                            <td>Maaş, ücret, ikramiye ödemeleri</td>
                            <td>7.59</td>
                        </tr>
                        <tr>
                            <td>İhale kararları</td>
                            <td>5.69</td>
                        </tr>
                        <tr>
                            <td>Kira sözleşmeleri</td>
                            <td>1.89</td>
                        </tr>
                        <tr>
                            <td>Fatura, makbuzlar</td>
                            <td>9.48</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Maktu (Sabit) Damga Vergisi</h3>
                <p>
                    Bazı belgeler için sabit tutar damga vergisi alınır:
                </p>
                <ul>
                    <li>Beyannameler, bildiriler</li>
                    <li>Serbest meslek makbuzları</li>
                    <li>Ücret bordroları</li>
                    <li>Tablolar ve listeler</li>
                </ul>

                <h2>Damga Vergisi Nasıl Ödenir?</h2>
                <p>
                    Damga vergisi ödeme yöntemleri şunlardır:
                </p>
                <ul>
                    <li>
                        <strong>Makine Basım:</strong> Noter ve kamu kurumlarında matbu olarak
                        basılan belgelerde otomatik tahsil edilir.
                    </li>
                    <li>
                        <strong>Vergi Dairesi Ödeme:</strong> Bildirge ile damga vergisi beyan
                        edilir ve ödenir.
                    </li>
                    <li>
                        <strong>e-Beyanname:</strong> Muhtasar ve prim hizmet beyannamesiyle
                        birlikte elektronik ortamda beyan edilir.
                    </li>
                </ul>

                <h2>Damga Vergisinde Sorumluluk</h2>
                <p>
                    Damga vergisinin ödenmesinden, belgeyi imzalayan tüm taraflar müteselsil
                    (zincirleme) olarak sorumludur. Ancak uygulamada genellikle:
                </p>
                <ul>
                    <li>İş sözleşmelerinde: İşveren</li>
                    <li>Ticari sözleşmelerde: Her iki taraf veya anlaşılan taraf</li>
                    <li>Kira sözleşmelerinde: Kiracı ve kiraya veren müştereken</li>
                </ul>

                <h2>Damga Vergisi Muafiyetleri</h2>
                <ul>
                    <li>Resmi daireler arasındaki yazışmalar</li>
                    <li>İlköğretim ve ortaöğretim öğrencilerine verilen belgeler</li>
                    <li>Çiftçilerin tarımsal faaliyetleriyle ilgili belgeler</li>
                    <li>Esnaf ve sanatkarların belirli belgeleri</li>
                    <li>Yatırım teşvik belgesi kapsamındaki yatırımlar</li>
                    <li>Konut finansmanı (mortgage) sözleşmeleri</li>
                </ul>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Kira sözleşmesinde damga vergisi kim öder?</h3>
                <p>
                    Kira sözleşmelerinde damga vergisi, sözleşme tutarı üzerinden binde 1.89
                    oranında hesaplanır ve kanuni olarak her iki taraf müştereken sorumludur.
                    Ancak uygulamada genellikle taraflar arasında anlaşılır.
                </p>

                <h3>Damga vergisi beyannamesi ne zaman verilir?</h3>
                <p>
                    Ticari işletmeler için aylık damga vergisi beyannamesi, takip eden ayın
                    23&apos;üne kadar verilir ve 26&apos;sına kadar ödenir. Şahıslar için noterde
                    anında tahsil edilir.
                </p>

                <h3>E-sözleşmelerde damga vergisi var mı?</h3>
                <p>
                    Evet, elektronik ortamda düzenlenen sözleşmeler de damga vergisine tabidir.
                    Elektronik imza veya güvenli elektronik imza taşıyan belgeler vergi
                    kapsamındadır.
                </p>

                <h3>Damga vergisi sözleşmede ayrıca belirtilmeli mi?</h3>
                <p>
                    Belirtilmesi zorunlu değildir, ancak ödeme sorumluluğunun kime ait olduğu
                    sözleşmede açıkça yazılması faydalıdır.
                </p>

                <h2>Damga Vergisi Hesaplama Örneği</h2>
                <p>
                    1.000.000 TL bedelli bir ticari sözleşme için damga vergisi:
                </p>
                <ul>
                    <li>Sözleşme Bedeli: 1.000.000 TL</li>
                    <li>Damga Vergisi Oranı: Binde 9.48</li>
                    <li>Damga Vergisi = 1.000.000 × 0.00948 = 9.480 TL</li>
                </ul>
            </article>
        </div>
    )
}
