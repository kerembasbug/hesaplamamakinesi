import { DataSizeConverter } from "@/components/calculators/converter/data-size-converter"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import Link from "next/link"
import { SSS } from "@/components/content/sss"

export const metadata = buildMetadata({
    title: "Veri Boyutu Dönüştürücü - MB, GB, TB",
    description: "Ücretsiz veri boyutu dönüştürücü. Byte, kilobyte, megabyte, gigabyte ve terabyte arasında anında çevirin. Depolama ve internet hızı hesapları için.",
    keywords: ["veri boyutu dönüştürücü", "mb gb çevirici", "byte çevirme", "dosya boyutu hesaplama", "depolama birimi çevirme"],
    path: "/donusturuculer/veri-boyutu-donusturucu",
})

export default function VeriBoyutuDonusturucuPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Veri Boyutu Dönüştürücü",
                    description: "Online veri boyutu dönüştürücü. Byte, Kilobyte, Megabyte, Gigabyte ve Terabyte arasında hızlı ve kolay çevirme. Depolama ve internet hızı hesaplamaları için.",
                    path: "/donusturuculer/veri-boyutu-donusturucu",
                    applicationCategory: "UtilitiesApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Dönüştürücüler", path: "/donusturuculer" },
                { name: "Veri Boyutu Dönüştürücü" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Veri Boyutu Dönüştürücü</h1>
                <p className="text-slate-600 dark:text-slate-400">Byte, KB, MB, GB ve TB arasında veri boyutu dönüşümü yapın.</p>
            </div>

            <DataSizeConverter />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Veri Boyutu Dönüştürücü Nedir?</h2>
                <p>
                    <strong>Veri boyutu dönüştürücü</strong>, dijital depolama birimlerini birbirine çevirir:
                    byte, kilobyte, megabyte, gigabyte, terabyte. Dosya boyutu, disk kapasitesi, internet
                    kotası ve yedekleme planlaması yaparken bu dönüşüme ihtiyaç duyarsınız.
                </p>

                <h2>Bit ile Byte Karıştırılmamalı</h2>
                <p>
                    Bir <strong>bit</strong> (b) en küçük veri birimidir ve 0 ya da 1 değerini alır. Sekiz bit
                    bir <strong>byte</strong> (B) eder. İnternet hızı bit/saniye ile, dosya boyutu byte ile
                    ölçülür. Bu yüzden 100 Mbps&apos;lik bir bağlantı saniyede 100 megabyte değil,
                    <strong> 12,5 megabyte</strong> indirir. İnternet paketlerinde en sık yanlış anlaşılan
                    nokta budur.
                </p>

                <h2>1024 mü 1000 mi? KB ile KiB Farkı</h2>
                <p>
                    Bilgisayarlar ikilik sistem kullandığı için depolama tarihsel olarak 1.024&apos;ün
                    katlarıyla ölçüldü. Uluslararası standart (IEC) ise ikisini ayırdı:
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr><th>Birim</th><th>Ondalık (SI)</th><th>İkilik (IEC)</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Kilobyte</td><td>1 KB = 1.000 B</td><td>1 KiB = 1.024 B</td></tr>
                            <tr><td>Megabyte</td><td>1 MB = 1.000 KB</td><td>1 MiB = 1.024 KiB</td></tr>
                            <tr><td>Gigabyte</td><td>1 GB = 1.000 MB</td><td>1 GiB = 1.024 MiB</td></tr>
                            <tr><td>Terabyte</td><td>1 TB = 1.000 GB</td><td>1 TiB = 1.024 GiB</td></tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    Bu fark, satın aldığınız 1 TB&apos;lık diskin Windows&apos;ta neden 931 GB göründüğünü
                    açıklar: üretici ondalık (1 TB = 1.000.000.000.000 byte), işletim sistemi ikilik sayar.
                    Disk arızalı değildir; iki farklı sayma yöntemi kullanılmaktadır.
                </p>

                <h2>Adım Adım Örnek Dönüşüm</h2>
                <ol>
                    <li>Bir video dosyası <strong>2,5 GB</strong>.</li>
                    <li>MB karşılığı (ondalık): 2,5 × 1.000 = <strong>2.500 MB</strong></li>
                    <li>MiB karşılığı (ikilik): 2,5 × 1.024 = <strong>2.560 MiB</strong></li>
                    <li>100 Mbps bağlantıda indirme süresi: 2.500 MB × 8 = 20.000 Mb → 20.000 ÷ 100 = <strong>200 saniye</strong></li>
                </ol>

                <h2>Günlük Hayatta Tipik Dosya Boyutları</h2>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr><th>İçerik</th><th>Yaklaşık Boyut</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Düz metin e-posta</td><td>10 – 50 KB</td></tr>
                            <tr><td>Telefon fotoğrafı (12 MP)</td><td>3 – 5 MB</td></tr>
                            <tr><td>MP3 şarkı (4 dakika)</td><td>4 – 8 MB</td></tr>
                            <tr><td>1 saat HD video akışı</td><td>1 – 3 GB</td></tr>
                            <tr><td>1 saat 4K video akışı</td><td>7 – 10 GB</td></tr>
                            <tr><td>Modern bir bilgisayar oyunu</td><td>50 – 150 GB</td></tr>
                        </tbody>
                    </table>
                </div>

                <h2>Mobil Veri Kotası Planlama</h2>
                <p>
                    Aylık 20 GB kotanız varsa bu kabaca 10-15 saat HD video akışına, 200 saat müzik dinlemeye
                    ya da sınırsıza yakın mesajlaşmaya karşılık gelir. Video kalitesini otomatik yerine
                    &quot;yüksek değil, orta&quot; olarak sabitlemek kota tüketimini yarıdan fazla düşürür.
                </p>

                <SSS
                    baslik="Veri Boyutu Dönüştürücü Hakkında Sıkça Sorulan Sorular"
                    sorular={[
                        {
                            question: "1 GB kaç MB eder?",
                            answer:
                                "Ondalık sistemde 1 GB = 1.000 MB'dir. İkilik sistemde (GiB) ise 1 GiB = 1.024 MiB olur. Depolama üreticileri ondalık, işletim sistemleri ikilik sistemi kullanır.",
                        },
                        {
                            question: "1 TB disk neden 931 GB görünüyor?",
                            answer:
                                "Üretici 1 TB'ı 1.000.000.000.000 byte olarak satar; Windows ise bunu 1.024'ün katlarıyla sayar. 1.000.000.000.000 ÷ 1.024³ = 931 GiB eder. Disk arızalı değildir.",
                        },
                        {
                            question: "100 Mbps internet saniyede kaç MB indirir?",
                            answer:
                                "100 Mbps saniyede 100 megabit demektir. 8 bit 1 byte ettiği için 100 ÷ 8 = 12,5 MB/saniye indirme hızına karşılık gelir.",
                        },
                        {
                            question: "MB ile MiB arasındaki fark nedir?",
                            answer:
                                "MB ondalık sistemde 1.000.000 byte, MiB ikilik sistemde 1.048.576 byte'tır. Aradaki fark yaklaşık %4,9'dur ve büyük kapasitelerde belirginleşir.",
                        },
                        {
                            question: "Bit mi byte mı büyüktür?",
                            answer:
                                "Byte büyüktür: 1 byte = 8 bit. Kısaltmada büyük B byte'ı, küçük b biti gösterir. Mbps bit/saniye, MB/s ise byte/saniye anlamına gelir.",
                        },
                    ]}
                />

                <h2>İlgili Dönüştürücüler</h2>
                <ul>
                    <li><Link href="/donusturuculer/birim-donusturucu">Genel birim dönüştürücü</Link></li>
                    <li><Link href="/donusturuculer/hiz-donusturucu">Hız dönüştürücü</Link></li>
                    <li><Link href="/birim">Birim çevirici — tüm dönüşüm tabloları</Link></li>
                    <li><Link href="/donusturuculer">Tüm dönüştürücüler</Link></li>
                </ul>

                <p className="text-sm">
                    <strong>Kaynak:</strong>{" "}
                    <a href="https://www.iec.ch/prefixes-binary-multiples" target="_blank" rel="noopener">
                        IEC — İkilik katlar için önekler (KiB, MiB, GiB)
                    </a>
                    .
                </p>
            </article>
        </div>
    )
}
