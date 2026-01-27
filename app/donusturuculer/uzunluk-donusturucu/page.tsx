import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { LengthConverter } from "@/components/calculators/converter/length-converter"

export const metadata: Metadata = {
    title: "Uzunluk Dönüştürücü - Metre, Feet, İnç, Mil Çevirici",
    description: "Online uzunluk birim dönüştürücü. Metre, kilometre, santimetre, milimetre, feet, inç, mil ve yarda arasında hızlı ve kolay çevirme.",
    keywords: ["uzunluk dönüştürücü", "metre feet çevirici", "inç cm çevirici", "mil km çevirme", "uzunluk birimi çevirme"]
}

export default function UzunlukDonusturucuPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/donusturuculer" className="hover:text-indigo-600 transition-colors">Dönüştürücüler</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Uzunluk Dönüştürücü</span>
            </nav>

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

                <h3>Ölçü Sistemlerinin Tarihçesi ve Farklılıkları</h3>
                <p>
                    Günümüzde dünyada kullanılan iki ana ölçü sistemi bulunmaktadır: <strong>Metrik Sistem (SI)</strong> ve
                    <strong>Imperial (İngiliz) Sistemi</strong>. Metrik sistem, 18. yüzyılın sonlarında Fransa&apos;da geliştirilmiş ve
                    ondalık tabana dayalı olduğu için (10, 100, 1000) dünya genelinde standart kabul edilmiştir. Türkiye dahil çoğu ülke
                    metrik sistemi kullanırken, Amerika Birleşik Devletleri, Liberya ve Myanmar hala ağırlıklı olarak Imperial sistemini kullanmaktadır.
                </p>

                <h3>Hangi Birim Hangi Alanda Kullanılır?</h3>
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

                <h3>Temel Uzunluk Dönüşüm Katsayıları</h3>
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

                <h3>Uzunluk Dönüştürücü Nasıl Kullanılır?</h3>
                <p>
                    Online aracımız kullanımı son derece basittir:
                    1. İlk kutuya dönüştürmek istediğiniz değeri girin.
                    2. İkinci seçim menüsünden bu değerin hangi birimde olduğunu (örneğin İnç) seçin.
                    3. Üçüncü seçim menüsünden hedef birimi (örneğin Sanimetre) seçin.
                    4. Sonuç anında ekranınızda belirecek, hiçbir &quot;Hesapla&quot; butonuna basmanıza gerek kalmayacaktır.
                </p>

                <h3>Özel Alanlarda Uzunluk Birimleri</h3>
                <h4>Denizcilik ve Havacılık</h4>
                <p>
                    Denizcilikte kara milinden farklı olarak &quot;Deniz Mili&quot; kullanılır. Bu birim, Dünya&apos;nın meridyen dairesi
                    üzerindeki 1 dakikalık yayın uzunluğuna eşittir. Bu yüzden navigasyon hesaplamalarında standart kabul edilir.
                </p>

                <h4>Astronomi ve Uzay</h4>
                <p>
                    Kilometrelerin yetersiz kaldığı evrensel boyutlarda &quot;Işık Yılı&quot; veya &quot;Astronomik Birim (AU)&quot; kullanılır.
                    Işık yılı, ışığın boşlukta 1 yılda aldığı mesafedir ve yaklaşık 9.46 trilyon kilometredir.
                </p>

                <h3>Sıkça Sorulan Sorular (SSS)</h3>

                <h4>10 inç kaç cm eder?</h4>
                <p>
                    1 inç 2.54 cm olduğu için, 10 inç tam olarak 25.4 santimetre eder. Tablet ekranlarının boyutlarını bu yöntemle hesaplayabilirsiniz.
                </p>

                <h4>Ayak (Feet) birimi neden 30.48 cm&apos;dir?</h4>
                <p>
                    Tarihsel olarak bir yetişkin erkeğin ayak boyuna odaklı olan bu birim, modern standartlara göre sabitlenmiş ve
                    metrik sistemle uyumlu hale getirilmiştir.
                </p>

                <h4>Kilometreyi mile nasıl çeviririm?</h4>
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
            </article>
        </div>
    )
}
