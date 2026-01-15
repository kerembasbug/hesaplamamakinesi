import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { Pension3600Calculator } from "@/components/calculators/finance/pension-3600-calculator"

export const metadata: Metadata = {
    title: "3600 Günle Emeklilik Hesaplama Tablosu - Kısmi Emeklilik 2025",
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
                <p>Kısmi emeklilik olarak da bilinen bu haktan yararlanabilmek için üç şartın aynı anda sağlanması gerekir:</p>
                <ol>
                    <li><strong>08.09.1999 öncesi</strong> ilk defa sigortalı olmak</li>
                    <li><strong>15 yıl</strong> sigortalılık süresini tamamlamak</li>
                    <li><strong>3600 gün</strong> prim ödemiş olmak</li>
                </ol>

                <h2>Yaş Şartı Tablosu</h2>
                <p>Üç şartın tamamlandığı tarihe göre emeklilik yaşı değişkenlik gösterir. Genellikle kadınlarda 58, erkeklerde 60 yaş sınırına tabidir ancak bu tarih 2014 öncesinde tamamlandıysa daha erken yaşlar söz konusu olabilir.</p>

                <h2>EYT Kapsamında 3600 Gün</h2>
                <p>EYT yasası prim gününü değil, yaş şartını kaldırmıştır. 3600 günle emeklilikte ise yaş şartı halen devam etmektedir. Detaylar için SGK uzmanına danışılması önerilir.</p>
            </article>
        </div>
    )
}
