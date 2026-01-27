import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { AstrologyCalculator } from "@/components/calculators/astrology/astrology-calculator"

export const metadata: Metadata = {
    title: "Juno Burç Hesaplama - Ruh Eşi ve Evlilik Analizi",
    description: "Astrolojide Juno burcu hesaplama. Doğum haritanızdaki Juno yerleşimine göre ruh eşinizi ve evlilikteki beklentilerinizi öğrenin.",
    keywords: ["juno burç hesaplama", "juno hesaplama", "evlilik burcu hesaplama", "ruh eşi hesaplama", "juno nedir"]
}

export default function JunoPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/astroloji" className="hover:text-indigo-600 transition-colors">Astroloji</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Juno Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Juno Burcu Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Astrolojide sadakat, bağlılık ve evlilik asteroidi Juno'yu keşfedin.</p>
            </div>

            <AstrologyCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Juno Burcu Nedir? Astroloji&apos;de Eş ve Ruh Eşi Göstergesi</h2>
                <p>
                    Astrolojide Juno, &quot;Evlilik Asteroidi&quot; olarak bilinir. Roma mitolojisindeki Kraliçe Juno&apos;dan (Yunan mitolojisinde Hera) ismini alan bu gök cismi,
                    doğum haritamızda ciddi ilişkilerimizi, evlilik tarzımızı ve hayat arkadaşımızda aradığımız temel özellikleri temsil eder.
                    Venüs daha çok flört ve çekimle ilgiliyken, Juno uzun vadeli sadakat, bağlılık ve yasal birlikteliklerin sembolüdür.
                </p>

                <h3>Juno&apos;nun Doğum Haritasındaki Önemi</h3>
                <p>
                    Juno burcunuzu bilmek, ilişkilerinizde neden belirli döngüleri yaşadığınızı anlamanıza yardımcı olur. Birçok kişi Venüs burcuna göre birinden
                    etkilense de, Juno burcuna uygun olmayan kişilerle uzun süreli mutluluğu yakalamakta zorlanabilir. Juno, &quot;kiminle evlenmeliyim?&quot;
                    sorusuna en net cevabı veren göstergelerden biridir.
                </p>

                <h3>Juno Burçlara Göre Ne Anlatır?</h3>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Juno Burcu</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Aranan Eş Özellikleri</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Koç</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Cesur, girişken, bağımsızlığına düşkün ve heyecan verici bir partner.</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Boğa</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Güvenilir, sadık, huzurlu ve maddi-manevi istikrar sağlayan bir eş.</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">İkizler</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Zeki, meraklı, iletişimi güçlü ve beraber vakit geçirmekten keyif alınan biri.</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Yengeç</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Şefkatli, aile değerlerine önem veren ve duygusal güven sağlayan bir partner.</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Aslan</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Karizmatik, cömert, hayranlık uyandıran ve eğlenceli bir eş.</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Başak</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Düzenli, çalışkan, sağlıklı yaşamı seven ve hayatı kolaylaştıran biri.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>Juno Evlerde: İlişkinin Yaşanacağı Alanlar</h3>
                <ul>
                    <li><strong>1. Ev:</strong> Partnerin karakteri üzerinde güçlü etkisi olur, evlilik kimliğin bir parçasıdır.</li>
                    <li><strong>4. Ev:</strong> Ev ve aile hayatına odaklı, köklü bir birliktelik arayışı.</li>
                    <li><strong>7. Ev:</strong> Klasik evlilik göstergesi, partnerle ortaklık kurmak çok önemlidir.</li>
                    <li><strong>10. Ev:</strong> Statü getiren veya toplumsal olarak tanınan bir eş göstergesi olabilir.</li>
                </ul>

                <h3>Sıkça Sorulan Sorular</h3>

                <h4>Juno burcu nasıl hesaplanır?</h4>
                <p>
                    Juno hesaplaması için doğum tarihiniz, doğum saatiniz ve doğum yeriniz gereklidir. Bu bilgilerle oluşturulan doğum haritasında (natal chart)
                    Juno asteroidinin hangi burçta ve derecede olduğu tespit edilir. Hesaplama aracımız bu işlemi en güncel astronomik verilerle saniyeler içinde yapar.
                </p>

                <h4>Juno ve Venüs arasındaki fark nedir?</h4>
                <p>
                    Venüs daha çok hoşlandığımız, flört ettiğimiz ve estetik olarak çekici bulduğumuz kişileri temsil ederken; Juno beraber yaşlanabileceğimiz,
                    hayatın zorluklarına beraber göğüs gerebileceğimiz &quot;gerçek&quot; hayat arkadaşını temsil eder.
                </p>

                <h4>Juno gerilemesi (Retro) ilişkileri nasıl etkiler?</h4>
                <p>
                    Juno retrosu dönemlerinde mevcut ilişkilerdeki sorunlar gün yüzüne çıkabilir. Eskiden gelen partnerlerle ilgili konular tekrar gündeme gelebilir.
                    Bu süreç genellikle ilişkinin temellerini gözden geçirmek için bir fırsattır.
                </p>

                <h3>Juno Hesaplama ile Ruh Eşini Keşfet</h3>
                <p>
                    Kendi Juno burcunuzu öğrendiğinizde, kendinize şu soruları sorun: &quot;Bir ilişkiden gerçekten ne bekliyorum?&quot;, &quot;Aradığım kişi gerçekten beni
                    tamamlıyor mu?&quot;. Astroloji bir rehberdir ve Juno bu rehberin en önemli sayfalarından biridir.
                </p>
                <p>
                    Hemen yukarıdaki Juno hesaplayıcıyı kullanarak doğum bilgilerinizle analizi başlatabilir ve aşk hayatınızdaki kader planını daha iyi anlayabilirsiniz.
                    Unutmayın, her harita özeldir ve Juno sadece bir parçadır; ancak çok değerli bir parçadır.
                </p>
            </article>
        </div>
    )
}
