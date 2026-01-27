import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { BmiCalculator } from "@/components/calculators/health/bmi-calculator"

export const metadata: Metadata = {
    title: "VKİ Hesaplama - Vücut Kitle İndeksi Hesaplayıcı",
    description: "Online VKİ hesaplama aracı. Boy ve kilonuza göre vücut kitle indeksinizi hesaplayın. İdeal kilo aralığı, obezite riski ve sağlık değerlendirmesi.",
    keywords: ["vki hesaplama", "vücut kitle indeksi", "bmi hesaplama", "ideal kilo", "obezite hesaplama", "kilo boy oranı"],
    openGraph: {
        title: "VKİ Hesaplama - Vücut Kitle İndeksi Hesaplayıcı",
        description: "Boy ve kilonuza göre VKİ değerinizi hesaplayın.",
        type: "website",
    }
}

export default function VkiHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                    <Home className="h-4 w-4" />
                    Ana Sayfa
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/saglik-spor" className="hover:text-indigo-600 transition-colors">
                    Sağlık & Spor
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">VKİ Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Vücut Kitle İndeksi (VKİ) Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Boy ve kilonuza göre VKİ değerinizi hesaplayın ve sağlık durumunuzu değerlendirin.
                </p>
            </div>

            <BmiCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Vücut Kitle İndeksi (VKİ) Hesaplama ve Detaylı Sağlık Analizi</h2>
                <p>
                    Vücut Kitle İndeksi (VKİ) veya dünya genelindeki adıyla Body Mass Index (BMI), bir kişinin kilosunun boyuna göre ideal olup olmadığını belirlemek için kullanılan
                    evrensel bir matematiksel formüldür. 1840&apos;larda geliştirilen bu sistem, günümüzde Dünya Sağlık Örgütü (WHO) tarafından obezite ve buna bağlı kronik hastalık
                    risklerini öngörmek için temel bir tarama testi olarak kabul edilir. <strong>VKİ hesaplama</strong> aracımız, boy ve kilo verilerinizi saniyeler içinde analiz ederek
                    size tıbbi standartlarda bir sonuç sunar.
                </p>

                <h3>VKİ Nasıl Hesaplanır? Formül ve Mantık</h3>
                <p>
                    VKİ hesaplama mantığı basittir: Vücut ağırlığınızın (kg), boyunuzun metrekare cinsinden karesine bölünmesiyle elde edilir.
                </p>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 my-6">
                    <p className="font-mono text-center">VKİ = Kilo (kg) / [Boy (m) x Boy (m)]</p>
                </div>
                <p>
                    Bu formül, vücut kompozisyonu (yağ vs. kas) hakkında bilgi vermese de, vücut yoğunluğu ve genel kütle dengesi hakkında bilimsel bir tahmin yürütmeyi sağlar.
                </p>

                <h3>Yaş Gruplarına Göre İdeal VKİ Değerleri</h3>
                <p>
                    Meta-analiz çalışmaları, &quot;ideal&quot; kabul edilen 18.5-24.9 aralığının yaşlandıkça bir miktar kayabileceğini göstermektedir.
                    Özellikle 65 yaş ve üzeri bireylerde bir miktar &quot;bolluk&quot; (22-27 aralığı), kemik erimesi ve enfeksiyon direnci açısından daha sağlıklı kabul edilebilmektedir.
                    Ancak çocuklar ve ergenler için standart yetişkin tablosu kullanılmaz; bunun yerine <strong>Persentil Eğrileri</strong> baz alınır.
                </p>

                <h3>VKİ Kategorileri ve Olası Sağlık Riskleri</h3>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Kategori</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">VKİ Aralığı</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Risk Analizi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Ciddi Zayıf</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Altı - 16.0</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Bağışıklık zayıflığı, vitamin eksikliği.</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Normal</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">18.5 - 24.9</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Düşük kronik hastalık riski.</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Fazla Kilolu</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">25.0 - 29.9</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Tansiyon ve Diyabet başlangıç riski.</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Obezite Sınıf I</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">30.0 - 34.9</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Kalp ve damar yükünde artış.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>VKİ Tek Başına Yeterli mi? Alternatif Ölçümler</h3>
                <p>
                    VKİ&apos;nin en büyük sınırlaması, kas ve yağ ayrımı yapamamasıdır. Bu nedenle şu iki ölçüm de dikkate alınmalıdır:
                </p>
                <ul>
                    <li><strong>Bel Çevresi:</strong> Erkeklerde 102 cm, kadınlarda 88 cm üzeri &quot;abdominal obezite&quot; yani iç organ yağlanması sinyalidir.</li>
                    <li><strong>Bel/Boy Oranı:</strong> Bel çevreniz boyunuzun yarısını geçmemelidir. Bu oran VKİ&apos;den daha hassas bir sağlık göstergesi olabilir.</li>
                </ul>

                <h3>Sıkça Sorulan Sorular (SSS)</h3>

                <h4>Sporcuların VKİ değeri neden yanıltıcı olabilir?</h4>
                <p>
                    Kas dokusu yağ dokusundan çok daha yoğundur. Çok fit ve kaslı bir sporcu, yüksek kütlesi nedeniyle VKİ tablosunda &quot;Obez&quot; görünebilir.
                    Bu durumda yağ oranı ölçümü yapmak daha doğrudur.
                </p>

                <h4>VKİ değerimi nasıl düşürebilirim?</h4>
                <p>
                    VKİ&apos;yi düşürmenin yolu sağlıklı bir kalori açığı yaratmaktır. Günlük aldığınız enerjiden fazlasını yakmak için sürdürülebilir bir beslenme
                    düzeni ve haftalık en az 150 dakikalık fiziksel aktivite (yürüyüş, yüzme vb.) uzmanlarca önerilir.
                </p>

                <h4>Gebelik döneminde VKİ hesaplanır mı?</h4>
                <p>
                    Hayır, gebelik sırasında vücut kütle dengesi tamamen değiştiği için standart VKİ tabloları geçersizdir. Gebelikte kilo takibi doktor rehberliğinde yapılmalıdır.
                </p>

                <h3>Neden Bizim Hesabı Kullanmalısınız?</h3>
                <p>
                    İnternetteki birçok araç eski veya hatalı katsayılar kullanabilir. HesaplamaMakinesi.com olarak en güncel WHO (Dünya Sağlık Örgütü) protokollerini
                    baz alan algoritmalarımızla size en güvenilir sonucu sunuyoruz. Verileriniz hiçbir yere kaydedilmez, tamamen anonim ve saniyeler içinde sonuçlanır.
                </p>
                <p>
                    Hemen yukarıdaki araca boy ve kilonuzu girerek sağlığınız için ilk adımı atın!
                </p>
            </article>
        </div>
    )
}
