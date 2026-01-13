import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { InflationCalculator } from "@/components/calculators/finance/inflation-calculator"

export const metadata: Metadata = {
    title: "Enflasyon Hesaplama - Satın Alma Gücü Kaybı Hesaplayıcı",
    description: "Online enflasyon hesaplama aracı. Paranızın enflasyona göre değer kaybını ve gelecekteki satın alma gücünü hesaplayın. Reel değer hesaplayıcı.",
    keywords: ["enflasyon hesaplama", "satın alma gücü", "para değer kaybı", "enflasyon etkisi", "reel değer hesaplama", "enflasyon oranı"],
    openGraph: {
        title: "Enflasyon Hesaplama - Satın Alma Gücü Kaybı Hesaplayıcı",
        description: "Paranızın enflasyona göre değer kaybını hesaplayın.",
        type: "website",
    }
}

export default function EnflasyonHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                    <Home className="h-4 w-4" />
                    Ana Sayfa
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/finans" className="hover:text-indigo-600 transition-colors">
                    Finans
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Enflasyon Hesaplama</span>
            </nav>

            {/* Page Title */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Enflasyon Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Paranızın enflasyon karşısında ne kadar değer kaybedeceğini öğrenin.
                </p>
            </div>

            {/* Calculator */}
            <InflationCalculator />

            {/* SEO Content */}
            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Enflasyon Nedir?</h2>
                <p>
                    Enflasyon, bir ekonomide mal ve hizmetlerin genel fiyat düzeyinin sürekli
                    olarak artması ve bunun sonucunda para biriminin alım gücünün azalmasıdır.
                    Basitçe ifade etmek gerekirse, bugün 100 TL&apos;ye aldığınız ürünün yarın
                    daha pahalı olması ve aynı paranın daha az şey alabilmesidir.
                </p>
                <p>
                    Türkiye&apos;de enflasyon TÜİK (Türkiye İstatistik Kurumu) tarafından aylık
                    olarak hesaplanır ve açıklanır. En yaygın kullanılan enflasyon göstergeleri
                    TÜFE (Tüketici Fiyat Endeksi) ve ÜFE (Üretici Fiyat Endeksi)&apos;dir.
                </p>

                <h2>Satın Alma Gücü Nedir?</h2>
                <p>
                    Satın alma gücü, belirli bir miktarda paranın mal ve hizmet satın alma
                    kapasitesini ifade eder. Enflasyon yükseldikçe aynı miktarda paranın
                    satın alma gücü düşer.
                </p>
                <p>
                    Örneğin, 10 yıl önce 1.000 TL ile dolu bir market arabası alabiliyordunuz.
                    Bugün aynı ürünleri almak için belki 5.000 TL&apos;nin üzerinde ödemeniz
                    gerekiyor. Bu, 1.000 TL&apos;nin satın alma gücünün dramatik şekilde
                    azaldığını gösterir.
                </p>

                <h2>Enflasyon Nasıl Hesaplanır?</h2>
                <p>
                    Enflasyonun satın alma gücü üzerindeki etkisi şu formülle hesaplanır:
                </p>
                <p>
                    <strong>Gelecek Reel Değer = Bugünkü Değer / (1 + Enflasyon Oranı)^Yıl Sayısı</strong>
                </p>
                <p>
                    Örneğin, %50 yıllık enflasyonla 100.000 TL&apos;nin 3 yıl sonraki reel değeri:
                </p>
                <ul>
                    <li>Reel Değer = 100.000 / (1.50)^3</li>
                    <li>Reel Değer = 100.000 / 3.375</li>
                    <li>Reel Değer ≈ 29.630 TL</li>
                </ul>
                <p>
                    Bu, 100.000 TL&apos;nizin 3 yıl sonra bugünkü alım gücüyle sadece yaklaşık
                    30.000 TL değerinde olacağı anlamına gelir!
                </p>

                <h2>Enflasyonun Nedenleri</h2>
                <p>
                    Enflasyonun temel nedenleri şunlardır:
                </p>
                <ul>
                    <li>
                        <strong>Talep Çekişli Enflasyon:</strong> Ekonomideki toplam talep,
                        toplam arzı aştığında fiyatlar yükselir.
                    </li>
                    <li>
                        <strong>Maliyet İtişli Enflasyon:</strong> Üretim maliyetlerinin
                        (hammadde, enerji, işçilik) artması fiyatlara yansır.
                    </li>
                    <li>
                        <strong>Para Arzı:</strong> Piyasadaki para miktarı arttıkça
                        paranın değeri düşer.
                    </li>
                    <li>
                        <strong>Döviz Kurları:</strong> Yerel para biriminin değer kaybetmesi
                        ithal ürün fiyatlarını artırır.
                    </li>
                    <li>
                        <strong>Beklentiler:</strong> Enflasyon beklentisi kendi kendini
                        gerçekleştiren bir kehanete dönüşebilir.
                    </li>
                </ul>

                <h2>Enflasyondan Korunma Yolları</h2>
                <ul>
                    <li>
                        <strong>Enflasyonu Yenen Yatırımlar:</strong> Hisse senedi, gayrimenkul
                        veya altın gibi enflasyonun üzerinde getiri sağlayabilecek varlıklara
                        yatırım yapın.
                    </li>
                    <li>
                        <strong>Enflasyona Endeksli Mevduat:</strong> Bazı bankalar TÜFE&apos;ye
                        endeksli mevduat hesapları sunmaktadır.
                    </li>
                    <li>
                        <strong>Döviz Çeşitlendirmesi:</strong> Tasarrufların bir kısmını
                        güçlü dövizlerde tutmak TL değer kaybından koruyabilir.
                    </li>
                    <li>
                        <strong>Gayrimenkul:</strong> Emlak genellikle enflasyonla birlikte
                        değer kazanır.
                    </li>
                    <li>
                        <strong>Altın ve Kıymetli Madenler:</strong> Tarihsel olarak enflasyon
                        karşısında değer koruma aracı olarak kullanılmıştır.
                    </li>
                </ul>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>TÜFE ve ÜFE arasındaki fark nedir?</h3>
                <p>
                    TÜFE (Tüketici Fiyat Endeksi) tüketicilerin satın aldığı mal ve hizmet
                    sepetinin fiyat değişimini, ÜFE (Üretici Fiyat Endeksi) ise üreticilerin
                    mallarını sattığı fiyatları ölçer. ÜFE genellikle TÜFE&apos;nin öncü
                    göstergesidir.
                </p>

                <h3>Hiperenflasyon nedir?</h3>
                <p>
                    Hiperenflasyon, aylık %50 veya yıllık %12.875&apos;in üzerindeki aşırı
                    enflasyon oranlarını ifade eder. Bu durumda para neredeyse değersiz
                    hale gelir ve ekonomi ciddi şekilde bozulur.
                </p>

                <h3>Deflasyon nedir ve enflasyondan farkı nedir?</h3>
                <p>
                    Deflasyon, genel fiyat düzeyinin düşmesidir (negatif enflasyon).
                    İlk bakışta iyi görünse de, deflasyon ekonomik durgunluğa ve
                    işsizliğe yol açabilir.
                </p>

                <h3>Merkez Bankası enflasyonu nasıl kontrol eder?</h3>
                <p>
                    Merkez Bankası faiz oranlarını yükselterek para arzını kısar, bu da
                    harcamaları azaltır ve enflasyonu düşürür. Ancak bu süreçte ekonomik
                    büyüme de yavaşlayabilir.
                </p>

                <h2>Enflasyonu Takip Etmek</h2>
                <p>
                    Finansal kararlar alırken enflasyonu takip etmek önemlidir:
                </p>
                <ul>
                    <li>TÜİK&apos;in aylık enflasyon açıklamalarını takip edin</li>
                    <li>Reel faiz oranını hesaplayın (Nominal Faiz - Enflasyon)</li>
                    <li>Maaş artışınızı enflasyonla karşılaştırın</li>
                    <li>Uzun vadeli planlarınızda enflasyon senaryolarını değerlendirin</li>
                    <li>Yatırım getirilerinizi reel bazda hesaplayın</li>
                </ul>
            </article>
        </div>
    )
}
