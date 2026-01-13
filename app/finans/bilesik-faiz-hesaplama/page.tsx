import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { CompoundInterestCalculator } from "@/components/calculators/finance/compound-interest-calculator"

export const metadata: Metadata = {
    title: "Bileşik Faiz Hesaplama - Yatırım Getirisi Hesaplayıcı",
    description: "Online bileşik faiz hesaplama aracı. Yatırımınızın faizin faize eklenmesiyle oluşan toplam getirisini hesaplayın. Aylık, yıllık ve günlük bileşik faiz hesaplama.",
    keywords: ["bileşik faiz hesaplama", "bileşik faiz hesapla", "faiz hesaplama", "yatırım getirisi", "compound interest", "faizin faizi"],
    openGraph: {
        title: "Bileşik Faiz Hesaplama - Yatırım Getirisi Hesaplayıcı",
        description: "Bileşik faiz ile yatırım getirinizi hesaplayın.",
        type: "website",
    }
}

export default function BilesikFaizHesaplamaPage() {
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
                <span className="text-slate-900 dark:text-white font-medium">Bileşik Faiz Hesaplama</span>
            </nav>

            {/* Page Title */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Bileşik Faiz Hesaplama
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Yatırımınızın uzun vadede bileşik faiz etkisiyle nasıl büyüyeceğini hesaplayın.
                </p>
            </div>

            {/* Calculator */}
            <CompoundInterestCalculator />

            {/* SEO Content */}
            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Bileşik Faiz Nedir?</h2>
                <p>
                    Bileşik faiz, kazanılan faizin anaparaya eklenerek yeniden faiz kazandırması
                    prensibiyle çalışan bir faiz türüdür. Albert Einstein&apos;ın &quot;dünyanın sekizinci
                    harikası&quot; olarak nitelendirdiği bu kavram, uzun vadeli yatırımların en güçlü
                    büyüme motorudur.
                </p>
                <p>
                    Basit faizde sadece başlangıç anaparanız faiz kazanırken, bileşik faizde
                    her dönem kazandığınız faiz de faiz kazanmaya başlar. Bu &quot;kartopu etkisi&quot;
                    zaman geçtikçe katlanarak büyür ve uzun vadede dramatik sonuçlar ortaya çıkarır.
                </p>

                <h2>Bileşik Faiz Nasıl Hesaplanır?</h2>
                <p>
                    Bileşik faiz hesaplama formülü şu şekildedir:
                </p>
                <p>
                    <strong>A = P × (1 + r/n)^(n×t)</strong>
                </p>
                <p>Burada:</p>
                <ul>
                    <li><strong>A</strong> = Gelecek değer (vade sonundaki toplam tutar)</li>
                    <li><strong>P</strong> = Anapara (başlangıç yatırımı)</li>
                    <li><strong>r</strong> = Yıllık faiz oranı (ondalık olarak, %10 = 0.10)</li>
                    <li><strong>n</strong> = Yılda kaç kez bileşik yapıldığı (aylık: 12, günlük: 365)</li>
                    <li><strong>t</strong> = Yıl cinsinden süre</li>
                </ul>
                <p>
                    Örneğin, 10.000 TL&apos;yi %40 yıllık faizle 5 yıl aylık bileşik yatırdığınızda:
                </p>
                <ul>
                    <li>A = 10.000 × (1 + 0.40/12)^(12×5)</li>
                    <li>A = 10.000 × (1.0333)^60</li>
                    <li>A = 10.000 × 7.04</li>
                    <li>A ≈ 70.400 TL</li>
                </ul>
                <p>
                    Aynı koşullarda basit faizle sadece 30.000 TL (10.000 + 4.000×5) kazanırdınız!
                </p>

                <h2>Bileşik Periyodunun Önemi</h2>
                <p>
                    Faizin ne sıklıkla bileşik yapıldığı toplam getiriyi önemli ölçüde etkiler:
                </p>
                <ul>
                    <li><strong>Yıllık Bileşik:</strong> Faiz yılda bir kez anaparaya eklenir</li>
                    <li><strong>Üç Aylık (Çeyreklik):</strong> Faiz yılda 4 kez eklenir</li>
                    <li><strong>Aylık Bileşik:</strong> Faiz her ay eklenir - en yaygın uygulama</li>
                    <li><strong>Günlük Bileşik:</strong> Faiz her gün eklenir - en yüksek getiri</li>
                </ul>
                <p>
                    Bileşik sıklığı arttıkça efektif yıllık getiri (EYG) de artar. Bu nedenle
                    hesaplama aracımız efektif yıllık oranı da göstermektedir.
                </p>

                <h2>72 Kuralı: Paranız Ne Zaman İkiye Katlanır?</h2>
                <p>
                    &quot;72 Kuralı&quot;, paranızın ne kadar sürede iki katına çıkacağını hızlıca
                    tahmin etmenizi sağlayan pratik bir yöntemdir:
                </p>
                <p>
                    <strong>İkiye Katlanma Süresi (Yıl) = 72 / Faiz Oranı</strong>
                </p>
                <ul>
                    <li>%6 faizle: 72 / 6 = 12 yıl</li>
                    <li>%12 faizle: 72 / 12 = 6 yıl</li>
                    <li>%24 faizle: 72 / 24 = 3 yıl</li>
                    <li>%36 faizle: 72 / 36 = 2 yıl</li>
                </ul>
                <p>
                    Bu kural, yatırım kararlarınızı hızlıca değerlendirmenize yardımcı olur.
                </p>

                <h2>Bileşik Faizin Gücü: Örnek Senaryo</h2>
                <p>
                    25 yaşında aylık 1.000 TL yatırım yapmaya başlayan ve bunu 65 yaşına kadar
                    (40 yıl) %10 ortalama getiriyle sürdüren bir kişi, toplamda 480.000 TL
                    yatırım yapmış olur. Ancak bileşik faiz sayesinde bu tutar yaklaşık
                    6.300.000 TL&apos;ye ulaşır!
                </p>
                <p>
                    Aynı kişi 35 yaşında başlasaydı (30 yıl), toplamda 360.000 TL yatırımla
                    sadece 2.280.000 TL&apos;ye ulaşırdı. 10 yıl erken başlamak, 120.000 TL daha
                    az yatırımla 4 milyon TL daha fazla kazanç demektir!
                </p>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Bileşik faiz ile basit faiz arasındaki fark nedir?</h3>
                <p>
                    Basit faizde sadece başlangıç anaparanız faiz kazanır. Bileşik faizde ise
                    kazandığınız faiz de anaparaya eklenerek kendi faizini kazanmaya başlar.
                    Süre uzadıkça aradaki fark katlanarak büyür.
                </p>

                <h3>Hangi yatırım araçları bileşik faiz sunar?</h3>
                <p>
                    Vadeli mevduat (otomatik yenileme ile), bireysel emeklilik, yatırım fonları,
                    borsa yatırımları (temettü yeniden yatırımı ile) ve tahvil/bono yatırımları
                    bileşik getiri sağlayabilir.
                </p>

                <h3>Negatif bileşik faiz olabilir mi?</h3>
                <p>
                    Evet, borç için de bileşik faiz geçerlidir. Kredi kartı borçları veya
                    ödenmeyen krediler bileşik faizle hızla büyür. Bu nedenle borçları
                    mümkün olan en kısa sürede kapatmak önemlidir.
                </p>

                <h3>Enflasyon bileşik faizi nasıl etkiler?</h3>
                <p>
                    Gerçek (reel) getiriyi hesaplamak için nominal getiriden enflasyon oranını
                    çıkarmanız gerekir. Yüksek enflasyon dönemlerinde nominal getiri yüksek
                    görünse de reel getiri düşük hatta negatif olabilir.
                </p>

                <h2>Bileşik Faiz İpuçları</h2>
                <ul>
                    <li>Mümkün olduğunca erken yatırım yapmaya başlayın - zaman en büyük müttefikinizdir</li>
                    <li>Düzenli yatırım yapın, küçük tutarlar bile zamanla büyük sonuçlar doğurur</li>
                    <li>Temettüleri ve faiz gelirlerini yeniden yatırın</li>
                    <li>Daha sık bileşik yapan yatırım araçlarını tercih edin</li>
                    <li>Sabırlı olun, bileşik faizin gerçek gücü uzun vadede ortaya çıkar</li>
                </ul>
            </article>
        </div>
    )
}
