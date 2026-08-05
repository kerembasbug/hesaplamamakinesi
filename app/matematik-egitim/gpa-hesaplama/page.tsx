import { GpaCalculator } from "@/components/calculators/education/gpa-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import Link from "next/link"
import { FormulGorseli } from "@/components/content/formul-gorseli"
import { SSS } from "@/components/content/sss"

export const metadata = buildMetadata({
    title: "GPA Hesaplama - Not Ortalaması",
    description: "GPA (genel not ortalaması) hesaplama aracı. Ders kredileri ve harf notlarınıza göre 4.0 üzerinden ortalamanızı hesaplayın; AGNO dönüşümü dahildir.",
    keywords: ["gpa hesaplama", "not ortalaması hesaplama", "üniversite not ortalaması", "gpa calculator", "ortalama hesaplama"],
    path: "/matematik-egitim/gpa-hesaplama",
})

export default function GpaHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "GPA Hesaplama",
                    description: "GPA (Genel Not Ortalaması) hesaplama aracı. Ders kredileri ve harf notlarına göre 4.0 üzerinden GPA hesaplayın.",
                    path: "/matematik-egitim/gpa-hesaplama",
                    applicationCategory: "EducationalApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Matematik & Eğitim", path: "/matematik-egitim" },
                { name: "GPA Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">GPA Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Ders kredileri ve harf notlarınıza göre genel not ortalamanızı hesaplayın.</p>
            </div>

            <GpaCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>GPA Hesaplama Nedir ve Nasıl Yapılır?</h2>
                <p>
                    <strong>GPA hesaplama</strong> (Grade Point Average — genel not ortalaması), aldığınız
                    derslerin harf notlarını kredileriyle ağırlıklandırarak tek bir sayıya indirger. Türkiye&apos;de
                    üniversiteler bu değeri çoğunlukla 4,00 üzerinden gösterir ve AGNO (ağırlıklı genel not
                    ortalaması) olarak adlandırır.
                </p>
                <p>
                    GPA basit bir ortalama değildir: 6 kredilik bir dersin sonuca etkisi, 2 kredilik bir dersin
                    üç katıdır. Bu yüzden yüksek kredili derslerde alınan düşük not ortalamayı beklediğinizden
                    çok daha fazla aşağı çeker.
                </p>

                <h2>GPA Hesaplama Formülü</h2>
                <FormulGorseli
                    slug="gpa"
                    alt="GPA hesaplama formülü: kredi çarpı katsayı toplamının toplam krediye bölümü"
                />

                <h2>Harf Notu – Katsayı Tablosu</h2>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr><th>Harf Notu</th><th>4&apos;lük Katsayı</th><th>Yaklaşık 100&apos;lük Karşılık</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>AA</td><td>4,00</td><td>90 – 100</td></tr>
                            <tr><td>BA</td><td>3,50</td><td>85 – 89</td></tr>
                            <tr><td>BB</td><td>3,00</td><td>80 – 84</td></tr>
                            <tr><td>CB</td><td>2,50</td><td>75 – 79</td></tr>
                            <tr><td>CC</td><td>2,00</td><td>70 – 74</td></tr>
                            <tr><td>DC</td><td>1,50</td><td>65 – 69</td></tr>
                            <tr><td>DD</td><td>1,00</td><td>60 – 64</td></tr>
                            <tr><td>FF</td><td>0,00</td><td>0 – 59</td></tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    Bu tablo yaygın uygulamadır; her üniversitenin yönetmeliği aralıkları biraz farklı
                    belirleyebilir. Kendi transkriptinizdeki katsayıları esas alın.
                </p>

                <h2>Adım Adım Örnek GPA Hesabı</h2>
                <ol>
                    <li>Matematik I — 5 kredi, AA (4,00) → 5 × 4,00 = <strong>20,00</strong></li>
                    <li>Fizik I — 4 kredi, BB (3,00) → 4 × 3,00 = <strong>12,00</strong></li>
                    <li>Türk Dili — 2 kredi, CC (2,00) → 2 × 2,00 = <strong>4,00</strong></li>
                    <li>Toplam kalite puanı: 20 + 12 + 4 = <strong>36,00</strong></li>
                    <li>Toplam kredi: 5 + 4 + 2 = <strong>11</strong></li>
                    <li>GPA = 36,00 ÷ 11 = <strong>3,27</strong></li>
                </ol>

                <h2>Dönem GPA&apos;sı ile Genel GPA Farkı</h2>
                <p>
                    <strong>Dönem ortalaması (DNO)</strong> yalnızca o yarıyılda aldığınız dersleri kapsar.
                    <strong> Genel ortalama (AGNO/CGPA)</strong> ise öğrenimin başından bugüne aldığınız tüm
                    dersleri kapsar. Burs, onur belgesi ve yatay geçiş başvurularında genellikle AGNO dikkate
                    alınır; şartlı geçme ve ders tekrarı kararlarında ise DNO belirleyici olabilir.
                </p>

                <h2>GPA&apos;nızı Yükseltmenin Matematiği</h2>
                <p>
                    Ortalamanızı yükseltmek istiyorsanız hangi derse yükleneceğinizi kredi belirler. 30 kredilik
                    bir geçmişiniz ve 2,80 ortalamanız varsa, 6 kredilik bir dersten AA almak ortalamanızı yaklaşık
                    0,20 puan yukarı çeker; 2 kredilik bir dersten AA almak ise ancak 0,07 puan katkı sağlar.
                </p>
                <ul>
                    <li>Yüksek kredili derslere orantısız zaman ayırın; getirileri çok daha yüksektir.</li>
                    <li>FF alınan yüksek kredili bir dersi tekrar etmek, yeni ders almaktan daha etkilidir.</li>
                    <li>Ders sayısı arttıkça tek bir dersin ortalamaya etkisi hızla azalır; erken dönemler kritiktir.</li>
                    <li>Not yükseltme sınavlarında öncelik sırasını krediye göre kurun.</li>
                </ul>

                <h2>Yurt Dışı Başvurularında GPA</h2>
                <p>
                    ABD üniversiteleri 4,00&apos;lük sistemi doğrudan kabul eder. Avrupa&apos;da ise çoğunlukla
                    100&apos;lük not veya ECTS derecesi istenir. Dönüşüm için transkriptinizdeki resmî 100&apos;lük
                    karşılığı kullanmanız gerekir; katsayıdan geri hesaplama yapmak kabul edilmez. YÖK denklik
                    işlemlerinde de transkriptin kendisi esas alınır.
                </p>

                <SSS
                    baslik="GPA Hesaplama Hakkında Sıkça Sorulan Sorular"
                    sorular={[
                        {
                            question: "GPA nasıl hesaplanır?",
                            answer:
                                "Her dersin kredisi harf notunun katsayısıyla çarpılır, bu çarpımların toplamı toplam krediye bölünür. Örneğin 5 kredi AA (20,00) ve 4 kredi BB (12,00) alan bir öğrencinin GPA'sı 32 ÷ 9 = 3,56 olur.",
                        },
                        {
                            question: "GPA ile AGNO aynı şey mi?",
                            answer:
                                "Evet, aynı hesabın iki adıdır. Türkiye'de üniversiteler ağırlıklı genel not ortalaması için AGNO, uluslararası kullanımda GPA veya CGPA terimi tercih edilir.",
                        },
                        {
                            question: "Kaç GPA iyi kabul edilir?",
                            answer:
                                "Genel olarak 3,00 üzeri iyi, 3,50 üzeri onur derecesi kabul edilir. Yüksek lisans başvurularının çoğunda alt sınır 2,50 civarındadır; burslu programlarda 3,00 ve üzeri istenir.",
                        },
                        {
                            question: "FF alınan ders ortalamaya nasıl etki eder?",
                            answer:
                                "FF katsayısı 0,00'dır ama dersin kredisi toplam krediye eklenir. Bu yüzden FF, ortalamayı hem pay tarafına katkı yapmayarak hem de paydayı büyüterek iki kez düşürür.",
                        },
                        {
                            question: "Ders tekrarında eski not silinir mi?",
                            answer:
                                "Çoğu üniversitede tekrar edilen dersin en son notu geçerli olur ve eski not ortalamadan çıkarılır. Bazı yönetmeliklerde iki not da transkriptte kalır; kendi yönetmeliğinizi kontrol edin.",
                        },
                    ]}
                />

                <h2>İlgili Hesaplama Araçları</h2>
                <ul>
                    <li><Link href="/matematik-egitim/ortalama-hesaplama">Ortalama hesaplama</Link> — ağırlıksız aritmetik ortalama</li>
                    <li><Link href="/matematik-egitim/yuzde-hesaplama">Yüzde hesaplama</Link></li>
                    <li><Link href="/matematik-egitim/dgs-puan-hesaplama">DGS puan hesaplama</Link></li>
                    <li><Link href="/matematik-egitim">Tüm matematik ve eğitim hesaplayıcıları</Link></li>
                </ul>

                <p className="text-sm">
                    <strong>Kaynak:</strong>{" "}
                    <a href="https://www.yok.gov.tr/" target="_blank" rel="noopener">
                        Yükseköğretim Kurulu (YÖK)
                    </a>
                    . Not dönüşüm aralıkları üniversite yönetmeliklerine göre değişebilir.
                </p>
            </article>
        </div>
    )
}
