import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { PercentageCalculator } from "@/components/calculators/math/percentage-calculator"

export const metadata: Metadata = {
    title: "Yüzde Hesaplama - Online Yüzde Hesaplayıcı",
    description: "Online yüzde hesaplama aracı. Yüzde değeri, yüzde oranı, yüzde artış/azalış hesaplama. İndirim hesaplama, kar marjı hesaplama.",
    keywords: ["yüzde hesaplama", "yüzde hesapla", "indirim hesaplama", "yüzde artış", "yüzde azalış"]
}

export default function YuzdeHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/matematik-egitim" className="hover:text-indigo-600 transition-colors">Matematik & Eğitim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Yüzde Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Yüzde Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Çeşitli yüzde hesaplamalarını hızlıca yapın.</p>
            </div>

            <PercentageCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Yüzde Nedir ve Nasıl Hesaplanır?</h2>
                <p>
                    <strong>Yüzde (%)</strong>, bir bütünün yüzde birlik dilimlerini ifade eden matematiksel bir kavramdır. Latincede
                    &quot;yüz başına&quot; anlamına gelen &quot;per centum&quot; ifadesinden türemiştir. Günlük hayatta indirimler, vergiler, faizler,
                    istatistikler, sınav notları ve daha birçok alanda karşımıza çıkar.
                </p>
                <p>
                    Yüzde hesaplama, temel olarak üç ana işlem türünden oluşur: bir sayının yüzdesini bulma, iki sayı arasındaki
                    yüzde oranını hesaplama ve yüzde değişimini (artış/azalış) belirleme.
                </p>

                <h3>Temel Yüzde Hesaplama Formülleri</h3>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">İşlem Türü</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Formül</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Örnek</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Yüzde Değeri</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Sayı × (Yüzde / 100)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">200&apos;ün %15&apos;i = 200 × 0.15 = 30</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Yüzde Oranı</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">(Kısım / Bütün) × 100</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">25, 200&apos;ün yüzde kaçı? = (25/200) × 100 = %12.5</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Yüzde Artışı</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">((Yeni - Eski) / Eski) × 100</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">100&apos;den 120&apos;ye = ((120-100)/100) × 100 = %20 artış</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Yüzde Azalışı</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">((Eski - Yeni) / Eski) × 100</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">100&apos;den 80&apos;e = ((100-80)/100) × 100 = %20 azalış</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>İndirim Hesaplama: Pratik Örnekler</h3>
                <p>
                    Alışverişte en sık kullanılan yüzde işlemi indirim hesaplamadır. İşte adım adım nasıl yapılacağı:
                </p>
                <ul>
                    <li><strong>Ürün fiyatı:</strong> 500 TL</li>
                    <li><strong>İndirim oranı:</strong> %30</li>
                    <li><strong>İndirim tutarı:</strong> 500 × 0.30 = 150 TL</li>
                    <li><strong>İndirimli fiyat:</strong> 500 - 150 = 350 TL</li>
                </ul>
                <p>
                    <strong>Kısa formül:</strong> İndirimli Fiyat = Fiyat × (1 - İndirim Oranı) → 500 × 0.70 = 350 TL
                </p>

                <h3>İş Hayatında Yüzde Kullanımı</h3>
                <ul>
                    <li><strong>Kar Marjı:</strong> (Satış Fiyatı - Maliyet) / Satış Fiyatı × 100</li>
                    <li><strong>Büyüme Oranı:</strong> (Bu Yıl - Geçen Yıl) / Geçen Yıl × 100</li>
                    <li><strong>KDV Ekleme:</strong> Fiyat × (1 + KDV Oranı) → 100 × 1.20 = 120 TL</li>
                    <li><strong>Stopaj Hesaplama:</strong> Brüt Tutar × Stopaj Oranı</li>
                    <li><strong>Komisyon Hesaplama:</strong> Satış Tutarı × Komisyon Oranı</li>
                </ul>

                <h3>Sıkça Sorulan Sorular (SSS)</h3>

                <h4>Bir sayıya yüzde nasıl eklenir?</h4>
                <p>
                    Sayıyı (1 + yüzde oranı) ile çarpın. Örneğin 100&apos;e %20 eklemek için: 100 × 1.20 = 120.
                    Bu yöntem KDV ekleme veya fiyat artışı hesaplamak için idealdir.
                </p>

                <h4>Bir sayıdan yüzde nasıl çıkarılır?</h4>
                <p>
                    Sayıyı (1 - yüzde oranı) ile çarpın. Örneğin 100&apos;den %20 çıkarmak için: 100 × 0.80 = 80.
                    Bu yöntem indirimli fiyat hesaplamak için kullanışlıdır.
                </p>

                <h4>%20 artış ve sonra %20 azalış aynı değeri verir mi?</h4>
                <p>
                    Hayır! 100&apos;e %20 artış = 120, sonra %20 azalış = 96. Başlangıç değerine dönmezsiniz.
                    Bunun sebebi, ikinci işlemin farklı bir baz üzerinden yapılmasıdır.
                </p>

                <h4>Ardışık yüzde değişimleri nasıl hesaplanır?</h4>
                <p>
                    Her bir değişimi sırayla uygulayın. Örneğin önce %10 artış, sonra %20 artış:
                    100 × 1.10 × 1.20 = 132. Toplam artış %32&apos;dir (%10 + %20 = %30 değil!).
                </p>

                <h3>Yüzde Hesaplamada Dikkat Edilmesi Gerekenler</h3>
                <ul>
                    <li>Yüzde her zaman bir referans değere (baz) göredir; bazı baz değiştirmeden karşılaştırma yapmayın.</li>
                    <li>Ardışık yüzde değişimlerini toplamak yanlış sonuç verir; çarparak hesaplayın.</li>
                    <li>Yüzde puanı ile yüzde değişimi farklıdır: %10&apos;dan %15&apos;e çıkmak 5 yüzde puanı ama %50 artış demektir.</li>
                    <li>İndirim ve artış hesaplamalarında doğru bazı (orijinal fiyat mı, güncel fiyat mı?) kullandığınızdan emin olun.</li>
                </ul>
            </article>
        </div>
    )
}
