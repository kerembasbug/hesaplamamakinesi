import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home, Shield } from "lucide-react"

export const metadata: Metadata = {
    title: "Gizlilik Politikası | HesaplamaMakinesi",
    description: "HesaplamaMakinesi.com gizlilik politikası. Kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi.",
    keywords: ["gizlilik politikası", "KVKK", "kişisel veriler", "çerez politikası"]
}

export default function GizlilikPolitikasiPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                    <Home className="h-4 w-4" />
                    Ana Sayfa
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">Gizlilik Politikası</span>
            </nav>

            <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
                    <Shield className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gizlilik Politikası</h1>
                    <p className="text-slate-600 dark:text-slate-400">Son güncelleme: Ocak 2026</p>
                </div>
            </div>

            <article className="prose prose-slate dark:prose-invert max-w-none">
                <h2>1. Giriş</h2>
                <p>
                    HesaplamaMakinesi.com (&quot;biz&quot;, &quot;bizim&quot; veya &quot;web sitemiz&quot;) olarak,
                    gizliliğinize saygı duyuyor ve kişisel verilerinizin korunmasını önemsiyoruz.
                    Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde verilerinizin nasıl
                    toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
                </p>

                <h2>2. Toplanan Bilgiler</h2>
                <h3>2.1 Otomatik Olarak Toplanan Bilgiler</h3>
                <p>Web sitemizi ziyaret ettiğinizde, aşağıdaki bilgiler otomatik olarak toplanabilir:</p>
                <ul>
                    <li>IP adresi (anonimleştirilmiş)</li>
                    <li>Tarayıcı türü ve versiyonu</li>
                    <li>İşletim sistemi</li>
                    <li>Ziyaret edilen sayfalar ve ziyaret süresi</li>
                    <li>Referans kaynağı (sizi sitemize yönlendiren site)</li>
                </ul>

                <h3>2.2 Çerezler (Cookies)</h3>
                <p>
                    Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır:
                </p>
                <ul>
                    <li><strong>Zorunlu Çerezler:</strong> Sitenin temel işlevleri için gerekli</li>
                    <li><strong>Analitik Çerezler:</strong> Ziyaretçi istatistikleri için (Google Analytics)</li>
                    <li><strong>Tercih Çerezleri:</strong> Tema tercihi gibi ayarlarınız için</li>
                </ul>

                <h2>3. Bilgilerin Kullanımı</h2>
                <p>Toplanan bilgiler aşağıdaki amaçlarla kullanılmaktadır:</p>
                <ul>
                    <li>Web sitesi performansını analiz etmek ve iyileştirmek</li>
                    <li>Kullanıcı deneyimini kişiselleştirmek</li>
                    <li>Teknik sorunları tespit etmek ve çözmek</li>
                    <li>İstatistiksel raporlar oluşturmak</li>
                </ul>

                <h2>4. Veri Paylaşımı</h2>
                <p>
                    Kişisel verilerinizi üçüncü taraflarla satmıyor veya kiralamıyoruz.
                    Veriler yalnızca aşağıdaki durumlar için paylaşılabilir:
                </p>
                <ul>
                    <li>Yasal zorunluluk halinde (mahkeme kararı vb.)</li>
                    <li>Hizmet sağlayıcılarımız (hosting, analitik) ile sınırlı kapsamda</li>
                </ul>

                <h2>5. Veri Güvenliği</h2>
                <p>
                    Verilerinizi korumak için endüstri standardı güvenlik önlemleri kullanıyoruz:
                </p>
                <ul>
                    <li>SSL/TLS şifrelemesi</li>
                    <li>Güvenli sunucu altyapısı</li>
                    <li>Düzenli güvenlik güncellemeleri</li>
                </ul>

                <h2>6. KVKK Hakları</h2>
                <p>
                    6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aşağıdaki haklara sahipsiniz:
                </p>
                <ul>
                    <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                    <li>İşlenen verileri talep etme</li>
                    <li>Verilerin düzeltilmesini veya silinmesini isteme</li>
                    <li>Verilerin aktarıldığı üçüncü kişileri öğrenme</li>
                    <li>Verilerin eksik veya yanlış işlenmesi halinde düzeltme talep etme</li>
                </ul>

                <h2>7. Üçüncü Taraf Bağlantıları</h2>
                <p>
                    Web sitemiz üçüncü taraf web sitelerine bağlantılar içerebilir.
                    Bu sitelerin gizlilik uygulamaları üzerinde kontrolümüz yoktur ve
                    kendi gizlilik politikalarını incelemenizi öneririz.
                </p>

                <h2>8. Çocukların Gizliliği</h2>
                <p>
                    Web sitemiz 13 yaşın altındaki çocuklardan bilerek kişisel bilgi toplamaz.
                    Çocuğunuzun bilgi sağladığını düşünüyorsanız, lütfen bizimle iletişime geçin.
                </p>

                <h2>9. Politika Değişiklikleri</h2>
                <p>
                    Bu gizlilik politikasını zaman zaman güncelleyebiliriz.
                    Önemli değişiklikler bu sayfada yayınlanacaktır.
                    En son güncelleme tarihi sayfanın başında belirtilmektedir.
                </p>

                <h2>10. İletişim</h2>
                <p>
                    Gizlilik politikamız hakkında sorularınız için lütfen
                    <Link href="/iletisim"> iletişim sayfamız</Link> üzerinden bize ulaşın.
                </p>
            </article>
        </div>
    )
}
