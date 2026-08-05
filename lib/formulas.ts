/**
 * Hesaplayıcı sayfalarının formül görsellerini besleyen kayıt defteri.
 *
 * Her giriş `app/gorseller/formul/[slug]/route.ts` üzerinden build sırasında
 * statik bir SVG'ye dönüşür; sayfalar bunu `<img alt="...">` ile gömer.
 */

export type Formula = {
    /** Görselin ve dosyanın slug'ı. */
    slug: string
    /** Görselin üst başlığı — sayfanın odak kelimesini içermeli. */
    baslik: string
    /** Ana formül satırı. */
    formul: string
    /** Formüldeki sembollerin açıklamaları. */
    degiskenler: { sembol: string; aciklama: string }[]
    /** Gerçek sayılarla örnek hesap. */
    ornek: { adim: string; sonuc: string }[]
    /** Alt bilgi satırı. */
    not?: string
}

export const formulas: Formula[] = [
    {
        slug: "tyt-net",
        baslik: "TYT Net Hesaplama Formülü",
        formul: "Net = Doğru − (Yanlış ÷ 4)",
        degiskenler: [
            { sembol: "Doğru", aciklama: "Testteki doğru cevap sayısı" },
            { sembol: "Yanlış", aciklama: "Testteki yanlış cevap sayısı" },
            { sembol: "Boş", aciklama: "Neti etkilemez" },
        ],
        ornek: [
            { adim: "Türkçe: 32 doğru, 4 yanlış", sonuc: "32 − 1 = 31 net" },
            { adim: "Matematik: 25 doğru, 8 yanlış", sonuc: "25 − 2 = 23 net" },
            { adim: "TYT toplam", sonuc: "54 net" },
        ],
        not: "Her 4 yanlış 1 doğruyu götürür.",
    },
    {
        slug: "ayt-net",
        baslik: "AYT Net Hesaplama Formülü",
        formul: "Net = Doğru − (Yanlış ÷ 4)",
        degiskenler: [
            { sembol: "Doğru", aciklama: "Alan testindeki doğru sayısı" },
            { sembol: "Yanlış", aciklama: "Alan testindeki yanlış sayısı" },
            { sembol: "Alan", aciklama: "SAY, EA, SÖZ veya DİL" },
        ],
        ornek: [
            { adim: "AYT Matematik: 28 doğru, 8 yanlış", sonuc: "28 − 2 = 26 net" },
            { adim: "AYT Fizik: 10 doğru, 4 yanlış", sonuc: "10 − 1 = 9 net" },
            { adim: "Sayısal toplam", sonuc: "35 net" },
        ],
        not: "AYT netleri alan katsayılarıyla çarpılarak yerleştirme puanına dönüşür.",
    },
    {
        slug: "gpa",
        baslik: "GPA (Not Ortalaması) Hesaplama Formülü",
        formul: "GPA = Σ (Kredi × Katsayı) ÷ Σ Kredi",
        degiskenler: [
            { sembol: "Kredi", aciklama: "Dersin kredi/AKTS değeri" },
            { sembol: "Katsayı", aciklama: "Harf notunun 4'lük karşılığı (AA=4,00)" },
        ],
        ornek: [
            { adim: "3 kredi × AA (4,00)", sonuc: "12,00" },
            { adim: "4 kredi × BB (3,00)", sonuc: "12,00" },
            { adim: "GPA = 24,00 ÷ 7", sonuc: "3,43" },
        ],
        not: "Ağırlıklı ortalamadır; yüksek kredili dersler sonucu daha çok etkiler.",
    },
    {
        slug: "iskonto",
        baslik: "İskonto (İndirim) Hesaplama Formülü",
        formul: "İndirimli Fiyat = Liste Fiyatı × (1 − İskonto Oranı)",
        degiskenler: [
            { sembol: "Liste Fiyatı", aciklama: "İndirim uygulanmadan önceki fiyat" },
            { sembol: "İskonto Oranı", aciklama: "Ondalık olarak indirim (%20 → 0,20)" },
        ],
        ornek: [
            { adim: "1.000 TL ürüne %20 iskonto", sonuc: "1.000 × 0,80 = 800 TL" },
            { adim: "İndirim tutarı", sonuc: "200 TL" },
            { adim: "Zincirleme %20 + %10", sonuc: "1.000 × 0,80 × 0,90 = 720 TL" },
        ],
        not: "Zincirleme iskontolar toplanmaz, ardışık çarpılır.",
    },
    {
        slug: "1rm",
        baslik: "1RM (Tek Tekrar Maksimum) Formülü",
        formul: "1RM = Ağırlık × (1 + Tekrar ÷ 30)",
        degiskenler: [
            { sembol: "Ağırlık", aciklama: "Kaldırdığınız yük (kg)" },
            { sembol: "Tekrar", aciklama: "O yükle yapılan tekrar sayısı" },
        ],
        ornek: [
            { adim: "80 kg ile 8 tekrar (Epley)", sonuc: "80 × (1 + 8/30) = 101,3 kg" },
            { adim: "Brzycki formülü", sonuc: "80 ÷ (1,0278 − 0,0278×8) = 99,2 kg" },
            { adim: "Tahmini aralık", sonuc: "99 – 101 kg" },
        ],
        not: "10 tekrarın üzerinde tahmin hata payı büyür.",
    },
    {
        slug: "promil",
        baslik: "Alkol Promil Hesaplama Formülü (Widmark)",
        formul: "Promil = Alkol (g) ÷ (Ağırlık (kg) × r) − (β × saat)",
        degiskenler: [
            { sembol: "r", aciklama: "Dağılım katsayısı: erkek 0,68 – kadın 0,55" },
            { sembol: "β", aciklama: "Saatlik eliminasyon: yaklaşık 0,15 promil" },
            { sembol: "Alkol (g)", aciklama: "Hacim × derece × 0,789" },
        ],
        ornek: [
            { adim: "80 kg erkek, 2 bardak şarap (28 g alkol)", sonuc: "28 ÷ (80 × 0,68) = 0,51" },
            { adim: "2 saat sonra", sonuc: "0,51 − 0,30 = 0,21 promil" },
            { adim: "Yasal sınır (özel araç)", sonuc: "0,50 promil" },
        ],
        not: "Tahmini değerdir; hukuki delil yerine geçmez, alkollü araç kullanmayın.",
    },
    {
        slug: "bmr",
        baslik: "Bazal Metabolizma (BMR) Formülü",
        formul: "BMR = 10×kilo + 6,25×boy − 5×yaş + s",
        degiskenler: [
            { sembol: "kilo", aciklama: "Vücut ağırlığı (kg)" },
            { sembol: "boy", aciklama: "Boy (cm)" },
            { sembol: "s", aciklama: "Erkekte +5, kadında −161" },
        ],
        ornek: [
            { adim: "30 yaş, 75 kg, 178 cm erkek", sonuc: "750 + 1.112,5 − 150 + 5" },
            { adim: "BMR", sonuc: "1.717,5 kcal/gün" },
            { adim: "Orta aktivite (×1,55)", sonuc: "≈ 2.662 kcal/gün" },
        ],
        not: "Mifflin-St Jeor denklemi; Harris-Benedict'e göre daha isabetli kabul edilir.",
    },
    {
        slug: "qtc",
        baslik: "QTc (Düzeltilmiş QT) Formülü",
        formul: "QTc = QT ÷ √RR   (Bazett)",
        degiskenler: [
            { sembol: "QT", aciklama: "Ölçülen QT aralığı (saniye)" },
            { sembol: "RR", aciklama: "60 ÷ kalp hızı (saniye)" },
        ],
        ornek: [
            { adim: "QT = 0,40 s, nabız 75", sonuc: "RR = 0,80 s" },
            { adim: "QTc = 0,40 ÷ √0,80", sonuc: "0,447 s = 447 ms" },
            { adim: "Fridericia (QT ÷ ∛RR)", sonuc: "431 ms" },
        ],
        not: "Uzun QT değerlendirmesi hekime aittir; bu araç tanı koymaz.",
    },
    {
        slug: "tarih-farki",
        baslik: "İki Tarih Arası Gün Hesaplama",
        formul: "Gün Farkı = (Bitiş Tarihi − Başlangıç Tarihi) ÷ 86.400 sn",
        degiskenler: [
            { sembol: "Başlangıç", aciklama: "İlk tarih (gün/ay/yıl)" },
            { sembol: "Bitiş", aciklama: "İkinci tarih" },
            { sembol: "86.400", aciklama: "Bir gündeki saniye sayısı" },
        ],
        ornek: [
            { adim: "1 Ocak 2026 → 5 Ağustos 2026", sonuc: "216 gün" },
            { adim: "Hafta karşılığı", sonuc: "30 hafta 6 gün" },
            { adim: "İş günü (hafta sonları hariç)", sonuc: "≈ 155 gün" },
        ],
        not: "Artık yıllar (2028, 2032…) otomatik hesaba katılır.",
    },
    {
        slug: "mtv",
        baslik: "MTV (Motorlu Taşıtlar Vergisi) Hesabı",
        formul: "MTV = Tarife(motor hacmi, araç yaşı, araç değeri)",
        degiskenler: [
            { sembol: "Motor hacmi", aciklama: "cm³ cinsinden silindir hacmi" },
            { sembol: "Araç yaşı", aciklama: "1–3, 4–6, 7–11, 12–15, 16+ kademeleri" },
            { sembol: "Araç değeri", aciklama: "2018 sonrası kayıtlarda dikkate alınır" },
        ],
        ornek: [
            { adim: "1.400 cm³ altı, 1–3 yaş", sonuc: "En düşük kademe" },
            { adim: "Ocak taksidi", sonuc: "Yıllık tutarın yarısı" },
            { adim: "Temmuz taksidi", sonuc: "Kalan yarısı" },
        ],
        not: "MTV her yıl yeniden değerleme oranıyla güncellenir.",
    },
]

const index = new Map(formulas.map((f) => [f.slug, f]))

export function getFormula(slug: string): Formula | undefined {
    return index.get(slug)
}

export function allFormulaSlugs(): string[] {
    return formulas.map((f) => f.slug)
}
