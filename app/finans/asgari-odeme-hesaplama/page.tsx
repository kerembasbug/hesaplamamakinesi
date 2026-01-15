import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { CreditMinPaymentCalculator } from "@/components/calculators/finance/credit-card-min-payment"

export const metadata: Metadata = {
    title: "Asgari Ödeme Hesaplama - Kredi Kartı Asgari Tutarı",
    description: "Kredi kartı ekstre borcuna göre asgari ödeme tutarı hesaplama aracı. BDDK'nın belirlediği %20 ve %40 oranlarına göre hesaplayın.",
    keywords: ["asgari ödeme hesaplama", "kredi kartı asgari hesaplama", "asgari tutar hesaplama", "asgari ödeme nasıl hesaplanır"]
}

export default function AsgariOdemePage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/finans" className="hover:text-indigo-600 transition-colors">Finans</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Asgari Ödeme Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Asgari Ödeme Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Kredi kartı borcunuzun bankaya ödemeniz gereken minimum tutarını öğrenin.</p>
            </div>

            <CreditMinPaymentCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Asgari Ödeme Tutarı Nedir?</h2>
                <p>
                    Asgari ödeme tutarı, kredi kartı borcunuzun cezai duruma düşmemesi ve kartınızın
                    kullanıma kapanmaması için ödemeniz gereken en düşük tutardır. Bu tutarı ödemezseniz
                    kredi notunuz düşer, gecikme faizi işler ve kartınız bloke olabilir.
                </p>
                <p>
                    BDDK (Bankacılık Düzenleme ve Denetleme Kurumu) asgari ödeme oranlarını belirler.
                    Bu oranlar kredi kartı limitine göre farklılık gösterir.
                </p>

                <h2>Asgari Ödeme Oranları 2025</h2>
                <p>BDDK kararlarına göre güncel asgari ödeme oranları:</p>
                <ul>
                    <li><strong>25.000 TL ve altı limitli kartlar:</strong> Ekstre borcunun %20&apos;si</li>
                    <li><strong>25.000 TL - 50.000 TL arası:</strong> Ekstre borcunun %30&apos;u</li>
                    <li><strong>50.000 TL ve üzeri limitli kartlar:</strong> Ekstre borcunun %40&apos;ı</li>
                </ul>
                <p>
                    Bu oranlar değişkendir ve BDDK tarafından güncellenebilir. Bankanızın ekstre
                    bilgilerinde güncel oran belirtilir.
                </p>

                <h2>Asgari Ödeme Yapmak Neden Riskli?</h2>
                <p>
                    Asgari tutarı ödeyip kalanı bırakmak aşağıdaki sorunlara yol açar:
                </p>
                <ul>
                    <li><strong>Yüksek Faiz:</strong> Kalan borç üzerine aylık %3-4 oranında akdi faiz işler</li>
                    <li><strong>Bileşik Faiz:</strong> Ödenmemiş faiz de faize tabi olur, borç hızla artar</li>
                    <li><strong>Borç Sarmalı:</strong> Her ay borç katlanarak ödenmesi imkansız hale gelebilir</li>
                    <li><strong>Kredi Notu Etkisi:</strong> Sürekli asgari ödemek kredi notunu olumsuz etkiler</li>
                </ul>

                <h2>Asgari Ödeme Yerine Ne Yapmalı?</h2>
                <ul>
                    <li><strong>Tam ödeme yapın:</strong> Mümkünse ekstre borcunun tamamını ödeyin</li>
                    <li><strong>Borcunuzu taksitlendirin:</strong> Bankadan yapılandırma talep edin</li>
                    <li><strong>Nakit avans kullanmayın:</strong> Nakit avans faiz oranları çok yüksektir</li>
                    <li><strong>İhtiyaç kredisi değerlendirin:</strong> Kredi kartı faizi genelde daha yüksektir</li>
                </ul>

                <h3>Sıkça Sorulan Sorular</h3>

                <h4>Asgari ödeme yapmazsam ne olur?</h4>
                <p>
                    Asgari tutarı ödemeseniz bile borcunuz çalışmaya devam eder. Ancak gecikme faizi
                    (temerrüt faizi) işlemeye başlar, kredi notunuz düşer, kartınız bloke olabilir ve
                    yasal takip başlatılabilir.
                </p>

                <h4>Asgari tutardan fazla ödersem faiz düşer mi?</h4>
                <p>
                    Evet, ne kadar çok ödeme yaparsanız faiz işleyecek anapara o kadar azalır. İdeal
                    olan borcun tamamını ödemek, mümkün değilse mümkün olan en yüksek tutarı ödemektir.
                </p>

                <h4>Minimum 300 TL kuralı nedir?</h4>
                <p>
                    Bazı bankalarda hesaplanan asgari ödeme tutarı 300 TL&apos;nin altında kalsa bile
                    minimum 300 TL asgari tutar olarak belirlenir. Bu kural bankadan bankaya değişebilir.
                </p>

                <h4>Kredi kartı borcumu yapılandırabilir miyim?</h4>
                <p>
                    Evet, bankalar borç yapılandırma seçenekleri sunar. 3-36 ay arasında taksitlendirme
                    yapılabilir. Yapılandırma faizi genellikle normal faizden daha düşüktür.
                </p>
            </article>
        </div>
    )
}
