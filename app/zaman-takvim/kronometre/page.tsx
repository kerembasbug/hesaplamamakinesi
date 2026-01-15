import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { Stopwatch } from "@/components/calculators/time/stopwatch"

export const metadata: Metadata = {
    title: "Online Kronometre - Tur Sayaçlı Zamanlayıcı",
    description: "Ücretsiz online kronometre. Tur kayıtlı, hassas zamanlama. Spor, egzersiz, çalışma ve yarışmalar için ideal. Mobil uyumlu.",
    keywords: ["online kronometre", "kronometre", "tur sayacı", "zamanlayıcı", "stopwatch", "süre ölçer"]
}

export default function KronometrePage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors"><Home className="h-4 w-4" />Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/zaman-takvim" className="hover:text-indigo-600 transition-colors">Zaman &amp; Takvim</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Kronometre</span>
            </nav>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Online Kronometre</h1>
                <p className="text-slate-600 dark:text-slate-400">Tur kayıtlı, hassas kronometre. Süre ölçümü için kullanın.</p>
            </div>

            <Stopwatch />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Online Kronometre Nasıl Kullanılır?</h2>
                <p>
                    Bu ücretsiz online kronometre, süre ölçümü yapmanız gereken her durumda kullanılabilir.
                    Başlat, duraklat ve sıfırla düğmeleriyle kolay kontrol sağlar.
                </p>

                <h2>Özellikler</h2>
                <ul>
                    <li><strong>Hassas ölçüm:</strong> Saniyenin 100&apos;de birine kadar hassasiyet</li>
                    <li><strong>Tur kaydı:</strong> Ara süreleri kaydedin ve karşılaştırın</li>
                    <li><strong>Duraklat/Devam:</strong> İstediğiniz an duraklatıp kaldığınız yerden devam</li>
                    <li><strong>Mobil uyumlu:</strong> Telefon ve tablette sorunsuz çalışır</li>
                </ul>

                <h2>Kullanım Alanları</h2>
                <ul>
                    <li><strong>Spor:</strong> Koşu, yüzme, bisiklet süreleri</li>
                    <li><strong>Fitness:</strong> Set arası dinlenme süreleri</li>
                    <li><strong>Mutfak:</strong> Pişirme ve demleme süreleri</li>
                    <li><strong>Eğitim:</strong> Sınav ve test süreleri</li>
                    <li><strong>Oyun:</strong> Satranç ve diğer zamanlı oyunlar</li>
                    <li><strong>Çalışma:</strong> Pomodoro tekniği ve verimlilik takibi</li>
                </ul>

                <h2>Tur Kaydı (Lap)</h2>
                <p>
                    Tur kaydı özelliği, kronometre çalışırken &quot;Tur&quot; düğmesine basarak
                    ara süreleri kaydetmenizi sağlar. Bu özellik özellikle:
                </p>
                <ul>
                    <li>Koşu turlarını karşılaştırmak</li>
                    <li>Yarış etaplarını ölçmek</li>
                    <li>Antrenman setlerini takip etmek</li>
                </ul>
                <p>için idealdir.</p>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Sayfa kapandığında süre kaybolur mu?</h3>
                <p>Evet, bu tarayıcı tabanlı bir araçtır ve sayfa kapandığında süre sıfırlanır. Önemli ölçümler için tur kaydını kullanmanızı öneririz.</p>

                <h3>Arka planda çalışır mı?</h3>
                <p>Hayır, tarayıcı sekmesi arka plana alındığında zamanlayıcı duraklar. En doğru ölçüm için sekmeyi açık tutun.</p>

                <h3>Tam ekran modu var mı?</h3>
                <p>Tarayıcınızın tam ekran özelliğini (F11) kullanarak kronometreyi tam ekran görüntüleyebilirsiniz.</p>
            </article>
        </div>
    )
}
