import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { CostCalculator } from "@/components/calculators/tax/cost-calculator"

export const metadata: Metadata = {
    title: "Maliyet Hesaplama - Ürün Fiyat ve Kar Hesaplayıcı",
    description: "Online maliyet hesaplama aracı. Ürün ve hizmet maliyetlerini hesaplayın, kar marjı belirleyin ve satış fiyatını otomatik hesaplayın. Birim maliyet hesaplama.",
    keywords: ["maliyet hesaplama", "kar marjı hesaplama", "satış fiyatı hesaplama", "birim maliyet", "ürün fiyatlandırma", "maliyet analizi"],
    openGraph: {
        title: "Maliyet Hesaplama - Ürün Fiyat ve Kar Hesaplayıcı",
        description: "Ürün maliyetlerini ve satış fiyatını hesaplayın.",
        type: "website",
    }
}

export default function MaliyetHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                    <Home className="h-4 w-4" />
                    Ana Sayfa
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/vergi-muhasebe" className="hover:text-indigo-600 transition-colors">
                    Vergi & Muhasebe
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Maliyet Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Maliyet Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Ürün veya hizmet maliyetlerinizi hesaplayın ve kar marjınızı belirleyin.
                </p>
            </div>

            <CostCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Maliyet Hesaplama Nedir?</h2>
                <p>
                    Maliyet hesaplama, bir ürün veya hizmetin üretilmesi ya da sunulması için
                    gereken tüm harcamaların belirlenmesi sürecidir. Doğru maliyet hesabı,
                    karlı bir fiyatlandırma yapmanın ve işletmenin sürdürülebilirliğini
                    sağlamanın temelidir.
                </p>
                <p>
                    İşletmeler için maliyet hesaplama, sadece hammadde maliyetini değil,
                    işçilik, nakliye, depolama, pazarlama ve genel giderler dahil tüm
                    masrafları kapsamalıdır.
                </p>

                <h2>Maliyet Türleri</h2>
                <h3>Değişken Maliyetler</h3>
                <p>
                    Üretim miktarına bağlı olarak değişen maliyetlerdir:
                </p>
                <ul>
                    <li>Hammadde ve malzeme</li>
                    <li>Doğrudan işçilik</li>
                    <li>Ambalaj malzemeleri</li>
                    <li>Nakliye ve lojistik</li>
                    <li>Enerji (üretimle orantılı kısım)</li>
                </ul>

                <h3>Sabit Maliyetler</h3>
                <p>
                    Üretim miktarından bağımsız olan maliyetlerdir:
                </p>
                <ul>
                    <li>Kira giderleri</li>
                    <li>Yönetici maaşları</li>
                    <li>Sigorta primleri</li>
                    <li>Amortisman giderleri</li>
                    <li>Sabit enerji giderleri</li>
                </ul>

                <h2>Birim Maliyet Hesaplama</h2>
                <p>
                    Birim maliyet, üretilen her bir ürün için harcanan toplam tutardır:
                </p>
                <p>
                    <strong>Birim Maliyet = Toplam Maliyet / Üretim Adedi</strong>
                </p>
                <p>
                    Örneğin, 10.000 TL toplam maliyetle 100 adet ürün üretiliyorsa:
                </p>
                <ul>
                    <li>Birim Maliyet = 10.000 / 100 = 100 TL/adet</li>
                </ul>

                <h2>Kar Marjı Belirleme</h2>
                <p>
                    Kar marjı, satış fiyatı ile maliyet arasındaki farkın oranıdır.
                    İki farklı hesaplama yöntemi vardır:
                </p>
                <h3>Maliyet Üzerinden Kar Marjı (Markup)</h3>
                <p>
                    <strong>Satış Fiyatı = Maliyet × (1 + Kar Marjı)</strong>
                </p>
                <p>
                    Örnek: 100 TL maliyetli ürüne %30 kar marjı eklenirse:
                    Satış Fiyatı = 100 × 1.30 = 130 TL
                </p>

                <h3>Satış Fiyatı Üzerinden Kar Marjı (Margin)</h3>
                <p>
                    <strong>Kar = Satış Fiyatı × Kar Marjı</strong>
                </p>
                <p>
                    Örnek: 130 TL satış fiyatının %30 kar marjı:
                    Kar = 130 × 0.30 = 39 TL (Maliyet = 91 TL)
                </p>

                <h2>Başabaş Noktası</h2>
                <p>
                    Başabaş noktası (break-even point), gelir ve giderlerin eşitlendiği,
                    ne kar ne zarar edilen üretim miktarıdır:
                </p>
                <p>
                    <strong>Başabaş Adedi = Sabit Maliyetler / (Birim Satış Fiyatı - Birim Değişken Maliyet)</strong>
                </p>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Kar marjı kaç olmalı?</h3>
                <p>
                    Kar marjı sektöre göre değişir. Perakende için %20-50, toptan için %5-20,
                    hizmet sektöründe %40-80 gibi oranlar görülebilir. Rekabet koşulları,
                    ürün niteliği ve pazar konumunuza göre belirlemelisiniz.
                </p>

                <h3>Maliyete hangi giderler dahil edilmeli?</h3>
                <p>
                    Tüm doğrudan maliyetler (hammadde, işçilik) ve dolaylı maliyetlerin
                    (kira, enerji) orantılı payı dahil edilmelidir. Ayrıca pazarlama ve
                    satış giderleri de değerlendirilmelidir.
                </p>

                <h3>Maliyet muhasebesi neden önemli?</h3>
                <p>
                    Doğru maliyet hesabı olmadan karlı fiyatlandırma yapılamaz. Hangi
                    ürünlerin karlı, hangilerinin zararlı olduğu anlaşılamaz. Maliyetleri
                    düşürme fırsatları görülemez.
                </p>

                <h3>ABC maliyet analizi nedir?</h3>
                <p>
                    Activity Based Costing (ABC), maliyetleri faaliyetlere göre dağıtan
                    bir yöntemdir. Geleneksel yöntemlerden daha doğru sonuç verir, özellikle
                    çok ürünlü işletmelerde tercih edilir.
                </p>

                <h2>Maliyet Azaltma İpuçları</h2>
                <ul>
                    <li>Toplu alım indirimleri için tedarikçilerle pazarlık yapın</li>
                    <li>Fire ve israfı minimize edin</li>
                    <li>Enerji verimliliğini artırın</li>
                    <li>Süreçleri optimize edin, gereksiz adımları kaldırın</li>
                    <li>Alternatif hammadde kaynaklarını araştırın</li>
                    <li>Otomasyon ile işçilik maliyetlerini düşürün</li>
                </ul>
            </article>
        </div>
    )
}
