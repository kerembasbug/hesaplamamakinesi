import { IncomeTaxCalculator } from "@/components/calculators/tax/income-tax-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import { GuncellemeNotu, SgkParametreleri, UcretDisiVergiDilimleri, UcretVergiDilimleri } from "@/components/content/vergi-tablolari"

export const metadata = buildMetadata({
    title: "Gelir Vergisi Hesaplama 2026",
    description: "2026 gelir vergisi hesaplama aracı. Brüt maaştan net maaşı, SGK ve damga vergisi kesintilerini ve asgari ücret istisnasını güncel dilimlerle görün.",
    keywords: ["gelir vergisi hesaplama", "net maaş hesaplama", "brüt net maaş", "vergi dilimi", "sgk kesintisi", "maaş hesaplama"],
    path: "/vergi-muhasebe/gelir-vergisi-hesaplama",
})

export default function GelirVergisiHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Gelir Vergisi Hesaplama",
                    description: "Online gelir vergisi hesaplama aracı. Brüt maaştan net maaş hesaplayın. SGK, işsizlik sigortası, damga vergisi ve gelir vergisi kesintilerini görün. 2024 vergi dilimleri.",
                    path: "/vergi-muhasebe/gelir-vergisi-hesaplama",
                    applicationCategory: "FinanceApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Vergi & Muhasebe", path: "/vergi-muhasebe" },
                { name: "Gelir Vergisi Hesaplama" },
            ]} />

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

                <h2>2026 Gelir Vergisi Dilimleri</h2>
                <p>
                    2026 yılı ücret gelirleri için geçerli gelir vergisi tarifesi şöyledir. Bu tablo, sitedeki
                    tüm hesaplayıcıların kullandığı merkezî veri dosyasından üretilir; mevzuat değiştiğinde
                    tablo ve hesaplama birlikte güncellenir.
                </p>
                <UcretVergiDilimleri />
                <p>
                    Vergi dilimleri kümülatif olarak uygulanır: yıllık matrahınız 250.000 TL ise ilk 190.000 TL&apos;ye
                    %15, kalan 60.000 TL&apos;ye %20 uygulanır. Ücret dışı gelirlerde (kira, serbest meslek, ticari
                    kazanç) üçüncü dilimin üst sınırı farklıdır:
                </p>
                <UcretDisiVergiDilimleri />

                <h2>Asgari Ücret Gelir Vergisi İstisnası</h2>
                <p>
                    2022&apos;de asgari geçim indirimi (AGİ) kaldırıldı ve yerine tüm çalışanları kapsayan bir istisna
                    getirildi: ücretinizin <strong>asgari ücrete denk gelen kısmı gelir vergisinden ve damga
                    vergisinden muaftır</strong>. Bu istisna yalnızca asgari ücretlilere değil, herkese uygulanır.
                    Yüksek maaşlı bir çalışan da her ay asgari ücretlinin ödeyeceği kadar vergiyi düşer.
                </p>
                <p>
                    Pratik sonucu şudur: brüt maaşınız ne olursa olsun, aylık gelir verginizden asgari ücretlinin
                    o ayki gelir vergisi kadar indirim yapılır. Yukarıdaki hesaplayıcı bu istisnayı otomatik
                    uygular ve düşülen tutarı ayrı satırda gösterir.
                </p>

                <h2>Prime Esas Kazanç Tavanı</h2>
                <p>
                    SGK ve işsizlik primleri sınırsız değildir. Prime esas kazanç üst sınırını aşan maaşlarda
                    prim, brüt maaşın tamamı üzerinden değil tavan tutarı üzerinden hesaplanır. 2026 parametreleri:
                </p>
                <SgkParametreleri />

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
                        <strong>Damga Vergisi (binde 7,59):</strong> Brüt maaş üzerinden alınan sabit oranlı bir vergidir.
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
                    <li><strong>Damga Vergisi</strong> = Brüt × binde 7,59 (asgari ücrete isabet eden kısmı istisna)</li>
                    <li><strong>Net Maaş</strong> = Brüt - SGK - İşsizlik - Gelir Vergisi - Damga Vergisi</li>
                </ol>

                <h2>Asgari Geçim İndirimi (AGİ) Hâlâ Var mı?</h2>
                <p>
                    Hayır. AGİ 2022 yılında kaldırıldı; medeni durum ve çocuk sayısına göre değişen o indirim
                    artık uygulanmıyor. Yerine yukarıda anlatılan asgari ücret istisnası geldi. Bu yüzden bekâr
                    ve evli bir çalışan aynı brüt maaşta aynı neti alır; net maaşı değiştiren tek etken kümülatif
                    vergi matrahıdır.
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
                    İşveren, brüt maaşın üzerine SGK işveren payını (%20,5; 5 puanlık teşvikten yararlanan
                    işyerlerinde %15,5) ve işsizlik işveren payını (%2) da öder. Teşviksiz durumda işverenin
                    toplam maliyeti brüt maaştan yaklaşık %22,5 daha fazladır; hesaplayıcı bu tutarı ayrıca
                    gösterir.
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
                <GuncellemeNotu kaynakAdi="Gelir İdaresi Başkanlığı" kaynakUrl="https://www.gib.gov.tr/" />
            </article>
        </div>
    )
}
