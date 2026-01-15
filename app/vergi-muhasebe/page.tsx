import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategoryBySlug } from "@/config/site-data"

export const metadata: Metadata = {
    title: "Vergi & Muhasebe Hesaplamaları",
    description: "KDV, gelir vergisi, ÖTV, kurumlar vergisi ve diğer vergi hesaplama araçları. Ücretsiz online vergi hesaplayıcıları.",
    keywords: ["vergi hesaplama", "kdv hesaplama", "gelir vergisi", "ötv hesaplama", "muhasebe"]
}

export default function VergiMuhasebePage() {
    const category = getCategoryBySlug("vergi-muhasebe")

    if (!category) {
        return <div>Kategori bulunamadı</div>
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link
                    href="/"
                    className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                >
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
                            {category.name}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            {category.description}
                        </p>
                    </div>
                </div>
            </div>

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

            <article className="prose prose-slate dark:prose-invert max-w-none">
                <h2>Vergi ve Muhasebe Hesaplama Araçları</h2>
                <p>
                    Vergi hesaplama araçlarımız, bireysel ve kurumsal vergi yükümlülüklerinizi doğru bir şekilde
                    hesaplamanıza yardımcı olur. KDV, gelir vergisi, ÖTV, MTV ve damga vergisi gibi tüm vergi
                    türleri için güncel oranlarla hesaplama yapabilirsiniz.
                </p>

                <h3>Popüler Vergi Hesaplayıcıları</h3>

                <h4>KDV Hesaplama</h4>
                <p>
                    Katma Değer Vergisi (KDV) hesaplama aracımız ile fiyatlara KDV ekleme veya KDV dahil fiyattan
                    KDV çıkarma işlemlerini kolayca yapabilirsiniz. Türkiye&apos;de %1, %10 ve %20 olmak üzere üç farklı
                    KDV oranı uygulanmaktadır.
                </p>

                <h4>Gelir Vergisi Hesaplama</h4>
                <p>
                    2024, 2025 ve 2026 yılı güncel gelir vergisi dilimleri ile ücret ve serbest meslek geliriniz
                    üzerinden ödenecek vergiyi hesaplayın. Brütten nete, netten brüte hesaplama yapabilirsiniz.
                </p>

                <h4>MTV Hesaplama</h4>
                <p>
                    Motorlu Taşıtlar Vergisi (MTV), araç yaşı, motor hacmi ve yakıt türüne göre değişir.
                    Aracınız için ödemeniz gereken yıllık MTV tutarını hesaplayın.
                </p>

                <h4>ÖTV Hesaplama</h4>
                <p>
                    Özel Tüketim Vergisi (ÖTV), otomobil, motosiklet, alkollü içecekler ve tütün ürünleri
                    gibi mallara uygulanan bir vergidir. Araç alımlarında ÖTV matrahını ve vergisini hesaplayın.
                </p>

                <h3>Türkiye Vergi Sistemi Hakkında</h3>
                <p>
                    Türkiye&apos;de vergi sistemi dolaylı ve dolaysız vergilerden oluşur. Dolaysız vergiler arasında
                    gelir vergisi ve kurumlar vergisi, dolaylı vergiler arasında KDV ve ÖTV yer alır.
                    Vergi beyannameleri genellikle aylık veya üç aylık dönemlerde verilir.
                </p>

                <h3>Sıkça Sorulan Sorular</h3>

                <h4>KDV oranları nelerdir?</h4>
                <p>
                    Türkiye&apos;de üç farklı KDV oranı uygulanır: %1 (temel gıda, gazete), %10 (tekstil, turizm)
                    ve %20 (genel oran). Her mal ve hizmet kategorisi için farklı oranlar geçerlidir.
                </p>

                <h4>Gelir vergisi dilimleri nasıl çalışır?</h4>
                <p>
                    Gelir vergisi artan oranlı bir sistemle hesaplanır. Gelirinizin belirli dilimlerine farklı
                    oranlar uygulanır. 2024 yılında en düşük dilim %15, en yüksek dilim %40&apos;tır.
                </p>

                <h4>Damga vergisi nedir?</h4>
                <p>
                    Damga vergisi, sözleşmeler, makbuzlar ve resmi belgeler üzerinden alınan bir vergidir.
                    Oran, belge türüne göre değişir ve genellikle binde (‰) cinsinden ifade edilir.
                </p>
            </article>
        </div>
    )
}
