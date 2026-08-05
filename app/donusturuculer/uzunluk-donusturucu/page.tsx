import { LengthConverter } from "@/components/calculators/converter/length-converter"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import Link from "next/link"
import { BirimCeviriciLinkleri } from "@/components/content/birim-cevirici-linkleri"

export const metadata = buildMetadata({
    title: "Uzunluk Dönüştürücü - Metre, Feet, İnç",
    description: "Ücretsiz uzunluk birimi dönüştürücü. Metre, kilometre, santimetre, milimetre, feet, inç, mil ve yarda arasında anında ve hatasız çevirme yapın.",
    keywords: ["uzunluk dönüştürücü", "metre feet çevirici", "inç cm çevirici", "mil km çevirme", "uzunluk birimi çevirme"],
    path: "/donusturuculer/uzunluk-donusturucu",
})

export default function UzunlukDonusturucuPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Uzunluk Dönüştürücü",
                    description: "Online uzunluk birim dönüştürücü. Metre, kilometre, santimetre, milimetre, feet, inç, mil ve yarda arasında hızlı ve kolay çevirme.",
                    path: "/donusturuculer/uzunluk-donusturucu",
                    applicationCategory: "UtilitiesApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Dönüştürücüler", path: "/donusturuculer" },
                { name: "Uzunluk Dönüştürücü" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Uzunluk Dönüştürücü</h1>
                <p className="text-slate-600 dark:text-slate-400">Metre, feet, inç ve diğer uzunluk birimleri arasında dönüşüm yapın.</p>
            </div>

            <LengthConverter />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Uzunluk Dönüştürücü: Metre, İnç, Mil ve Daha Fazlası</h2>
                <p>
                    Dünyanın neresinde olursanız olun, mesafe ve uzunluk ölçüleri günlük hayatın ayrılmaz bir parçasıdır.
                    Bir televizyonun ekran boyutuna bakarken inç (inch) birimini, bir yolculuk planlarken kilometre (km) birimini,
                    veya bir mobilya ölçerken santimetre (cm) birimini kullanırız. <strong>Uzunluk dönüştürücü</strong> aracımız,
                    tüm bu farklı birimler arasında hızlı ve hatasız geçiş yapmanızı sağlayarak hayatınızı kolaylaştırır.
                </p>

                <h2>Ölçü Sistemlerinin Tarihçesi ve Farklılıkları</h2>
                <p>
                    Günümüzde dünyada kullanılan iki ana ölçü sistemi bulunmaktadır: <strong>Metrik Sistem (SI)</strong> ve
                    <strong>Imperial (İngiliz) Sistemi</strong>. Metrik sistem, 18. yüzyılın sonlarında Fransa&apos;da geliştirilmiş ve
                    ondalık tabana dayalı olduğu için (10, 100, 1000) dünya genelinde standart kabul edilmiştir. Türkiye dahil çoğu ülke
                    metrik sistemi kullanırken, Amerika Birleşik Devletleri, Liberya ve Myanmar hala ağırlıklı olarak Imperial sistemini kullanmaktadır.
                </p>

                <h2>Hangi Birim Hangi Alanda Kullanılır?</h2>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Birim Türü</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Kullanım Alanı</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Örnek</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">İnç (Inch)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Teknoloji ve Ekranlar</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">6.1 inç telefon ekranı</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Feet (Ayak)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Havacılık ve Yükseklik</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">30.000 feet uçuş irtifası</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Mil (Mile)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Kara ve Hava Mesafesi</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">60 mil/saat hız sınırı</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Mikrometre (µm)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Bilim ve Sanayi</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">İşlemci üretim teknolojisi</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>Temel Uzunluk Dönüşüm Katsayıları</h2>
                <p>
                    Hesaplama yaparken temel aldığımız bazı sabit oranlar şunlardır:
                </p>
                <ul>
                    <li><strong>1 İnç (inch):</strong> 2.54 santimetredir.</li>
                    <li><strong>1 Feet:</strong> 12 inç veya 30.48 santimetredir.</li>
                    <li><strong>1 Yard:</strong> 3 feet veya 0.9144 metredir.</li>
                    <li><strong>1 Kara Mili:</strong> 1.609.344 metredir.</li>
                    <li><strong>1 Deniz Mili (Nautical Mile):</strong> 1.852 metredir.</li>
                </ul>

                <h2>Uzunluk Dönüştürücü Nasıl Kullanılır?</h2>
                <p>
                    Online aracımız kullanımı son derece basittir:
                    1. İlk kutuya dönüştürmek istediğiniz değeri girin.
                    2. İkinci seçim menüsünden bu değerin hangi birimde olduğunu (örneğin İnç) seçin.
                    3. Üçüncü seçim menüsünden hedef birimi (örneğin Sanimetre) seçin.
                    4. Sonuç anında ekranınızda belirecek, hiçbir &quot;Hesapla&quot; butonuna basmanıza gerek kalmayacaktır.
                </p>

                <h2>Özel Alanlarda Uzunluk Birimleri</h2>
                <h2>Denizcilik ve Havacılık</h2>
                <p>
                    Denizcilikte kara milinden farklı olarak &quot;Deniz Mili&quot; kullanılır. Bu birim, Dünya&apos;nın meridyen dairesi
                    üzerindeki 1 dakikalık yayın uzunluğuna eşittir. Bu yüzden navigasyon hesaplamalarında standart kabul edilir.
                </p>

                <h2>Astronomi ve Uzay</h2>
                <p>
                    Kilometrelerin yetersiz kaldığı evrensel boyutlarda &quot;Işık Yılı&quot; veya &quot;Astronomik Birim (AU)&quot; kullanılır.
                    Işık yılı, ışığın boşlukta 1 yılda aldığı mesafedir ve yaklaşık 9.46 trilyon kilometredir.
                </p>

                <h2>Sıkça Sorulan Sorular (SSS)</h2>

                <h3>10 inç kaç cm eder?</h3>
                <p>
                    1 inç 2.54 cm olduğu için, 10 inç tam olarak 25.4 santimetre eder. Tablet ekranlarının boyutlarını bu yöntemle hesaplayabilirsiniz.
                </p>

                <h3>Ayak (Feet) birimi neden 30.48 cm&apos;dir?</h3>
                <p>
                    Tarihsel olarak bir yetişkin erkeğin ayak boyuna odaklı olan bu birim, modern standartlara göre sabitlenmiş ve
                    metrik sistemle uyumlu hale getirilmiştir.
                </p>

                <h3>Kilometreyi mile nasıl çeviririm?</h3>
                <p>
                    Kilometre cinsinden değeri 0.62137 ile çarparak mil değerini elde edebilirsiniz. Örneğin 100 km, yaklaşık 62.1 mildir.
                </p>

                <h3>Neden Uzunluk Dönüştürücümüzü Kullanmalısınız?</h3>
                <p>
                    Hesaplama yaparken yapılabilecek küçük bir virgül hatası, inşaat projelerinden ders ödevlerine kadar büyük sorunlara yol açabilir.
                    Aracımız, bilimsel hassasiyetle kodlanmış algoritmaları sayesinde size her zaman %100 doğru sonuçları sunar.
                    Sadece ana birimler değil, nanometreden nanometreye, mikrondan ışık yılına kadar geniş bir skala ile yanınızdayız.
                </p>
                <p>
                    Hemen yukarıdaki aracı kullanarak ilk dönüşümünüzü yapın ve zamandan tasarruf edin!
                </p>
                <h2>En Çok Aranan Uzunluk Dönüşümleri</h2>
                <p>
                    Aşağıdaki bağlantılar, tek tek hesaplanmış uzunluk dönüşümlerine götürür. Her sayfada
                    formül, adım adım hesap, komşu değerler tablosu ve görsel skala bulunur.
                </p>
                <BirimCeviriciLinkleri kategori="uzunluk" />
                <p>
                    Tüm çeviricileri ve dönüşüm tablolarını <Link href="/birim">birim çevirici</Link> sayfasından
                    görebilirsiniz.
                </p>
            </article>
        </div>
    )
}
