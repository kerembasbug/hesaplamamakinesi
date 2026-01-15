import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { OneRmCalculator } from "@/components/calculators/health/one-rm-calculator"

export const metadata: Metadata = {
    title: "1RM Hesaplama - Tek Tekrar Maksimum Hesaplayıcı",
    description: "Fitness ve vücut geliştirme için 1RM (Tek Tekrar Maksimum) hesaplama aracı. Kaldırdığınız ağırlığa göre kaldırabileceğiniz maksimum yükü bulun.",
    keywords: ["1rm hesaplama", "tek tekrar maksimum", "bench press max hesaplama", "deadlift max hesaplama", "fitness hesaplama"]
}

export default function OneRmHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/saglik-spor" className="hover:text-indigo-600 transition-colors">Sağlık & Spor</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">1RM Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">1RM (Tek Tekrar Maksimum) Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Kaldırdığınız ağırlık ve tekrar sayısına göre %100 gücünüzü tahmin edin.</p>
            </div>

            <OneRmCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>1RM (One Rep Max) Nedir?</h2>
                <p>1RM, bir egzersizde doğru form ile sadece bir kez kaldırabileceğiniz maksimum ağırlıktır. Antrenman programlarını planlarken ve güç seviyesini ölçerken temel alınır.</p>

                <h2>Brzycki Formülü Nedir?</h2>
                <p>Hesaplamamızda en popüler ve güvenilir modellerden biri olan Brzycki formülü kullanılmaktadır: <code>1RM = Ağırlık / (1.0278 – (0.0278 x Tekrar))</code>.</p>

                <h2>Yüzdelik Dilimler Neden Önemli?</h2>
                <p>Antrenman programları genellikle 1RM'in yüzdesi üzerinden yazılır:</p>
                <ul>
                    <li><strong>Güç Gelişimi:</strong> %85-95</li>
                    <li><strong>Kas Hipertrofisi (Büyüme):</strong> %70-85</li>
                    <li><strong>Kas Dayanıklılığı:</strong> %50-70</li>
                </ul>
            </article>
        </div>
    )
}
