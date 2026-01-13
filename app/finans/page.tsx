import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategoryBySlug } from "@/config/site-data"

export const metadata: Metadata = {
    title: "Finans Hesaplama Araçları - Kredi, Faiz, Yatırım Hesaplayıcıları",
    description: "Ücretsiz finans hesaplama araçları. Kredi hesaplama, mevduat faizi, bileşik faiz, döviz çevirici, yatırım getirisi ve enflasyon hesaplama araçları.",
    keywords: ["finans hesaplama", "kredi hesaplama", "faiz hesaplama", "döviz çevirici", "yatırım hesaplama"]
}

export default function FinansPage() {
    const category = getCategoryBySlug("finans")

    if (!category) {
        return <div>Kategori bulunamadı</div>
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                    <Home className="h-4 w-4" />
                    Ana Sayfa
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">{category.name}</span>
            </nav>

            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                        <category.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                            {category.name} Hesaplama Araçları
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            {category.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tools Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {category.tools.map((tool) => (
                    <Link key={tool.slug} href={`/${category.slug}/${tool.slug}`}>
                        <Card className="h-full border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all cursor-pointer">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                                        <tool.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
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

            {/* SEO Content */}
            <article className="prose prose-slate dark:prose-invert max-w-none">
                <h2>Finans Hesaplama Araçları Hakkında</h2>
                <p>
                    Finans hesaplama araçlarımız, kişisel mali kararlarınızı daha bilinçli bir şekilde
                    almanıza yardımcı olmak için tasarlanmıştır. Kredi başvurusu yapmadan önce aylık
                    taksitlerinizi hesaplayabilir, vadeli mevduat getirinizi öğrenebilir veya
                    yatırımlarınızın getirisini analiz edebilirsiniz.
                </p>

                <h3>Neden Finans Hesaplama Araçları Kullanmalısınız?</h3>
                <ul>
                    <li><strong>Kredi Planlaması:</strong> Ev, araba veya ihtiyaç kredisi almadan önce aylık taksit yükünüzü görün</li>
                    <li><strong>Tasarruf Yönetimi:</strong> Mevduat faizi hesaplama ile birikimlerinizin getirisini planlayın</li>
                    <li><strong>Yatırım Analizi:</strong> ROI hesaplama ile yatırımlarınızın performansını ölçün</li>
                    <li><strong>Enflasyon Koruması:</strong> Paranızın reel değerini korumak için enflasyon etkisini anlayın</li>
                </ul>
            </article>
        </div>
    )
}
