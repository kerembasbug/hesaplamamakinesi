import { TemperatureConverter } from "@/components/calculators/converter/temperature-converter"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import Link from "next/link"
import { BirimCeviriciLinkleri } from "@/components/content/birim-cevirici-linkleri"

export const metadata = buildMetadata({
    title: "Sıcaklık Dönüştürücü - °C, °F, Kelvin",
    description: "Ücretsiz sıcaklık dönüştürücü. Santigrat, Fahrenheit ve Kelvin arasında anında çevirin. Hava durumu, fırın sıcaklığı ve bilimsel hesaplar için.",
    keywords: ["sıcaklık dönüştürücü", "celsius fahrenheit çevirici", "derece çevirme", "kelvin çevirici", "sıcaklık birimi çevirme"],
    path: "/donusturuculer/sicaklik-donusturucu",
})

export default function SicaklikDonusturucuPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Sıcaklık Dönüştürücü",
                    description: "Online sıcaklık birim dönüştürücü. Celsius, Fahrenheit ve Kelvin arasında hızlı ve kolay çevirme. Hava durumu ve bilimsel hesaplamalar için.",
                    path: "/donusturuculer/sicaklik-donusturucu",
                    applicationCategory: "UtilitiesApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Dönüştürücüler", path: "/donusturuculer" },
                { name: "Sıcaklık Dönüştürücü" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Sıcaklık Dönüştürücü</h1>
                <p className="text-slate-600 dark:text-slate-400">Celsius, Fahrenheit ve Kelvin arasında sıcaklık dönüşümü yapın.</p>
            </div>

            <TemperatureConverter />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">

                <h2>0 derece Fahrenheit kaç Celsius?</h2>
                <p>0°F = -17.78°C&apos;dir. Bu oldukça soğuk bir sıcaklıktır ve ABD&apos;de kışın sıkça görülür.</p>

                <h2>Kelvin neden sıfırdan başlar?</h2>
                <p>Kelvin, mutlak sıfır noktasından başlar. Mutlak sıfır (-273.15°C), atomların tamamen hareketsiz olduğu teorik en düşük sıcaklıktır.</p>

                <h2>Ateşim var mı nasıl anlarım?</h2>
                <p>Normal vücut sıcaklığı 36.1-37.2°C arasındadır. 38°C ve üzeri ateş olarak kabul edilir (100.4°F).</p>
                <h2>En Çok Aranan Sıcaklık Dönüşümleri</h2>
                <p>
                    Aşağıdaki bağlantılar, tek tek hesaplanmış sıcaklık dönüşümlerine götürür. Her sayfada
                    formül, adım adım hesap, komşu değerler tablosu ve görsel skala bulunur.
                </p>
                <BirimCeviriciLinkleri kategori="sicaklik" />
                <p>
                    Tüm çeviricileri ve dönüşüm tablolarını <Link href="/birim">birim çevirici</Link> sayfasından
                    görebilirsiniz.
                </p>
            </article>
        </div>
    )
}
