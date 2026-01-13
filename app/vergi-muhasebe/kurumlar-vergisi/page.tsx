import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { CorporateTaxCalculator } from "@/components/calculators/tax/corporate-tax-calculator"

export const metadata: Metadata = {
    title: "Kurumlar Vergisi Hesaplama - Şirket Vergi Hesaplayıcı 2024",
    description: "Online kurumlar vergisi hesaplama aracı. Şirket kazancı üzerinden ödenecek kurumlar vergisini hesaplayın. 2024 kurumlar vergisi oranı %25.",
    keywords: ["kurumlar vergisi hesaplama", "şirket vergisi", "kurumlar vergisi oranı", "şirket kazanç vergisi", "kurumlar vergisi 2024"],
    openGraph: {
        title: "Kurumlar Vergisi Hesaplama - Şirket Vergi Hesaplayıcı",
        description: "Şirket kazancı üzerinden ödenecek kurumlar vergisini hesaplayın.",
        type: "website",
    }
}

export default function KurumlarVergisiPage() {
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
                <span className="text-slate-900 dark:text-white font-medium">Kurumlar Vergisi</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Kurumlar Vergisi Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Şirket kazancınız üzerinden ödenecek kurumlar vergisini hesaplayın.
                </p>
            </div>

            <CorporateTaxCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Kurumlar Vergisi Nedir?</h2>
                <p>
                    Kurumlar vergisi, sermaye şirketleri, kooperatifler, iktisadi kamu kuruluşları,
                    dernek ve vakıflara ait iktisadi işletmeler ile iş ortaklıklarının kazançları
                    üzerinden alınan bir vergidir. Türkiye&apos;de kurumlar vergisi, 5520 sayılı
                    Kurumlar Vergisi Kanunu ile düzenlenmiştir.
                </p>
                <p>
                    2024 yılı itibarıyla kurumlar vergisi oranı <strong>%25</strong> olarak
                    uygulanmaktadır. Bu oran, şirketin elde ettiği safi kurum kazancı üzerinden
                    hesaplanır.
                </p>

                <h2>Kurumlar Vergisi Mükellefleri</h2>
                <ul>
                    <li>Anonim şirketler (A.Ş.)</li>
                    <li>Limited şirketler (Ltd. Şti.)</li>
                    <li>Sermayesi paylara bölünmüş komandit şirketler</li>
                    <li>Kooperatifler</li>
                    <li>İktisadi kamu kuruluşları</li>
                    <li>Dernek ve vakıflara ait iktisadi işletmeler</li>
                    <li>İş ortaklıkları</li>
                    <li>Yabancı kurumların Türkiye&apos;deki şubeleri</li>
                </ul>

                <h2>Kurumlar Vergisi Matrahı</h2>
                <p>
                    Kurumlar vergisi matrahı, kurum kazancından indirilebilecek giderler ve
                    istisnalar düşüldükten sonra kalan safi tutardır. Matrah hesaplanırken
                    dikkate alınan unsurlar:
                </p>
                <ul>
                    <li>Ticari bilanço karı</li>
                    <li>Kanunen kabul edilmeyen giderler (KKEG) eklenir</li>
                    <li>İstisnalar ve indirimler düşülür</li>
                    <li>Geçmiş yıl zararları mahsup edilir</li>
                </ul>

                <h2>İndirimler ve İstisnalar</h2>
                <h3>İştirak Kazançları İstisnası</h3>
                <p>
                    Tam mükellef kurumlardan elde edilen iştirak kazançları kurumlar vergisinden
                    istisnadır. Bu düzenleme, aynı kazanç üzerinden mükerrer vergilemeyi önler.
                </p>

                <h3>Ar-Ge İndirimi</h3>
                <p>
                    Ar-Ge ve tasarım faaliyetleri kapsamındaki harcamalar, %100 oranında
                    matrahtan indirilebilir. Teknoloji geliştirme bölgelerinde faaliyet gösteren
                    şirketler için ek avantajlar mevcuttur.
                </p>

                <h3>İhracat İndirimi</h3>
                <p>
                    İhracat faaliyetlerinden elde edilen kazançların belirli bir kısmı
                    vergi matrahından indirilebilir (güncel mevzuata bakınız).
                </p>

                <h2>Geçici Vergi</h2>
                <p>
                    Kurumlar vergisi mükellefleri, üçer aylık dönemler halinde geçici vergi
                    beyannamesi verir ve ödeme yapar. Geçici vergi oranı, kurumlar vergisi
                    oranıyla aynıdır (%25).
                </p>
                <ul>
                    <li>1. Dönem (Ocak-Mart): Mayıs 17</li>
                    <li>2. Dönem (Nisan-Haziran): Ağustos 17</li>
                    <li>3. Dönem (Temmuz-Eylül): Kasım 17</li>
                    <li>4. Dönem (Ekim-Aralık): Şubat 17</li>
                </ul>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Kurumlar vergisi beyannamesi ne zaman verilir?</h3>
                <p>
                    Kurumlar vergisi beyannamesi, hesap döneminin kapandığı ayı izleyen
                    dördüncü ayın son gününe kadar (genellikle Nisan sonuna kadar) verilir.
                </p>

                <h3>Zarar eden şirket kurumlar vergisi öder mi?</h3>
                <p>
                    Hayır, kurumlar vergisi kazanç üzerinden hesaplanır. Zarar eden şirketler
                    kurumlar vergisi ödemez. Ayrıca zararlar, izleyen 5 yıl içinde elde edilen
                    kazançlardan mahsup edilebilir.
                </p>

                <h3>Şahıs şirketleri kurumlar vergisi öder mi?</h3>
                <p>
                    Hayır, şahıs şirketleri (ferdi işletmeler) kurumlar vergisi değil, gelir
                    vergisi mükellefidir. Kazançları işletme sahibinin gelir vergisi
                    beyannamesinde beyan edilir.
                </p>

                <h3>Kurumlar vergisi ile gelir vergisi arasındaki fark nedir?</h3>
                <p>
                    Kurumlar vergisi tüzel kişilerden (şirketler), gelir vergisi ise gerçek
                    kişilerden alınır. Kurumlar vergisi sabit oranlı (%25), gelir vergisi ise
                    artan oranlıdır (%15-40).
                </p>

                <h2>Vergi Avantajları ve Teşvikler</h2>
                <ul>
                    <li>Teknoloji Geliştirme Bölgeleri&apos;nde kurumlar vergisi muafiyeti</li>
                    <li>Serbest bölgelerde imalat faaliyetleri için istisna</li>
                    <li>Yatırım teşvik belgesi kapsamında vergi indirimi</li>
                    <li>Bölgesel teşvik uygulamaları</li>
                    <li>KOBİ&apos;ler için özel indirimler</li>
                </ul>
            </article>
        </div>
    )
}
