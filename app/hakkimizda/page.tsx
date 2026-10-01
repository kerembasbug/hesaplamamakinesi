import Link from "next/link"
import { Info } from "lucide-react"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"

export const metadata = buildMetadata({
    title: "Hakkımızda",
    description: "HesaplamaMakinesi.com kimdir, hesaplama araçları nasıl hazırlanır ve doğrulanır, site nasıl gelir elde eder? Şeffaflık sayfamız.",
    keywords: ["hakkımızda", "hesaplama makinesi", "hesaplama araçları", "şeffaflık"],
    path: "/hakkimizda",
})

export default function HakkimizdaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <Breadcrumb items={[
                { name: "Hakkımızda" },
            ]} />

            <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                    <Info className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Hakkımızda</h1>
                    <p className="text-slate-600 dark:text-slate-400">Araçları kim hazırlıyor, nasıl doğrulanıyor, site nasıl ayakta duruyor</p>
                </div>
            </div>

            <article className="prose prose-slate dark:prose-invert max-w-none">
                <h2>HesaplamaMakinesi.com nedir?</h2>
                <p>
                    HesaplamaMakinesi.com, günlük hayatta sık ihtiyaç duyulan hesaplamaları tek girdiyle ve
                    anında sonuç verecek şekilde sunan bağımsız bir araç sitesidir: finans, sağlık, matematik,
                    birim dönüşümü, tarih ve zaman gibi başlıklarda yüzlerce hesaplayıcı barındırır. Üyelik,
                    indirme ya da ödeme gerektirmez.
                </p>

                <h2>Araçlar nasıl hazırlanıyor?</h2>
                <p>
                    Her hesaplayıcının formülü resmi kaynaklara dayanır: vergi ve maaş hesaplarında ilgili
                    yılın yasal oranları, sağlık hesaplarında yaygın kabul görmüş tıbbi formüller, birim
                    dönüşümlerinde uluslararası standartlar kullanılır. Formüller sayfanın altındaki
                    açıklama bölümünde yazılır; böylece sonucu kendiniz de kontrol edebilirsiniz.
                </p>
                <p>
                    Oranlar ve eşikler değiştiğinde (örneğin yeni yıl asgari ücreti ya da vergi dilimleri)
                    ilgili araç güncellenir ve güncelleme tarihi sayfada belirtilir. Bir hata fark ederseniz
                    <Link href="/iletisim"> iletişim sayfası</Link> üzerinden bildirmeniz yeterlidir.
                </p>

                <h2>Sonuçlar tavsiye değildir</h2>
                <p>
                    Hesaplayıcılar bilgilendirme amaçlıdır. Finansal, hukuki ya da tıbbi bir karar vermeden
                    önce ilgili uzmana danışın; sağlık hesaplarındaki sonuçlar tanı yerine geçmez.
                </p>

                <h2>Site nasıl gelir elde ediyor?</h2>
                <p>
                    Site ücretsizdir ve giderleri reklam geliriyle karşılanır. Sayfalarda Google AdSense
                    reklamları gösterilebilir. Reklamlar hesaplama sonuçlarını etkilemez ve içerikten
                    &quot;Reklam&quot; etiketiyle ayrılır. Hangi verilerin toplandığı
                    <Link href="/gizlilik-politikasi"> gizlilik politikasında</Link> açıklanmıştır.
                </p>

                <h2>İletişim</h2>
                <p>
                    Soru, öneri ve hata bildirimleri için
                    <Link href="/iletisim"> iletişim sayfamızı</Link> kullanabilirsiniz.
                </p>
            </article>
        </div>
    )
}
