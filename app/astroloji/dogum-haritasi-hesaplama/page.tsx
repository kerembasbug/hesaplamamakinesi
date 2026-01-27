import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { BirthChartCalculator } from "@/components/calculators/astrology/birth-chart-calculator"

export const metadata: Metadata = {
    title: "Doğum Haritası Hesaplama - Yükselen Burç, Ay Burcu",
    description: "Online doğum haritası hesaplama aracı. Güneş burcu, ay burcu, yükselen burç ve gezegen yerleşimlerinizi öğrenin. Astroloji natal harita hesaplayıcı.",
    keywords: ["doğum haritası hesaplama", "yükselen burç hesaplama", "ay burcu hesaplama", "natal harita", "astroloji hesaplama", "gezegen yerleşimleri"],
    openGraph: {
        title: "Doğum Haritası Hesaplama",
        description: "Güneş, ay ve yükselen burcunuzu hesaplayın.",
        type: "website",
    }
}

export default function DogumHaritasiHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                    <Home className="h-4 w-4" />
                    Ana Sayfa
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/astroloji" className="hover:text-indigo-600 transition-colors">
                    Astroloji
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Doğum Haritası</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Doğum Haritası Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Güneş burcu, ay burcu, yükselen burç ve gezegen yerleşimlerinizi keşfedin.
                </p>
            </div>

            <BirthChartCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Doğum Haritası (Natal Harita) Nedir?</h2>
                <p>
                    <strong>Doğum haritası</strong> veya natal harita, doğduğunuz an gökyüzündeki gezegenlerin ve
                    yıldızların konumunu gösteren astrolojik bir haritadır. Bu harita, kişiliğiniz, yetenekleriniz,
                    zorluklarınız ve yaşam yolunuz hakkında içgörüler sunar.
                </p>

                <h3>Doğum Haritasının Temel Unsurları</h3>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Unsur</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Sembol</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Temsil Ettiği</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Güneş Burcu</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">☀️</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Temel kimlik, ego, yaşam enerjisi</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Ay Burcu</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">🌙</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Duygular, içgüdüler, bilinçaltı</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Yükselen Burç</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">⬆️</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Dış görünüş, ilk izlenim, maske</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Merkür</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">☿</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">İletişim, düşünce, öğrenme tarzı</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Venüs</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">♀</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Aşk, güzellik, değerler</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Mars</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">♂</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Enerji, tutku, savaşçı ruhu</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>Yükselen Burç Neden Önemli?</h3>
                <p>
                    <strong>Yükselen burç</strong> (Ascendant), doğduğunuz anda doğu ufkunda yükselen burçtur.
                    Diğer insanların sizi nasıl gördüğünü, ilk izleniminizi ve fiziksel görünümünüzü etkiler.
                    Yükselen burcunuzu hesaplamak için doğum saatinizin bilinmesi gerekir.
                </p>

                <h3>Dört Element ve Burçlar</h3>
                <ul>
                    <li><strong>🔥 Ateş (Koç, Aslan, Yay):</strong> Enerjik, tutkulu, lider ruhlu</li>
                    <li><strong>🌍 Toprak (Boğa, Başak, Oğlak):</strong> Pratik, güvenilir, kararlı</li>
                    <li><strong>💨 Hava (İkizler, Terazi, Kova):</strong> Entelektüel, sosyal, iletişimci</li>
                    <li><strong>💧 Su (Yengeç, Akrep, Balık):</strong> Duygusal, sezgisel, empatik</li>
                </ul>

                <h3>Sıkça Sorulan Sorular (SSS)</h3>

                <h4>Doğum saatimi bilmiyorsam ne yapmalıyım?</h4>
                <p>
                    Doğum saati olmadan güneş burcu ve bazı gezegenler hesaplanabilir, ancak yükselen burç ve
                    ev yerleşimleri hesaplanamaz. Doğum saatinizi nüfus müdürlüğünden veya hastane kayıtlarından
                    öğrenebilirsiniz.
                </p>

                <h4>Ay burcu nasıl hesaplanır?</h4>
                <p>
                    Ay, yaklaşık her 2.5 günde bir burç değiştirir. Kesin ay burcu hesaplaması için doğum tarihi,
                    saati ve yeri gereklidir. Ay burcu duygusal doğanızı ve içgüdüsel tepkilerinizi temsil eder.
                </p>

                <h4>Doğum haritası değişir mi?</h4>
                <p>
                    Hayır, doğum haritanız doğduğunuz anın fotoğrafıdır ve hiç değişmez. Ancak &quot;transit&quot;
                    denilen güncel gezegen hareketleri, doğum haritanızla etkileşime girerek farklı dönemlerde
                    farklı etkiler yaratır.
                </p>

                <h3>Doğum Haritası Yorumlama İpuçları</h3>
                <ul>
                    <li>Sadece güneş burcunuza değil, &quot;Büyük Üçlü&quot;ye (Güneş, Ay, Yükselen) bakın.</li>
                    <li>Haritanızdaki baskın element ve modaliteyi inceleyin.</li>
                    <li>Gezegenler arası açıları (aspektler) değerlendirin.</li>
                    <li>Kuzey ve Güney Düğüm&apos;ün işaret ettiği yaşam amacını keşfedin.</li>
                </ul>
            </article>
        </div>
    )
}
