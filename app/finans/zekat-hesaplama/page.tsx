import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { ZekatCalculator } from "@/components/calculators/finance/zekat-calculator"

export const metadata: Metadata = {
    title: "Zekat Hesaplama 2025 - Online Zekat Hesaplayıcı",
    description: "Online zekat hesaplama aracı. Altın, nakit, hisse senedi ve tüm varlıklarınız için zekat miktarını hesaplayın. 2025 nisab değerleri ve zekat oranı ile güncel hesaplama.",
    keywords: ["zekat hesaplama", "zekat hesapla", "zekat hesaplayıcı", "nisab miktarı", "zekat oranı", "zekat nasıl hesaplanır", "altın zekatı", "nakit zekat"],
    openGraph: {
        title: "Zekat Hesaplama 2025 - Online Zekat Hesaplayıcı",
        description: "Tüm varlıklarınız için zekat miktarını kolayca hesaplayın.",
        type: "website",
    }
}

export default function ZekatHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                    <Home className="h-4 w-4" />
                    Ana Sayfa
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/finans" className="hover:text-indigo-600 transition-colors">
                    Finans
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Zekat Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Zekat Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Varlıklarınızı girerek 2025 yılı nisab değerlerine göre zekat miktarınızı hesaplayın.
                </p>
            </div>

            <ZekatCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Zekat Nedir?</h2>
                <p>
                    <strong>Zekat</strong>, İslam&apos;ın beş temel şartından biri olup, belirli bir servete sahip (nisab)
                    Müslümanların mallarının %2.5&apos;ini (kırkta birini) ihtiyaç sahiplerine vermesi gereken mali bir ibadettir.
                    Zekat, hem malı temizler hem de toplumda sosyal adaleti sağlar.
                </p>
                <p>
                    Kur&apos;an-ı Kerim&apos;de zekat, namaz ile birlikte 82 yerde geçmektedir. Bu durum, İslam&apos;da zekatın
                    önemini açıkça göstermektedir.
                </p>

                <h3>Zekat Kime Farzdır?</h3>
                <p>Zekatın farz olması için şu şartların bulunması gerekir:</p>
                <ul>
                    <li><strong>Müslüman olmak:</strong> Zekat yalnızca Müslümanlara farzdır</li>
                    <li><strong>Akıl baliğ olmak:</strong> Ergenlik çağına ulaşmış olmak</li>
                    <li><strong>Hür olmak:</strong> Özgür birey olmak</li>
                    <li><strong>Nisab miktarına sahip olmak:</strong> Asgari zenginlik sınırına ulaşmak</li>
                    <li><strong>Bir yıl geçmesi (Havl):</strong> Malın üzerinden bir kameri yıl geçmiş olmak</li>
                </ul>

                <h3>Nisab Nedir? 2025 Nisab Değerleri</h3>
                <p>
                    <strong>Nisab</strong>, zekat vermekle yükümlü olmak için sahip olunması gereken asgari mal miktarıdır.
                    Nisab iki şekilde hesaplanır:
                </p>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Nisab Türü</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Miktar</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">2025 TL Değeri (Tahmini)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Altın Nisabı</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">85 gram (20 miskal)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">~276.250 TL</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Gümüş Nisabı</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">595 gram (200 dirhem)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">~22.610 TL</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    <strong>Önemli:</strong> Günümüzde çoğu âlim, fakirlerin lehine olan <strong>altın nisabını</strong>
                    esas almayı tavsiye etmektedir.
                </p>

                <h3>Zekat Oranı Nedir?</h3>
                <p>
                    Zekat oranı <strong>%2.5</strong> (kırkta bir veya 1/40)&apos;tir. Bu oran tüm zekata tabi mallar için
                    geçerlidir. Örneğin:
                </p>
                <ul>
                    <li>100.000 TL varlık = 2.500 TL zekat</li>
                    <li>1.000.000 TL varlık = 25.000 TL zekat</li>
                </ul>

                <h3>Zekata Tabi Mallar</h3>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Mal Türü</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Zekata Tabi mi?</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Açıklama</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Nakit Para (TL, Döviz)</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 text-green-600 font-semibold">✓ Evet</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Elde ve bankadaki tüm nakitler</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Altın ve Gümüş</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 text-green-600 font-semibold">✓ Evet</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Ziynet dahil tüm altın/gümüş</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Hisse Senedi / Fon</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 text-green-600 font-semibold">✓ Evet</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Piyasa değeri üzerinden</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Ticari Mallar</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 text-green-600 font-semibold">✓ Evet</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Satış amaçlı stoklar</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Kiralık Mülk Geliri</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 text-green-600 font-semibold">✓ Evet</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Kira geliri nakde dönerse</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Oturulan Ev</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 text-red-600 font-semibold">✗ Hayır</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Temel ihtiyaç malları muaftır</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Kullanılan Araba</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 text-red-600 font-semibold">✗ Hayır</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Kişisel kullanım amaçlıysa</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Ev Eşyaları</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 text-red-600 font-semibold">✗ Hayır</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Günlük kullanım eşyaları</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>Zekat Nasıl Hesaplanır?</h3>
                <p>Zekat hesaplaması şu adımlarla yapılır:</p>
                <ol>
                    <li><strong>Varlıkları toplayın:</strong> Zekata tabi tüm varlıklarınızın güncel TL değerini belirleyin</li>
                    <li><strong>Borçları çıkarın:</strong> Vadesi gelmiş borçlarınızı toplam varlıktan düşün</li>
                    <li><strong>Nisab kontrolü:</strong> Net servetiniz nisab miktarını aşıyor mu kontrol edin</li>
                    <li><strong>Zekat hesaplayın:</strong> Net serveti %2.5 ile çarparak zekat miktarını bulun</li>
                </ol>
                <p><strong>Formül:</strong> Zekat = (Toplam Varlıklar - Borçlar) × 0.025</p>

                <h3>Zekat Kimlere Verilir?</h3>
                <p>Kur&apos;an-ı Kerim (Tevbe Suresi, 60. ayet) zekat verilecek 8 sınıfı belirlemiştir:</p>
                <ol>
                    <li><strong>Fakirler:</strong> Temel ihtiyaçlarını karşılayamayanlar</li>
                    <li><strong>Miskinler:</strong> Fakir olmayıp zor durumda olanlar</li>
                    <li><strong>Zekat memurları:</strong> Zekat toplayan görevliler</li>
                    <li><strong>Müellefe-i kulûb:</strong> Kalpleri İslam&apos;a ısındırılmak istenenler</li>
                    <li><strong>Köleler:</strong> Özgürlüklerini satın almak isteyenler</li>
                    <li><strong>Borçlular:</strong> Borç batağına düşenler</li>
                    <li><strong>Allah yolunda olanlar:</strong> İslam için çalışanlar</li>
                    <li><strong>Yolda kalmışlar:</strong> Seyahatte zor duruma düşenler</li>
                </ol>

                <h3>Zekat Ne Zaman Verilir?</h3>
                <p>
                    Zekat, malın üzerinden bir kameri yıl (354 gün) geçtikten sonra verilir. Ancak Ramazan ayında
                    zekat vermek daha faziletli kabul edilir. Zekatı önceden (nisab oluştuktan sonra, yıl dolmadan)
                    vermek de caizdir.
                </p>

                <h3>Sıkça Sorulan Sorular (SSS)</h3>

                <h4>Ziynet altınından zekat verilir mi?</h4>
                <p>
                    <strong>Hanefi mezhebine göre</strong> evet, kullanılsın veya kullanılmasın tüm altın ve gümüşten
                    zekat verilir. Diğer mezheplerde farklı görüşler vardır.
                </p>

                <h4>Ev kredisi borcum var, zekat vermeli miyim?</h4>
                <p>
                    Sadece cari yıl içinde ödenmesi gereken taksitler borç olarak düşülebilir. Toplam kredi borcunun
                    tamamı değil, yıllık taksit tutarı hesaba katılır.
                </p>

                <h4>Kripto paralar zekata tabi midir?</h4>
                <p>
                    Evet, ticaret amacıyla tutulan kripto paralar zekata tabidir. Zekat gününde güncel TL değeri
                    üzerinden hesaplanır.
                </p>

                <h4>Çocuklarımın malından zekat vermem gerekir mi?</h4>
                <p>
                    Hanefi mezhebine göre çocukların malından zekat gerekmez. Ancak Şafii ve Hanbeli mezheplerinde
                    velisi tarafından zekat verilmesi gerekir.
                </p>

                <h4>Zekat yerine sadaka verebilir miyim?</h4>
                <p>
                    Hayır, zekat farz bir ibadettir ve sadaka ile karşılanamaz. Zekat, belirlenen 8 sınıfa
                    verilmelidir. Sadaka ise nafile bir ibadettir ve herkese verilebilir.
                </p>

                <h3>Zekat Hesaplama Örneği</h3>
                <p>Ali Bey&apos;in varlıklarını hesaplayalım:</p>
                <ul>
                    <li>Bankada nakit: 150.000 TL</li>
                    <li>Gram altın (50 gram): 162.500 TL</li>
                    <li>Hisse senedi: 80.000 TL</li>
                    <li>Alacaklar: 20.000 TL</li>
                    <li><strong>Toplam varlık:</strong> 412.500 TL</li>
                    <li>Kredi taksiti (yıllık): 36.000 TL</li>
                    <li><strong>Net servet:</strong> 376.500 TL</li>
                </ul>
                <p>
                    Net servet (376.500 TL) altın nisabını (~276.250 TL) aştığı için zekat farzdır.<br />
                    <strong>Zekat miktarı:</strong> 376.500 × 0.025 = <strong>9.412,50 TL</strong>
                </p>
            </article>
        </div>
    )
}
