import Link from "next/link"
import { ArrowRight, Calculator, Zap, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { categories } from "@/config/site-data"
import { ScientificCalculator } from "@/components/calculators/scientific-calculator"

export default function HomePage() {
  const features = [
    {
      icon: Zap,
      title: "Hızlı Hesaplama",
      description: "Anlık sonuçlar ile zaman kaybetmeden hesaplamalarınızı yapın."
    },
    {
      icon: Shield,
      title: "Güvenilir Sonuçlar",
      description: "Güncel oranlar ve doğrulanmış formüllerle doğru sonuçlar alın."
    },
    {
      icon: Clock,
      title: "7/24 Erişim",
      description: "Her zaman, her yerden ücretsiz olarak hesaplamalarınızı yapın."
    }
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 lg:py-16">
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30">
            <Calculator className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl lg:text-6xl mb-4">
          Türkiye&apos;nin{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
            Hesaplama Platformu
          </span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
          Finans, vergi, sağlık, matematik ve daha fazlası için 100+ ücretsiz hesaplama aracı.
          Hızlı, güvenilir ve kullanımı kolay.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/vergi-muhasebe/kdv-hesaplama">
              KDV Hesapla
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#categories">
              Tüm Araçlar
            </Link>
          </Button>
        </div>
      </section>

      {/* Scientific Calculator */}
      <section>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl mb-2">
            Bilimsel Hesap Makinesi
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Trigonometri, logaritma ve daha fazlası için kullanışlı hesap makinesi
          </p>
        </div>
        <ScientificCalculator />
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.title} className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardContent className="pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                <feature.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Categories */}
      <section id="categories" className="scroll-mt-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl mb-2">
            Hesaplama Kategorileri
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            İhtiyacınıza uygun kategoriyi seçin ve hesaplamaya başlayın.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <category.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 group-hover:text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {category.tools.length} araç
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {category.description}
                </p>
                <div className="space-y-2">
                  {category.tools.slice(0, 3).map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/${category.slug}/${tool.slug}`}
                      className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <tool.icon className="h-4 w-4 text-slate-400" />
                      {tool.name}
                    </Link>
                  ))}
                </div>
                {category.tools.length > 3 && (
                  <Link
                    href={`/${category.slug}`}
                    className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
                  >
                    +{category.tools.length - 3} araç daha
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Tools */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl mb-2">
            Popüler Hesaplama Araçları
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            En çok kullanılan hesaplama araçlarımız
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { category: "matematik-egitim", tool: "lgs-puan-hesaplama", name: "LGS Puan Hesaplama 2026", icon: "🎓" },
            { category: "vergi-muhasebe", tool: "kdv-hesaplama", name: "KDV Hesaplama", icon: "💰" },
            { category: "finans", tool: "kredi-hesaplama", name: "Kredi Hesaplama", icon: "🏦" },
            { category: "saglik-spor", tool: "vki-hesaplama", name: "VKİ Hesaplama", icon: "⚖️" },
            { category: "matematik-egitim", tool: "yuzde-hesaplama", name: "Yüzde Hesaplama", icon: "📊" }
          ].map((item) => (
            <Link
              key={item.tool}
              href={`/${item.category}/${item.tool}`}
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all"
            >
              <span className="text-3xl">{item.icon}</span>
              <span className="font-medium text-slate-900 dark:text-white">{item.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="mt-16">
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h2>HesaplamaMakinesi.com - Türkiye&apos;nin En Kapsamlı Online Hesaplama Platformu</h2>
          <p>
            HesaplamaMakinesi.com olarak, günlük hayatınızda ihtiyaç duyabileceğiniz tüm hesaplama araçlarını
            tek bir platformda sunuyoruz. Finans hesaplamalarından sağlık hesaplayıcılarına, vergi hesaplamalarından
            eğitim araçlarına kadar geniş bir yelpazede 100&apos;den fazla ücretsiz hesaplama aracı ile hizmetinizdeyiz.
          </p>

          <h3>Neden HesaplamaMakinesi.com?</h3>
          <p>
            Güncel verilerle çalışan hesaplama araçlarımız, doğru ve güvenilir sonuçlar sunar. Tüm hesaplayıcılarımız
            mobil uyumlu tasarımı sayesinde telefon, tablet veya bilgisayarınızdan kolayca erişilebilir.
            Hiçbir kayıt veya üyelik gerektirmeden, tamamen ücretsiz olarak kullanabilirsiniz.
          </p>

          <h3>Sunduğumuz Hesaplama Kategorileri</h3>

          <h4>Finans Hesaplama Araçları</h4>
          <p>
            Kredi hesaplama, mevduat faizi hesaplama, bileşik faiz hesaplama, döviz çevirici, yatırım getirisi (ROI)
            hesaplama, enflasyon hesaplama ve işsizlik maaşı hesaplama gibi finansal araçlarımız ile bütçenizi
            planlamanıza yardımcı oluyoruz. Güncel faiz oranları ve döviz kurları ile anlık hesaplamalar yapabilirsiniz.
          </p>

          <h4>Vergi ve Muhasebe Hesaplayıcıları</h4>
          <p>
            KDV hesaplama, gelir vergisi hesaplama, MTV hesaplama, damga vergisi hesaplama, ÖTV hesaplama ve
            kurumlar vergisi hesaplama araçlarımız ile vergi yükümlülüklerinizi kolayca hesaplayabilirsiniz.
            2024 ve 2025 yılı güncel vergi dilimleri ve oranları ile çalışan hesaplayıcılarımız, hem bireysel
            hem de kurumsal kullanıcılar için idealdir.
          </p>

          <h4>Sağlık ve Spor Hesaplayıcıları</h4>
          <p>
            Vücut Kitle İndeksi (VKİ) hesaplama, kalori hesaplama, ideal kilo hesaplama, su ihtiyacı hesaplama,
            makro besin hesaplama ve bazal metabolizma hesaplama araçlarımız ile sağlıklı yaşam hedeflerinize
            ulaşmanıza destek oluyoruz. Bilimsel formüllere dayanan hesaplayıcılarımız güvenilir sonuçlar sunar.
          </p>

          <h4>Matematik ve Eğitim Araçları</h4>
          <p>
            Yüzde hesaplama, karekök hesaplama, TYT net hesaplama, AYT net hesaplama, LGS puan hesaplama ve
            GPA hesaplama gibi eğitim araçlarımız öğrenciler ve veliler için vazgeçilmezdir. 2026 yılı güncel
            sınav sistemlerine uygun hesaplayıcılarımız ile sınav hazırlık sürecinizi destekliyoruz.
          </p>

          <h4>Zaman ve Takvim Hesaplayıcıları</h4>
          <p>
            Yaş hesaplama, tarih hesaplama, gebelik hesaplama, gün farkı hesaplama, çalışma günleri hesaplama
            ve zaman dilimi çevirici araçlarımız ile zamanla ilgili tüm hesaplamalarınızı kolayca yapabilirsiniz.
          </p>

          <h4>Birim Dönüştürücüler</h4>
          <p>
            Uzunluk, ağırlık, sıcaklık, hız, alan ve veri boyutu dönüştürücülerimiz ile farklı ölçü birimleri
            arasında hızlı çeviri yapabilirsiniz. Metrik ve emperyal sistemler arasında kolayca geçiş yapın.
          </p>

          <h3>Sıkça Sorulan Sorular (SSS)</h3>

          <h4>HesaplamaMakinesi.com ücretsiz mi?</h4>
          <p>
            Evet, platformumuzdaki tüm hesaplama araçları tamamen ücretsizdir. Hiçbir gizli ücret veya
            abonelik gerektirmez.
          </p>

          <h4>Hesaplama sonuçları güvenilir mi?</h4>
          <p>
            Tüm hesaplayıcılarımız güncel ve doğrulanmış formüller kullanır. Vergi oranları, faiz oranları ve
            döviz kurları gibi değişken veriler düzenli olarak güncellenir. Ancak kritik finansal veya sağlık
            kararları için profesyonel danışmanlık almanızı öneririz.
          </p>

          <h4>Mobil cihazlarda kullanabilir miyim?</h4>
          <p>
            Evet, HesaplamaMakinesi.com tamamen mobil uyumludur. Akıllı telefon, tablet veya bilgisayarınızdan
            tüm hesaplama araçlarını sorunsuz kullanabilirsiniz.
          </p>

          <h4>Hesaplama geçmişim kaydediliyor mu?</h4>
          <p>
            Hayır, hesaplamalarınız sunucularımızda saklanmaz. Tüm işlemler tarayıcınızda gerçekleşir ve
            sayfayı kapattığınızda silinir. Gizliliğiniz bizim için önemlidir.
          </p>
        </article>
      </section>
    </div>
  )
}
