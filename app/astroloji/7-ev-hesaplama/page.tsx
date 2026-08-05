import { SeventhHouseCalculator } from "@/components/calculators/astrology/seventh-house-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"

export const metadata = buildMetadata({
    title: "7. Ev Hesaplama - Evlilik Burcu 2026",
    description: "Doğum haritanızda 7. evinizi öğrenin. Evlilik burcu, ideal partner özellikleri ve ilişki uyumu için ücretsiz 7. ev hesaplama aracı.",
    keywords: ["7. ev hesaplama", "yedinci ev astroloji", "evlilik burcu", "7. ev burcu", "partner burcu", "ilişki astrolojisi", "evlilik haritası"],
    path: "/astroloji/7-ev-hesaplama",
})

export default function YedinciEvHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "7. Ev Hesaplama",
                    description: "Online 7. ev hesaplama aracı. Doğum haritanızda 7. evinizi öğrenin. Evlilik burcu, ideal partner özellikleri ve ilişki uyumu hesaplayıcı.",
                    path: "/astroloji/7-ev-hesaplama",
                    applicationCategory: "LifestyleApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Astroloji", path: "/astroloji" },
                { name: "7. Ev Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    7. Ev Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Doğum haritanızda 7. evinizi keşfedin ve evlilik, ortaklık burcunuzu öğrenin.
                </p>
            </div>

            <SeventhHouseCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Astrolojide 7. Ev Nedir?</h2>
                <p>
                    <strong>7. Ev</strong>, astrolojide evlilik, ciddi romantik ilişkiler, iş ortaklıkları ve
                    &quot;öteki&quot; kavramını temsil eden en önemli evlerden biridir. Yükselen burcunuzun tam
                    karşısında yer alır ve &quot;Descendant&quot; (alçalan burç) olarak da bilinir.
                </p>
                <p>
                    1. ev &quot;ben&quot;i temsil ederken, 7. ev &quot;biz&quot;i ve hayatımıza dahil ettiğimiz
                    partnerleri temsil eder. Bu ev, bilinçdışı olarak partnerde aradığımız özellikleri gösterir.
                </p>

                <h2>7. Ev Neyi Temsil Eder?</h2>
                <ul>
                    <li><strong>Evlilik ve ciddi ilişkiler:</strong> Hayat partneri seçimi</li>
                    <li><strong>İş ortaklıkları:</strong> Ticari ilişkiler ve anlaşmalar</li>
                    <li><strong>Açık düşmanlar:</strong> Bilinen rakipler</li>
                    <li><strong>Dava ve sözleşmeler:</strong> Hukuki konular</li>
                    <li><strong>Danışmanlık:</strong> Bire bir ilişkiler</li>
                </ul>

                <h2>7. Ev Nasıl Hesaplanır?</h2>
                <p>
                    7. ev, yükselen burcunuzun tam karşısında yer alır. Her burç 30 derece olduğundan,
                    yükselen burcunuzun 180 derece karşısındaki burç 7. evinizi gösterir.
                </p>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Yükselen Burç</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">7. Ev Burcu</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Partner Özellikleri</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">♈ Koç</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♎ Terazi</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Diplomatik, zarif, dengeli</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">♉ Boğa</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♏ Akrep</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Tutkulu, yoğun, sadık</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">♊ İkizler</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♐ Yay</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Maceracı, özgür, felsefi</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">♋ Yengeç</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♑ Oğlak</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Sorumlu, hırslı, güvenilir</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">♌ Aslan</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♒ Kova</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Yenilikçi, bağımsız, özgün</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">♍ Başak</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♓ Balık</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Romantik, empatik, sanatsal</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">♎ Terazi</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♈ Koç</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Enerjik, cesur, lider</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">♏ Akrep</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♉ Boğa</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Sadık, duyusal, kararlı</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">♐ Yay</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♊ İkizler</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Zeki, iletişimci, meraklı</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">♑ Oğlak</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♋ Yengeç</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Şefkatli, koruyucu, aile odaklı</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">♒ Kova</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♌ Aslan</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Karizmatik, cömert, tutkulu</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">♓ Balık</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♍ Başak</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Pratik, yardımsever, organize</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>7. Evdeki Gezegenler</h2>
                <p>7. evde gezegen bulunan kişiler için ilişkiler hayatın önemli bir temasıdır:</p>
                <ul>
                    <li><strong>Güneş:</strong> Kimliğinizi ilişkiler üzerinden tanımlarsınız</li>
                    <li><strong>Ay:</strong> Duygusal güvenliğiniz partnerle bağlantılı</li>
                    <li><strong>Venüs:</strong> Romantik ve uyumlu ilişkilere yatkın (en iyi yerleşim)</li>
                    <li><strong>Mars:</strong> Tutkulu ama bazen çatışmalı ilişkiler</li>
                    <li><strong>Jüpiter:</strong> Şanslı evlilik, yabancı partner olasılığı</li>
                    <li><strong>Satürn:</strong> Geç evlilik, ciddi ve kalıcı bağlar</li>
                </ul>

                <h2>7. Ev Yöneticisi</h2>
                <p>
                    7. evinizdeki burcun yönetici gezegeni, ilişkilerinizin nasıl şekilleneceğini gösterir.
                    Bu gezegenin haritanızdaki konumu, partneri nerede veya nasıl bulabileceğinize dair ipuçları verir.
                </p>

                <h2>Sıkça Sorulan Sorular (SSS)</h2>

                <h3>7. ev burcu ile evlenmeli miyim?</h3>
                <p>
                    7. ev burcunuz, çekildiğiniz partner özelliklerini gösterir ama bu burçtan biriyle evlenmek
                    zorunlu değildir. Önemli olan partnerin haritasında bu enerjileri taşımasıdır.
                </p>

                <h3>7. evim boş, evlenmeyecek miyim?</h3>
                <p>
                    Hayır! 7. evin boş olması evlenmeyeceğiniz anlamına gelmez. Bu durumda 7. evin yönetici
                    gezegenine ve burcuna bakılır.
                </p>

                <h3>7. ev sadece evliliği mi gösterir?</h3>
                <p>
                    Hayır. 7. ev tüm bire bir ilişkileri, iş ortaklıklarını, danışmanlık ilişkilerini ve
                    açık düşmanları da temsil eder.
                </p>

                <h3>1. ev ve 7. ev arasındaki fark nedir?</h3>
                <p>
                    1. ev &quot;ben&quot;i, 7. ev &quot;biz&quot;i temsil eder. 1. ev kendinizi nasıl
                    sunduğunuzu, 7. ev başkalarıyla nasıl ilişki kurduğunuzu gösterir.
                </p>

                <h2>7. Eve Göre İdeal Partner</h2>
                <p>
                    7. evinizdeki burç, bilinçdışı olarak partnerde aradığınız özellikleri gösterir.
                    Bu özellikler bazen &quot;gölge&quot; yönlerinizi temsil eder - yani kendinizde
                    geliştirmediğiniz ama partnerde aradığınız özellikler.
                </p>
                <p>
                    Örneğin, 1. evi Koç (bağımsız, lider) olan birinin 7. evi Terazi&apos;dir (uyumlu, diplomatik).
                    Bu kişi, diplomatik ve uyumlu bir partner arar çünkü kendi &quot;sert&quot; enerjisini
                    dengeleyecek birine ihtiyaç duyar.
                </p>
            </article>
        </div>
    )
}
