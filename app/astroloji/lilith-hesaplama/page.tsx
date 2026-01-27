import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { AstrologyCalculator } from "@/components/calculators/astrology/astrology-calculator"

export const metadata: Metadata = {
    title: "Lilith Burcu Hesaplama - Kara Ay Analizi",
    description: "Doğum haritasında Lilith (Kara Ay) burcu hesaplama. İçsel gücünüzü ve bilinçaltınızdaki gölge yanları keşfedin.",
    keywords: ["lilith burcu hesaplama", "kara ay hesaplama", "lilith hesaplama", "lilith nedir", "astroloji lilith"]
}

export default function LilithPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/astroloji" className="hover:text-indigo-600 transition-colors">Astroloji</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Lilith Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Lilith (Kara Ay) Burcu Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Bilinçaltınızdaki en gizli noktaları ve içgüdüsel tepkilerinizi temsil eden Lilith'i öğrenin.</p>
            </div>

            <AstrologyCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Lilith (Kara Ay) Nedir? Astrolojideki Gizemli Güç</h2>
                <p>
                    Astrolojide Lilith, fiziksel bir gök cismi değil, Ay&apos;ın Dünya&apos;dan en uzak olduğu nokta olan &quot;Apogee&quot; noktasıdır.
                    Mitolojik olarak Adem&apos;in ilk eşi olduğuna inanılan Lilith; bağımsızlığı, boyun eğmeyen vahşi doğayı ve kişinin en derin,
                    belki de toplumdan gizlediği arzularını temsil eder. Doğum haritalarında Lilith, &quot;Kara Ay&quot; olarak da adlandırılır.
                </p>

                <h3>Lilith&apos;in Doğum Haritasındaki Mesajı</h3>
                <p>
                    Lilith burcunuz, nerede taviz vermediğinizi, nerede haksızlığa uğradığınızı hissettiğinizi ve en güçlü savunma mekanizmalarınızı
                    nerede kurduğunuzu anlatır. Bu nokta, kişinin &quot;gölge yanı&quot; ile yüzleştiği alandır. Lilith&apos;i anlamak, bastırılmış duyguların
                    yapıcı bir güce dönüştürülmesini sağlar.
                </p>

                <h3>Lilith Burçlara Göre Temel Temalar</h3>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Lilith Burcu</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Gizli Güç ve Gölge Yan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Koç</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Aşırı rekabetçilik, bastırılmış öfke ve hayatta kalma dürtüsü.</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Boğa</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Maddi güvenlik takıntısı, haz düşkünlüğü ve sahiplenme arzusu.</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">İkizler</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Bilgiyle manipülasyon, yüzeysellikten kaçış ve zihinsel huzursuzluk.</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Yengeç</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Ailevi reddedilme korkusu, derin anaçlık veya annelikle ilgili sınavlar.</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Aslan</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Onaylanma ihtiyacı, yaratıcı blokajlar ve dikkat çekme dürtüsü.</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Başak</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Aşırı eleştirellik, sağlık evhamları ve mükemmeliyetçilik sancıları.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>Lilith Evlerde: Sınandığımız Alanlar</h3>
                <ul>
                    <li><strong>1. Ev:</strong> Kişisel imaj ve dış dünyaya verilen ilk izlenimde gizemli ve çekici bir hava.</li>
                    <li><strong>5. Ev:</strong> Aşk hayatında ve yaratıcılıkta sıra dışı, bazen riskli tercihler.</li>
                    <li><strong>8. Ev:</strong> Cinsellik, ortak paralar ve krizler yönetiminde derin sezgiler ve dönüşüm gücü.</li>
                    <li><strong>12. Ev:</strong> Gizli düşmanlar, rüyalar ve bilinçaltındaki en kuytu köşelerdeki savaşlar.</li>
                </ul>

                <h3>Sıkça Sorulan Sorular</h3>

                <h4>Lilith hesaplama için ne gereklidir?</h4>
                <p>
                    Lilith hesaplayıcısı, tam doğum tarihinize ve özellikle doğum saatinize ihtiyaç duyar. Ay&apos;ın yörüngesindeki bu nokta hızlı hareket
                    etmese de, ev yerleşimini belirlemek için dakik bir doğum saati sonuçların doğruluğunu artırır.
                </p>

                <h4>Lilith kötü bir şey mi?</h4>
                <p>
                    Hayır, astrolojide &quot;iyi&quot; veya &quot;kötü&quot; yoktur. Lilith sadece bizim daha ilkel, daha dürüst ve daha bağımsız tarafımızı temsil eder.
                    Bu tarafı reddetmek yerine kabul etmek, kişisel bütünlük için çok önemlidir.
                </p>

                <h4>Lilith ve Pluto arasındaki ilişki nedir?</h4>
                <p>
                    Her ikisi de dönüşüm, krizler ve yeraltı dünyası (bilinçaltı) ile ilgilidir. Ancak Pluto jenerasyonel bir değişim gücüyken, Lilith
                    kişinin bireysel düzeydeki isyanını ve özgünlüğünü temsil eder.
                </p>

                <h3>Lilith Burcu Hesaplayarak Kendini Tanı</h3>
                <p>
                    Lilith burcunuzu öğrendikten sonra, hayatınızda nerede &quot;hayır&quot; dediğinizde kendinizi daha güçlü hissettiğinizi fark edebilirsiniz.
                    Bu nokta, başkalarının beklentilerinden bağımsız olarak gerçek benliğinizi bulduğunuz yerdir.
                </p>
                <p>
                    Hemen yukarıdaki hesaplama aracını kullanarak doğum bilgilerinizle Lilith (Kara Ay) analizinizi yapın ve haritanızdaki bu mistik noktanın
                    size ne fısıldadığını keşfedin.
                </p>
            </article>
        </div>
    )
}
