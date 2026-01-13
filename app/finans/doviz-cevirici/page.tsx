import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { CurrencyConverter } from "@/components/calculators/finance/currency-converter"

export const metadata: Metadata = {
    title: "Döviz Çevirici - Online Döviz Kuru Hesaplama",
    description: "Online döviz çevirici. Dolar, Euro, Sterlin ve diğer para birimleri arasında anlık döviz çevirimi yapın. TL karşılığı döviz kurları.",
    keywords: ["döviz çevirici", "döviz hesaplama", "dolar kuru", "euro kuru", "döviz çevirme", "para birimi çevirici", "kur hesaplama"],
    openGraph: {
        title: "Döviz Çevirici - Online Döviz Kuru Hesaplama",
        description: "Döviz kurları arasında hızlı çeviri yapın.",
        type: "website",
    }
}

export default function DovizCeviriciPage() {
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
                <span className="text-slate-900 dark:text-white font-medium">Döviz Çevirici</span>
            </nav>

            {/* Page Title */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Döviz Çevirici
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Dolar, Euro, Sterlin ve diğer para birimleri arasında hızlı ve kolay döviz çevirimi yapın.
                </p>
            </div>

            {/* Calculator */}
            <CurrencyConverter />

            {/* SEO Content */}
            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Döviz Kuru Nedir?</h2>
                <p>
                    Döviz kuru, bir para biriminin başka bir para birimi cinsinden değerini ifade
                    eder. Örneğin, 1 Amerikan Doları&apos;nın kaç Türk Lirası&apos;na eşit olduğunu
                    gösteren rakam döviz kurudur. Döviz kurları sürekli değişir ve uluslararası
                    ticaret, turizm, yatırım ve ekonomik kararlar için kritik öneme sahiptir.
                </p>
                <p>
                    Türkiye&apos;de en çok takip edilen döviz kurları Amerikan Doları (USD), Euro (EUR),
                    İngiliz Sterlini (GBP) ve çeşitli gelişmekte olan ülke para birimleridir.
                    Bu kurlar piyasa koşullarına, Merkez Bankası politikalarına ve global
                    ekonomik gelişmelere göre değişiklik gösterir.
                </p>

                <h2>Döviz Kurları Nasıl Belirlenir?</h2>
                <p>
                    Döviz kurları çeşitli faktörlere bağlı olarak belirlenir:
                </p>
                <ul>
                    <li>
                        <strong>Arz ve Talep:</strong> Bir para birimine talep artarsa değeri yükselir,
                        arz fazlalığı olursa değeri düşer.
                    </li>
                    <li>
                        <strong>Faiz Oranları:</strong> Yüksek faiz oranları yabancı yatırımcıları
                        çeker ve para biriminin değerini artırır.
                    </li>
                    <li>
                        <strong>Enflasyon:</strong> Düşük enflasyonlu ülkelerin para birimleri
                        genellikle daha değerlidir.
                    </li>
                    <li>
                        <strong>Politik İstikrar:</strong> Politik belirsizlik para biriminin
                        değer kaybetmesine neden olabilir.
                    </li>
                    <li>
                        <strong>Cari Denge:</strong> İhracat fazlası olan ülkelerin para birimleri
                        genellikle daha güçlüdür.
                    </li>
                </ul>

                <h2>Alış ve Satış Kuru Nedir?</h2>
                <p>
                    Bankalar ve döviz büroları iki farklı kur uygular:
                </p>
                <ul>
                    <li>
                        <strong>Alış Kuru:</strong> Bankanın sizden döviz ALDIĞI kur. Döviz
                        satmak istiyorsanız bu kur geçerlidir.
                    </li>
                    <li>
                        <strong>Satış Kuru:</strong> Bankanın size döviz SATTIĞI kur. Döviz
                        almak istiyorsanız bu kur geçerlidir.
                    </li>
                </ul>
                <p>
                    Satış kuru her zaman alış kurundan yüksektir. Aradaki fark (spread)
                    bankanın kar marjıdır. Örneğin, dolar alış 34.00 TL, satış 34.50 TL
                    ise spread 0.50 TL&apos;dir.
                </p>

                <h2>Efektif ve Döviz Kuru Farkı</h2>
                <p>
                    Bankalarda iki tür kur görebilirsiniz:
                </p>
                <ul>
                    <li>
                        <strong>Döviz Kuru:</strong> Banka hesapları arasındaki transferlerde
                        geçerli olan kur. Genellikle daha avantajlıdır.
                    </li>
                    <li>
                        <strong>Efektif Kur:</strong> Nakit döviz alım-satımında uygulanan kur.
                        Nakit taşıma, saklama ve sayma maliyetleri nedeniyle döviz kurundan
                        daha az avantajlıdır.
                    </li>
                </ul>

                <h2>Döviz Çevirme İpuçları</h2>
                <ul>
                    <li>
                        <strong>Kurları karşılaştırın:</strong> Farklı bankalar farklı kurlar
                        uygulayabilir. Büyük tutarlarda bile küçük farklar önemli olabilir.
                    </li>
                    <li>
                        <strong>Komisyon sorunu:</strong> Bazı bankalar döviz işlemlerinde
                        ek komisyon alabilir. Toplam maliyeti hesaplayın.
                    </li>
                    <li>
                        <strong>Zamanlama:</strong> Döviz kurları gün içinde değişebilir.
                        Acil değilse uygun zaman bekleyebilirsiniz.
                    </li>
                    <li>
                        <strong>Online işlem:</strong> İnternet bankacılığı üzerinden yapılan
                        döviz işlemleri genellikle şube işlemlerinden daha avantajlıdır.
                    </li>
                </ul>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>En güncel döviz kurlarını nereden takip edebilirim?</h3>
                <p>
                    Türkiye Cumhuriyet Merkez Bankası (TCMB) web sitesi, bankalar ve finansal
                    haber siteleri güncel kurları yayınlar. Canlı kurlar için banka
                    mobil uygulamaları veya finans sitelerini kullanabilirsiniz.
                </p>

                <h3>Serbest piyasa kuru nedir?</h3>
                <p>
                    Serbest piyasa kuru, döviz bürolarının uyguladığı ve bankalara göre
                    genellikle daha rekabetçi olan kuru ifade eder. Ancak güvenilir
                    kurumlar tercih edilmelidir.
                </p>

                <h3>Döviz mevduatı mı TL mevduatı mı?</h3>
                <p>
                    Bu karar kur beklentilerinize ve faiz oranlarına bağlıdır. Kur artışı
                    bekliyorsanız döviz, TL faiz oranları yüksekse ve kur stabil
                    bekliyorsanız TL avantajlı olabilir.
                </p>

                <h3>Forward (vadeli) döviz işlemi nedir?</h3>
                <p>
                    Forward işlem, gelecekte belirli bir tarihte, bugünden belirlenen kurdan
                    döviz alım-satımı yapma taahhüdüdür. İthalat-ihracat yapan firmalar
                    kur riskinden korunmak için kullanır.
                </p>

                <h2>Dünya Para Birimleri</h2>
                <p>
                    Dünyada 180 farklı resmi para birimi bulunmaktadır. En çok işlem gören
                    para birimleri şunlardır:
                </p>
                <ul>
                    <li><strong>USD (Amerikan Doları):</strong> Dünya rezerv para birimi, en çok işlem gören</li>
                    <li><strong>EUR (Euro):</strong> Avrupa Birliği&apos;nin ortak para birimi</li>
                    <li><strong>GBP (İngiliz Sterlini):</strong> Dünyanın en eski para birimlerinden</li>
                    <li><strong>JPY (Japon Yeni):</strong> Asya&apos;nın en büyük ekonomisinin para birimi</li>
                    <li><strong>CHF (İsviçre Frangı):</strong> Güvenli liman para birimi olarak bilinir</li>
                </ul>
            </article>
        </div>
    )
}
