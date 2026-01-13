import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { DepositCalculator } from "@/components/calculators/finance/deposit-calculator"

export const metadata: Metadata = {
    title: "Mevduat Faizi Hesaplama - Vadeli Mevduat Getiri Hesaplayıcı",
    description: "Online mevduat faizi hesaplama aracı. Vadeli mevduat hesabınızın brüt ve net faiz getirisini, stopaj kesintisini ve vade sonu tutarını hesaplayın. Ücretsiz ve anlık sonuçlar.",
    keywords: ["mevduat faizi hesaplama", "vadeli mevduat hesaplama", "faiz hesaplama", "mevduat getirisi", "stopaj hesaplama", "banka faizi hesaplama"],
    openGraph: {
        title: "Mevduat Faizi Hesaplama - Vadeli Mevduat Getiri Hesaplayıcı",
        description: "Vadeli mevduat faiz getirinizi kolayca hesaplayın.",
        type: "website",
    }
}

export default function MevduatFaiziHesaplamaPage() {
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
                <span className="text-slate-900 dark:text-white font-medium">Mevduat Faizi Hesaplama</span>
            </nav>

            {/* Page Title */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Mevduat Faizi Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Vadeli mevduat hesabınızın net faiz getirisini ve vade sonu toplam tutarını hesaplayın.
                </p>
            </div>

            {/* Calculator */}
            <DepositCalculator />

            {/* SEO Content */}
            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Vadeli Mevduat Nedir?</h2>
                <p>
                    Vadeli mevduat, belirli bir süre boyunca bankada tutmayı taahhüt ettiğiniz paranız
                    karşılığında faiz geliri elde ettiğiniz bir tasarruf yöntemidir. Vadesiz hesaplardan
                    farklı olarak, paranızı belirli bir süre çekemezsiniz ancak bu karşılığında daha
                    yüksek faiz oranından yararlanırsınız.
                </p>
                <p>
                    Türkiye&apos;de vadeli mevduat hesapları TL ve döviz cinsinden açılabilir. En yaygın
                    vade seçenekleri 1 ay, 3 ay, 6 ay ve 1 yıldır. Bazı bankalar 1 hafta veya 2 hafta
                    gibi kısa vadeli seçenekler de sunmaktadır.
                </p>

                <h2>Mevduat Faizi Nasıl Hesaplanır?</h2>
                <p>
                    Vadeli mevduat faizi basit faiz yöntemiyle hesaplanır. Formül şu şekildedir:
                </p>
                <p>
                    <strong>Brüt Faiz = Anapara × (Yıllık Faiz Oranı / 100) × (Vade Günü / 365)</strong>
                </p>
                <p>
                    Hesaplanan brüt faiz üzerinden %15 oranında stopaj (gelir vergisi kesintisi)
                    yapılır. Kalan tutar net faiz olarak hesabınıza yansır.
                </p>
                <p>
                    <strong>Net Faiz = Brüt Faiz × 0.85</strong> (yani Brüt Faiz - %15 Stopaj)
                </p>
                <p>
                    Örneğin, 100.000 TL&apos;yi %45 yıllık faizle 90 gün vadeli mevduata yatırdığınızda:
                </p>
                <ul>
                    <li>Brüt Faiz = 100.000 × 0.45 × (90/365) = 11.095 TL</li>
                    <li>Stopaj = 11.095 × 0.15 = 1.664 TL</li>
                    <li>Net Faiz = 11.095 - 1.664 = 9.431 TL</li>
                    <li>Vade Sonu Toplam = 100.000 + 9.431 = 109.431 TL</li>
                </ul>

                <h2>Stopaj Nedir ve Neden Kesilir?</h2>
                <p>
                    Stopaj, mevduat faizi gelirleri üzerinden kaynağında kesilen vergidir. Banka,
                    hesaplanan faizi hesabınıza yatırmadan önce %15 oranında stopaj kesintisi yapar
                    ve bu tutarı devlete öder. Bu sayede:
                </p>
                <ul>
                    <li>Mükellefler ayrı vergi beyanı vermekle uğraşmaz</li>
                    <li>Devlet vergi gelirini zamanında toplar</li>
                    <li>Vergi kaçağı önlenir</li>
                </ul>
                <p>
                    Mevduat faizi gelirleri için beyanname verme zorunluluğu bulunmadığından, stopaj
                    nihai vergi niteliğindedir. Yani ek bir vergi ödemeniz gerekmez.
                </p>

                <h2>Vadeli Mevduatın Avantajları</h2>
                <ul>
                    <li>
                        <strong>Güvenli Yatırım:</strong> Mevduat hesapları TMSF (Tasarruf Mevduatı
                        Sigorta Fonu) güvencesi altındadır. Kişi başı 600.000 TL&apos;ye kadar mevduat
                        devlet güvencesi altındadır.
                    </li>
                    <li>
                        <strong>Sabit Getiri:</strong> Vade boyunca faiz oranı değişmez. Bu sayede
                        getirinizi önceden bilirsiniz.
                    </li>
                    <li>
                        <strong>Kolay Erişim:</strong> Her bankada kolayca vadeli mevduat açabilirsiniz.
                        İnternet bankacılığı üzerinden bile işlem yapılabilir.
                    </li>
                    <li>
                        <strong>Esnek Vadeler:</strong> 1 haftadan 1 yıla kadar farklı vade seçenekleri
                        mevcuttur.
                    </li>
                </ul>

                <h2>Vadeli Mevduatın Dezavantajları</h2>
                <ul>
                    <li>
                        <strong>Likidite Sorunu:</strong> Vadesinden önce paranızı çekerseniz faizinizi
                        kaybedersiniz veya düşük faiz uygulanır.
                    </li>
                    <li>
                        <strong>Enflasyon Riski:</strong> Yüksek enflasyon dönemlerinde reel getiriniz
                        negatif olabilir (faiz oranı enflasyonun altında kalırsa).
                    </li>
                    <li>
                        <strong>Fırsat Maliyeti:</strong> Paranız bağlı kaldığı sürede daha yüksek
                        getirili yatırım fırsatlarını kaçırabilirsiniz.
                    </li>
                </ul>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>En yüksek mevduat faizi hangi bankada?</h3>
                <p>
                    Mevduat faiz oranları bankadan bankaya ve dönemden döneme değişir. Yeni müşteri
                    kampanyaları veya özel dönemler (bayram, yılsonu) daha yüksek oranlar sunabilir.
                    Karşılaştırma yapmak için birden fazla bankanın güncel oranlarını kontrol edin.
                </p>

                <h3>Döviz mevduatında stopaj oranı aynı mı?</h3>
                <p>
                    Hayır, döviz mevduat hesaplarında stopaj oranı %18&apos;dir (TL mevduatta %15).
                    Bu fark, TL tasarrufu teşvik etmek amacıyla uygulanmaktadır.
                </p>

                <h3>Kur korumalı mevduat (KKM) nasıl çalışır?</h3>
                <p>
                    KKM hesaplarında TL mevduat faizi ve kur farkı koruması birlikte sunulur.
                    Vade sonunda kur artışı faiz getirisinden yüksekse, aradaki fark devlet
                    tarafından karşılanır.
                </p>

                <h3>Vadeli mevduatı erken bozarsam ne olur?</h3>
                <p>
                    Vadeden önce hesabınızı kapatırsanız, genellikle vadesiz mevduat faizi
                    (çok düşük bir oran) uygulanır veya hiç faiz alamazsınız. Bazı bankalar
                    kısmi çekim imkanı sunar, bu durumda çekilen tutara düşük faiz, kalan
                    tutara normal faiz uygulanabilir.
                </p>

                <h2>Mevduat Faizi Hesaplama İpuçları</h2>
                <ul>
                    <li>Uzun vadeli mevduatlar genellikle daha yüksek faiz sunar</li>
                    <li>Vade sonunda otomatik yenileme seçeneğini değerlendirin</li>
                    <li>Enflasyon oranını takip ederek reel getirinizi hesaplayın</li>
                    <li>TMSF limitini aşan tutarlar için birden fazla banka tercih edin</li>
                    <li>Özel kampanya dönemlerini takip edin</li>
                </ul>
            </article>
        </div>
    )
}
