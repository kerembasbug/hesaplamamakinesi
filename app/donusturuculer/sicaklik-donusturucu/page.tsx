import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { TemperatureConverter } from "@/components/calculators/converter/temperature-converter"

export const metadata: Metadata = {
    title: "Sıcaklık Dönüştürücü - Celsius, Fahrenheit, Kelvin",
    description: "Online sıcaklık birim dönüştürücü. Celsius, Fahrenheit ve Kelvin arasında hızlı ve kolay çevirme. Hava durumu ve bilimsel hesaplamalar için.",
    keywords: ["sıcaklık dönüştürücü", "celsius fahrenheit çevirici", "derece çevirme", "kelvin çevirici", "sıcaklık birimi çevirme"]
}

export default function SicaklikDonusturucuPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/donusturuculer" className="hover:text-indigo-600 transition-colors">Dönüştürücüler</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Sıcaklık Dönüştürücü</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Sıcaklık Dönüştürücü</h1>
                <p className="text-slate-600 dark:text-slate-400">Celsius, Fahrenheit ve Kelvin arasında sıcaklık dönüşümü yapın.</p>
            </div>

            <TemperatureConverter />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">

                <h3>0 derece Fahrenheit kaç Celsius?</h3>
                <p>0°F = -17.78°C&apos;dir. Bu oldukça soğuk bir sıcaklıktır ve ABD&apos;de kışın sıkça görülür.</p>

                <h3>Kelvin neden sıfırdan başlar?</h3>
                <p>Kelvin, mutlak sıfır noktasından başlar. Mutlak sıfır (-273.15°C), atomların tamamen hareketsiz olduğu teorik en düşük sıcaklıktır.</p>

                <h3>Ateşim var mı nasıl anlarım?</h3>
                <p>Normal vücut sıcaklığı 36.1-37.2°C arasındadır. 38°C ve üzeri ateş olarak kabul edilir (100.4°F).</p>
            </article>
        </div>
    )
}
