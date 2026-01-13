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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
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
    </div>
  )
}
