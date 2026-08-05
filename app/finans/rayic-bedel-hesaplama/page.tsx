import { RayicBedelCalculator } from "@/components/calculators/finance/rayic-bedel-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"

export const metadata = buildMetadata({
    title: "Rayiç Bedel Hesaplama - Gayrimenkul Değeri",
    description: "Ev, arsa ve konut için rayiç bedel hesaplama aracı. Piyasa değerine göre tahmini belediye rayiç bedelini ve emsal kira bedelini bulun.",
    keywords: ["rayiç bedel hesaplama", "rayiç bedeli hesaplama", "ev rayiç bedel sorgulama", "belediye rayiç bedel", "konut rayiç bedeli"],
    path: "/finans/rayic-bedel-hesaplama",
})

export default function RayicBedelPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Rayiç Bedel Hesaplama",
                    description: "Ev, arsa ve konut için rayiç bedel hesaplama aracı. Piyasa değerine göre tahmini belediye rayiç bedelini ve emsal kira bedelini bulun.",
                    path: "/finans/rayic-bedel-hesaplama",
                    applicationCategory: "FinanceApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Finans", path: "/finans" },
                { name: "Rayiç Bedel Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Rayiç Bedel Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Piyasa satış fiyatına göre gayrimenkulünüzün tahmini resmi bedelini hesaplayın.</p>
            </div>

            <RayicBedelCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Rayiç Bedel Nedir?</h2>
                <p>Rayiç bedel, bir gayrimenkulün (ev, arsa, dükkan vb.) piyasa şartlarındaki güncel alım-satım değeridir. Ancak uygulamada "Belediye Rayiç Bedeli" ve "Piyasa Rayiç Bedeli" olarak ikiye ayrılır.</p>

                <h2>Belediye Rayiç Bedeli Neyi Belirler?</h2>
                <p>Belediye tarafından belirlenen bu bedel şu işlemler için temel alınır:</p>
                <ul>
                    <li>Emlak Vergisi ödemeleri</li>
                    <li>Tapu Harcı hesaplaması</li>
                    <li>Veraset ve İntikal işlemleri</li>
                </ul>

                <h2>Emsal Kira Bedeli Nasıl Hesaplanır?</h2>
                <p>Gelir Vergisi Kanunu'na göre emsal kira bedeli, gayrimenkulün emlak vergisi değerinin (rayiç bedelinin) %5'idir. Bu değerin altında kira beyan edilmesi durumunda vergi incelemesi yapılabilir.</p>

                <h2>Rayiç Bedel ile Piyasa Değeri Arasındaki Fark</h2>
                <p>
                    Rayiç bedel, belediyelerin emlak vergisine esas olmak üzere belirlediği <strong>resmî</strong>
                    değerdir. Piyasa değeri ise bir gayrimenkulün alıcı ve satıcı arasında serbestçe oluşan
                    fiyatıdır. Türkiye&apos;de rayiç bedel çoğunlukla piyasa değerinin belirgin altında kalır;
                    bu iki rakamı karıştırmak hem vergi hesabında hem de tapu işlemlerinde soruna yol açar.
                </p>
                <p>
                    Tapu devrinde beyan edilen değer rayiç bedelin altında olamaz. Düşük beyan, tapu harcı
                    kaybı olarak tespit edildiğinde fark ve ceza tahsil edilir.
                </p>

                <h2>Rayiç Bedeli Nereden Öğrenilir?</h2>
                <ul>
                    <li>Gayrimenkulün bağlı olduğu belediyenin emlak servisinden yazılı olarak alınabilir.</li>
                    <li>Birçok büyükşehir belediyesi e-belediye üzerinden sorgulama imkânı sunar.</li>
                    <li>Değerler dört yılda bir yeniden belirlenir, ara yıllarda yeniden değerleme oranıyla artırılır.</li>
                    <li>Arsa ve arazide metrekare birim değeri, binalarda ayrıca yapı sınıfı ve yaş dikkate alınır.</li>
                </ul>

                <h2>Rayiç Bedelin Kullanıldığı İşlemler</h2>
                <p>
                    Emlak vergisi matrahı, tapu harcı alt sınırı, veraset ve intikal vergisi, kamulaştırma
                    bedeline itiraz ve kentsel dönüşüm hesaplarında rayiç bedel esas alınır. Bu yüzden alım
                    satım öncesi rayiç bedeli öğrenmek yalnızca vergi değil, pazarlık açısından da bilgi verir:
                    ilan fiyatı ile rayiç arasındaki makas, bölgedeki değer artışının göstergesidir.
                </p>
            </article>
        </div>
    )
}
