import { WeightConverter } from "@/components/calculators/converter/weight-converter"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import Link from "next/link"
import { BirimCeviriciLinkleri } from "@/components/content/birim-cevirici-linkleri"

export const metadata = buildMetadata({
    title: "Ağırlık Dönüştürücü - kg, Pound, Ons",
    description: "Ücretsiz ağırlık birimi dönüştürücü. Kilogram, gram, miligram, ton, pound ve ons arasında anında çevirme yapın; dönüşüm tablosuyla sonucu doğrulayın.",
    keywords: ["ağırlık dönüştürücü", "kilogram pound çevirici", "kg lbs çevirme", "gram ons çevirici", "ağırlık birimi çevirme"],
    path: "/donusturuculer/agirlik-donusturucu",
})

export default function AgirlikDonusturucuPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Ağırlık Dönüştürücü",
                    description: "Online ağırlık birim dönüştürücü. Kilogram, gram, pound, ons, ton ve stone arasında hızlı ve kolay çevirme.",
                    path: "/donusturuculer/agirlik-donusturucu",
                    applicationCategory: "UtilitiesApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Dönüştürücüler", path: "/donusturuculer" },
                { name: "Ağırlık Dönüştürücü" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Ağırlık Dönüştürücü</h1>
                <p className="text-slate-600 dark:text-slate-400">Kilogram, pound, ons ve diğer ağırlık birimleri arasında dönüşüm yapın.</p>
            </div>

            <WeightConverter />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Ağırlık ve Kütle Dönüştürücü: Gram, Kilogram, Libre ve Daha Fazlası</h2>
                <p>
                    Ağırlık ve kütle ölçümleri, mutfaktaki tariflerden laboratuvardaki hassas deneylere, spor salonundaki antrenmanlardan
                    lojistik sektöründeki devasa yüklere kadar hayatın her aşamasında karşımıza çıkar. <strong>Ağırlık dönüştürücü</strong> aracımız,
                    Metrik ve Imperial (İngiliz) sistemleri arasındaki karmaşayı ortadan kaldırarak saniyeler içinde doğru sonuçlara ulaşmanızı sağlar.
                </p>

                <h2>Kütle mi, Ağırlık mı? Farkı Biliyor musunuz?</h2>
                <p>
                    Günlük dilde &quot;ağırlık&quot; ve &quot;kütle&quot; kelimelerini birbirinin yerine kullansak da, fizikte aralarında önemli bir fark vardır.
                    <strong>Kütle</strong>, bir cismin sahip olduğu madde miktarını temsil eder ve evrenin her yerinde sabittir.
                    <strong>Ağırlık</strong> ise bu kütleye etki eden yerçekimi kuvvetidir. Yani Ay&apos;a giderseniz kütleniz aynı kalır ama ağırlığınız
                    yaklaşık altıda birine iner. Aracımız, dünya standartlarındaki yerçekimi ivmesini baz alarak bu birimleri sizin için dönüştürür.
                </p>

                <h2>Dünyada Kullanılan Temel Birim Sistemleri</h2>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Sistem</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Temel Birimler</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Yaygın Kullanım</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Metrik (SI)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Gram (g), Kilogram (kg), Ton (t)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Mutfak tartıları, market alışverişleri, sanayi.</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Imperial (İngiliz)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Libre (lb), Ons (oz), Stone (st)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Fitness (dumbbella), ABD mutfak tarifleri.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>Popüler Birimlerin Dönüşüm Oranları</h2>
                <ul>
                    <li><strong>1 Kilogram (kg):</strong> Yaklaşık 2.20462 Libre (lb) eder.</li>
                    <li><strong>1 Libre (lb):</strong> 453.592 grama eşittir.</li>
                    <li><strong>1 Ons (oz):</strong> Yaklaşık 28.35 gramdır (altın ve mutfak tartılarında çok kullanılır).</li>
                    <li><strong>1 Ton:</strong> 1.000 kilogramdır.</li>
                    <li><strong>1 Miligram (mg):</strong> Gramın binde biridir (ilaç dozajlarında kritiktir).</li>
                </ul>

                <p>1 pound = 0.453592 kilogramdır. ABD&apos;den sipariş verirken veya yabancı sporcuların ağırlıklarını anlamak için bu dönüşüm önemlidir.</p>

                <h2>1 ons kaç gram?</h2>
                <p>1 ons = 28.3495 gramdır. Özellikle mutfak tariflerinde ve kuyumculukta sıkça kullanılır.</p>

                <h2>Stone nedir?</h2>
                <p>Stone, İngiltere&apos;de yaygın olarak kullanılan bir ağırlık birimidir. 1 stone = 6.35029 kg = 14 pound&apos;dur.</p>

                <h2>Karat vs gram farkı nedir?</h2>
                <p>Karat, değerli taşların ölçümünde kullanılan özel bir birimdir. 1 karat = 0.2 gram = 200 miligramdır.</p>
                <h2>En Çok Aranan Ağırlık Dönüşümleri</h2>
                <p>
                    Aşağıdaki bağlantılar, tek tek hesaplanmış ağırlık dönüşümlerine götürür. Her sayfada
                    formül, adım adım hesap, komşu değerler tablosu ve görsel skala bulunur.
                </p>
                <BirimCeviriciLinkleri kategori="agirlik" />
                <p>
                    Tüm çeviricileri ve dönüşüm tablolarını <Link href="/birim">birim çevirici</Link> sayfasından
                    görebilirsiniz.
                </p>
            </article>
        </div>
    )
}
