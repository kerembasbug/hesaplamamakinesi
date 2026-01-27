import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { AreaConverter } from "@/components/calculators/converter/area-converter"

export const metadata: Metadata = {
    title: "Alan Dönüştürücü - Metrekare, Dönüm, Hektar Çevirici",
    description: "Online alan birim dönüştürücü. Metrekare, dönüm, hektar, acre ve feet kare arasında hızlı ve kolay çevirme. Arazi ve emlak hesaplamaları için.",
    keywords: ["alan dönüştürücü", "metrekare dönüm çevirici", "hektar çevirme", "arazi ölçümü", "alan birimi çevirme"]
}

export default function AlanDonusturucuPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/donusturuculer" className="hover:text-indigo-600 transition-colors">Dönüştürücüler</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Alan Dönüştürücü</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Alan Dönüştürücü</h1>
                <p className="text-slate-600 dark:text-slate-400">Metrekare, dönüm, hektar ve diğer alan birimleri arasında dönüşüm yapın.</p>
            </div>

            <AreaConverter />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Alan Birimleri Nedir?</h2>
                <p>
                    Alan, iki boyutlu bir yüzeyin büyüklüğünü ölçen birimdir. Emlak, tarım ve inşaat
                    sektörlerinde farklı alan birimleri kullanılır. Türkiye&apos;de özellikle dönüm birimi
                    arazi alım-satımlarında yaygındır.
                </p>
                <h2>Alan Dönüştürücü: Metrekare, Dönüm, Hektar ve Ötesi</h2>
                <p>
                    Arazi alım satımından ev dekorasyonuna, tarımsal planlamadan şehir bölge planlamaya kadar &quot;alan&quot; hesaplamaları hayatımızın odağındadır.
                    Özellikle Türkiye gibi hem geleneksel (Dönüm) hem de modern (Metrekare, Hektar) birimlerin bir arada kullanıldığı coğrafyalarda karışıklık yaşanması kaçınılmazdır.
                    <strong>Alan dönüştürücü</strong> aracımız, bir tıkla tüm bu birimler arasında köprü kurarak hesap hatalarını sıfıra indirir.
                </p>

                <h3>Türkiye&apos;de Arazi Ölçü Birimleri ve Dönüm Kavramı</h3>
                <p>
                    Türkiye&apos;de tarla ve arazi ölçümlerinde en sık duyacağınız birim &quot;Dönüm&quot;dür. Osmanlı&apos;dan günümüze taşınan bu terim, aslında
                    modern sistemde <strong>1.000 metrekareye (1 Dekar)</strong> eşittir. Ancak halk arasında hala yaygın olarak &quot;Dönüm&quot; kelimesi tercih edilir.
                    Büyük arazilerde ise &quot;Hektar&quot; birimi devreye girer.
                </p>

                <h3>Sık Kullanılan Alan Birimleri ve Karşılıkları</h3>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Birim</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Metrekare Karşılığı</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Notlar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">1 Dekar (Dönüm)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">1.000 m²</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Tarım arazileri için standarttır.</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">1 Hektar (ha)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">10.000 m²</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">10 dönüme eşittir. Orman ölçümlerinde kullanılır.</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">1 Ar</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">100 m²</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Daha küçük arazi dilimleri için.</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">1 Acre</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">~4.046 m²</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Yabancı emlak sitelerinde sıkça görülür.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>İç Mekan ve Mimari Alan Hesaplamaları</h3>
                <p>
                    Sadece araziler değil, yaşadığımız alanlar da metrekare ile ölçülür. Bir evin &quot;Brüt&quot; ve &quot;Net&quot; metrekaresi arasındaki fark,
                    duvar payları, merdiven boşlukları gibi alanları kapsar. Aracımızla santimetrekareyi metrekareye çevirerek parke veya boya ihtiyacınızı
                    noktası noktasına hesaplayabilirsiniz.
                </p>

                <h3>Alan Dönüşümünde Dikkat Edilmesi Gerekenler</h3>
                <ul>
                    <li><strong>Birim Artışları:</strong> Uzunluk ölçülerinde birimler 10&apos;ar 10&apos;ar büyürken, alan ölçülerinde (kare olduğu için) 100&apos;er 100&apos;er büyür/küçülür.</li>
                    <li><strong>Emlak Terimleri:</strong> Yabancı menşeli emlak sitelerinde &quot;Square Foot (sq ft)&quot; birimiyle karşılaşırsanız, bunu metrekareye çevirmeyi unutmayın (1 m² ≈ 10.76 sq ft).</li>
                    <li><strong>Tarımsal Destekler:</strong> ÇKS (Çiftçi Kayıt Sistemi) kayıtları genellikle &quot;Dekar&quot; üzerinden yapılır.</li>
                </ul>

                <h3>Sıkça Sorulan Sorular (SSS)</h3>

                <h4>1 Hektar kaç dönümdür?</h4>
                <p>
                    1 Hektar tam olarak 10 dönüme (dekar) eşittir. Yani 10.000 metrekaredir. Bir futbol sahası yaklaşık 0.7 hektardır.
                </p>

                <h4>Dönüm ve Dekar aynı şey midir?</h4>
                <p>
                    Evet, modern Türk ölçü sisteminde 1 dönüm resmi olarak 1 dekar yani 1.000 metrekare olarak kabul edilmiştir.
                </p>

                <h4>Eski dönüm ve yeni dönüm farkı nedir?</h4>
                <p>
                    Osmanlı döneminde &quot;eski dönüm&quot; bölgeden bölgeye değişmekle birlikte yaklaşık 919 metrekare civarındaydı.
                    Cumhuriyet sonrası bu değer tam 1.000 metrekare olarak standartlaştırılmıştır.
                </p>

                <h3>Neden Alan Dönüştürücümüz?</h3>
                <p>
                    Alan ölçümü büyük maliyetler doğuran bir konudur. Yanlış bir metrekare hesabı, eksik inşaat malzemesi alınmasına veya
                    gayrimenkul değerlemesinde hatalara yol açabilir. HesaplamaMakinesi.com olarak en güncel matematiksel katsayılarla
                    size en güvenilir sonuçları sunuyoruz. Sade ve anlaşılır arayüzümüzle karmaşık matematik işlemlerini sizin yerinize yapıyoruz.
                </p>
                <p>
                    Hemen gidin, arazi veya oda ölçülerinizi girin ve anında doğru sonuçları görün!
                </p>
            </article>
        </div>
    )
}
