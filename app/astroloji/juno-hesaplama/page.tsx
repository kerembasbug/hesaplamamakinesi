import { AstrologyCalculator } from "@/components/calculators/astrology/astrology-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"

export const metadata = buildMetadata({
    title: "Juno Burcu Hesaplama - Ruh Eşi Analizi",
    description: "Astrolojide Juno burcu hesaplama aracı. Doğum haritanızdaki Juno yerleşimine göre ruh eşinizi ve evlilikten beklentilerinizi ücretsiz öğrenin.",
    keywords: ["juno burç hesaplama", "juno hesaplama", "evlilik burcu hesaplama", "ruh eşi hesaplama", "juno nedir"],
    path: "/astroloji/juno-hesaplama",
})

export default function JunoPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Juno Burç Hesaplama",
                    description: "Astrolojide Juno burcu hesaplama. Doğum haritanızdaki Juno yerleşimine göre ruh eşinizi ve evlilikteki beklentilerinizi öğrenin.",
                    path: "/astroloji/juno-hesaplama",
                    applicationCategory: "LifestyleApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Astroloji", path: "/astroloji" },
                { name: "Juno Hesaplama" },
            ]} />

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

                <h2>Juno&apos;nun Doğum Haritasındaki Önemi</h2>
                <p>
                    Juno burcunuzu bilmek, ilişkilerinizde neden belirli döngüleri yaşadığınızı anlamanıza yardımcı olur. Birçok kişi Venüs burcuna göre birinden
                    etkilense de, Juno burcuna uygun olmayan kişilerle uzun süreli mutluluğu yakalamakta zorlanabilir. Juno, &quot;kiminle evlenmeliyim?&quot;
                    sorusuna en net cevabı veren göstergelerden biridir.
                </p>

                <h2>Juno Burçlara Göre Ne Anlatır?</h2>
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

                <h2>Juno Evlerde: İlişkinin Yaşanacağı Alanlar</h2>
                <ul>
                    <li><strong>1. Ev:</strong> Partnerin karakteri üzerinde güçlü etkisi olur, evlilik kimliğin bir parçasıdır.</li>
                    <li><strong>4. Ev:</strong> Ev ve aile hayatına odaklı, köklü bir birliktelik arayışı.</li>
                    <li><strong>7. Ev:</strong> Klasik evlilik göstergesi, partnerle ortaklık kurmak çok önemlidir.</li>
                    <li><strong>10. Ev:</strong> Statü getiren veya toplumsal olarak tanınan bir eş göstergesi olabilir.</li>
                </ul>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Juno burcu nasıl hesaplanır?</h3>
                <p>
                    Juno hesaplaması için doğum tarihiniz, doğum saatiniz ve doğum yeriniz gereklidir. Bu bilgilerle oluşturulan doğum haritasında (natal chart)
                    Juno asteroidinin hangi burçta ve derecede olduğu tespit edilir. Hesaplama aracımız bu işlemi en güncel astronomik verilerle saniyeler içinde yapar.
                </p>

                <h3>Juno ve Venüs arasındaki fark nedir?</h3>
                <p>
                    Venüs daha çok hoşlandığımız, flört ettiğimiz ve estetik olarak çekici bulduğumuz kişileri temsil ederken; Juno beraber yaşlanabileceğimiz,
                    hayatın zorluklarına beraber göğüs gerebileceğimiz &quot;gerçek&quot; hayat arkadaşını temsil eder.
                </p>

                <h3>Juno gerilemesi (Retro) ilişkileri nasıl etkiler?</h3>
                <p>
                    Juno retrosu dönemlerinde mevcut ilişkilerdeki sorunlar gün yüzüne çıkabilir. Eskiden gelen partnerlerle ilgili konular tekrar gündeme gelebilir.
                    Bu süreç genellikle ilişkinin temellerini gözden geçirmek için bir fırsattır.
                </p>

                <h2>Juno Hesaplama ile Ruh Eşini Keşfet</h2>
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
