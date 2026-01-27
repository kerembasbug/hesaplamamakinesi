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
      <section className="mt-16 bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-100 dark:border-slate-800">
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">HesaplamaMakinesi.com - Türkiye&apos;nin En Kapsamlı Online Hesaplama ve Analiz Platformu</h2>
          <p className="lead text-lg mb-8">
            Günlük hayatın karmaşasında hız, doğruluk ve güvenilirlik her şeydir. HesaplamaMakinesi.com olarak, finansal kararlarınızdan
            akademik hedeflerinize, sağlıklı yaşam planlarınızdan astrolojik meraklarınıza kadar her alanda yanınızdayız. 100&apos;den fazla
            akıllı ve ücretsiz aracıyla Türkiye&apos;nin dijital yardımcı rehberi olmayı hedefliyoruz.
          </p>

          <div className="grid md:grid-cols-2 gap-12 my-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Neden Bizi Tercih Etmelisiniz?</h3>
              <p>
                İnternette binlerce hesaplama aracı bulabilirsiniz, ancak biz farkımızı &quot;kalite ve güncellik&quot; üzerine kuruyoruz.
                Tüm vergi oranları, faiz hesaplamaları ve akademik puanlama sistemleri, resmi kurumların (TÜİK, TCMB, ÖSYM, MEB) yayınladığı
                en son verilere göre anında güncellenir.
              </p>
              <ul>
                <li><strong>Anlık Güncelleme:</strong> Vergi dilimleri veya faiz oranları değiştiği an algoritmalarımızı güncelliyoruz.</li>
                <li><strong>Gizlilik Odaklı:</strong> Hiçbir verinizi sunucularımızda saklamıyoruz, tüm hesaplamalar tarayıcınızda güvenle yapılır.</li>
                <li><strong>Reklam Dengesi:</strong> Kullanıcı deneyimini bozmayan, temiz bir arayüz sunuyoruz.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Her İhtiyaca Bir Çözüm</h3>
              <p>
                İster bir ev kredisi planlıyor olun, ister çocuğunuzun LGS puanını merak edin; her kategoride uzmanlaşmış araçlarımızla
                en doğru sonuca ulaşmanızı sağlıyoruz. Sadece birer hesap makinesi değil, aynı zamanda o konuya dair ipuçları ve
                rehberlik yazılarıyla da sizi bilgilendiriyoruz.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-6">Öne Çıkan Hesaplama Kategorilerimiz</h3>

          <div className="space-y-8">
            <section>
              <h4 className="text-xl font-medium mb-3">Finans ve Ekonomi Araçları</h4>
              <p>
                Bütçe yönetimi, tasarrufların değerlendirilmesi ve kredi maliyetlerinin analizi için profesyonel çözümler sunuyoruz.
                <strong>Kredi Hesaplama</strong> aracımızla aylık taksitlerinizi görürken, <strong>Mevduat Faizi</strong> ile birikimlerinizin
                getirisini hesaplayabilirsiniz. Ayrıca <strong>Döviz Çevirici</strong> ile global piyasalardaki son durumu anlık takip edebilirsiniz.
              </p>
            </section>

            <section>
              <h4 className="text-xl font-medium mb-3">Vergi, Mevzuat ve Muhasebe</h4>
              <p>
                Türkiye vergi mevzuatına tam uyumlu; <strong>KDV</strong>, <strong>Gelir Vergisi</strong>, <strong>MTV</strong> ve
                <strong>ÖTV hesaplama</strong> araçlarımızla sürpriz maliyetlerden kurtulun. Uzman kadromuz tarafından hazırlanan bu araçlar,
                hem muhasebeciler hem de bireysel mükellefler için idealdir.
              </p>
            </section>

            <section>
              <h4 className="text-xl font-medium mb-3">Sağlıklı Yaşam ve Fitness</h4>
              <p>
                Vücudunuzu tanıyın. <strong>Vücut Kitle İndeksi (VKİ)</strong>, <strong>Bazal Metabolizma Hızı (BMR)</strong> ve
                <strong>Günlük Kalori İhtiyacı</strong> gibi araçlarımızla diyet ve spor programlarınızı daha bilimsel temellere oturtun.
                Sağlık araçlarımız, genel kabul görmüş medikal formüllerle çalışmaktadır.
              </p>
            </section>

            <section>
              <h4 className="text-xl font-medium mb-3">Eğitim ve Akademik Başarı</h4>
              <p>
                Öğrenciler için sınav heyecanını veriye dönüştürüyoruz. <strong>TYT/AYT Net Hesaplama</strong>, <strong>LGS Puanı</strong> ve
                <strong>Üniversite Not Ortalaması (GPA)</strong> hesaplayıcılarımızla akademik geleceğinizi daha net görün.
              </p>
            </section>
          </div>

          <h3 className="text-2xl font-semibold mt-12 mb-6 text-center">Sıkça Sorulan Sorular (SSS) - Sizin İçin Yanıtladık</h3>

          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h5 className="font-bold text-lg mb-2">Hesaplama sonuçları yasal olarak geçerli midir?</h5>
              <p className="text-slate-600 dark:text-slate-400">
                Araçlarımız en güncel resmi verileri kullansa da, sonuçlar bilgilendirme amaçlıdır. Bankacılık işlemleri,
                vergi ödemeleri veya tıbbi müdahaleler için mutlaka ilgili kurumların profesyonel uzmanlarına danışmanız önerilir.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h5 className="font-bold text-lg mb-2">Sitenizde kişisel verilerim kaydediliyor mu?</h5>
              <p className="text-slate-600 dark:text-slate-400">
                Kesinlikle hayır. Gizliliğe en üst düzeyde önem veriyoruz. Girdiğiniz rakamlar, tarihler veya ölçümler sadece o anki
                işleminiz için tarayıcınızda kullanılır. Sayfayı yenilediğinizde veya kapattığınızda tüm veriler temizlenir.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h5 className="font-bold text-lg mb-2">Hangi tarayıcılarda en iyi sonuçları alırım?</h5>
              <p className="text-slate-600 dark:text-slate-400">
                Modern mimarimiz sayesinde Chrome, Safari, Firefox ve Edge gibi tüm güncel tarayıcılarda tam performanslı çalışıyoruz.
                Ayrıca sitemiz &quot;Mobil Öncelikli&quot; tasarıma sahiptir, cebinizden de mükemmel görünür.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h5 className="font-bold text-lg mb-2">Yeni bir hesaplama aracı ekleyebilir misiniz?</h5>
              <p className="text-slate-600 dark:text-slate-400">
                Elbette! Kullanıcılarımızın geri bildirimleri bizim için çok değerli. İletişim sayfasından bize ulaşarak ihtiyacınız olan
                hesaplama aracını bildirebilirsiniz. Ekibimiz en kısa sürede değerlendirmeye alacaktır.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl text-center">
            <h3 className="text-2xl font-bold mb-4">Ücretsiz Kullanıma Hemen Başlayın!</h3>
            <p className="mb-6">
              Vakit nakittir. Karışık Excel tablolarıyla veya karmaşık formüllerle uğraşmak yerine, HesaplamaMakinesi.com&apos;un
              sizin için işi yapmasına izin verin. Doğru sonuç, hızlı erişim ve sınırsız kullanım tamamen ücretsiz.
            </p>
          </div>
        </article>
      </section>
    </div>
  )
}
