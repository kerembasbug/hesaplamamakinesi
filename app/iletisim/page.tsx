import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home, Mail, MessageSquare, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
    title: "İletişim | HesaplamaMakinesi",
    description: "HesaplamaMakinesi.com ile iletişime geçin. Sorularınız, önerileriniz veya geri bildirimleriniz için bize ulaşın.",
    keywords: ["iletişim", "bize ulaşın", "destek", "geri bildirim", "soru sor"]
}

export default function IletisimPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                    <Home className="h-4 w-4" />
                    Ana Sayfa
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 dark:text-white font-medium">İletişim</span>
            </nav>

            <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
                    <Mail className="h-7 w-7 text-green-600 dark:text-green-400" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">İletişim</h1>
                    <p className="text-slate-600 dark:text-slate-400">Sorularınız ve önerileriniz için bize ulaşın</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-12">
                <Card className="border-slate-200 dark:border-slate-800">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">E-posta</CardTitle>
                                <CardDescription>Genel sorular için</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <a
                            href="mailto:info@hesaplamamakinesi.com"
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            info@hesaplamamakinesi.com
                        </a>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Geri Bildirim</CardTitle>
                                <CardDescription>Önerilerinizi paylaşın</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <a
                            href="mailto:geribildirim@hesaplamamakinesi.com"
                            className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                        >
                            geribildirim@hesaplamamakinesi.com
                        </a>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                <MapPin className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Konum</CardTitle>
                                <CardDescription>Online hizmet</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-600 dark:text-slate-400">
                            İstanbul, Türkiye
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                                <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Yanıt Süresi</CardTitle>
                                <CardDescription>E-posta yanıtları</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-600 dark:text-slate-400">
                            Genellikle 1-3 iş günü içinde
                        </p>
                    </CardContent>
                </Card>
            </div>

            <article className="prose prose-slate dark:prose-invert max-w-none">
                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Hesaplamalarda hata buldum, nasıl bildirebilirim?</h3>
                <p>
                    Hata bildirimleri için lütfen info@hesaplamamakinesi.com adresine e-posta gönderin.
                    Mesajınızda hangi hesaplayıcıda hata bulduğunuzu, girdiğiniz değerleri ve
                    beklediğiniz sonucu belirtmeniz sorunu hızlı çözmemize yardımcı olacaktır.
                </p>

                <h3>Yeni hesaplayıcı önerisi yapabilir miyim?</h3>
                <p>
                    Evet! Yeni hesaplayıcı önerilerinizi geribildirim@hesaplamamakinesi.com
                    adresine gönderebilirsiniz. Kullanıcı önerileri sitemizi geliştirmek için
                    çok değerlidir.
                </p>

                <h3>Hesaplayıcılarınızı kendi sitemde kullanabilir miyim?</h3>
                <p>
                    Hesaplayıcılarımızı doğrudan embed etmek veya kopyalamak yasaktır.
                    Ancak sitemize link vererek kullanıcılarınızı yönlendirebilirsiniz.
                    Ticari kullanım için lütfen bizimle iletişime geçin.
                </p>

                <h3>API erişimi sunuyor musunuz?</h3>
                <p>
                    Şu anda herkese açık bir API sunmuyoruz. Kurumsal API erişimi konusunda
                    ilgileniyorsanız lütfen detayları tartışmak için bizimle iletişime geçin.
                </p>

                <h3>Reklam vermek istiyorum, nasıl başvurabilirim?</h3>
                <p>
                    Reklam ve sponsorluk talepleri için info@hesaplamamakinesi.com adresine
                    e-posta gönderebilirsiniz.
                </p>

                <h2>Yasal Sayfalar</h2>
                <ul>
                    <li><Link href="/gizlilik-politikasi">Gizlilik Politikası</Link></li>
                    <li><Link href="/kullanim-sartlari">Kullanım Şartları</Link></li>
                </ul>
            </article>
        </div>
    )
}
