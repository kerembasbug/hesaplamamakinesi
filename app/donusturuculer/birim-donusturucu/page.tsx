import { UnitConverter } from "@/components/calculators/converter/unit-converter"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import Link from "next/link"
import { BirimCeviriciLinkleri } from "@/components/content/birim-cevirici-linkleri"
import { SSS } from "@/components/content/sss"

export const metadata = buildMetadata({
    title: "Birim Dönüştürücü - Tüm Ölçü Birimleri",
    description: "Ücretsiz birim dönüştürücü. Metre-feet, kilogram-pound, litre-galon dönüşümleri; uzunluk, ağırlık, alan, hacim ve sıcaklık birimleri tek araçta.",
    keywords: ["birim dönüştürücü", "metre feet", "kilogram pound", "litre galon", "birim çevirici"],
    path: "/donusturuculer/birim-donusturucu",
})

export default function BirimDonusturucuPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Birim Dönüştürücü",
                    description: "Online birim dönüştürücü aracı. Metre-feet, kilogram-pound, litre-galon dönüşümleri. Uzunluk, ağırlık, alan ve hacim birimleri.",
                    path: "/donusturuculer/birim-donusturucu",
                    applicationCategory: "UtilitiesApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Dönüştürücüler", path: "/donusturuculer" },
                { name: "Birim Dönüştürücü" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Birim Dönüştürücü</h1>
                <p className="text-slate-600 dark:text-slate-400">Uzunluk, ağırlık, alan ve hacim birimlerini dönüştürün.</p>
            </div>

            <UnitConverter />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Birim Dönüştürücü Nedir?</h2>
                <p>
                    <strong>Birim dönüştürücü</strong>, bir ölçüyü farklı bir ölçü birimine çeviren araçtır.
                    Metreyi feet&apos;e, kilogramı pound&apos;a, santigradı Fahrenheit&apos;a çevirmek gibi
                    işlemler tek bir katsayı ya da formülle yapılır. Bu sayfadaki araç, en sık kullanılan
                    birim ailelerini tek ekranda toplar.
                </p>
                <p>
                    Türkiye 1931&apos;de metrik sisteme geçti. Buna rağmen ekran boyutu inç, uçuş irtifası
                    feet, altın fiyatı ons, boru çapı inç ile ifade edilmeye devam ediyor. Emperyal birimlerle
                    karşılaşmanızın nedeni bu birimlerin uluslararası sektörlerde standart olarak kalmasıdır.
                </p>

                <h2>Metrik ve Emperyal Sistem Farkı</h2>
                <p>
                    Metrik sistem 10&apos;un katlarına dayanır: 1 km = 1.000 m, 1 m = 100 cm. Bu yüzden
                    dönüşümler virgül kaydırmakla yapılabilir. Emperyal sistemde ise katsayılar düzensizdir:
                    1 feet = 12 inç, 1 yarda = 3 feet, 1 mil = 5.280 feet. Bu düzensizlik, dönüşümlerde
                    hesap makinesine ihtiyaç duymanın asıl nedenidir.
                </p>

                <h2>Temel Dönüşüm Katsayıları</h2>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr><th>Dönüşüm</th><th>Katsayı</th><th>Örnek</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>inç → cm</td><td>× 2,54</td><td>10 inç = 25,4 cm</td></tr>
                            <tr><td>feet → m</td><td>× 0,3048</td><td>6 feet = 1,83 m</td></tr>
                            <tr><td>mil → km</td><td>× 1,609344</td><td>10 mil = 16,09 km</td></tr>
                            <tr><td>pound → kg</td><td>× 0,453592</td><td>150 lb = 68,04 kg</td></tr>
                            <tr><td>ons → gram</td><td>× 28,3495</td><td>8 oz = 226,80 g</td></tr>
                            <tr><td>galon (ABD) → litre</td><td>× 3,78541</td><td>10 gal = 37,85 L</td></tr>
                        </tbody>
                    </table>
                </div>

                <h2>Sıcaklık Dönüşümü Neden Farklı?</h2>
                <p>
                    Uzunluk ve ağırlık birimleri sabit bir çarpanla dönüşür çünkü sıfır noktaları ortaktır:
                    0 metre ile 0 feet aynı yeri gösterir. Sıcaklık ölçekleri ise farklı sıfır noktalarına
                    sahiptir. 0 °C, 32 °F&apos;ye denk gelir. Bu yüzden dönüşümde çarpmanın yanında bir de
                    kaydırma terimi vardır: <strong>(°C × 1,8) + 32 = °F</strong>.
                </p>

                <h2>Alan ve Hacim Dönüşümünde Kare ve Küp Etkisi</h2>
                <p>
                    Uzunluk katsayısı alan dönüşümünde karesi, hacim dönüşümünde küpü alınarak kullanılır.
                    1 m = 100 cm olduğu için 1 m² = 10.000 cm², 1 m³ = 1.000.000 cm³ olur. Bu ayrımı atlamak,
                    inşaat ve tarım hesaplarında en sık yapılan hatadır. Türkiye&apos;de tarım arazilerinde
                    kullanılan dönüm 1.000 m², dekar da 1.000 m²&apos;dir; hektar ise 10.000 m² yani 10 dönümdür.
                </p>

                <h2>En Çok Aranan Hazır Dönüşümler</h2>
                <p>
                    Aşağıdaki bağlantılar, tek tek hesaplanmış dönüşüm sayfalarına götürür. Her sayfada formül,
                    adım adım hesap, komşu değerler tablosu ve görsel skala bulunur.
                </p>
                <BirimCeviriciLinkleri ornekSayisi={4} />

                <h2>Dönüşüm Yaparken Sık Yapılan Hatalar</h2>
                <ul>
                    <li>Alan dönüşümünde uzunluk katsayısını karesini almadan kullanmak.</li>
                    <li>ABD galonu (3,785 L) ile İngiliz galonunu (4,546 L) karıştırmak.</li>
                    <li>Gıda onsu (28,35 g) ile troy onsu (31,10 g) karıştırmak; altın hesaplarında troy geçerlidir.</li>
                    <li>Metrik ton (1.000 kg), short ton (907 kg) ve long ton (1.016 kg) ayrımını gözden kaçırmak.</li>
                    <li>Kara mili (1.609 m) ile deniz milini (1.852 m) aynı sanmak.</li>
                    <li>Sıcaklıkta kaydırma terimini unutup yalnızca çarpma yapmak.</li>
                </ul>

                <SSS
                    baslik="Birim Dönüştürücü Hakkında Sıkça Sorulan Sorular"
                    sorular={[
                        {
                            question: "1 inç kaç cm eder?",
                            answer:
                                "1 inç tam olarak 2,54 santimetredir. Bu değer 1959 uluslararası yarda ve pound anlaşmasıyla kesinleştirilmiştir; yaklaşık bir sayı değil, tanım gereği tamdır.",
                        },
                        {
                            question: "1 pound kaç kilogram?",
                            answer:
                                "1 pound (avoirdupois) 0,45359237 kilogramdır. Pratikte 1 kg ≈ 2,2 pound olarak da hatırlanabilir.",
                        },
                        {
                            question: "1 dönüm kaç metrekare?",
                            answer:
                                "Türkiye'de 1 dönüm 1.000 m² kabul edilir ve dekarla aynı anlama gelir. 1 hektar ise 10.000 m², yani 10 dönümdür.",
                        },
                        {
                            question: "Sıcaklık dönüşümünde neden çarpma yetmiyor?",
                            answer:
                                "Santigrat ve Fahrenheit ölçeklerinin sıfır noktaları farklıdır: 0 °C, 32 °F'ye denk gelir. Bu yüzden formülde çarpmanın yanında 32'lik bir kaydırma terimi de bulunur.",
                        },
                        {
                            question: "Alan dönüşümünde katsayı neden kareleniyor?",
                            answer:
                                "Alan iki boyutlu olduğu için uzunluk katsayısı iki kez uygulanır. 1 m = 100 cm ise 1 m² = 100 × 100 = 10.000 cm² olur.",
                        },
                    ]}
                />

                <h2>İlgili Dönüştürücüler</h2>
                <ul>
                    <li><Link href="/donusturuculer/uzunluk-donusturucu">Uzunluk dönüştürücü</Link></li>
                    <li><Link href="/donusturuculer/agirlik-donusturucu">Ağırlık dönüştürücü</Link></li>
                    <li><Link href="/donusturuculer/sicaklik-donusturucu">Sıcaklık dönüştürücü</Link></li>
                    <li><Link href="/donusturuculer/alan-donusturucu">Alan dönüştürücü</Link></li>
                    <li><Link href="/birim">Birim çevirici — tüm dönüşüm tabloları</Link></li>
                </ul>

                <p className="text-sm">
                    <strong>Kaynak:</strong>{" "}
                    <a href="https://www.bipm.org/en/measurement-units" target="_blank" rel="noopener">
                        BIPM — Uluslararası Birim Sistemi (SI)
                    </a>
                    . Katsayılar SI tanımlarına ve 1959 uluslararası yarda-pound anlaşmasına dayanır.
                </p>
            </article>
        </div>
    )
}
