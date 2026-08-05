import { SleepCalculator } from "@/components/calculators/health/sleep-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"

export const metadata = buildMetadata({
    title: "Uyku Hesaplama - Yatma ve Kalkma Saati",
    description: "Uyku döngülerine göre ideal yatma ve kalkma saatlerinizi hesaplayın. 90 dakikalık döngü hesabıyla daha dinlenmiş uyanmak için ücretsiz araç.",
    keywords: ["uyku hesaplama", "uyku hesaplayıcı", "uyku döngüsü hesaplama", "kaçta yatmalıyım", "kaçta kalkmalıyım", "uyku saati hesaplama", "ideal uyku saati"],
    path: "/saglik-spor/uyku-hesaplama",
})

export default function UykuHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Uyku Hesaplama",
                    description: "Online uyku hesaplayıcı. Uyku döngülerine göre ideal yatma ve kalkma saatlerinizi hesaplayın. Daha dinlenmiş uyanmak için uyku döngüsü hesaplama aracı.",
                    path: "/saglik-spor/uyku-hesaplama",
                    applicationCategory: "HealthApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Sağlık & Spor", path: "/saglik-spor" },
                { name: "Uyku Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Uyku Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Uyku döngülerine göre ideal yatma ve kalkma saatlerinizi hesaplayın, daha dinlenmiş uyanın.
                </p>
            </div>

            <SleepCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Uyku Döngüsü Nedir?</h2>
                <p>
                    <strong>Uyku döngüsü</strong>, uyku sırasında tekrar eden fizyolojik bir süreçtir. Her döngü
                    yaklaşık <strong>90 dakika</strong> sürer ve gece boyunca 4-6 döngü yaşarız. Her döngü, hafif
                    uykudan derin uykuya ve REM (Rapid Eye Movement) uykusuna kadar farklı aşamalardan oluşur.
                </p>
                <p>
                    Bir uyku döngüsünün <strong>sonunda</strong> uyanmak, döngünün ortasında uyanmaya göre çok
                    daha dinlenmiş hissetmenizi sağlar. Bu yüzden bazen 6 saat uyuduğunuzda 8 saatten daha
                    dinlenmiş hissedebilirsiniz.
                </p>

                <h2>Uyku Aşamaları</h2>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Aşama</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Süre</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Özellikler</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">N1 - Geçiş</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">1-5 dk</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Uyanıklıktan uykuya geçiş, hafif uyku</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">N2 - Hafif Uyku</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">10-25 dk</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Kalp atışı yavaşlar, vücut ısısı düşer</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">N3 - Derin Uyku</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">20-40 dk</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Fiziksel yenilenme, bağışıklık güçlenir</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">REM - Rüya</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">10-60 dk</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Rüyalar görülür, hafıza pekişir</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>Yaşa Göre İdeal Uyku Süreleri</h2>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Yaş Grubu</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Önerilen Uyku</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Döngü Sayısı</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Bebekler (0-1 yaş)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">12-17 saat</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">8-11 döngü</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Çocuklar (3-5 yaş)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">10-13 saat</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">7-9 döngü</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Okul çağı (6-13 yaş)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">9-11 saat</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">6-7 döngü</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Gençler (14-17 yaş)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">8-10 saat</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">5-7 döngü</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Yetişkinler (18-64 yaş)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">7-9 saat</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">5-6 döngü</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Yaşlılar (65+ yaş)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">7-8 saat</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">5 döngü</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>Kaliteli Uykunun Faydaları</h2>
                <ul>
                    <li><strong>Fiziksel yenilenme:</strong> Hücreler onarılır, kaslar dinlenir</li>
                    <li><strong>Hafıza güçlenir:</strong> Öğrenilenler uzun süreli hafızaya aktarılır</li>
                    <li><strong>Bağışıklık:</strong> Bağışıklık sistemi güçlenir</li>
                    <li><strong>Metabolizma:</strong> İştah hormonları dengelenir</li>
                    <li><strong>Ruh hali:</strong> Stres ve anksiyete azalır</li>
                    <li><strong>Konsantrasyon:</strong> Dikkat ve karar verme yeteneği artar</li>
                    <li><strong>Kalp sağlığı:</strong> Kalp hastalığı riski azalır</li>
                </ul>

                <h2>Uyku Hesaplama Nasıl Çalışır?</h2>
                <p>
                    Uyku hesaplayıcımız şu formülü kullanır:
                </p>
                <ul>
                    <li>Her uyku döngüsü = <strong>90 dakika</strong></li>
                    <li>Uykuya dalma süresi = <strong>~15 dakika</strong></li>
                    <li>Optimal uyku = <strong>5-6 döngü</strong> (7.5-9 saat)</li>
                </ul>
                <p>
                    Kalkış saatinden geriye doğru hesaplama yaparak, uyku döngüsü sonunda uyanmanızı sağlayacak
                    ideal yatma saatlerini belirliyoruz.
                </p>

                <h2>Daha İyi Uyku İçin İpuçları</h2>
                <ol>
                    <li><strong>Düzenli saat:</strong> Her gün aynı saatte yatıp kalkın</li>
                    <li><strong>Karanlık oda:</strong> Perde veya göz bandı kullanın</li>
                    <li><strong>Serin ortam:</strong> 18-20°C ideal uyku sıcaklığıdır</li>
                    <li><strong>Ekranlardan uzak:</strong> Yatmadan 1 saat önce telefonu bırakın</li>
                    <li><strong>Kafein sınırı:</strong> Öğleden sonra kahve içmeyin</li>
                    <li><strong>Akşam yemeği:</strong> Ağır yemekleri yatmadan 3 saat önce bitirin</li>
                    <li><strong>Egzersiz:</strong> Düzenli spor yapın ama akşam geç saatlerde değil</li>
                </ol>

                <h2>Sıkça Sorulan Sorular (SSS)</h2>

                <h3>Neden bazen yorgun uyanıyorum?</h3>
                <p>
                    Büyük ihtimalle bir uyku döngüsünün ortasında (özellikle derin uyku aşamasında) uyanıyorsunuz.
                    Uyku hesaplayıcımız tam da bu sorunu çözmek için tasarlandı.
                </p>

                <h3>90 dakikalık döngü herkes için aynı mı?</h3>
                <p>
                    90 dakika ortalama bir değerdir. Bazı insanlarda 80-110 dakika arasında değişebilir.
                    Birkaç hafta boyunca sonuçları takip ederek kendi döngü sürenizi keşfedebilirsiniz.
                </p>

                <h3>Hafta sonları daha fazla uyumak zararlı mı?</h3>
                <p>
                    &quot;Sosyal jet lag&quot; olarak adlandırılan bu durum, biyolojik saatinizi bozabilir.
                    Haftasonları da dahil düzenli uyku saatlerine uymaya çalışın.
                </p>

                <h3>Şekerleme (kestirme) faydalı mı?</h3>
                <p>
                    Öğleden sonra 20-30 dakikalık şekerlemeler faydalı olabilir. Ancak 30 dakikayı aşan veya
                    akşam saatlerinde yapılan şekerlemeler gece uykusunu bozabilir.
                </p>

                <h3>Uyku borcu telafi edilebilir mi?</h3>
                <p>
                    Kısa süreli uyku eksikliği telafi edilebilir, ancak kronik uyku borcu tam olarak
                    telafi edilemez. Düzenli uyku alışkanlığı edinmek en iyisidir.
                </p>
            </article>
        </div>
    )
}
