import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home, FileText } from "lucide-react"

export const metadata: Metadata = {
    title: "Kullanım Şartları | HesaplamaMakinesi",
    description: "HesaplamaMakinesi.com kullanım şartları ve koşulları. Web sitesini kullanmadan önce bu şartları okumanızı öneriyoruz.",
    keywords: ["kullanım şartları", "kullanım koşulları", "yasal uyarı", "sorumluluk reddi"]
}

export default function KullanimSartlariPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                    <Home className="h-4 w-4" />
                    Ana Sayfa
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Kullanım Şartları</span>
            </nav>

            <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
                    <FileText className="h-7 w-7 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Kullanım Şartları</h1>
                    <p className="text-slate-600 dark:text-slate-400">Son güncelleme: Ocak 2026</p>
                </div>
            </div>

            <article className="prose prose-slate dark:prose-invert max-w-none">
                <h2>1. Kabul</h2>
                <p>
                    HesaplamaMakinesi.com web sitesini (&quot;Site&quot;) kullanarak, bu kullanım şartlarını
                    okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz.
                    Bu şartları kabul etmiyorsanız, lütfen siteyi kullanmayın.
                </p>

                <h2>2. Hizmet Tanımı</h2>
                <p>
                    HesaplamaMakinesi.com, çeşitli hesaplama araçları sunan ücretsiz bir web sitesidir.
                    Sunulan araçlar şunları içerir ancak bunlarla sınırlı değildir:
                </p>
                <ul>
                    <li>Finans ve yatırım hesaplayıcıları</li>
                    <li>Vergi ve muhasebe hesaplayıcıları</li>
                    <li>Sağlık ve fitness hesaplayıcıları</li>
                    <li>Matematik ve eğitim araçları</li>
                    <li>Zaman ve takvim hesaplayıcıları</li>
                    <li>Birim dönüştürücüler</li>
                </ul>

                <h2>3. Sorumluluk Reddi</h2>
                <p>
                    <strong>Önemli:</strong> Bu sitede sunulan hesaplama araçları yalnızca bilgilendirme
                    amaçlıdır ve profesyonel tavsiye niteliği taşımaz.
                </p>
                <ul>
                    <li>
                        <strong>Finansal kararlar:</strong> Yatırım, kredi veya vergi kararları için
                        mutlaka bir mali müşavir veya vergi danışmanına başvurun.
                    </li>
                    <li>
                        <strong>Sağlık kararları:</strong> Sağlık hesaplayıcıları tıbbi teşhis veya
                        tedavi yerine geçmez. Sağlık sorunları için doktorunuza danışın.
                    </li>
                    <li>
                        <strong>Eğitim:</strong> Sınav puan hesaplamaları resmi sonuçları yansıtmayabilir.
                    </li>
                </ul>

                <h2>4. Doğruluk</h2>
                <p>
                    Hesaplama formüllerinin doğruluğunu sağlamak için özen göstermekle birlikte,
                    sonuçların her durumda %100 doğru olacağını garanti etmiyoruz. Kritik kararlar
                    için sonuçları bağımsız kaynaklardan doğrulamanızı öneririz.
                </p>
                <p>Olası hata kaynakları:</p>
                <ul>
                    <li>Güncel olmayan formüller veya oranlar (vergi oranları gibi)</li>
                    <li>Yazılım hataları</li>
                    <li>Kullanıcı giriş hataları</li>
                    <li>Yuvarlama farklılıkları</li>
                </ul>

                <h2>5. Fikri Mülkiyet</h2>
                <p>
                    Bu sitedeki tüm içerik, tasarım, logo ve yazılım HesaplamaMakinesi.com&apos;a aittir
                    veya lisanslıdır. İzinsiz kopyalama, dağıtma veya ticari kullanım yasaktır.
                </p>
                <p>İzin verilen kullanımlar:</p>
                <ul>
                    <li>Kişisel ve eğitim amaçlı kullanım</li>
                    <li>Kaynak belirtilerek alıntı yapma</li>
                    <li>Siteye doğrudan bağlantı verme</li>
                </ul>

                <h2>6. Kullanıcı Davranışları</h2>
                <p>Siteyi kullanırken aşağıdaki davranışlar yasaktır:</p>
                <ul>
                    <li>Siteye zarar vermeye çalışmak (hacking, DDoS vb.)</li>
                    <li>Otomatik veri çekme (scraping) yapmak</li>
                    <li>Siteyi yasadışı amaçlarla kullanmak</li>
                    <li>Diğer kullanıcıların deneyimini olumsuz etkilemek</li>
                </ul>

                <h2>7. Bağlantılar</h2>
                <p>
                    Bu site üçüncü taraf web sitelerine bağlantılar içerebilir.
                    Bu sitelerin içeriği veya gizlilik uygulamaları üzerinde kontrolümüz
                    bulunmamaktadır ve bunlardan sorumlu değiliz.
                </p>

                <h2>8. Değişiklikler</h2>
                <p>
                    Bu kullanım şartlarını önceden bildirimde bulunmaksızın değiştirme
                    hakkımız saklıdır. Değişiklikler sitede yayınlandığı anda yürürlüğe girer.
                    Siteyi kullanmaya devam etmeniz, güncellenmiş şartları kabul ettiğiniz anlamına gelir.
                </p>

                <h2>9. Hizmetin Sonlandırılması</h2>
                <p>
                    Herhangi bir kullanıcının siteye erişimini önceden bildirimde bulunmaksızın
                    kısıtlama veya sonlandırma hakkımız saklıdır.
                </p>

                <h2>10. Uygulanacak Hukuk</h2>
                <p>
                    Bu kullanım şartları Türkiye Cumhuriyeti kanunlarına tabidir.
                    Herhangi bir uyuşmazlık durumunda İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
                </p>

                <h2>11. İletişim</h2>
                <p>
                    Kullanım şartları hakkında sorularınız için lütfen
                    <Link href="/iletisim"> iletişim sayfamız</Link> üzerinden bize ulaşın.
                </p>
            </article>
        </div>
    )
}
