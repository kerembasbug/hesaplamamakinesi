import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { Pension3600Calculator } from "@/components/calculators/finance/pension-3600-calculator"

export const metadata: Metadata = {
    title: "3600 Günle Emeklilik Hesaplama 2025",
    description: "3600 gün prim ile emeklilik şartları ve hesaplama tablosu. 15 yıl sigortalılık ve 3600 gün primle ne zaman emekli olunur?",
    keywords: ["3600 günle emeklilik hesaplama tablosu", "3600 günden emeklilik", "15 yıl 3600 gün emeklilik", "kısmi emeklilik hesaplama", "eyt 3600 gün"]
}

export default function Emeklilik3600Page() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/finans" className="hover:text-indigo-600 transition-colors">Finans</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">3600 Günle Emeklilik</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">3600 Günle Emeklilik Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">15 yıl ve 3600 gün şartına göre kısmi emeklilik durumunuzu sorgulayın.</p>
            </div>

            <Pension3600Calculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>3600 Günle Emeklilik Şartları Nelerdir?</h2>
                <p>
                    Kısmi emeklilik olarak da bilinen bu haktan yararlanabilmek için üç şartın aynı
                    anda sağlanması gerekir:
                </p>
                <ol>
                    <li><strong>08.09.1999 öncesi</strong> ilk defa sigortalı olmak</li>
                    <li><strong>15 yıl</strong> sigortalılık süresini tamamlamak</li>
                    <li><strong>3600 gün</strong> prim ödemiş olmak</li>
                </ol>
                <p>
                    Bu üç şart aynı anda sağlandığında, yaş şartını da tamamlamış olmak kaydıyla
                    emeklilik hakkı doğar. Yaş şartı, şartların ne zaman tamamlandığına göre değişir.
                </p>

                <h2>3600 Gün Neden Önemli?</h2>
                <p>
                    Normal şartlarda emeklilik için 7200 gün prim ödeme gerekirken, 08.09.1999 öncesi
                    sigortalı olanlar için bu süre 3600 güne düşürülmüştür. Bu, yaklaşık 10 yıllık
                    çalışma süresine karşılık gelir.
                </p>

                <h2>Yaş Şartı Tablosu</h2>
                <p>Üç şartın tamamlandığı tarihe göre emeklilik yaşı şu şekilde belirlenir:</p>
                <ul>
                    <li><strong>23.05.2002 öncesi tamamlayanlar:</strong> Yaş şartı yok (kadın 50, erkek 55 yaş taban)</li>
                    <li><strong>23.05.2002 - 2014 arası:</strong> Kademeli yaş şartı uygulanır</li>
                    <li><strong>2014 sonrası:</strong> Kadınlar 58, erkekler 60 yaş sınırına tabi</li>
                </ul>

                <h2>3600 Gün Prim Nasıl Hesaplanır?</h2>
                <p>
                    SGK sisteminde 1 yıl = 360 gün olarak hesaplanır. Dolayısıyla 3600 gün = 10 yıl
                    prim ödeme süresine karşılık gelir. Askerlik, doğum borçlanması ve yurtdışı
                    borçlanması bu süreye dahil edilebilir.
                </p>

                <h3>EYT Kapsamında 3600 Gün</h3>
                <p>
                    2023&apos;te çıkan EYT (Emeklilikte Yaşa Takılanlar) yasası, 08.09.1999 öncesi
                    sigortalı olanlar için yaş şartını kaldırmıştır. Ancak EYT dan yararlanmak için
                    prim gün sayısı şartı halen geçerlidir.
                </p>
                <ul>
                    <li><strong>EYT:</strong> Prim gününü tamamlamış ancak yaş şartına takılanlara yönelik</li>
                    <li><strong>3600 gün emeklilik:</strong> Prim gün sayısını azaltarak emekliliği kolaylaştıran düzenleme</li>
                </ul>

                <h3>Sıkça Sorulan Sorular</h3>

                <h4>3600 günle emekli olunca maaş düşük mü olur?</h4>
                <p>
                    Evet, emekli maaşı prim gününe bağlı olarak hesaplandığından, 3600 günle emekli
                    olanların maaşı 7200 günle emekli olanlara göre daha düşük olur. Maaş artırmak
                    için ek prim günü ödenebilir.
                </p>

                <h4>Askerlik süresi 3600 güne dahil mi?</h4>
                <p>
                    Askerlik süresi SGK&apos;ya borçlanılarak prim gününe eklenebilir. Borçlanma
                    tutarı asgari ücret üzerinden hesaplanır ve toplu veya taksitli ödenebilir.
                </p>

                <h4>Doğum borçlanması yapabilir miyim?</h4>
                <p>
                    Kadınlar, çocuklarının doğumundan itibaren 2 yıla kadar olan süreyi (maksimum
                    3 çocuk için 6 yıl = 2160 gün) borçlanabilir ve prim gününe ekleyebilir.
                </p>

                <h4>3600 günümü nasıl sorgularım?</h4>
                <p>
                    e-Devlet üzerinden &quot;SGK Tescil ve Hizmet Dökümü&quot; sorgulayarak toplam prim
                    gün sayınızı, sigortalılık başlangıç tarihinizi ve emeklilik durumunuzu
                    öğrenebilirsiniz.
                </p>
            </article>
        </div>
    )
}
