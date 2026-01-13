import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { GpaCalculator } from "@/components/calculators/education/gpa-calculator"

export const metadata: Metadata = {
    title: "GPA Hesaplama - Genel Not Ortalaması Hesaplayıcı",
    description: "GPA (Genel Not Ortalaması) hesaplama aracı. Ders kredileri ve harf notlarına göre 4.0 üzerinden GPA hesaplayın.",
    keywords: ["gpa hesaplama", "not ortalaması hesaplama", "üniversite not ortalaması", "gpa calculator", "ortalama hesaplama"]
}

export default function GpaHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/matematik-egitim" className="hover:text-indigo-600 transition-colors">Matematik & Eğitim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">GPA Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">GPA Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Ders kredileri ve harf notlarınıza göre genel not ortalamanızı hesaplayın.</p>
            </div>

            <GpaCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>GPA Nedir?</h2>
                <p>GPA (Grade Point Average), 4.00 üzerinden hesaplanan genel not ortalamasıdır. Üniversitelerde akademik başarıyı ölçmek için kullanılır.</p>

                <h2>Harf Notu Karşılıkları</h2>
                <table>
                    <thead><tr><th>Harf Notu</th><th>Puan</th><th>Durum</th></tr></thead>
                    <tbody>
                        <tr><td>AA</td><td>4.00</td><td>Mükemmel</td></tr>
                        <tr><td>BA</td><td>3.50</td><td>Pekiyi</td></tr>
                        <tr><td>BB</td><td>3.00</td><td>İyi</td></tr>
                        <tr><td>CB</td><td>2.50</td><td>Orta-İyi</td></tr>
                        <tr><td>CC</td><td>2.00</td><td>Orta</td></tr>
                        <tr><td>DC</td><td>1.50</td><td>Şartlı Geçer</td></tr>
                        <tr><td>DD</td><td>1.00</td><td>Geçer</td></tr>
                        <tr><td>FF</td><td>0.00</td><td>Kaldı</td></tr>
                    </tbody>
                </table>

                <h2>GPA Nasıl Hesaplanır?</h2>
                <p><strong>GPA = (Toplam Ağırlıklı Puan) / (Toplam Kredi)</strong></p>
                <p>Her dersin kredisi ile harf notu puanı çarpılır, toplanır ve toplam krediye bölünür.</p>
            </article>
        </div>
    )
}
