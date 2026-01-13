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
                <h2>Vücut Kitle İndeksi (VKİ) Nedir?</h2>
                <p>
                    Vücut Kitle İndeksi (VKİ) veya İngilizce adıyla Body Mass Index (BMI), kilonuzun
                    boyunuza göre sağlıklı bir aralıkta olup olmadığını değerlendirmek için kullanılan
                    uluslararası bir ölçüdür. 1840&apos;larda Belçikalı matematikçi Adolphe Quetelet
                    tarafından geliştirilmiştir.
                </p>
                <p>
                    Dünya Sağlık Örgütü (WHO), VKİ&apos;yi obezite ve zayıflık durumlarını
                    değerlendirmek için standart bir araç olarak kabul etmektedir.
                </p>

                <h2>VKİ Nasıl Hesaplanır?</h2>
                <p>
                    VKİ hesaplama formülü oldukça basittir:
                </p>
                <p>
                    <strong>VKİ = Kilo (kg) / Boy² (m²)</strong>
                </p>
                <p>
                    Örneğin, 75 kg ağırlığında ve 1.75 m boyunda bir kişi için:
                </p>
                <ul>
                    <li>VKİ = 75 / (1.75 × 1.75)</li>
                    <li>VKİ = 75 / 3.0625</li>
                    <li>VKİ = 24.5</li>
                </ul>
                <p>
                    Bu değer &quot;Normal&quot; kategorisine girmektedir.
                </p>

                <h2>VKİ Kategorileri ve Anlamları</h2>
                <table>
                    <thead>
                        <tr>
                            <th>VKİ Değeri</th>
                            <th>Kategori</th>
                            <th>Sağlık Durumu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>&lt; 18.5</td>
                            <td>Zayıf</td>
                            <td>Yetersiz beslenme riski</td>
                        </tr>
                        <tr>
                            <td>18.5 - 24.9</td>
                            <td>Normal</td>
                            <td>Sağlıklı kilo aralığı</td>
                        </tr>
                        <tr>
                            <td>25 - 29.9</td>
                            <td>Fazla Kilolu</td>
                            <td>Kilo kontrolü önerilir</td>
                        </tr>
                        <tr>
                            <td>30 - 34.9</td>
                            <td>Obez (Sınıf 1)</td>
                            <td>Sağlık riskleri artmıştır</td>
                        </tr>
                        <tr>
                            <td>35 - 39.9</td>
                            <td>Obez (Sınıf 2)</td>
                            <td>Ciddi sağlık riskleri</td>
                        </tr>
                        <tr>
                            <td>≥ 40</td>
                            <td>Morbid Obez</td>
                            <td>Acil tıbbi müdahale gerekebilir</td>
                        </tr>
                    </tbody>
                </table>

                <h2>VKİ&apos;nin Sınırlamaları</h2>
                <p>
                    VKİ yararlı bir tarama aracı olsa da bazı sınırlamaları vardır:
                </p>
                <ul>
                    <li>
                        <strong>Kas kütlesi:</strong> Sporcular ve vücut geliştiriciler kas kütlesi
                        nedeniyle yüksek VKİ gösterebilir ancak obez olmayabilirler.
                    </li>
                    <li>
                        <strong>Yaş faktörü:</strong> Yaşlı bireyler kas kaybı nedeniyle düşük VKİ
                        gösterebilir ancak yağ oranları yüksek olabilir.
                    </li>
                    <li>
                        <strong>Cinsiyet farklılıkları:</strong> Kadınlar doğal olarak erkeklerden
                        daha yüksek yağ oranına sahiptir.
                    </li>
                    <li>
                        <strong>Etnik farklılıklar:</strong> Bazı etnik gruplar için VKİ kesim
                        noktaları farklı olabilir.
                    </li>
                </ul>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Çocuklar için VKİ hesaplaması nasıl yapılır?</h3>
                <p>
                    Çocuklar ve ergenler için VKİ, yaşa ve cinsiyete göre persentil değerleriyle
                    yorumlanır. Yetişkin VKİ kategorileri çocuklara uygulanamaz.
                </p>

                <h3>VKİ değerim yüksekse ne yapmalıyım?</h3>
                <p>
                    VKİ değeriniz 25&apos;in üzerindeyse, bir sağlık uzmanına danışmanız önerilir.
                    Dengeli beslenme ve düzenli egzersiz kilo kontrolünde temel faktörlerdir.
                </p>

                <h3>İdeal VKİ değeri nedir?</h3>
                <p>
                    18.5-24.9 arası normal kabul edilir. Ancak kişisel sağlık hedefleriniz için
                    doktorunuza danışmalısınız.
                </p>

                <h3>VKİ tek başına yeterli mi?</h3>
                <p>
                    Hayır, VKİ sadece bir tarama aracıdır. Bel çevresi, bel-kalça oranı,
                    vücut yağ yüzdesi gibi ek ölçümler daha kapsamlı değerlendirme sağlar.
                </p>

                <h2>Sağlıklı Kilo İpuçları</h2>
                <ul>
                    <li>Dengeli ve çeşitli beslenin</li>
                    <li>Haftada en az 150 dakika orta yoğunlukta egzersiz yapın</li>
                    <li>Bol su için</li>
                    <li>Uyku kalitesine önem verin</li>
                    <li>Stresi yönetmeyi öğrenin</li>
                    <li>Ani diyetlerden kaçının</li>
                </ul>
            </article>
        </div>
    )
}
