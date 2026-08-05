import { AstrologyCalculator } from "@/components/calculators/astrology/astrology-calculator"
import { buildMetadata } from "@/lib/seo"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { JsonLd } from "@/components/seo/json-ld"
import { collectionPageSchema } from "@/lib/schema"
import { categories } from "@/config/site-data"

export const metadata = buildMetadata({
    title: "Astroloji Hesaplama - Burç Araçları",
    description: "Doğum haritanızdaki kritik noktaları öğrenin. Yükselen burç, Juno burcu, Lilith ve 7. ev hesaplaması ile ücretsiz astrolojik analiz araçları.",
    keywords: ["astroloji hesaplama", "juno burç hesaplama", "lilith burcu hesaplama", "solar harita hesaplama", "doğum haritası hesaplama"],
    path: "/astroloji",
})

export default function AstrolojiPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <JsonLd
                data={collectionPageSchema(
                    "Astroloji Hesaplama 2026",
                    "Doğum haritanızdaki kritik noktaları öğrenin. Güneş burcu, Juno burcu ve Lilith (Kara Ay) hesaplaması ile detaylı astrolojik analiz.",
                    "/astroloji",
                    (categories.find((c) => c.slug === "astroloji")?.tools ?? [])
                        .filter((t) => !t.externalUrl)
                        .map((t) => ({ name: t.name, path: `/astroloji/${t.slug}`, description: t.description }))
                )}
            />
            <Breadcrumb items={[
                { name: "Astroloji Hesaplama" },
            ]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Astroloji: Solar, Juno ve Lilith Hesaplama</h1>
                <p className="text-slate-600 dark:text-slate-400">Doğum tarihinize göre aşkın, kaderin ve karanlık noktaların burçlarını keşfedin.</p>
            </div>

            <AstrologyCalculator />

            <article className="mt-12 prose prose-slate dark:prose-invert max-w-none">
                <h2>Astroloji Hesaplama Araçları: Gökyüzünün Rehberliği</h2>
                <p>
                    İnsanoğlu binlerce yıldır gökyüzündeki yıldızların ve gezegenlerin hareketlerini izleyerek hayatına yön vermeye çalışmıştır.
                    Astroloji, sadece bir kehanet yöntemi değil, aynı zamanda derin bir sembolizm ve matematik içeren bir kadim ilimdir.
                    Doğduğumuz anın gökyüzü haritası, karakterimize, ilişkilerimize ve potansiyelimize dair benzersiz ipuçları barındırır.
                </p>

                <h2>Ücretsiz Astroloji Hesaplayıcılarımız</h2>
                <p>
                    HesaplamaMakinesi.com olarak en güncel astronomik algoritmalı kullanarak, kişiye özel astrolojik analizler sunuyoruz.
                    Şu an platformumuzda kullanabileceğiniz temel araçlar:
                </p>
                <ul>
                    <li><strong>Juno Hesaplama:</strong> Ruh eşiniz, evlilik tarzınız ve uzun vadeli ilişkilerinizdeki kader planınızı keşfedin.</li>
                    <li><strong>Lilith (Kara Ay) Hesaplama:</strong> Bilinçaltınızdaki en gizli arzuları, gölge yanlarınızı ve bağımsızlık alanlarınızı öğrenin.</li>
                    <li><strong>Solar Harita (Güneş Dönüşü):</strong> Doğum gününüzden itibaren başlayan bir yıllık sürecin ana temalarını analiz edin (Çok Yakında!).</li>
                </ul>

                <h2>Astrolojide Burçların ve Gezegenlerin Rolü</h2>
                <p>
                    Bir astroloji analizi sadece Güneş burcundan ibaret değildir. Yükselen burcunuz (Ascendant), Ay burcunuz ve gezegenlerin (Merkür, Venüs, Mars,
                    Jüpiter, Satürn) yerleşimleri bir bütün olarak karakterinizi oluşturur. Juno ve Lilith gibi asteroidler ve hesaplanan noktalar ise bu analizi
                    derinleştirerek spesifik konularda (aşk, krizler, şans) daha net bilgiler verir.
                </p>

                <h2>Neden Bizim Araçlarımızı Seçmelisiniz?</h2>
                <ul>
                    <li><strong>Yüksek Hassasiyet:</strong> Astronomik efemeris verilerine dayanarak en doğru dereceleri hesaplıyoruz.</li>
                    <li><strong>Kullanım Kolaylığı:</strong> Karmaşık haritalar yerine, doğrudan ihtiyacınız olan yorumları ve analizleri sunuyoruz.</li>
                    <li><strong>Tamamen Ücretsiz:</strong> Hiçbir üyelik veya gizli ücret ödemeden tüm analizlerinize ulaşabilirsiniz.</li>
                </ul>

                <h2>Sıkça Sorulan Sorular</h2>

                <h3>Doğum saatimi bilmiyorum, hesaplama yapabilir miyim?</h3>
                <p>
                    Güneş ve Juno gibi bazı göstergeler gün içinde yavaş hareket eder, bu nedenle doğum saatiniz olmasa bile burç yerleşimini doğru tahmin edebiliriz.
                    Ancak Lilith ve özellikle Yükselen burç gibi göstergeler için dakikası dakikasına doğum saati çok önemlidir.
                </p>

                <h3>Astroloji bilim mi?</h3>
                <p>
                    Modern bilimsel sınıflamada astroloji bir &quot;sözdebilim&quot; (pseudoscience) olarak kabul edilse de, milyonlarca insan için
                    psikolojik bir derinlik, sembolik bir dil ve anlam arayışında güçlü bir araçtır.
                </p>

                <h3>Burçlar değişti mi?</h3>
                <p>
                    Batı astrolojisinde &quot;Tropikal Zodyak&quot; kullanılır. Bu sistem mevsim geçişlerine (ekinokslara) dayalıdır, dolayısıyla takımyıldızların
                    kayması bu sistemi ve burç tarihlerinizi değiştirmez.
                </p>

                <h2>Gelecekte Eklenecek Özellikler</h2>
                <p>
                    Platformumuzu sürekli geliştiriyoruz. Çok yakında eklenecek olan <strong>Sinastri (İlişki Uyumu) Hesaplama</strong> ve
                    <strong>Transit Takvimi</strong> araçlarımızla gökyüzündeki anlık hareketlerin sizi nasıl etkilediğini de takip edebileceksiniz.
                </p>
                <p>
                    Hemen yukarıdaki kategorilerden merak ettiğiniz hesaplayıcıyı seçin ve gökyüzünün sizin için çizdiği haritayı keşfetmeye başlayın!
                </p>
            </article>
        </div>
    )
}
