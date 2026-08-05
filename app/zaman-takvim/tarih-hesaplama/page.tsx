import { DateCalculator } from "@/components/calculators/time/date-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { calculatorSchema } from "@/lib/schema"
import Link from "next/link"
import { FormulGorseli } from "@/components/content/formul-gorseli"
import { SSS } from "@/components/content/sss"

export const metadata = buildMetadata({
    title: "Tarih Hesaplama - İki Tarih Arası Süre",
    description: "Tarih hesaplama aracı. İki tarih arasındaki gün, hafta, ay ve yıl farkını hesaplayın; geçmiş ve gelecek tarihler için anında sonuç veren araç.",
    keywords: ["tarih hesaplama", "gün hesaplama", "tarih farkı", "kaç gün kaldı", "iki tarih arası"],
    path: "/zaman-takvim/tarih-hesaplama",
})

export default function TarihHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={calculatorSchema({
                    name: "Tarih Hesaplama",
                    description: "Online tarih hesaplama aracı. İki tarih arasındaki gün, hafta, ay ve yıl farkını hesaplayın. Tarih farkı hesaplama.",
                    path: "/zaman-takvim/tarih-hesaplama",
                    applicationCategory: "UtilitiesApplication",
                })}
            />
            <Breadcrumb items={[
                { name: "Zaman & Takvim", path: "/zaman-takvim" },
                { name: "Tarih Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Tarih Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">İki tarih arasındaki farkı yıl, ay, gün olarak hesaplayın.</p>
            </div>

            <DateCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Tarih Hesaplama Nedir?</h2>
                <p>
                    <strong>Tarih hesaplama</strong>, iki tarih arasında geçen süreyi gün, hafta, ay ve yıl
                    cinsinden bulmaktır. Sözleşme süresi takibi, ihale teslim tarihi, dava süresi, izin hakkı,
                    garanti bitişi ve doğum günü sayacı gibi çok sayıda günlük ihtiyaçta bu hesaba başvurulur.
                </p>
                <p>
                    Elle yapıldığında en sık hata artık yıllardan ve ay uzunluklarının farklı olmasından
                    kaynaklanır. Yukarıdaki hesaplayıcı bunları otomatik hesaba katar.
                </p>

                <h2>Tarih Hesaplama Formülü</h2>
                <FormulGorseli
                    slug="tarih-farki"
                    alt="Tarih hesaplama formülü: iki tarih arası gün farkı hesabı ve örnek sonuçlar"
                />

                <h2>Gün Farkı ile Ay/Yıl Farkı Neden Aynı Değil?</h2>
                <p>
                    Gün farkı kesin bir sayıdır: iki tarih arasındaki saniye farkı 86.400&apos;e bölünür.
                    Ay ve yıl farkı ise takvime bağlıdır çünkü aylar 28, 29, 30 veya 31 gün sürer.
                </p>
                <p>
                    Örneğin 31 Ocak&apos;a bir ay eklemek 28 Şubat mı yoksa 3 Mart mı olmalıdır? Yaygın kabul
                    ayın son gününe sabitlemektir: 31 Ocak + 1 ay = 28 Şubat (artık yılda 29 Şubat). Bu araç
                    da bu kuralı uygular.
                </p>

                <h2>Adım Adım Örnek Tarih Hesabı</h2>
                <ol>
                    <li>Başlangıç: <strong>1 Ocak 2026</strong></li>
                    <li>Bitiş: <strong>5 Ağustos 2026</strong></li>
                    <li>Ocak 30 + Şubat 28 + Mart 31 + Nisan 30 + Mayıs 31 + Haziran 30 + Temmuz 31 + Ağustos 5</li>
                    <li>Toplam: <strong>216 gün</strong></li>
                    <li>Hafta karşılığı: 216 ÷ 7 = <strong>30 hafta 6 gün</strong></li>
                    <li>Ay karşılığı: <strong>7 ay 4 gün</strong></li>
                </ol>

                <h2>Artık Yıl Kuralı</h2>
                <p>
                    Bir yıl 4&apos;e bölünüyorsa artık yıldır; ancak 100&apos;e bölünüyorsa değildir, 400&apos;e
                    de bölünüyorsa yeniden artık yıldır. Bu kurala göre 2024 ve 2028 artık yıl, 2026 ve 2027
                    değildir. 1900 artık yıl değildi ama 2000 artık yıldı.
                </p>
                <p>
                    Şubat ayını kapsayan uzun aralıklarda bu kuralı atlamak bir günlük hataya yol açar; kira,
                    faiz ve ceza hesaplarında bu bir günün maliyeti olabilir.
                </p>

                <h2>İş Günü mü Takvim Günü mü?</h2>
                <p>
                    Hukuki ve ticari sürelerde &quot;gün&quot; ifadesinin takvim günü mü iş günü mü olduğu
                    kritiktir. Takvim günü hafta sonları ve resmî tatilleri içerir; iş günü içermez. 30 takvim
                    günü yaklaşık 21-22 iş gününe denk gelir.
                </p>
                <ul>
                    <li><strong>Takvim günü:</strong> Yasal süreler, garanti, abonelik dönemleri</li>
                    <li><strong>İş günü:</strong> Kargo teslim taahhütleri, banka valörü, kamu başvuru süreleri</li>
                    <li><strong>Sadece hafta içi:</strong> Resmî tatiller ayrıca düşülmelidir</li>
                </ul>
                <p>
                    Yalnızca iş günü saymanız gerekiyorsa{" "}
                    <Link href="/zaman-takvim/calisma-gunleri-hesaplama">çalışma günleri hesaplama</Link>{" "}
                    aracını kullanın.
                </p>

                <h2>Yaygın Kullanım Alanları</h2>
                <ul>
                    <li><strong>Sözleşme yönetimi:</strong> Fesih bildirim süresinin son gününü belirlemek.</li>
                    <li><strong>İnsan kaynakları:</strong> Kıdem süresini gün bazında hesaplamak.</li>
                    <li><strong>Sağlık:</strong> Tedavi başlangıcından bugüne geçen süreyi takip etmek.</li>
                    <li><strong>Eğitim:</strong> Sınava kalan gün sayısını planlamak.</li>
                    <li><strong>Finans:</strong> Vade farkı ve gecikme faizi için gün sayısı bulmak.</li>
                </ul>

                <SSS
                    baslik="Tarih Hesaplama Hakkında Sıkça Sorulan Sorular"
                    sorular={[
                        {
                            question: "İki tarih arasındaki gün sayısı nasıl hesaplanır?",
                            answer:
                                "İki tarih arasındaki fark saniye cinsinden alınıp 86.400'e bölünür. Örneğin 1 Ocak 2026 ile 5 Ağustos 2026 arasında 216 gün vardır.",
                        },
                        {
                            question: "Başlangıç günü hesaba dâhil mi?",
                            answer:
                                "Bu araç iki tarih arasındaki farkı verir, yani başlangıç günü sayılmaz. Başlangıç gününü de saymak istiyorsanız sonuca 1 ekleyin. Hukuki sürelerde genellikle bildirimi izleyen gün ilk gün sayılır.",
                        },
                        {
                            question: "Artık yıl hesaba katılıyor mu?",
                            answer:
                                "Evet, otomatik olarak hesaba katılır. 4'e bölünen, 100'e bölünmeyen veya 400'e bölünen yıllar artık yıldır: 2024 ve 2028 artık yıl, 2026 değildir.",
                        },
                        {
                            question: "Ay farkı neden gün farkıyla uyuşmuyor?",
                            answer:
                                "Aylar 28 ile 31 gün arasında değiştiği için ay farkı takvime bağlıdır. 'İki ay' bazen 59, bazen 62 gündür. Kesin sonuç istiyorsanız gün farkını esas alın.",
                        },
                        {
                            question: "İş günü hesabı yapabilir miyim?",
                            answer:
                                "Bu sayfa takvim günü hesaplar. Hafta sonlarını hariç tutan hesap için çalışma günleri hesaplama aracını kullanın.",
                        },
                    ]}
                />

                <h2>İlgili Hesaplama Araçları</h2>
                <ul>
                    <li><Link href="/zaman-takvim/gun-farki-hesaplama">Gün farkı hesaplama</Link></li>
                    <li><Link href="/zaman-takvim/tarih-ekleme">Tarihe gün, ay, yıl ekleme</Link></li>
                    <li><Link href="/zaman-takvim/calisma-gunleri-hesaplama">Çalışma günleri (iş günü) hesaplama</Link></li>
                    <li><Link href="/zaman-takvim/yas-hesaplama">Yaş hesaplama</Link></li>
                    <li><Link href="/zaman-takvim">Tüm zaman ve takvim hesaplayıcıları</Link></li>
                </ul>

                <p className="text-sm">
                    <strong>Kaynak:</strong>{" "}
                    <a href="https://www.iso.org/iso-8601-date-and-time-format.html" target="_blank" rel="noopener">
                        ISO 8601 — Tarih ve saat gösterim standardı
                    </a>
                    . Hesaplamalar Gregoryen takvimine ve artık yıl kuralına göre yapılır.
                </p>
            </article>
        </div>
    )
}
