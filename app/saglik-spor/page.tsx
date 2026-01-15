import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategoryBySlug } from "@/config/site-data"

export const metadata: Metadata = {
    title: "Sağlık & Spor Hesaplama Araçları - VKİ, Kalori, İdeal Kilo",
    description: "Ücretsiz sağlık ve spor hesaplama araçları. Vücut kitle indeksi (VKİ), kalori ihtiyacı, ideal kilo, su tüketimi ve makro besin hesaplayıcıları.",
    keywords: ["sağlık hesaplama", "vki hesaplama", "kalori hesaplama", "ideal kilo", "su ihtiyacı", "makro hesaplama"]
}

export default function SaglikSporPage() {
    const category = getCategoryBySlug("saglik-spor")

    if (!category) {
        return <div>Kategori bulunamadı</div>
    }

    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                    <Home className="h-4 w-4" />
                    Ana Sayfa
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">{category.name}</span>
            </nav>

            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-900/30">
                        <category.icon className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                            {category.name} Hesaplama Araçları
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">{category.description}</p>
                    </div>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {category.tools.map((tool) => (
                    <Link key={tool.slug} href={`/${category.slug}/${tool.slug}`}>
                        <Card className="h-full border-slate-200 dark:border-slate-800 hover:border-pink-300 dark:hover:border-pink-700 hover:shadow-md transition-all cursor-pointer">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900/30">
                                        <tool.icon className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                                    </div>
                                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{tool.description}</CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <article className="prose prose-slate dark:prose-invert max-w-none">
                <h2>Sağlık ve Spor Hesaplamaları Hakkında</h2>
                <p>
                    Sağlıklı bir yaşam için vücudunuzu tanımak ve ihtiyaçlarını bilmek önemlidir.
                    Sağlık ve spor hesaplama araçlarımız, fitness hedeflerinize ulaşmanızda ve
                    sağlıklı alışkanlıklar geliştirmenizde size yol gösterir.
                </p>

                <h3>Neden Sağlık Hesaplama Araçları Kullanmalısınız?</h3>
                <ul>
                    <li><strong>Kişiselleştirilmiş Hedefler:</strong> Boy, kilo, yaş ve aktivite seviyenize göre özelleştirilmiş sonuçlar</li>
                    <li><strong>İlerleme Takibi:</strong> Düzenli ölçümlerle gelişiminizi izleyin</li>
                    <li><strong>Bilimsel Yaklaşım:</strong> Uluslararası kabul görmüş formüller ve standartlar</li>
                    <li><strong>Sağlık Farkındalığı:</strong> Risk faktörlerini erkenden belirleyin</li>
                </ul>

                <h3>Popüler Sağlık Hesaplayıcılarımız</h3>

                <h4>Vücut Kitle İndeksi (VKİ) Hesaplama</h4>
                <p>
                    VKİ, boy ve kilonuza göre vücut yağ oranınızı tahmin eden bir ölçüdür. Dünya Sağlık Örgütü (WHO) tarafından
                    kabul edilen sınıflandırmaya göre zayıf, normal, fazla kilolu veya obez kategorisinde olup olmadığınızı
                    öğrenebilirsiniz. VKİ = Kilo (kg) / Boy² (m) formülü ile hesaplanır.
                </p>

                <h4>Kalori İhtiyacı Hesaplama</h4>
                <p>
                    Günlük kalori ihtiyacınız; yaş, cinsiyet, boy, kilo ve aktivite düzeyinize göre değişir. Kilo vermek,
                    korumak veya almak istemenize bağlı olarak günlük kalori hedeflerinizi belirleyin. Harris-Benedict ve
                    Mifflin-St Jeor formülleri gibi bilimsel yöntemlerle hesaplama yapıyoruz.
                </p>

                <h4>İdeal Kilo Hesaplama</h4>
                <p>
                    Boyunuza ve vücut yapınıza göre ideal kilonuzu öğrenin. Devine, Robinson, Miller ve Hamwi formülleri
                    gibi farklı yöntemlerle hesaplama yapabilirsiniz. İdeal kilo, sağlıklı bir yaşam için hedef belirlemenize
                    yardımcı olur.
                </p>

                <h4>Su İhtiyacı Hesaplama</h4>
                <p>
                    Vücudunuzun günlük su ihtiyacı kilonuza ve aktivite düzeyinize göre değişir. Yeterli su tüketimi,
                    metabolizmanın düzgün çalışması, toksinlerin atılması ve cilt sağlığı için kritik öneme sahiptir.
                </p>

                <h4>Makro Besin Hesaplama</h4>
                <p>
                    Protein, karbonhidrat ve yağ oranlarınızı hesaplayın. Kas kazanımı, yağ kaybı veya genel sağlık
                    hedeflerinize göre makro dağılımınızı optimize edin.
                </p>

                <h3>Sağlıklı Yaşam İpuçları</h3>
                <ul>
                    <li><strong>Düzenli Egzersiz:</strong> Haftada en az 150 dakika orta yoğunlukta aerobik aktivite yapın</li>
                    <li><strong>Dengeli Beslenme:</strong> Her öğünde protein, karbonhidrat ve sağlıklı yağları dengeleyin</li>
                    <li><strong>Yeterli Uyku:</strong> Günde 7-9 saat kaliteli uyku alın</li>
                    <li><strong>Stres Yönetimi:</strong> Meditasyon, yoga veya hobi aktiviteleri ile stresi azaltın</li>
                    <li><strong>Düzenli Kontrol:</strong> Yılda en az bir kez sağlık kontrolü yaptırın</li>
                </ul>

                <h3>Sıkça Sorulan Sorular</h3>

                <h4>VKİ her zaman doğru mu?</h4>
                <p>
                    VKİ genel bir göstergedir ancak her durumda doğru sonuç vermez. Kas kütlesi yüksek sporcular,
                    hamile kadınlar ve çocuklar için farklı değerlendirme yöntemleri gerekebilir. VKİ &apos;nin yanı sıra
                    bel çevresi ölçümü de önemli bir sağlık göstergesidir.
                </p>

                <h4>Günde kaç litre su içmeliyim?</h4>
                <p>
                    Genel öneri günde 8 bardak (yaklaşık 2 litre) sudur, ancak ihtiyaç kişiye göre değişir.
                    Kilonuzun her kilogramı için yaklaşık 30-35 ml su içmeniz önerilir. Egzersiz yapıyorsanız
                    veya sıcak havada bu miktarı artırmalısınız.
                </p>

                <h4>Kilo vermek için günde kaç kalori almalıyım?</h4>
                <p>
                    Sağlıklı kilo kaybı için günlük kalori ihtiyacınızın 500-750 kalori altında kalmanız önerilir.
                    Bu, haftada 0.5-0.75 kg kilo kaybına eşdeğerdir. Günlük 1200 kalorinin altına düşmemeniz önemlidir.
                </p>

                <h4>Bazal metabolizma hızı nedir?</h4>
                <p>
                    Bazal metabolizma hızı (BMR), vücudunuzun hiçbir aktivite yapmadan, sadece temel yaşamsal
                    fonksiyonları sürdürmek için harcadığı kalori miktarıdır. Nefes alma, kalp atışı, hücre
                    yenilenmesi gibi işlemler için gereken enerjidir.
                </p>
            </article>
        </div>
    )
}
