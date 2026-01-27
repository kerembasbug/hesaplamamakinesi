import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { PregnancyCalculator } from "@/components/calculators/time/pregnancy-calculator"

export const metadata: Metadata = {
    title: "Gebelik Hesaplama - Doğum Tarihi ve Hafta Hesaplayıcı",
    description: "Online gebelik hesaplama aracı. Son adet tarihine göre tahmini doğum tarihi, gebelik haftası ve trimester hesaplama.",
    keywords: ["gebelik hesaplama", "doğum tarihi hesaplama", "hamilelik haftası", "gebelik haftası hesaplama", "bebek bekleme"]
}

export default function GebelikHesaplamaPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/zaman-takvim" className="hover:text-indigo-600 transition-colors">Zaman & Takvim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Gebelik Hesaplama</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Gebelik Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Tahmini doğum tarihinizi ve gebelik haftanızı hesaplayın.</p>
            </div>

            <PregnancyCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Gebelik Hesaplama Nedir ve Nasıl Yapılır?</h2>
                <p>
                    <strong>Gebelik hesaplama</strong>, son adet tarihinizden (SAT) itibaren gebelik sürenizi ve tahmini doğum
                    tarihinizi hesaplayan bir araçtır. Bu hesaplama, <strong>Naegele Kuralı</strong>&apos;na dayanır: Son adet
                    tarihine 280 gün (40 hafta) eklenerek tahmini doğum tarihi bulunur. Aracımız ayrıca hangi trimesterde
                    olduğunuzu ve bebeğin gelişim aşamasını gösterir.
                </p>

                <h3>Trimesterler ve Fetal Gelişim</h3>
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Trimester</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Hafta</th>
                                <th className="p-3 border border-slate-200 dark:border-slate-700">Bebek Gelişimi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">1. Trimester</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">0-12 hafta</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Organların oluşumu, kalp atışı başlangıcı (6. hafta), 8 cm boyut</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">2. Trimester</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">13-26 hafta</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Cinsiyet belirlenir, hareketler hissedilir, 35 cm boyut</td>
                            </tr>
                            <tr>
                                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">3. Trimester</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">27-40 hafta</td>
                                <td className="p-3 border border-slate-200 dark:border-slate-700">Akciğerler olgunlaşır, beyin hızla gelişir, 50 cm/3-4 kg</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>Gebelik Haftalarına Göre Önemli Taşlar</h3>
                <ul>
                    <li><strong>4. hafta:</strong> Embriyo rahime yerleşir.</li>
                    <li><strong>8. hafta:</strong> Kalp düzenli atmaya başlar.</li>
                    <li><strong>12. hafta:</strong> Düşük riski önemli ölçüde azalır.</li>
                    <li><strong>16-20. hafta:</strong> Cinsiyet ultrasonla belirlenebilir.</li>
                    <li><strong>24. hafta:</strong> Yaşayabilirlik sınırı (viability).</li>
                    <li><strong>37. hafta:</strong> Bebek &quot;term&quot; kabul edilir.</li>
                </ul>

                <h3>Sıkça Sorulan Sorular (SSS)</h3>

                <h4>Son adet tarihimi hatırlamıyorsam ne yapmalıyım?</h4>
                <p>
                    Erken dönem ultrason, gebelik yaşını en doğru şekilde belirleyebilir. İlk trimester ultrasonu ±5 gün
                    hata payıyla gebelik haftasını hesaplar. Doktorunuzla görüşmeniz önerilir.
                </p>

                <h4>Tahmini doğum tarihi kesin mi?</h4>
                <p>
                    Hayır, bebeklerin sadece %5&apos;i tam tahmini tarihte doğar. Normal doğum 37-42 hafta arasındadır.
                    Yani tahmini tarihten 2 hafta önce veya 2 hafta sonra doğum normal kabul edilir.
                </p>

                <h4>İkiz gebeliklerde hesaplama farklı mı?</h4>
                <p>
                    İkiz gebelikler genellikle daha erken (36-38 hafta civarı) doğumla sonuçlanır. Risklerin artması nedeniyle
                    daha sık takip gerektirir.
                </p>

                <h3>Gebelik Döneminde Önemli Tavsiyeler</h3>
                <ul>
                    <li><strong>Folik asit:</strong> Özellikle ilk trimesterde günlük 400 mcg folik asit alın.</li>
                    <li><strong>Düzenli kontrol:</strong> Doktor randevularını aksatmayın.</li>
                    <li><strong>Dengeli beslenme:</strong> Protein, demir, kalsiyum ve omega-3 alımına dikkat edin.</li>
                    <li><strong>Egzersiz:</strong> Doktorunuzun onayıyla hafif egzersiz sürdürün.</li>
                    <li><strong>Alkol ve sigara:</strong> Gebelik süresince kesinlikle kaçının.</li>
                    <li><strong>Kafein:</strong> Günlük 200 mg&apos;ı (yaklaşık 1-2 fincan kahve) aşmayın.</li>
                </ul>

                <h3>Önemli Not</h3>
                <p>
                    Bu hesaplama tahmini bir değerdir ve tıbbi tavsiye yerine geçmez. Kesin gebelik haftası ve doğum tarihi
                    için düzenli ultrason muayenesi ve doktor takibi önerilir.
                </p>
            </article>
        </div>
    )
}
