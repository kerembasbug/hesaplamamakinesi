import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { IdealWeightCalculator } from "@/components/calculators/health/ideal-weight-calculator"

export const metadata: Metadata = {
    title: "İdeal Kilo Hesaplama - Boy Kilo Hesaplayıcı",
    description: "Online ideal kilo hesaplama aracı. Boyunuza ve cinsiyetinize göre ideal kilonuzu hesaplayın. Devine, Robinson, Miller ve Hamwi formülleri.",
    keywords: ["ideal kilo hesaplama", "boy kilo hesaplama", "ideal kilo", "kilo hesaplama", "sağlıklı kilo"],
}

export default function IdealKiloHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/saglik-spor" className="hover:text-indigo-600 transition-colors">Sağlık & Spor</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">İdeal Kilo Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">İdeal Kilo Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Boy ve cinsiyetinize göre ideal kilonuzu hesaplayın.</p>
            </div>

            <IdealWeightCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>İdeal Kilo Hesaplama: Bilimsel Verilerle Sağlıklı Kilonuzu Öğrenin</h2>
                <p>
                    &quot;Kaç kilo olmalıyım?&quot; sorusu, hem estetik hem de sağlık açısından en çok merak edilen konulardan biridir. Ancak <strong>ideal kilo</strong>,
                    sadece tek bir rakamdan ibaret değildir; boyunuz, cinsiyetiniz, yaşınız ve vücut tipiniz gibi birçok değişkenin ortak sonucudur.
                    Online aracımız, tıbbi literatürde kabul görmüş en güvenilir 4 farklı formülü (Devine, Robinson, Miller, Hamwi) bir arada kullanarak
                    size en dengeli sonucu sunar.
                </p>

                <h3>İdeal Kilo Hesaplamasında Kullanılan Bilimsel Formüller</h3>
                <p>
                    Tarihsel süreçte farklı bilim insanları, vücut kütlesini tahmin etmek için çeşitli algoritmalar geliştirmiştir. Aracımız şu formülleri temel alır:
                </p>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Formül Adı</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Geliştirilme Yılı</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Temel Odak Noktası</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Devine Formülü</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">1974</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Aslen ilaç dozajlarını belirlemek için tasarlanmıştır.</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Robinson Formülü</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">1983</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Devine verileri üzerine istatistiksel iyileştirme.</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Miller Formülü</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">1983</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Ortalama vücut tipleri için yüksek hassasiyet.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>Cinsiyet Faktörü: Neden Erkek ve Kadın Sonuçları Farklı?</h3>
                <p>
                    Biyolojik olarak erkekler, kadınlara oranla daha yüksek kas kütlesine ve kemik yoğunluğuna sahiptir. Kadın vücudu ise
                    doğurganlık ve hormonal denge gereği daha fazla yağ dokusu barındırır. Bu nedenle aynı boydaki bir erkek ile bir kadının
                    ideal kilo değerleri arasında genellikle %5 ile %10 arasında bir fark bulunur.
                </p>

                <h3>İdeal Kiloya Ulaşmak ve Korumak İçin 5 Altın Kural</h3>
                <ul>
                    <li><strong>Sürdürülebilirlik:</strong> Haftada 5 kilo verdiren &quot;şok&quot; diyetlerden kaçının. Sağlıklı olan haftada 0.5 - 1 kg kayıptır.</li>
                    <li><strong>Kas Kütlesini Korun:</strong> Kilo verirken sadece yağdan gitmesi için protein alımını dengeli tutun ve direnç egzersizleri yapın.</li>
                    <li><strong>Su Tüketimi:</strong> Metabolizmanın yağı yakabilmesi için suya ihtiyacı vardır. Günde en az 2-2.5 litre su tüketin.</li>
                    <li><strong>Uyku Düzeni:</strong> Yetersiz uyku, açlık hormonu olan &quot;ghrelin&quot; seviyesini artırarak ideal kilonuzdan uzaklaşmanıza neden olur.</li>
                    <li><strong>Porsiyon Kontrolü:</strong> Ne yediğiniz kadar ne kadar yediğiniz de önemlidir. Tabaklarınızı küçülterek psikolojik doygunluğa ulaşın.</li>
                </ul>

                <h3>Sıkça Sorulan Sorular (SSS)</h3>

                <h4>İdeal kilomun altındaysam ne yapmalıyım?</h4>
                <p>
                    Zayıflık da en az obezite kadar ciddi sağlık sorunlarına (anemi, bağışıklık düşüklüğü) yol açabilir. Sağlıklı bir şekilde kilo almak için
                    besin değeri yüksek, hacmi küçük gıdalarla (kuruyemiş, zeytinyağı, tam tahıllar) beslenmenizi zenginleştirmelisiniz.
                </p>

                <h4>Yaş ilerledikçe ideal kilo değişir mi?</h4>
                <p>
                    Evet, yaşlandıkça metabolizma hızı yavaşlar ve vücut kompozisyonu değişir. Uzmanlar 60 yaş sonrası hafif &quot;kilolu&quot; görünmenin
                    kemik sağlığı için koruyucu olabileceğini belirtmektedir.
                </p>

                <h4>Hesaplama ne kadar doğru?</h4>
                <p>
                    Aracımız bilimsel formülleri kullanır ancak bir &quot;tanı&quot; koymaz. En doğru analiz için vücut yağ oranınızı profesyonel bir tartı ile
                    ölçtürmeniz ve bir diyetisyen eşliğinde değerlendirmeniz önerilir.
                </p>

                <h3>Neden İdeal Kilo Hesaplayıcımızı Kullanmalısınız?</h3>
                <p>
                    İnternetteki pek çok site tek bir formül üzerinden sadece bir rakam verir. HesaplamaMakinesi.com olarak biz, 4 farklı formülün ortalamasını
                    alarak size hata payı en düşük aralığı sunuyoruz. Reklamsız, hızlı ve mobil uyumlu yapımızla sağlık yolculuğunuzda en güvenilir yardımcınızız.
                </p>
                <p>
                    Hemen boyunuzu ve cinsiyetinizi girerek size özel sağlıklı kilo aralığınızı keşfedin!
                </p>
            </article>
        </div>
    )
}
