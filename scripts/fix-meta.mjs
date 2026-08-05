#!/usr/bin/env node
/**
 * Tek seferlik: title/description uzunluklarını arama sonuçlarına uygun
 * aralığa çeker ve eski yıl etiketlerini (2024/2025) 2026 ile değiştirir.
 *
 * Hedef: başlık gövdesi ≤ 45 karakter (layout " | HesaplamaMakinesi" ekliyor,
 * toplam ≤ 65), açıklama 120-158 karakter.
 *
 * Kullanım: node scripts/fix-meta.mjs [--dry]
 */

import { readFileSync, writeFileSync } from "node:fs"

const DRY = process.argv.includes("--dry")

/** rota → [yeni title, yeni description] */
const META = {
    "/astroloji/7-ev-hesaplama": [
        "7. Ev Hesaplama - Evlilik Burcu 2026",
        "Doğum haritanızda 7. evinizi öğrenin. Evlilik burcu, ideal partner özellikleri ve ilişki uyumu için ücretsiz 7. ev hesaplama aracı.",
    ],
    "/astroloji/dogum-haritasi-hesaplama": [
        "Doğum Haritası Hesaplama - Natal Harita",
        "Doğum haritası hesaplama aracı. Güneş burcu, ay burcu, yükselen burç ve gezegen yerleşimlerinizi ücretsiz natal harita hesaplayıcı ile öğrenin.",
    ],
    "/astroloji/juno-hesaplama": [
        "Juno Burcu Hesaplama - Ruh Eşi Analizi",
        "Astrolojide Juno burcu hesaplama aracı. Doğum haritanızdaki Juno yerleşimine göre ruh eşinizi ve evlilikten beklentilerinizi ücretsiz öğrenin.",
    ],
    "/astroloji/lilith-hesaplama": [
        "Lilith Burcu Hesaplama - Kara Ay",
        "Doğum haritanızda Lilith (Kara Ay) burcu hesaplama aracı. İçsel gücünüzü, bastırdığınız arzuları ve bilinçaltındaki gölge yanları ücretsiz keşfedin.",
    ],
    "/astroloji": [
        "Astroloji Hesaplama - Burç Araçları",
        "Doğum haritanızdaki kritik noktaları öğrenin. Yükselen burç, Juno burcu, Lilith ve 7. ev hesaplaması ile ücretsiz astrolojik analiz araçları.",
    ],
    "/astroloji/yukselen-burc-hesaplama": [
        "Yükselen Burç Hesaplama - Ascendant",
        "Doğum tarihi ve saatinize göre yükselen burcunuzu öğrenin. Ascendant burç özellikleri, element ve yönetici gezegen bilgileriyle ücretsiz hesaplama.",
    ],
    "/donusturuculer/agirlik-donusturucu": [
        "Ağırlık Dönüştürücü - kg, Pound, Ons",
        "Ücretsiz ağırlık birimi dönüştürücü. Kilogram, gram, miligram, ton, pound ve ons arasında anında çevirme yapın; dönüşüm tablosuyla sonucu doğrulayın.",
    ],
    "/donusturuculer/alan-donusturucu": [
        "Alan Dönüştürücü - m², Dönüm, Hektar",
        "Ücretsiz alan birimi dönüştürücü. Metrekare, dönüm, hektar, dekar, akre ve feet kare arasında anında çevirin. Arazi ve emlak hesapları için ideal.",
    ],
    "/donusturuculer/birim-donusturucu": [
        "Birim Dönüştürücü - Tüm Ölçü Birimleri",
        "Ücretsiz birim dönüştürücü. Metre-feet, kilogram-pound, litre-galon dönüşümleri; uzunluk, ağırlık, alan, hacim ve sıcaklık birimleri tek araçta.",
    ],
    "/donusturuculer/hiz-donusturucu": [
        "Hız Dönüştürücü - km/s, mph, m/s, Knot",
        "Ücretsiz hız birimi dönüştürücü. Kilometre/saat, mil/saat, metre/saniye, knot ve mach arasında anında çevirin; araç ve havacılık hesapları için.",
    ],
    "/donusturuculer": [
        "Birim Dönüştürücü Araçları",
        "Ücretsiz birim dönüştürücü araçları: uzunluk, ağırlık, alan, hacim, sıcaklık, hız ve veri boyutu dönüşümü. Hazır dönüşüm tablolarıyla anında sonuç.",
    ],
    "/donusturuculer/sicaklik-donusturucu": [
        "Sıcaklık Dönüştürücü - °C, °F, Kelvin",
        "Ücretsiz sıcaklık dönüştürücü. Santigrat, Fahrenheit ve Kelvin arasında anında çevirin. Hava durumu, fırın sıcaklığı ve bilimsel hesaplar için.",
    ],
    "/donusturuculer/uzunluk-donusturucu": [
        "Uzunluk Dönüştürücü - Metre, Feet, İnç",
        "Ücretsiz uzunluk birimi dönüştürücü. Metre, kilometre, santimetre, milimetre, feet, inç, mil ve yarda arasında anında ve hatasız çevirme yapın.",
    ],
    "/donusturuculer/veri-boyutu-donusturucu": [
        "Veri Boyutu Dönüştürücü - MB, GB, TB",
        "Ücretsiz veri boyutu dönüştürücü. Byte, kilobyte, megabyte, gigabyte ve terabyte arasında anında çevirin. Depolama ve internet hızı hesapları için.",
    ],
    "/finans/15-gunluk-maas-farki-hesaplama": [
        "15 Günlük Maaş Farkı Hesaplama 2026",
        "Memur ve kamu çalışanları için 15 günlük maaş farkı hesaplama aracı. Ocak ve Temmuz maaş zammı farklarını 2026 katsayılarıyla anında hesaplayın.",
    ],
    "/finans/asgari-odeme-hesaplama": [
        "Asgari Ödeme Hesaplama - Kredi Kartı",
        "Kredi kartı ekstre borcunuza göre asgari ödeme tutarını hesaplayın. BDDK'nın belirlediği oranlarla limit bazlı asgari tutar hesaplama aracı.",
    ],
    "/finans/bilesik-faiz-hesaplama": [
        "Bileşik Faiz Hesaplama - Getiri Aracı",
        "Bileşik faiz hesaplama aracı. Faizin faize eklenmesiyle oluşan toplam getiriyi aylık, yıllık ve günlük bileşik faiz seçenekleriyle hesaplayın.",
    ],
    "/finans/enflasyon-hesaplama": [
        "Enflasyon Hesaplama - Değer Kaybı",
        "Enflasyon hesaplama aracı. Paranızın yıllar içindeki değer kaybını ve gelecekteki satın alma gücünü hesaplayın. Reel değer hesaplayıcı ücretsizdir.",
    ],
    "/finans/kredi-hesaplama": [
        "Kredi Hesaplama - Aylık Taksit Aracı",
        "Konut, ihtiyaç ve taşıt kredisi için aylık taksit tutarını, toplam geri ödemeyi ve faiz maliyetini hesaplayın. Ücretsiz ve anlık sonuç veren araç.",
    ],
    "/finans/maas-hesaplama": [
        "Maaş Hesaplama - Net Brüt Maaş 2026",
        "2026 maaş hesaplama aracı. Brütten nete veya netten brüte hesaplayın; SGK, işsizlik, gelir vergisi ve damga vergisi kesintileri güncel oranlarla.",
    ],
    "/finans/mevduat-faizi-hesaplama": [
        "Mevduat Faizi Hesaplama - Vadeli Getiri",
        "Vadeli mevduat hesabınızın brüt ve net faiz getirisini, stopaj kesintisini ve vade sonu tutarını hesaplayın. Ücretsiz ve anlık sonuç veren araç.",
    ],
    "/finans/tazminat-hesaplama": [
        "Tazminat Hesaplama - Kıdem ve İhbar",
        "Kıdem ve ihbar tazminatı hesaplama aracı. Brüt maaş ve çalışma sürenize göre alacağınız tazminatı 2026 kıdem tavanıyla güncel olarak hesaplayın.",
    ],
    "/finans/yatirim-getirisi": [
        "ROI Hesaplama - Yatırım Getirisi",
        "ROI hesaplama aracı. Yatırımınızın getirisini yüzde olarak hesaplayın; kâr-zarar analizi ve yatırım performansı ölçümü için ücretsiz hesaplayıcı.",
    ],
    "/finans/zekat-hesaplama": [
        "Zekat Hesaplama 2026 - Nisab Hesabı",
        "Zekat hesaplama aracı. Altın, nakit, hisse senedi ve tüm varlıklarınız için zekat miktarını 2026 nisab değerleri ve %2,5 oranıyla hesaplayın.",
    ],
    "/iletisim": [
        "İletişim",
        "HesaplamaMakinesi.com ile iletişime geçin. Hesaplama araçlarıyla ilgili sorularınız, hata bildirimleriniz ve yeni araç önerileriniz için bize yazın.",
    ],
    "/kullanim-sartlari": [
        "Kullanım Şartları",
        "HesaplamaMakinesi.com kullanım şartları ve koşulları. Sitedeki hesaplama araçlarını kullanmadan önce sorumluluk sınırlarını ve kuralları okuyun.",
    ],
    "/matematik-egitim/ayt-net-hesaplama": [
        "AYT Net Hesaplama 2026 - YKS Neti",
        "2026 AYT net hesaplama aracı. Sayısal, Sözel, Eşit Ağırlık ve Dil testlerinde doğru-yanlış sayınıza göre AYT netinizi anında ücretsiz hesaplayın.",
    ],
    "/matematik-egitim/gpa-hesaplama": [
        "GPA Hesaplama - Not Ortalaması",
        "GPA (genel not ortalaması) hesaplama aracı. Ders kredileri ve harf notlarınıza göre 4.0 üzerinden ortalamanızı hesaplayın; AGNO dönüşümü dahildir.",
    ],
    "/matematik-egitim/iskonto-hesaplama": [
        "İskonto Hesaplama - İndirimli Fiyat",
        "İskonto (indirim) hesaplama aracı. Yüzde indirim oranını girerek yeni fiyatı, indirim tutarını ve zincirleme iskontoları anında ücretsiz hesaplayın.",
    ],
    "/matematik-egitim/karekok-hesaplama": [
        "Karekök Hesaplama - Kök Hesaplayıcı",
        "Karekök hesaplama aracı. Sayıların karekökünü, küpkökünü ve n'inci kökünü anında hesaplayın; tam kare kontrolü ve adım adım çözüm birlikte gelir.",
    ],
    "/matematik-egitim/oran-oranti-hesaplama": [
        "Oran Orantı Hesaplama - Doğru Orantı",
        "Oran orantı hesaplama aracı. A/B = C/D biçimindeki doğru ve ters orantı problemlerini bilinmeyeni bularak çözün; formül ve örneklerle açıklamalı.",
    ],
    "/matematik-egitim": [
        "Matematik ve Eğitim Hesaplayıcıları",
        "Ücretsiz matematik ve eğitim hesaplama araçları: yüzde, karekök, ortalama, oran orantı, GPA, TYT-AYT net, LGS ve DGS puan hesaplama araçları.",
    ],
    "/matematik-egitim/tyt-net-hesaplama": [
        "TYT Net Hesaplama 2026 - YKS Neti",
        "2026 TYT net hesaplama aracı. Türkçe, Matematik, Fen ve Sosyal derslerindeki doğru-yanlış sayınıza göre TYT netinizi anında ücretsiz hesaplayın.",
    ],
    "/saglik-spor/1rm-hesaplama": [
        "1RM Hesaplama - Tek Tekrar Maksimum",
        "1RM (tek tekrar maksimum) hesaplama aracı. Kaldırdığınız ağırlık ve tekrar sayısına göre maksimum yükünüzü Epley ve Brzycki formülleriyle bulun.",
    ],
    "/saglik-spor/alkol-promil-hesaplama": [
        "Alkol Promil Hesaplama - Yasal Sınır",
        "Kandaki alkol oranını (promil) hesaplama aracı. Tüketilen içki, cinsiyet ve vücut ağırlığına göre tahmini promil ve yasal sınır kontrolü yapın.",
    ],
    "/saglik-spor/bazal-metabolizma-hesaplama": [
        "Bazal Metabolizma Hesaplama - BMR",
        "Bazal metabolizma hızı (BMR) hesaplama aracı. Harris-Benedict formülüyle vücudunuzun dinlenme halindeki günlük kalori ihtiyacını ücretsiz bulun.",
    ],
    "/saglik-spor/calpol-doz-hesaplama": [
        "Calpol Doz Hesaplama - Çocuk Dozu",
        "Çocuklar ve bebekler için kilo bazlı Calpol doz hesaplama aracı. 120 mg ve 250 mg şurup ölçeğini bulun; dozaj için mutlaka hekiminize danışın.",
    ],
    "/saglik-spor/cinsiyet-hesaplama": [
        "Cinsiyet Hesaplama - Çin Takvimi",
        "Çin ve Rus takvimine göre bebek cinsiyeti tahmini. Anne yaşı ve gebe kalınan aya göre hesaplayın; bu araç eğlence amaçlıdır, tıbbi tanı değildir.",
    ],
    "/saglik-spor/kalori-hesaplama": [
        "Kalori İhtiyacı Hesaplama - TDEE",
        "Günlük kalori ihtiyacı hesaplama aracı. Yaş, kilo, boy ve aktivite seviyenize göre BMR ve TDEE değerlerinizi ücretsiz ve anında hesaplayın.",
    ],
    "/saglik-spor/makro-hesaplama": [
        "Makro Hesaplama - Protein, Karb, Yağ",
        "Makro besin hesaplama aracı. Fitness hedefinize göre günlük protein, karbonhidrat ve yağ ihtiyacınızı gram cinsinden hesaplayın; kas ve kilo planları.",
    ],
    "/saglik-spor": [
        "Sağlık ve Spor Hesaplama Araçları",
        "Ücretsiz sağlık ve spor hesaplama araçları: vücut kitle indeksi, kalori ihtiyacı, ideal kilo, su tüketimi, makro besin ve 1RM hesaplayıcıları.",
    ],
    "/saglik-spor/qtc-hesaplama": [
        "QTc Hesaplama - Düzeltilmiş QT Aralığı",
        "QTc hesaplama aracı. Bazett ve Fridericia formülleriyle nabız ve QT aralığına göre düzeltilmiş QT değerini bulun; EKG değerlendirmesi hekime aittir.",
    ],
    "/saglik-spor/su-ihtiyaci-hesaplama": [
        "Su İhtiyacı Hesaplama - Günlük Su",
        "Günlük su ihtiyacı hesaplama aracı. Kilonuza, aktivite seviyenize ve hava sıcaklığına göre içmeniz gereken su miktarını litre cinsinden hesaplayın.",
    ],
    "/saglik-spor/uyku-hesaplama": [
        "Uyku Hesaplama - Yatma ve Kalkma Saati",
        "Uyku döngülerine göre ideal yatma ve kalkma saatlerinizi hesaplayın. 90 dakikalık döngü hesabıyla daha dinlenmiş uyanmak için ücretsiz araç.",
    ],
    "/saglik-spor/vki-hesaplama": [
        "VKİ Hesaplama - Vücut Kitle İndeksi",
        "VKİ hesaplama aracı. Boy ve kilonuza göre vücut kitle indeksinizi hesaplayın; ideal kilo aralığınızı ve obezite risk sınıfınızı ücretsiz görün.",
    ],
    "/saglik-spor/vucut-olcumu-hesaplama": [
        "Bel Kalça Oranı Hesaplama - WHR",
        "Bel kalça oranı (WHR) hesaplama aracı. Bel ve kalça çevrenizi girerek sağlık riski sınıfınızı ve kardiyovasküler risk değerlendirmenizi görün.",
    ],
    "/seyahat/hyp-hesaplama": [
        "HYP Hesaplama - Hız, Yakıt ve Para",
        "Hız yapmanın zaman kazancıyla yakıt maliyeti arasındaki dengeyi hesaplayın. Ne kadar zaman kazanıp ne kadar ekstra yakıt harcadığınızı görün.",
    ],
    "/seyahat": [
        "Seyahat Hesaplayıcıları",
        "Seyahat ve ulaşım hesaplama araçları. Taksi ücreti ve hız-yakıt-para (HYP) hesaplayıcıları ile yol masrafınızı önceden planlayın; hepsi ücretsiz.",
    ],
    "/seyahat/taksi-ucreti-hesaplama": [
        "Taksi Ücreti Hesaplama 2026",
        "İstanbul ve Ankara için 2026 taksi ücreti hesaplama aracı. Açılış ücreti, kilometre tarifesi ve indi-bindi ile tahmini taksi masrafınızı bulun.",
    ],
    "/vergi-muhasebe/damga-vergisi": [
        "Damga Vergisi Hesaplama 2026",
        "Damga vergisi hesaplama aracı. Sözleşme, kira kontratı ve ihale kararı için 2026 oranlarıyla damga vergisini hesaplayın; maktu tutarlar dahildir.",
    ],
    "/vergi-muhasebe/engelli-arac-indirimi": [
        "Engelli Araç İndirimi - ÖTV Muafiyeti",
        "Engelli araç ÖTV ve KDV muafiyeti hesaplama aracı. %40 ve %90 engel oranına göre araç fiyatındaki indirimi 2026 limitleriyle hesaplayın.",
    ],
    "/vergi-muhasebe/gelir-vergisi-hesaplama": [
        "Gelir Vergisi Hesaplama 2026",
        "2026 gelir vergisi hesaplama aracı. Brüt maaştan net maaşı, SGK ve damga vergisi kesintilerini ve asgari ücret istisnasını güncel dilimlerle görün.",
    ],
    "/vergi-muhasebe/kurumlar-vergisi": [
        "Kurumlar Vergisi Hesaplama 2026",
        "Kurumlar vergisi hesaplama aracı. Şirket kazancınız üzerinden ödenecek vergiyi 2026 oranlarıyla hesaplayın; ihracat ve üretim indirimleri dahildir.",
    ],
    "/vergi-muhasebe/maliyet-hesaplama": [
        "Maliyet Hesaplama - Kâr ve Satış Fiyatı",
        "Maliyet hesaplama aracı. Ürün ve hizmet maliyetinizi hesaplayın, kâr marjı belirleyin ve satış fiyatını otomatik bulun; birim maliyet dahildir.",
    ],
    "/vergi-muhasebe/mtv-hesaplama": [
        "MTV Hesaplama 2026 - Taşıt Vergisi",
        "2026 MTV hesaplama aracı. Araç yaşı, motor hacmi ve araç değerine göre motorlu taşıtlar vergisini hesaplayın; Ocak ve Temmuz taksitleri gösterilir.",
    ],
    "/vergi-muhasebe": [
        "Vergi ve Muhasebe Hesaplamaları",
        "KDV, gelir vergisi, ÖTV, MTV, damga vergisi ve kurumlar vergisi hesaplama araçları. 2026 güncel oranlarla ücretsiz online vergi hesaplayıcıları.",
    ],
    "/zaman-takvim/calisma-gunleri-hesaplama": [
        "Çalışma Günleri Hesaplama - İş Günü",
        "İki tarih arasındaki iş günü sayısını hesaplayın. Hafta sonlarını ve resmî tatilleri dahil etme veya hariç tutma seçenekleriyle ücretsiz araç.",
    ],
    "/zaman-takvim/gebelik-hesaplama": [
        "Gebelik Hesaplama - Doğum Tarihi",
        "Gebelik hesaplama aracı. Son adet tarihinize göre tahmini doğum tarihini, kaçıncı gebelik haftasında olduğunuzu ve trimester bilginizi öğrenin.",
    ],
    "/zaman-takvim/gun-farki-hesaplama": [
        "Gün Farkı Hesaplama - Tarih Arası Gün",
        "İki tarih arasındaki gün, hafta, ay, yıl ve iş günü sayısını hesaplayın. Geçmiş ve gelecek tarihler için çalışan ücretsiz gün farkı hesaplayıcı.",
    ],
    "/zaman-takvim": [
        "Zaman ve Takvim Hesaplama Araçları",
        "Ücretsiz zaman ve takvim araçları: tarih farkı, yaş hesaplama, gebelik takibi, iş günü sayısı, saat farkı, zaman dilimi çevirici ve kronometre.",
    ],
    "/zaman-takvim/saat-hesaplama": [
        "Saat Hesaplama - İki Saat Arası Fark",
        "Saat farkı hesaplama aracı. İki saat arasındaki farkı saat, dakika ve ondalık saat olarak hesaplayın; mesai ve çalışma süresi takibi için idealdir.",
    ],
    "/zaman-takvim/tarih-ekleme": [
        "Tarih Ekleme ve Çıkarma Hesaplama",
        "Bir tarihe gün, hafta, ay veya yıl ekleyin ya da çıkarın. Sözleşme bitişi, teslim tarihi ve süre takibi için sonucu anında gösteren ücretsiz araç.",
    ],
    "/zaman-takvim/tarih-hesaplama": [
        "Tarih Hesaplama - İki Tarih Arası Süre",
        "Tarih hesaplama aracı. İki tarih arasındaki gün, hafta, ay ve yıl farkını hesaplayın; geçmiş ve gelecek tarihler için anında sonuç veren araç.",
    ],
    "/zaman-takvim/yas-hesaplama": [
        "Yaş Hesaplama - Doğum Tarihine Göre",
        "Yaş hesaplama aracı. Doğum tarihinize göre yaşınızı yıl, ay ve gün olarak hesaplayın; burcunuzu ve bir sonraki doğum gününüze kalan süreyi görün.",
    ],
    "/zaman-takvim/zaman-dilimi-cevirici": [
        "Zaman Dilimi Çevirici - Dünya Saatleri",
        "Zaman dilimi çevirici. İstanbul, New York, Londra, Tokyo ve diğer şehirler arasındaki saat farkını hesaplayın; canlı dünya saatleri gösterilir.",
    ],
}

const SUFFIX_LEN = " | HesaplamaMakinesi".length
let changed = 0
const warnings = []

for (const [route, [title, description]] of Object.entries(META)) {
    const file = `app${route === "/" ? "" : route}/page.tsx`
    let src
    try {
        src = readFileSync(file, "utf8")
    } catch {
        warnings.push(`dosya yok: ${file}`)
        continue
    }

    const titleLen = title.length + SUFFIX_LEN
    if (titleLen > 65) warnings.push(`title hâlâ uzun (${titleLen}): ${route}`)
    if (description.length < 120 || description.length > 158)
        warnings.push(`description aralık dışı (${description.length}): ${route}`)

    const next = src
        .replace(/^(\s{4}title:\s*)"(?:[^"\\]|\\.)*"/m, `$1${JSON.stringify(title)}`)
        .replace(/^(\s{4}description:\s*)"(?:[^"\\]|\\.)*"/m, `$1${JSON.stringify(description)}`)

    if (next !== src) {
        if (!DRY) writeFileSync(file, next, "utf8")
        changed++
    }
}

for (const w of warnings) console.log(`! ${w}`)
console.log(`\n${changed}/${Object.keys(META).length} dosya güncellendi${DRY ? " (dry-run)" : ""}`)
