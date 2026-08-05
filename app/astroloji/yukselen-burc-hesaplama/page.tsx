import { RisingSignCalculator } from "@/components/calculators/astrology/rising-sign-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"

export const metadata = buildMetadata({
    title: "Yükselen Burç Hesaplama - Ascendant",
    description: "Doğum tarihi ve saatinize göre yükselen burcunuzu öğrenin. Ascendant burç özellikleri, element ve yönetici gezegen bilgileriyle ücretsiz hesaplama.",
    keywords: ["yükselen burç hesaplama", "yükselen burç hesapla", "ascendant hesaplama", "yükselen burcum ne", "yükselen burç nasıl hesaplanır", "rising sign calculator"],
    path: "/astroloji/yukselen-burc-hesaplama",
})

export default function YukselenBurcHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Yükselen Burç Hesaplama",
                    description: "Online yükselen burç hesaplama aracı. Doğum tarihi ve saatinize göre yükselen burcunuzu öğrenin. Ascendant burç özellikleri, element ve yönetici gezegen bilgileri.",
                    path: "/astroloji/yukselen-burc-hesaplama",
                    applicationCategory: "LifestyleApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Astroloji", path: "/astroloji" },
                { name: "Yükselen Burç Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Yükselen Burç Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Doğum tarihi ve saatinizi girerek yükselen burcunuzu (ascendant) öğrenin.
                </p>
            </div>

            <RisingSignCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Yükselen Burç (Ascendant) Nedir?</h2>
                <p>
                    <strong>Yükselen burç</strong> veya <strong>ascendant</strong>, doğduğunuz anda doğu ufkunda yükselmekte
                    olan burçtur. Astrolojide en önemli üç unsurdan biri olan yükselen burç, güneş burcu ve ay burcuyla
                    birlikte &quot;Büyük Üçlü&quot; olarak adlandırılır.
                </p>
                <p>
                    Yükselen burcunuz, dış görünüşünüzü, ilk izleniminizi, spontan tepkilerinizi ve başkalarının sizi
                    nasıl algıladığını belirler. Güneş burcunuz içsel kimliğinizi temsil ederken, yükselen burcunuz
                    dünyaya gösterdiğiniz &quot;maske&quot;yi temsil eder.
                </p>

                <h2>Yükselen Burç Nasıl Hesaplanır?</h2>
                <p>
                    Yükselen burcunuzu hesaplamak için üç bilgiye ihtiyacınız vardır:
                </p>
                <ul>
                    <li><strong>Doğum tarihi:</strong> Güneş burcunuzu belirler</li>
                    <li><strong>Doğum saati:</strong> Yükselen burcun hesaplanması için zorunludur</li>
                    <li><strong>Doğum yeri:</strong> Daha hassas hesaplama için gereklidir</li>
                </ul>
                <p>
                    Her burç yaklaşık 2 saat boyunca ufukta yükselir. Bu nedenle, günün farklı saatlerinde doğan
                    aynı güneş burcundaki kişiler farklı yükselen burçlara sahip olabilir.
                </p>

                <h2>12 Yükselen Burç ve Özellikleri</h2>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Yükselen</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Element</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Fiziksel Görünüm</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">İlk İzlenim</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♈ Koç</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">🔥 Ateş</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Atletik, keskin hatlar</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Enerjik, cesur, rekabetçi</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♉ Boğa</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">🌍 Toprak</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Dolgun, güçlü boyun</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Sakin, güvenilir, zarif</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♊ İkizler</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">💨 Hava</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">İnce yapı, canlı gözler</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Meraklı, konuşkan, zeki</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♋ Yengeç</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">💧 Su</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Yuvarlak yüz, yumuşak hatlar</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Şefkatli, koruyucu, duygusal</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♌ Aslan</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">🔥 Ateş</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Gösterişli, gür saçlar</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Karizmatik, dominant, cömert</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♍ Başak</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">🌍 Toprak</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Derli toplu, temiz görünüm</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Analitik, yardımsever, mütevazı</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♎ Terazi</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">💨 Hava</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Simetrik yüz, çekici</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Zarif, diplomatik, uyumlu</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♏ Akrep</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">💧 Su</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Yoğun bakışlar, manyetik</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Gizemli, tutkulu, kararlı</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♐ Yay</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">🔥 Ateş</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Uzun boylu, geniş gülüş</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">İyimser, maceracı, özgür</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♑ Oğlak</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">🌍 Toprak</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Ciddi ifade, kemiksi yapı</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Sorumlu, hırslı, geleneksel</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♒ Kova</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">💨 Hava</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Sıra dışı stil, özgün</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Yenilikçi, bağımsız, insancıl</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">♓ Balık</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">💧 Su</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Hayalci gözler, yumuşak</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Empatik, sanatsal, mistik</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>Yükselen Burç Neden Önemlidir?</h2>
                <ul>
                    <li><strong>İlk İzlenim:</strong> Tanışmalarda verdiğiniz ilk izlenimi belirler</li>
                    <li><strong>Fiziksel Görünüm:</strong> Vücut tipinizi ve yüz hatlarınızı etkiler</li>
                    <li><strong>Spontan Tepkiler:</strong> Stres anlarındaki otomatik tepkilerinizi şekillendirir</li>
                    <li><strong>Hayata Bakış:</strong> Dünyaya nasıl yaklaştığınızı gösterir</li>
                    <li><strong>Ev Sistemi:</strong> Doğum haritanızın ev yerleşimlerini belirler</li>
                </ul>

                <h2>Sıkça Sorulan Sorular (SSS)</h2>

                <h3>Yükselen burcum güneş burcumla aynı olabilir mi?</h3>
                <p>
                    Evet, gün doğumuna yakın saatlerde doğduysanız yükselen burcunuz güneş burcunuzla aynı olabilir.
                    Bu durumda o burcun özelliklerini çok güçlü yansıtırsınız.
                </p>

                <h3>Doğum saatimi bilmiyorsam ne yapmalıyım?</h3>
                <p>
                    Nüfus müdürlüğünden veya doğduğunuz hastaneden doğum belgenizi talep edebilirsiniz.
                    Bazı astrologlar &quot;rektifikasyon&quot; yöntemiyle hayat olaylarınızdan yola çıkarak
                    doğum saatinizi tahmin edebilir.
                </p>

                <h3>Yükselen burç yaşla değişir mi?</h3>
                <p>
                    Hayır, yükselen burcunuz ömür boyu sabit kalır. Ancak, yaşla birlikte yükselen burcunuzun
                    özelliklerini daha bilinçli kullanmayı öğrenebilirsiniz.
                </p>

                <h3>Güneş burcu mu yükselen burç mu daha önemli?</h3>
                <p>
                    İkisi de önemlidir ama farklı alanları temsil eder. Güneş burcu içsel kimliğinizi,
                    yükselen burç dışsal kişiliğinizi gösterir. Kapsamlı bir anlayış için ikisini birlikte
                    değerlendirmek gerekir.
                </p>

                <h2>Yükselen Burç ve İlişkiler</h2>
                <p>
                    Yükselen burcunuz, romantik ilişkilerde de önemli bir rol oynar. İnsanlar sizi ilk tanıdıklarında
                    yükselen burcunuzun enerjisini algılarlar. Ayrıca 7. evinizi (karşı yükselen) hesaplamak için de
                    yükselen burcunuz temel alınır; bu ev evlilik ve ortaklıkları temsil eder.
                </p>
            </article>
        </div>
    )
}
