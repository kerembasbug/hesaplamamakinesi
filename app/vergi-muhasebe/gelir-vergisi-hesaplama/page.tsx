import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { IncomeTaxCalculator } from "@/components/calculators/tax/income-tax-calculator"

export const metadata: Metadata = {
    title: "Gelir Vergisi Hesaplama - Net Maaş Hesaplayıcı 2024",
    description: "Online gelir vergisi hesaplama aracı. Brüt maaştan net maaş hesaplayın. SGK, işsizlik sigortası, damga vergisi ve gelir vergisi kesintilerini görün. 2024 vergi dilimleri.",
    keywords: ["gelir vergisi hesaplama", "net maaş hesaplama", "brüt net maaş", "vergi dilimi", "sgk kesintisi", "maaş hesaplama"],
    openGraph: {
        title: "Gelir Vergisi Hesaplama - Net Maaş Hesaplayıcı",
        description: "Brüt maaştan net maaş ve vergi kesintilerini hesaplayın.",
        type: "website",
    }
}

export default function GelirVergisiHesaplamaPage() {
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
                <span className="text-slate-900 dark:text-white font-medium">Gelir Vergisi Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Gelir Vergisi Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Brüt maaşınızdan net maaşınızı ve tüm vergi kesintilerini hesaplayın.
                </p>
            </div>

            <IncomeTaxCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Gelir Vergisi Nedir?</h2>
                <p>
                    Gelir vergisi, gerçek kişilerin bir takvim yılı içinde elde ettikleri kazanç ve iratların
                    safi tutarı üzerinden hesaplanan doğrudan bir vergidir. Türkiye&apos;de gelir vergisi,
                    artan oranlı (progresif) bir yapıya sahiptir; yani gelir arttıkça vergi oranı da artar.
                </p>
                <p>
                    Ücretli çalışanlar için gelir vergisi, işveren tarafından her ay maaştan kesilerek
                    vergi dairesine yatırılır. Bu sisteme &quot;stopaj&quot; veya &quot;kaynakta kesinti&quot; denir.
                    Çalışanların ayrıca beyanname vermesi gerekmez (istisnai durumlar hariç).
                </p>

                <h2>2024 Gelir Vergisi Dilimleri</h2>
                <p>
                    2024 yılı için geçerli gelir vergisi dilimleri şöyledir:
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Gelir Aralığı (Yıllık)</th>
                            <th>Vergi Oranı</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0 - 110.000 TL</td>
                            <td>%15</td>
                        </tr>
                        <tr>
                            <td>110.000 - 230.000 TL</td>
                            <td>%20</td>
                        </tr>
                        <tr>
                            <td>230.000 - 580.000 TL</td>
                            <td>%27</td>
                        </tr>
                        <tr>
                            <td>580.000 - 3.000.000 TL</td>
                            <td>%35</td>
                        </tr>
                        <tr>
                            <td>3.000.000 TL üzeri</td>
                            <td>%40</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    Vergi dilimleri kümülatif olarak uygulanır. Yani yıllık geliriniz 150.000 TL ise,
                    ilk 110.000 TL&apos;ye %15, kalan 40.000 TL&apos;ye %20 uygulanır.
                </p>

                <h2>Maaş Kesintileri Nelerdir?</h2>
                <ul>
                    <li>
                        <strong>SGK İşçi Payı (%14):</strong> Sosyal güvenlik primi olarak brüt maaştan kesilir.
                        Emeklilik, sağlık ve işsizlik haklarınızı güvence altına alır.
                    </li>
                    <li>
                        <strong>İşsizlik Sigortası (%1):</strong> İşsizlik durumunda maaş desteği almanızı sağlar.
                    </li>
                    <li>
                        <strong>Damga Vergisi (%0.759):</strong> Brüt maaş üzerinden alınan sabit oranlı bir vergidir.
                    </li>
                    <li>
                        <strong>Gelir Vergisi (%15-40):</strong> SGK kesintileri düşüldükten sonraki matrah
                        üzerinden hesaplanır.
                    </li>
                </ul>

                <h2>Net Maaş Nasıl Hesaplanır?</h2>
                <p>
                    Net maaş hesaplama adımları şöyledir:
                </p>
                <ol>
                    <li><strong>Brüt Maaş</strong> belirlenir</li>
                    <li><strong>SGK İşçi Payı</strong> = Brüt × %14</li>
                    <li><strong>İşsizlik Sigortası</strong> = Brüt × %1</li>
                    <li><strong>Gelir Vergisi Matrahı</strong> = Brüt - SGK - İşsizlik</li>
                    <li><strong>Gelir Vergisi</strong> hesaplanır (kümülatif dilim sistemi)</li>
                    <li><strong>Damga Vergisi</strong> = Brüt × %0.759</li>
                    <li><strong>Net Maaş</strong> = Brüt - SGK - İşsizlik - Gelir Vergisi - Damga Vergisi</li>
                </ol>

                <h2>Asgari Geçim İndirimi (AGİ)</h2>
                <p>
                    AGİ, çalışanların medeni durumuna ve çocuk sayısına göre uygulanan bir vergi indirimidir.
                    2024 itibarıyla AGİ uygulaması kaldırılmış ve yerine engelli indirimi gibi özel indirimler
                    korunmuştur. Güncel mevzuatı takip etmeniz önerilir.
                </p>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Brüt maaş ile net maaş arasındaki fark nedir?</h3>
                <p>
                    Brüt maaş, işverenin belirlediği ve kesintiler yapılmadan önceki tutar; net maaş ise
                    tüm yasal kesintiler (SGK, gelir vergisi, damga vergisi) düşüldükten sonra elinize
                    geçen tutardır.
                </p>

                <h3>Vergi dilimi değiştiğinde ne olur?</h3>
                <p>
                    Yıl içinde kümülatif geliriniz bir üst dilime geçtiğinde, o ay&apos;dan itibaren
                    daha yüksek oranda vergi kesilmeye başlar. Bu nedenle yıl sonuna doğru net
                    maaşınız düşebilir.
                </p>

                <h3>İşveren maliyeti nedir?</h3>
                <p>
                    İşveren, brüt maaşın üzerine SGK işveren payı (%15.5), işsizlik işveren payı (%2) ve
                    diğer yükümlülükleri de öder. Bu nedenle işverenin toplam maliyeti brüt maaştan
                    yaklaşık %20-22 daha fazladır.
                </p>

                <h3>Emekli maaşımdan da kesinti yapılır mı?</h3>
                <p>
                    Emekli maaşlarından SGK primi kesilmez. Ancak gelir vergisi ve damga vergisi
                    kesintisi yapılabilir (emekli türüne göre değişir).
                </p>

                <h2>Vergi Avantajları</h2>
                <ul>
                    <li>Bireysel Emeklilik Sistemi (BES) katkı payları vergi matrahından düşülebilir</li>
                    <li>Eğitim ve sağlık harcamaları belirli limitlerde indirilebilir</li>
                    <li>Engelli indirimi uygulanabilir</li>
                    <li>Bağış ve yardımlar matrahtan düşülebilir</li>
                </ul>
            </article>
        </div>
    )
}
